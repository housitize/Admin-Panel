"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FiDownloadCloud,
  FiTrendingUp,
  FiBarChart2,
  FiAlertCircle,
} from "react-icons/fi";

const Reports = () => {
  // --- Sample data (you can replace this with real API data) ---
  const salesData = [
    { month: "Jan", sales: 42000, orders: 220 },
    { month: "Feb", sales: 48000, orders: 260 },
    { month: "Mar", sales: 53000, orders: 310 },
    { month: "Apr", sales: 50500, orders: 295 },
    { month: "May", sales: 57000, orders: 340 },
    { month: "Jun", sales: 61000, orders: 375 },
  ];

  const stockAlerts = [
    { id: 1, name: "Cetirizine", stock: 8, status: "Critical" },
    { id: 2, name: "Azithromycin", stock: 12, status: "Low" },
    { id: 3, name: "Amoxicillin", stock: 25, status: "Medium" },
  ];

  const topMedicines = [
    { name: "Paracetamol", sales: 4300 },
    { name: "Amoxicillin", sales: 3100 },
    { name: "Omeprazole", sales: 2500 },
    { name: "Azithromycin", sales: 2100 },
    { name: "Cetirizine", sales: 1600 },
  ];

  const exportReport = () => {
    alert("📦 Report exported successfully!");
  };
  
  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-800 flex items-center gap-2">
          <FiBarChart2 className="text-slate-700 dark:text-black" /> Reports
          & Analytics
        </h1>
        <button
          onClick={exportReport}
          className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          <FiDownloadCloud /> Export Report
        </button>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Sales
            </h3>
            <FiTrendingUp className="text-green-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            ₹ 3.12 Lakh
          </p>
          <span className="text-sm text-green-600 dark:text-green-400">
            +8.2% vs last month
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Total Orders
            </h3>
            <FiBarChart2 className="text-blue-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            1,845
          </p>
          <span className="text-sm text-blue-600 dark:text-blue-400">
            +5.5% vs last month
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Customers
            </h3>
            <FiTrendingUp className="text-purple-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            9,230
          </p>
          <span className="text-sm text-purple-600 dark:text-purple-400">
            +12% growth
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">
              Low Stock Alerts
            </h3>
            <FiAlertCircle className="text-red-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white">
            {stockAlerts.length}
          </p>
          <span className="text-sm text-red-600 dark:text-red-400">
            Action Required
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Sales Chart --- */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Monthly Sales Overview
          </h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* --- Top Medicines --- */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex-1">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Top Selling Medicines
          </h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topMedicines}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Stock Alerts --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Low Stock Alerts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="py-3 px-4 font-medium">Medicine</th>
                <th className="py-3 px-4 font-medium">Stock</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {stockAlerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="border-b dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4">{alert.name}</td>
                  <td className="py-3 px-4">{alert.stock}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      alert.status === "Critical"
                        ? "text-red-600"
                        : alert.status === "Low"
                        ? "text-orange-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {alert.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
