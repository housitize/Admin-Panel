"use client";

import React, { useState, useMemo } from "react";
import {
  MdDownload,
  MdRefresh,
  MdAttachMoney,
  MdClose,
  MdFilterList,
} from "react-icons/md";

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [filterStatus, setFilterStatus] = useState("all");
  const [orders, setOrders] = useState({
    user: [
      {
        id: "ORD-2024-001",
        user: "John Doe",
        medicines: ["Aspirin 100mg", "Vitamin D3", "Paracetamol 500mg"],
        totalAmount: 1299,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        date: "2024-11-10 14:30",
      },
      {
        id: "ORD-2024-002",
        user: "Sarah Miller",
        medicines: ["Omeprazole 20mg", "Cetirizine 10mg"],
        totalAmount: 845,
        paymentStatus: "Pending",
        deliveryStatus: "Processing",
        date: "2024-11-12 09:15",
      },
      {
        id: "ORD-2024-003",
        user: "Michael Chen",
        medicines: ["Metformin 500mg", "Atorvastatin 10mg", "Lisinopril 5mg"],
        totalAmount: 2150,
        paymentStatus: "Paid",
        deliveryStatus: "Shipped",
        date: "2024-11-11 16:45",
      },
      {
        id: "ORD-2024-004",
        user: "Emily Watson",
        medicines: ["Losartan 25mg", "Simvastatin 20mg"],
        totalAmount: 1450,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        date: "2024-11-09 10:20",
      },
      {
        id: "ORD-2024-005",
        user: "David Brown",
        medicines: ["Gabapentin 300mg", "Tramadol 50mg"],
        totalAmount: 980,
        paymentStatus: "Failed",
        deliveryStatus: "Cancelled",
        date: "2024-11-08 15:30",
      },
    ],
    company: [
      {
        id: "PO-2024-001",
        user: "PharmaCorp Suppliers",
        medicines: [
          "Amoxicillin 500mg (1000 units)",
          "Insulin Glargine (500 units)",
          "Ibuprofen 400mg (2000 units)",
        ],
        totalAmount: 125000,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        date: "2024-11-08 11:20",
      },
      {
        id: "PO-2024-002",
        user: "MedSupply International",
        medicines: [
          "Azithromycin 250mg (1500 units)",
          "Ciprofloxacin 500mg (1000 units)",
        ],
        totalAmount: 89500,
        paymentStatus: "Pending",
        deliveryStatus: "Shipped",
        date: "2024-11-09 13:00",
      },
      {
        id: "PO-2024-003",
        user: "Global Pharma Distributors",
        medicines: [
          "Levothyroxine 50mcg (2000 units)",
          "Amlodipine 5mg (1500 units)",
          "Losartan 50mg (1000 units)",
        ],
        totalAmount: 156000,
        paymentStatus: "Pending",
        deliveryStatus: "Processing",
        date: "2024-11-13 08:30",
      },
      {
        id: "PO-2024-004",
        user: "HealthSource Wholesale",
        medicines: [
          "Metformin 850mg (2500 units)",
          "Atorvastatin 40mg (1200 units)",
        ],
        totalAmount: 198000,
        paymentStatus: "Paid",
        deliveryStatus: "Delivered",
        date: "2024-11-07 09:45",
      },
      {
        id: "PO-2024-005",
        user: "MediCare Supplies",
        medicines: [
          "Omeprazole 40mg (1000 units)",
          "Pantoprazole 40mg (800 units)",
        ],
        totalAmount: 67500,
        paymentStatus: "Failed",
        deliveryStatus: "Cancelled",
        date: "2024-11-06 14:15",
      },
    ],
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter logic
  const filteredOrders = useMemo(() => {
    const currentOrders = orders[activeTab];
    if (filterStatus === "all") return currentOrders;

    const statusMap = {
      completed: "Delivered",
      pending: ["Processing", "Shipped"],
      cancelled: "Cancelled",
    };

    return currentOrders.filter((order) => {
      if (Array.isArray(statusMap[filterStatus])) {
        return statusMap[filterStatus].includes(order.deliveryStatus);
      }
      return order.deliveryStatus === statusMap[filterStatus];
    });
  }, [orders, activeTab, filterStatus]);

  // Stats
  const stats = useMemo(() => {
    const currentOrders = orders[activeTab];
    return {
      total: currentOrders.length,
      completed: currentOrders.filter((o) => o.deliveryStatus === "Delivered")
        .length,
      pending: currentOrders.filter((o) =>
        ["Processing", "Shipped"].includes(o.deliveryStatus)
      ).length,
      cancelled: currentOrders.filter((o) => o.deliveryStatus === "Cancelled")
        .length,
    };
  }, [orders, activeTab]);

  const getStatusColor = (status, type) => {
    const colors = {
      payment: {
        Paid: "bg-green-100 text-green-800 border-green-200",
        Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
        Failed: "bg-red-100 text-red-800 border-red-200",
      },
      delivery: {
        Processing: "bg-blue-100 text-blue-800 border-blue-200",
        Shipped: "bg-purple-100 text-purple-800 border-purple-200",
        Delivered: "bg-green-100 text-green-800 border-green-200",
        Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
      },
    };
    return colors[type][status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const updatePaymentStatus = (id, status) => {
    setOrders((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((o) =>
        o.id === id ? { ...o, paymentStatus: status } : o
      ),
    }));
  };

  const updateDeliveryStatus = (id, status) => {
    setOrders((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((o) =>
        o.id === id ? { ...o, deliveryStatus: status } : o
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Management
        </h1>
        <p className="text-gray-600 mb-8">
          Track and manage all customer orders
        </p>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-lg p-1 mb-6 inline-flex">
          <button
            onClick={() => {
              setActiveTab("user");
              setFilterStatus("all");
            }}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === "user"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            User Orders
          </button>
          <button
            onClick={() => {
              setActiveTab("company");
              setFilterStatus("all");
            }}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              activeTab === "company"
                ? "bg-teal-600 text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Stock Orders
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-900">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Pending</p>
            <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.cancelled}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <MdFilterList size={20} />
              <span className="font-medium">Filter:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filterStatus === "all"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setFilterStatus("completed")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filterStatus === "completed"
                    ? "bg-teal-600 text-white"
                    : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                }`}
              >
                Completed ({stats.completed})
              </button>
              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filterStatus === "pending"
                    ? "bg-teal-600 text-white"
                    : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilterStatus("cancelled")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filterStatus === "cancelled"
                    ? "bg-teal-600 text-white"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                }`}
              >
                Cancelled ({stats.cancelled})
              </button>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No orders found for this filter
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.user}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {order.date}
                      </span>
                    </div>

                    {/* Medicines */}
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        {activeTab === "user" ? "MEDICINES" : "STOCK ITEMS"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {order.medicines.map((med, idx) => (
                          <span
                            key={idx}
                            className="text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-md"
                          >
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600">
                          PAYMENT:
                        </span>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-md border ${getStatusColor(
                            order.paymentStatus,
                            "payment"
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600">
                          DELIVERY:
                        </span>
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-md border ${getStatusColor(
                            order.deliveryStatus,
                            "delivery"
                          )}`}
                        >
                          {order.deliveryStatus}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <p className="text-2xl font-bold text-gray-900">
                          ₹{order.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 border-t lg:border-t-0 lg:border-l border-gray-200 pt-4 lg:pt-0 lg:pl-6">
                    <button
                      onClick={() => alert("Invoice downloaded")}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm font-medium"
                    >
                      <MdDownload size={16} />
                      Invoice
                    </button>

                    {order.paymentStatus === "Paid" && (
                      <button
                        onClick={() => alert("Refund processed")}
                        className="flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md hover:bg-teal-50 transition-colors text-sm font-medium"
                      >
                        <MdAttachMoney size={16} />
                        Refund
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md hover:bg-teal-50 transition-colors text-sm font-medium"
                    >
                      <MdRefresh size={16} />
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Update Order Status
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose size={24} />
                </button>
              </div>

              {/* Payment */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Payment Status
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Paid", "Pending", "Failed"].map((status) => (
                    <button
                      key={status}
                      onClick={() =>
                        updatePaymentStatus(selectedOrder.id, status)
                      }
                      className={`px-3 py-2 rounded-md border text-sm font-medium transition-all ${
                        selectedOrder.paymentStatus === status
                          ? "bg-teal-600 text-white border-teal-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Delivery Status
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {["Processing", "Shipped", "Delivered", "Cancelled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() =>
                          updateDeliveryStatus(selectedOrder.id, status)
                        }
                        className={`px-3 py-2 rounded-md border text-sm font-medium transition-all ${
                          selectedOrder.deliveryStatus === status
                            ? "bg-teal-600 text-white border-teal-600"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
