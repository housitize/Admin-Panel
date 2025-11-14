"use client";

import React, { useEffect, useState } from "react";
import {
  FiPlusCircle,
  FiX,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiAlertCircle,
  FiPackage,
} from "react-icons/fi";
import ImageUploader from "../ImageUpload";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Medicines = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const [medicines, setMedicines] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/medicine/getAll`);
      setMedicines(response?.data?.medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  useEffect(() => {
    fetchMedicine();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    manufacturer: "",
    description: "",
    composition: "",
    indications: "",
    dosage: "",
    sideEffects: "",
    precautions: "",
    storageInfo: "",
    price: "",
    discountPrice: "",
    stock: "",
    expiryDate: "",
    prescriptionRequired: false,
    quantity: "",
    type: "",
    batchNo: "",
    stripSize: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    images: [],
    thumbnail: "",
  });

  const categories = ["all", ...new Set(medicines.map((m) => m.category))];
  const filteredMedicines = medicines.filter(
    (m) =>
      (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "all" || m.category === selectedCategory)
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "images") form.append(key, formData[key]);
      });

      const existingImages = formData.images
        .filter((img) => !img.file)
        .map((img) => ({
          url: img.url,
          public_id: img.public_id,
          originalName: img.originalName || "",
        }));

      form.append("existingImages", JSON.stringify(existingImages));

      formData.images
        .filter((img) => img.file)
        .forEach((img) => {
          form.append("images", img.file);
        });

      let resp;

      if (isEdit) {
        resp = await axios.put(
          `${API_URL}/api/medicine/update/${formData._id}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        resp = await axios.post(`${API_URL}/api/medicine/create`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (resp.data.success) {
        alert(resp.data.message);
        fetchMedicine();
      }
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
    } finally {
      setShowForm(false);
      setIsEdit(false);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await axios.delete(`${API_URL}/api/medicine/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.data.success) {
        alert(resp.data.message);
        fetchMedicine();
      }
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (m) => {
    setIsEdit(true);
    setShowForm(true);
    setFormData(m);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-3xl font-bold text-teal-700">
          Medicines Inventory
        </h2>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-md transition"
        >
          <FiPlusCircle /> Add Medicine
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            placeholder="Search by name or manufacturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              {[
                "Name",
                "Category",
                "Manufacturer",
                "Type",
                "Batch No",
                "Expiry",
                "Price (₹)",
                "Stock",
                "Actions",
              ].map((h) => (
                <th key={h} className="p-3 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.map((m) => (
              <tr key={m._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 font-semibold text-gray-800">{m.name}</td>
                <td className="p-3">{m.category}</td>
                <td className="p-3">{m.manufacturer}</td>
                <td className="p-3 capitalize">{m.type}</td>
                <td className="p-3 font-mono">{m.batchNo}</td>
                <td className="p-3">{m.expiryDate.split("T")[0]}</td>
                <td className="p-3 font-bold text-teal-700">₹{m.price}</td>

                <td className="p-3">
                  {m.lowStock ? (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-xs">
                      <FiAlertCircle className="inline mr-1" />
                      {m.stock}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-semibold text-xs">
                      {m.stock}
                    </span>
                  )}
                </td>

                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => handleEdit(m)}
                    className="text-teal-600 hover:underline flex items-center gap-1"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="text-red-600 hover:underline flex items-center gap-1"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-10">
            <FiPackage size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">No medicines found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-8 relative overflow-y-auto max-h-[90vh] border border-teal-200">
            {/* Close */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-teal-600 hover:text-teal-800"
            >
              <FiX size={26} />
            </button>

            <h3 className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-2">
              {isEdit ? (
                <>
                  <FiEdit2 /> Update Medicine
                </>
              ) : (
                <>
                  <FiPlusCircle /> Add Medicine
                </>
              )}
            </h3>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <Input
                label="Medicine Name"
                name="name"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Slug"
                name="slug"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Category"
                name="category"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Manufacturer"
                name="manufacturer"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Type"
                name="type"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Batch No"
                name="batchNo"
                formData={formData}
                setFormData={setFormData}
              />

              <Input
                label="Quantity"
                name="quantity"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Strip Size"
                name="stripSize"
                formData={formData}
                setFormData={setFormData}
              />

              <Input
                label="Price (₹)"
                name="price"
                type="number"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Discount Price (₹)"
                name="discountPrice"
                type="number"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Stock"
                name="stock"
                type="number"
                formData={formData}
                setFormData={setFormData}
              />

              <Input
                label="Expiry Date"
                name="expiryDate"
                type="date"
                formData={formData}
                setFormData={setFormData}
              />

              <Input
                label="Meta Title"
                name="metaTitle"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Meta Description"
                name="metaDescription"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Tags"
                name="tags"
                formData={formData}
                setFormData={setFormData}
              />
              <Input
                label="Storage Info"
                name="storageInfo"
                formData={formData}
                setFormData={setFormData}
              />

              {/* Textareas */}
              <Textarea
                label="Description"
                name="description"
                formData={formData}
                setFormData={setFormData}
              />
              <Textarea
                label="Composition"
                name="composition"
                formData={formData}
                setFormData={setFormData}
              />
              <Textarea
                label="Indications"
                name="indications"
                formData={formData}
                setFormData={setFormData}
              />
              <Textarea
                label="Dosage"
                name="dosage"
                formData={formData}
                setFormData={setFormData}
              />
              <Textarea
                label="Side Effects"
                name="sideEffects"
                formData={formData}
                setFormData={setFormData}
              />
              <Textarea
                label="Precautions"
                name="precautions"
                formData={formData}
                setFormData={setFormData}
              />

              <ImageUploader
                formData={formData}
                setFormData={setFormData}
                isEdit={isEdit}
              />

              {/* Checkbox */}
              <div className="col-span-full flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  checked={formData.prescriptionRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      prescriptionRequired: e.target.checked,
                    })
                  }
                  id="prescriptionRequired"
                  className="w-4 h-4 text-teal-600 cursor-pointer"
                />
                <label htmlFor="prescriptionRequired" className="text-gray-700">
                  Prescription Required
                </label>
              </div>

              {/* Submit */}
              <div className="col-span-full flex justify-end mt-6 gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-t-2 border-white rounded-full animate-spin"></div>
                      Saving...
                    </span>
                  ) : isEdit ? (
                    "Update Medicine"
                  ) : (
                    "Save Medicine"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* Reusable Input */
const Input = ({ label, name, formData, setFormData, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-teal-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={formData[name] || ""}
      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
    />
  </div>
);

/* Reusable Textarea */
const Textarea = ({ label, name, formData, setFormData }) => (
  <div className="col-span-full">
    <label className="block text-sm font-medium text-teal-700 mb-1">
      {label}
    </label>
    <textarea
      rows={2}
      value={formData[name] || ""}
      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
    ></textarea>
  </div>
);

export default Medicines;
