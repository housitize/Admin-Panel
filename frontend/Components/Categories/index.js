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
  HiOutlineChevronRight
} from "react-icons/hi";

const Categories = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: "Antibiotics", 
      description: "Medicines that fight bacterial infections",
      itemCount: 48,
      tags: ["Prescription", "Essential"],
      subcategories: ["Penicillins", "Cephalosporins", "Macrolides"]
    },
    { 
      id: 2, 
      name: "Pain Relief", 
      description: "Analgesics and pain management",
      itemCount: 32,
      tags: ["OTC", "Common"],
      subcategories: ["NSAIDs", "Opioids", "Topical"]
    },
    { 
      id: 3, 
      name: "Vitamins", 
      description: "Nutritional supplements and vitamins",
      itemCount: 67,
      tags: ["OTC", "Supplements"],
      subcategories: ["Multivitamins", "Vitamin D", "Vitamin C"]
    },
    { 
      id: 4, 
      name: "Diabetes", 
      description: "Diabetes management and insulin",
      itemCount: 24,
      tags: ["Prescription", "Chronic"],
      subcategories: ["Insulin", "Oral Medications", "Testing"]
    },
    { 
      id: 5, 
      name: "Cardiovascular", 
      description: "Heart and blood pressure medications",
      itemCount: 41,
      tags: ["Prescription", "Chronic"],
      subcategories: ["Beta Blockers", "ACE Inhibitors", "Statins"]
    },
    { 
      id: 6, 
      name: "Respiratory", 
      description: "Asthma, COPD, and breathing aids",
      itemCount: 29,
      tags: ["Prescription", "Essential"],
      subcategories: ["Inhalers", "Nebulizers", "Antihistamines"]
    }
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
    subcategories: ""
  });

  const filteredCategories = categories.filter(cat =>
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
        tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
        subcategories: formData.subcategories ? formData.subcategories.split(",").map(s => s.trim()) : []
      };
      setCategories([...categories, newCategory]);
      setFormData({ name: "", description: "", tags: "", subcategories: "" });
      setIsAddModalOpen(false);
    }
  };

  const handleEditCategory = () => {
    if (formData.name && selectedCategory) {
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? {
              ...cat,
              name: formData.name,
              description: formData.description,
              tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
              subcategories: formData.subcategories ? formData.subcategories.split(",").map(s => s.trim()) : []
            }
          : cat
      ));
      setFormData({ name: "", description: "", tags: "", subcategories: "" });
      setSelectedCategory(null);
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      tags: category.tags.join(", "),
      subcategories: category.subcategories.join(", ")
    });
    setIsEditModalOpen(true);
  };

  const Modal = ({ isOpen, onClose, title, onSubmit, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-lg w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <HiOutlineX className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {title.includes("Add") ? "Add Category" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Categories</h1>
            <p className="text-sm text-gray-500 mt-1">Organize your medicine inventory</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <HiOutlinePlus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="relative max-w-md">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Categories</p>
            <p className="text-2xl font-light text-gray-900 mt-2">{categories.length}</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Items</p>
            <p className="text-2xl font-light text-gray-900 mt-2">
              {categories.reduce((sum, cat) => sum + cat.itemCount, 0)}
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Average per Category</p>
            <p className="text-2xl font-light text-gray-900 mt-2">
              {Math.round(categories.reduce((sum, cat) => sum + cat.itemCount, 0) / categories.length)}
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors">
              {/* Category Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <HiOutlineFolder className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <HiOutlinePencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <HiOutlineTrash className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-gray-700 rounded text-xs font-medium border border-gray-200"
                    >
                      <HiOutlineTag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Item Count */}
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Total Items</span>
                  <span className="text-sm font-medium text-gray-900">{category.itemCount}</span>
                </div>

                {/* Subcategories Toggle */}
                {category.subcategories.length > 0 && (
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                    className="flex items-center justify-between w-full py-3 border-t border-gray-100 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <span>Subcategories ({category.subcategories.length})</span>
                    <HiOutlineChevronRight 
                      className={`w-4 h-4 transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`}
                    />
                  </button>
                )}
              </div>

              {/* Subcategories List */}
              {expandedCategory === category.id && category.subcategories.length > 0 && (
                <div className="px-6 pb-6 pt-0">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    {category.subcategories.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-700 py-1"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <HiOutlineFolder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-sm text-gray-500 mb-6">Try adjusting your search or create a new category</p>
            <button
              onClick={() => {
                setSearch("");
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Add Category
            </button>
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setFormData({ name: "", description: "", tags: "", subcategories: "" });
        }}
        title="Add New Category"
        onSubmit={handleAddCategory}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="e.g., Antibiotics"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              placeholder="Brief description of the category"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Comma separated: Prescription, Essential"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategories
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Comma separated: Type A, Type B"
              value={formData.subcategories}
              onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
            />
          </div>
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
          setFormData({ name: "", description: "", tags: "", subcategories: "" });
        }}
        title="Edit Category"
        onSubmit={handleEditCategory}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="e.g., Antibiotics"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              placeholder="Brief description of the category"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Comma separated: Prescription, Essential"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategories
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Comma separated: Type A, Type B"
              value={formData.subcategories}
              onChange={(e) => setFormData({ ...formData, subcategories: e.target.value })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;