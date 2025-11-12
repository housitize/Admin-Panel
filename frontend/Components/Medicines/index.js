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
  FiUpload,
} from "react-icons/fi";
import ImageUploader from "../ImageUpload";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Medicines = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  // ✅ Local dummy medicines
  const [medicines, setMedicines] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/medicine/getAll`);
      // console.log("all medicine", response);
      setMedicines(response?.data?.medicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };
  useEffect(() => {
    fetchMedicine();
  }, []);

  // ✅ Mongoose Schema Fields + Extra UI Fields
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

  // ✅ Filtered list
  const categories = ["all", ...new Set(medicines.map((m) => m.category))];
  const filteredMedicines = medicines.filter(
    (m) =>
      (m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "all" || m.category === selectedCategory)
  );

  const token = localStorage.getItem("token");

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();

      // ✅ Add all text fields (except images)
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          form.append(key, formData[key]);
        }
      });

      // ✅ Separate existing (Cloudinary) images & new (File) images
      const existingImages = formData.images
        .filter((img) => !img.file) // old images (have url & public_id)
        .map((img) => ({
          url: img.url,
          public_id: img.public_id,
          originalName: img.originalName || "",
        }));

      // ✅ Append existing images as JSON string
      form.append("existingImages", JSON.stringify(existingImages));

      // ✅ Append only NEW images
      formData.images
        .filter((img) => img.file) // only newly added files
        .forEach((img) => {
          form.append("images", img.file);
        });

      let resp;

      if (isEdit) {
        // ✅ Update request
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
        // ✅ Create new medicine
        resp = await axios.post(`${API_URL}/api/medicine/create`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // console.log("✅ Response:", resp.data);

      if (resp.data.success) {
        alert(resp.data.message);
        fetchMedicine();
      }
    } catch (err) {
      console.error(
        "❌ Error submitting form:",
        err.response?.data || err.message
      );
    } finally {
      setShowForm(false);
      setIsEdit(false);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // console.log("id", id);
    try {
      const resp = await axios.delete(`${API_URL}/api/medicine/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("✅ Medicine deleted:", resp.data);
      if (resp.data.success) {
        alert(resp.data.message);
        fetchMedicine();
      }
    } catch (err) {
      console.error(
        "❌ Error deleting medicine:",
        err.response?.data || err.message
      );
    }
  };

  const handleEdit = (m) => {
    // console.log("m", m);
    setIsEdit(true);
    setShowForm(true);
    setFormData(m);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Medicines Inventory
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition"
        >
          <FiPlusCircle />
          Add Medicine
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or manufacturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
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
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Manufacturer</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Batch No</th>
              <th className="p-3 text-left">Expiry</th>
              <th className="p-3 text-left">Price (₹)</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((m) => (
              <tr
                key={m._id}
                className="border-t hover:bg-gray-50 transition text-gray-700"
              >
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.category}</td>
                <td className="p-3">{m.manufacturer}</td>
                <td className="p-3 capitalize">{m.type}</td>
                <td className="p-3 font-mono">{m.batchNo}</td>
                <td className="p-3">{m.expiryDate.split("T")[0]}</td>
                <td className="p-3 font-semibold">₹{m.price}</td>
                <td className="p-3">
                  {m.lowStock ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      <FiAlertCircle className="inline mr-1" />
                      {m.stock}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {m.stock}
                    </span>
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m._id)}
                    className="text-red-600 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <FiTrash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <FiPackage size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 font-medium">No medicines found</p>
            <p className="text-gray-400 text-sm">
              Try changing your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Add Medicine Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white/90 rounded-2xl shadow-2xl w-full max-w-5xl p-8 relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-900 transition"
            >
              <FiX size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              {isEdit ? (
                <>
                  <FiEdit2 className="text-blue-600" /> Update Medicine
                </>
              ) : (
                <>
                  <FiPlusCircle className="text-blue-600" /> Add New Medicine
                </>
              )}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
                label="Type (Tablet/Syrup/Capsule)"
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
                label="Quantity (e.g., 10 Tablets or 200ml)"
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
                label="Tags (comma separated)"
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
              <div className="col-span-full flex items-center gap-2 mt-2">
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
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <label
                  htmlFor="prescriptionRequired"
                  className="text-sm text-gray-700 "
                >
                  Prescription Required
                </label>
              </div>

              {/* Submit */}
              <div className="col-span-full flex justify-end mt-4 gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 cursor-pointer border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                      <span>{isEdit ? "Updating..." : "Saving..."}</span>
                    </div>
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

// ✅ Reusable Input
const Input = ({ label, name, formData, setFormData, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      name={name}
      value={formData[name]}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
      }
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

// ✅ Reusable Textarea
const Textarea = ({ label, name, formData, setFormData }) => (
  <div className="col-span-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    <textarea
      name={name}
      value={formData[name]}
      onChange={(e) =>
        setFormData((prev) => ({ ...prev, [name]: e.target.value }))
      }
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      rows={2}
    ></textarea>
  </div>
);

export default Medicines;
