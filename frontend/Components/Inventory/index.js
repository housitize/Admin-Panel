"use client";
import React, { useState } from "react";
import {
  FiPackage,
  FiAlertTriangle,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiUsers,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiFileText,
} from "react-icons/fi";

const InventoryManagement = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      quantity: 150,
      minStock: 50,
      expiryDate: "2025-03-15",
      supplier: "MedSupply Co.",
      supplierContact: "+1-555-0100",
      batchNo: "BATCH001",
      price: 5.99,
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      quantity: 30,
      minStock: 40,
      expiryDate: "2025-02-20",
      supplier: "PharmaDist Inc.",
      supplierContact: "+1-555-0101",
      batchNo: "BATCH002",
      price: 12.5,
    },
    {
      id: 3,
      name: "Ibuprofen 400mg",
      category: "Pain Relief",
      quantity: 200,
      minStock: 80,
      expiryDate: "2026-08-10",
      supplier: "MedSupply Co.",
      supplierContact: "+1-555-0100",
      batchNo: "BATCH003",
      price: 7.25,
    },
  ]);

  const [stockMovements, setStockMovements] = useState([]);

  const [reorderRequests, setReorderRequests] = useState([]);

  const [activeTab, setActiveTab] = useState("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // add / edit / stock-in / stock-out
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [formData, setFormData] = useState({});

  // ===============================
  // HELPERS
  // ===============================
  const getLowStockItems = () =>
    medicines.filter((m) => m.quantity < m.minStock);

  const getExpiringItems = () => {
    const today = new Date();
    const threeMonths = new Date(today.setMonth(today.getMonth() + 3));

    return medicines.filter(
      (m) => new Date(m.expiryDate) <= threeMonths
    );
  };

  const getDaysUntilExpiry = (expiry) => {
    const today = new Date();
    const exp = new Date(expiry);
    const diff = exp - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Filter medicines
  const getFilteredMedicines = () =>
    medicines.filter((m) => {
      const s =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.category.toLowerCase().includes(searchTerm.toLowerCase());
      const c = filterCategory === "all" || m.category === filterCategory;
      return s && c;
    });

  const categories = [...new Set(medicines.map((m) => m.category))];

  // ===============================
  // MODALS
  // ===============================
  const openModal = (type, medicine = null) => {
    setModalType(type);
    setCurrentMedicine(medicine);

    if (medicine) {
      setFormData(medicine);
    } else {
      setFormData({
        name: "",
        category: "",
        quantity: 0,
        minStock: 0,
        expiryDate: "",
        supplier: "",
        supplierContact: "",
        batchNo: "",
        price: 0,
      });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setCurrentMedicine(null);
  };

  const handleSaveMedicine = () => {
    if (modalType === "add") {
      const newMed = { ...formData, id: Date.now() };
      setMedicines([...medicines, newMed]);
    }

    if (modalType === "edit") {
      setMedicines(
        medicines.map((m) =>
          m.id === currentMedicine.id ? { ...formData } : m
        )
      );
    }

    closeModal();
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm("Delete this medicine?")) {
      setMedicines(medicines.filter((m) => m.id !== id));
    }
  };

  const handleStockMovement = (type) => {
    const qty = parseInt(formData.quantity);
    if (!qty || qty <= 0) return alert("Invalid quantity!");

    const med = medicines.find((m) => m.id === currentMedicine.id);

    const updatedQty = type === "in"
      ? med.quantity + qty
      : med.quantity - qty;

    if (updatedQty < 0) return alert("Not enough stock!");

    setMedicines(
      medicines.map((m) =>
        m.id === med.id ? { ...m, quantity: updatedQty } : m
      )
    );

    const log = {
      id: Date.now(),
      medicineId: med.id,
      medicineName: med.name,
      type,
      quantity: qty,
      reference: `${type === "in" ? "PO" : "SALE"}-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };

    setStockMovements([log, ...stockMovements]);
    closeModal();
  };

  const generateReorderRequest = (medicine) => {
    const request = {
      id: Date.now(),
      medicineId: medicine.id,
      medicineName: medicine.name,
      currentStock: medicine.quantity,
      minStock: medicine.minStock,
      requestedQuantity: medicine.minStock * 2,
      supplier: medicine.supplier,
      supplierContact: medicine.supplierContact,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setReorderRequests([...reorderRequests, request]);
    alert(`Reorder request created for ${medicine.name}`);
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="bg-teal-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-teal-100">
            Track, analyze & control pharmacy stock.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-teal-600 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p>Total Items</p>
                <p className="text-2xl font-bold text-teal-600">
                  {medicines.length}
                </p>
              </div>
              <FiPackage className="text-3xl text-teal-600" />
            </div>
          </div>

          <div className="bg-white border-2 border-red-500 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p>Low Stock</p>
                <p className="text-2xl font-bold text-red-500">
                  {getLowStockItems().length}
                </p>
              </div>
              <FiAlertTriangle className="text-3xl text-red-500" />
            </div>
          </div>

          <div className="bg-white border-2 border-orange-500 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p>Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-500">
                  {getExpiringItems().length}
                </p>
              </div>
              <FiClock className="text-3xl text-orange-500" />
            </div>
          </div>

          <div className="bg-white border-2 border-teal-600 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p>Reorder Requests</p>
                <p className="text-2xl font-bold text-teal-600">
                  {reorderRequests.length}
                </p>
              </div>
              <FiFileText className="text-3xl text-teal-600" />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border-2 border-gray-200 rounded-lg">
          <div className="flex border-b">
            {[
              ["inventory", "Inventory"],
              ["movements", "Stock Movements"],
              ["alerts", "Alerts"],
              ["suppliers", "Suppliers"],
              ["reorders", "Reorder Requests"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 font-bold ${
                  activeTab === key
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* ============================
                INVENTORY TAB
            ============================ */}
            {activeTab === "inventory" && (
              <>
                {/* Search / Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:border-teal-600"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border-2 px-4 py-2 rounded-lg focus:border-teal-600"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => openModal("add")}
                    className="bg-teal-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700"
                  >
                    <FiPlus /> Add Medicine
                  </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-teal-600 text-white">
                      <tr>
                        {[
                          "Medicine",
                          "Category",
                          "Qty",
                          "Expiry",
                          "Supplier",
                          "Price",
                          "Actions",
                        ].map((h) => (
                          <th key={h} className="px-4 py-3">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {getFilteredMedicines().map((m, i) => (
                        <tr
                          key={m.id}
                          className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        >
                          <td className="px-4 py-3">
                            <b>{m.name}</b>
                            <p className="text-xs text-gray-500">
                              Batch: {m.batchNo}
                            </p>
                          </td>

                          <td className="px-4 py-3">{m.category}</td>

                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                m.quantity < m.minStock
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {m.quantity}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            {m.expiryDate}
                            <p
                              className={`text-xs ${
                                getDaysUntilExpiry(m.expiryDate) < 90
                                  ? "text-orange-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {getDaysUntilExpiry(m.expiryDate)} days
                            </p>
                          </td>

                          <td className="px-4 py-3">
                            {m.supplier}
                            <p className="text-xs text-gray-500">
                              {m.supplierContact}
                            </p>
                          </td>

                          <td className="px-4 py-3">${m.price}</td>

                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal("stock-in", m)}
                                className="text-green-600"
                              >
                                <FiTrendingUp />
                              </button>
                              <button
                                onClick={() => openModal("stock-out", m)}
                                className="text-orange-600"
                              >
                                <FiTrendingDown />
                              </button>
                              <button
                                onClick={() => openModal("edit", m)}
                                className="text-teal-600"
                              >
                                <FiEdit2 />
                              </button>
                              <button
                                onClick={() => handleDeleteMedicine(m.id)}
                                className="text-red-600"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* ============================
                STOCK MOVEMENTS TAB
            ============================ */}
            {activeTab === "movements" && (
              <div>
                <h2 className="text-2xl font-bold text-teal-600 mb-4">
                  Stock Movements
                </h2>

                {stockMovements.length === 0 ? (
                  <p className="text-gray-500">No movements yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-teal-600 text-white">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Medicine</th>
                          <th className="px-4 py-3">Type</th>
                          <th className="px-4 py-3">Qty</th>
                          <th className="px-4 py-3">Reference</th>
                        </tr>
                      </thead>

                      <tbody>
                        {stockMovements.map((m, i) => (
                          <tr
                            key={m.id}
                            className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            <td className="px-4 py-3">{m.date}</td>
                            <td className="px-4 py-3">{m.medicineName}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                  m.type === "in"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {m.type === "in" ? "Stock In" : "Stock Out"}
                              </span>
                            </td>
                            <td className="px-4 py-3">{m.quantity}</td>
                            <td className="px-4 py-3">{m.reference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ============================
                ALERTS TAB
            ============================ */}
            {activeTab === "alerts" && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Low Stock */}
                <div>
                  <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                    <FiAlertTriangle className="text-2xl" />
                    Low Stock Items
                  </h3>

                  {getLowStockItems().length === 0 ? (
                    <p className="text-gray-500">No low stock items.</p>
                  ) : (
                    getLowStockItems().map((m) => (
                      <div
                        key={m.id}
                        className="border-2 border-red-200 rounded-lg p-4 mb-3"
                      >
                        <b>{m.name}</b>
                        <p className="text-sm text-gray-600">{m.category}</p>

                        <p className="mt-2 text-gray-600">
                          Stock:{" "}
                          <span className="text-red-600 font-bold">
                            {m.quantity}
                          </span>
                        </p>

                        <button
                          onClick={() => generateReorderRequest(m)}
                          className="mt-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700"
                        >
                          Generate Reorder Request
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Expiry */}
                <div>
                  <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                    <FiClock className="text-2xl" />
                    Expiring Soon
                  </h3>

                  {getExpiringItems().length === 0 ? (
                    <p className="text-gray-500">No expiring items.</p>
                  ) : (
                    getExpiringItems().map((m) => (
                      <div
                        key={m.id}
                        className="border-2 border-orange-200 rounded-lg p-4 mb-3"
                      >
                        <b>{m.name}</b>
                        <p className="text-sm text-gray-600">{m.category}</p>

                        <p className="mt-2 text-gray-600">
                          Expires on:{" "}
                          <span className="text-orange-600 font-bold">
                            {m.expiryDate}
                          </span>
                        </p>

                        <p className="text-gray-500">
                          {getDaysUntilExpiry(m.expiryDate)} days left
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ============================
                SUPPLIERS TAB
            ============================ */}
            {activeTab === "suppliers" && (
              <div>
                <h3 className="text-2xl font-bold text-teal-600 mb-6">
                  Suppliers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...new Set(medicines.map((m) => m.supplier))].map(
                    (supplier) => {
                      const meds = medicines.filter(
                        (m) => m.supplier === supplier
                      );

                      return (
                        <div
                          key={supplier}
                          className="border-2 border-teal-200 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <FiUsers className="text-3xl text-teal-600" />
                            <div>
                              <h4 className="font-bold text-lg">
                                {supplier}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {meds[0].supplierContact}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 font-semibold mb-1">
                            Medicines:
                          </p>
                          {meds.map((m) => (
                            <p key={m.id} className="text-sm">
                              • {m.name}
                            </p>
                          ))}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* ============================
                REORDER REQUESTS TAB
            ============================ */}
            {activeTab === "reorders" && (
              <div>
                <h3 className="text-2xl font-bold text-teal-600 mb-6">
                  Reorder Requests
                </h3>

                {reorderRequests.length === 0 ? (
                  <p className="text-gray-500">No reorder requests.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-teal-600 text-white">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Medicine</th>
                          <th className="px-4 py-3">Current Stock</th>
                          <th className="px-4 py-3">Requested Qty</th>
                          <th className="px-4 py-3">Supplier</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {reorderRequests.map((req, i) => (
                          <tr
                            key={req.id}
                            className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                          >
                            <td className="px-4 py-3">{req.date}</td>
                            <td className="px-4 py-3">{req.medicineName}</td>
                            <td className="px-4 py-3">{req.currentStock}</td>
                            <td className="px-4 py-3">{req.requestedQuantity}</td>
                            <td className="px-4 py-3">
                              {req.supplier}
                              <br />
                              <span className="text-xs text-gray-500">
                                {req.supplierContact}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                                Pending
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================
          MODAL
      ============================ */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <h3 className="text-xl font-bold text-teal-600 mb-4">
              {modalType === "add" && "Add New Medicine"}
              {modalType === "edit" && "Edit Medicine"}
              {modalType === "stock-in" && "Stock In"}
              {modalType === "stock-out" && "Stock Out"}
            </h3>

            {/* ============================
                ADD / EDIT FORM
            ============================ */}
            {(modalType === "add" || modalType === "edit") && (
              <div className="space-y-4">
                {[
                  ["name", "Medicine Name"],
                  ["category", "Category"],
                  ["batchNo", "Batch Number"],
                  ["supplier", "Supplier Name"],
                  ["supplierContact", "Supplier Contact"],
                ].map(([key, label]) => (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={label}
                    className="w-full px-4 py-2 border-2 rounded-lg focus:border-teal-600"
                    value={formData[key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                  />
                ))}

                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:border-teal-600"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />

                <input
                  type="number"
                  name="minStock"
                  placeholder="Minimum Stock"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:border-teal-600"
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({ ...formData, minStock: e.target.value })
                  }
                />

                <input
                  type="date"
                  name="expiryDate"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:border-teal-600"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                />

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:border-teal-600"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMedicine}
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}

            {/* ============================
                STOCK IN / STOCK OUT
            ============================ */}
            {(modalType === "stock-in" || modalType === "stock-out") && (
              <div className="space-y-4">

                <p className="text-gray-700">
                  Medicine: <b>{currentMedicine?.name}</b>
                </p>

                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full px-4 py-2 border-2 rounded-lg focus:border-teal-600"
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleStockMovement(
                        modalType === "stock-in" ? "in" : "out"
                      )
                    }
                    className="px-6 py-2 bg-teal-600 text-white rounded-lg"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
