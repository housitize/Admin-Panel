"use client";

import React, { useState } from "react";
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

const Medicines = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ✅ Local dummy medicines
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      manufacturer: "Sun Pharma",
      category: "Pain Relief",
      type: "tablet",
      stripSize: "10 tablets",
      batchNo: "BT2024001",
      expiryDate: "2025-12-15",
      price: 45,
      discount: 10,
      stock: 150,
      quantity: "10 Tablets",
      lowStock: false,
    },
  ]);

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

  // ✅ Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedicine = {
      id: medicines.length + 1,
      ...formData,
    };
    setMedicines([...medicines, newMedicine]);
    setShowForm(false);
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
                key={m.id}
                className="border-t hover:bg-gray-50 transition text-gray-700"
              >
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.category}</td>
                <td className="p-3">{m.manufacturer}</td>
                <td className="p-3 capitalize">{m.type}</td>
                <td className="p-3 font-mono">{m.batchNo}</td>
                <td className="p-3">{m.expiryDate}</td>
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
                  <button className="text-blue-600 hover:underline flex items-center gap-1">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button className="text-red-600 hover:underline flex items-center gap-1">
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
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
            >
              <FiX size={24} />
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FiPlusCircle className="text-blue-600" /> Add New Medicine
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

              {/* File Inputs */}
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:bg-gray-50 transition">
                  <FiUpload className="mx-auto text-gray-400 mb-2" size={22} />
                  <p className="text-sm text-gray-500">
                    Drag & Drop or Click to Upload
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        images: Array.from(e.target.files),
                      })
                    }
                  />
                </div>
              </div>

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
                  className="w-4 h-4 text-blue-600"
                />
                <label
                  htmlFor="prescriptionRequired"
                  className="text-sm text-gray-700"
                >
                  Prescription Required
                </label>
              </div>

              {/* Submit */}
              <div className="col-span-full flex justify-end mt-4 gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Medicine
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
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
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
      {label}
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
