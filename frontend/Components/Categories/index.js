"use client";

import { useState } from "react";
import {
  HiOutlinePlus,
  HiOutlineSearch,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineX,
  HiOutlineTag,
  HiOutlineFolder,
  HiOutlineChevronRight,
} from "react-icons/hi";

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Antibiotics",
      description: "Medicines that fight bacterial infections",
      itemCount: 48,
      tags: ["Prescription", "Essential"],
      subcategories: ["Penicillins", "Cephalosporins", "Macrolides"],
    },
    {
      id: 2,
      name: "Pain Relief",
      description: "Analgesics and pain management",
      itemCount: 32,
      tags: ["OTC", "Common"],
      subcategories: ["NSAIDs", "Opioids", "Topical"],
    },
    {
      id: 3,
      name: "Vitamins",
      description: "Nutritional supplements and vitamins",
      itemCount: 67,
      tags: ["OTC", "Supplements"],
      subcategories: ["Multivitamins", "Vitamin D", "Vitamin C"],
    },
  ]);

  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    subcategories: "",
  });

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = () => {
    if (formData.name) {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description,
        itemCount: 0,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
        subcategories: formData.subcategories
          ? formData.subcategories.split(",").map((s) => s.trim())
          : [],
      };
      setCategories([...categories, newCategory]);
      resetForm();
      setIsAddModalOpen(false);
    }
  };

  const handleEditCategory = () => {
    if (formData.name && selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id
            ? {
                ...cat,
                name: formData.name,
                description: formData.description,
                tags: formData.tags
                  ? formData.tags.split(",").map((t) => t.trim())
                  : [],
                subcategories: formData.subcategories
                  ? formData.subcategories.split(",").map((s) => s.trim())
                  : [],
              }
            : cat
        )
      );
      resetForm();
      setIsEditModalOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      tags: "",
      subcategories: "",
    });
    setSelectedCategory(null);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((cat) => cat.id !== id));
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      tags: category.tags.join(", "),
      subcategories: category.subcategories.join(", "),
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-teal-700">Categories</h1>
            <p className="text-sm text-gray-600 mt-1">
              Organize and manage your medicine inventory efficiently
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition"
          >
            <HiOutlinePlus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="relative max-w-md">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />

            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm 
                         focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Categories", value: categories.length },
            {
              label: "Total Items",
              value: categories.reduce((sum, cat) => sum + cat.itemCount, 0),
            },
            {
              label: "Average per Category",
              value: Math.round(
                categories.reduce((s, c) => s + c.itemCount, 0) /
                  categories.length
              ),
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-gray-300 p-6 rounded-xl shadow-sm"
            >
              <p className="text-xs font-medium text-teal-700 uppercase tracking-wide">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold text-gray-800 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <HiOutlineFolder className="w-6 h-6 text-teal-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 hover:bg-teal-50 rounded-lg transition"
                    >
                      <HiOutlinePencil className="w-5 h-5 text-teal-600" />
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition"
                    >
                      <HiOutlineTrash className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {category.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg text-xs font-medium"
                    >
                      <HiOutlineTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Item Count */}
                <div className="flex items-center justify-between mt-4 py-3 border-t border-teal-100">
                  <span className="text-sm text-gray-600">Total Items</span>
                  <span className="text-sm font-semibold">
                    {category.itemCount}
                  </span>
                </div>

                {/* Toggle subcategories */}
                {category.subcategories.length > 0 && (
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.id ? null : category.id
                      )
                    }
                    className="flex items-center justify-between w-full py-3 border-t border-teal-100 text-sm text-teal-700 hover:text-teal-900 transition"
                  >
                    <span>Subcategories ({category.subcategories.length})</span>
                    <HiOutlineChevronRight
                      className={`w-5 h-5 transition-transform ${
                        expandedCategory === category.id && "rotate-90"
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Subcategories */}
              {expandedCategory === category.id && (
                <div className="px-6 pb-6">
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 space-y-2">
                    {category.subcategories.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-teal-800"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          resetForm();
        }}
        title="Add New Category"
        onSubmit={handleAddCategory}
      >
        <FormFields formData={formData} setFormData={setFormData} />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          resetForm();
        }}
        title="Edit Category"
        onSubmit={handleEditCategory}
      >
        <FormFields formData={formData} setFormData={setFormData} />
      </Modal>
    </div>
  );
};

const FormFields = ({ formData, setFormData }) => (
  <div className="space-y-4">
    <InputField
      label="Category Name *"
      value={formData.name}
      placeholder="e.g., Antibiotics"
      onChange={(v) => setFormData({ ...formData, name: v })}
    />
    <TextareaField
      label="Description"
      value={formData.description}
      placeholder="Short description"
      onChange={(v) => setFormData({ ...formData, description: v })}
    />
    <InputField
      label="Tags"
      placeholder="Comma separated"
      value={formData.tags}
      onChange={(v) => setFormData({ ...formData, tags: v })}
    />
    <InputField
      label="Subcategories"
      placeholder="Comma separated"
      value={formData.subcategories}
      onChange={(v) => setFormData({ ...formData, subcategories: v })}
    />
  </div>
);

const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      className="w-full px-4 py-2 border border-teal-300 rounded-lg text-sm 
                 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      rows="3"
      className="w-full px-4 py-2 border border-teal-300 rounded-lg text-sm resize-none
                 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Modal = ({ isOpen, onClose, title, onSubmit, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-teal-200">
        <div className="flex items-center justify-between p-5 border-b border-teal-100 bg-teal-600 text-white rounded-t-xl">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <HiOutlineX className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-6">{children}</div>

        <div className="flex items-center justify-end gap-3 p-5 border-t border-teal-100 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition"
          >
            {title.includes("Add") ? "Add Category" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
