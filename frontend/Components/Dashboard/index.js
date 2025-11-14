"use client";

import React, { useState } from "react";

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
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi";

const Dashboard = () => {
  const [salesTimeframe, setSalesTimeframe] = useState("week");
  const [revenueTimeframe, setRevenueTimeframe] = useState("week");

  // Theme Colors
  const teal = "#0d9488"; // teal-600
  const grayText = "#6b7280";

  // ============================
  // 📌 SALES DATASETS
  // ============================
  const salesDatasets = {
    day: [
      { label: "Mon", sales: 4200, orders: 45 },
      { label: "Tue", sales: 3800, orders: 38 },
      { label: "Wed", sales: 5100, orders: 52 },
      { label: "Thu", sales: 4600, orders: 48 },
      { label: "Fri", sales: 6200, orders: 65 },
      { label: "Sat", sales: 7100, orders: 72 },
      { label: "Sun", sales: 5800, orders: 58 },
    ],
    week: [
      { label: "Week 1", sales: 28400, orders: 285 },
      { label: "Week 2", sales: 32100, orders: 320 },
      { label: "Week 3", sales: 29800, orders: 298 },
      { label: "Week 4", sales: 35200, orders: 352 },
    ],
    month: [
      { label: "Jan", sales: 95000, orders: 950 },
      { label: "Feb", sales: 88000, orders: 880 },
      { label: "Mar", sales: 105000, orders: 1050 },
      { label: "Apr", sales: 98000, orders: 980 },
      { label: "May", sales: 112000, orders: 1120 },
      { label: "Jun", sales: 125000, orders: 1250 },
    ],
    year: [
      { label: "2020", sales: 980000, orders: 9800 },
      { label: "2021", sales: 1150000, orders: 11500 },
      { label: "2022", sales: 1320000, orders: 13200 },
      { label: "2023", sales: 1480000, orders: 14800 },
      { label: "2024", sales: 1650000, orders: 16500 },
    ],
  };

  // ============================
  // 📌 REVENUE DATASETS
  // ============================
  const revenueDatasets = {
    day: [
      { label: "Mon", revenue: 8500 },
      { label: "Tue", revenue: 7200 },
      { label: "Wed", revenue: 9800 },
      { label: "Thu", revenue: 8900 },
      { label: "Fri", revenue: 12400 },
      { label: "Sat", revenue: 14200 },
      { label: "Sun", revenue: 11000 },
    ],
    week: [
      { label: "Week 1", revenue: 54800 },
      { label: "Week 2", revenue: 62300 },
      { label: "Week 3", revenue: 58100 },
      { label: "Week 4", revenue: 68500 },
    ],
    month: [
      { label: "Jan", revenue: 185000 },
      { label: "Feb", revenue: 172000 },
      { label: "Mar", revenue: 205000 },
      { label: "Apr", revenue: 192000 },
      { label: "May", revenue: 218000 },
      { label: "Jun", revenue: 245000 },
    ],
    year: [
      { label: "2020", revenue: 1920000 },
      { label: "2021", revenue: 2250000 },
      { label: "2022", revenue: 2580000 },
      { label: "2023", revenue: 2900000 },
      { label: "2024", revenue: 3240000 },
    ],
  };

  // ============================
  // 📌 STATS CARDS
  // ============================
  const stats = [
    {
      label: "Total Medicines",
      value: "1,247",
      icon: HiOutlineCube,
      change: "+12.5%",
    },
    {
      label: "Total Orders",
      value: "960",
      icon: HiOutlineShoppingBag,
      change: "+8.2%",
    },
    {
      label: "Total Customers",
      value: "3,456",
      icon: HiOutlineUsers,
      change: "+15.3%",
    },
    {
      label: "Total Revenue",
      value: "$125.7K",
      icon: HiOutlineCurrencyDollar,
      change: "+23.1%",
    },
  ];

  // Order Stats
  const orderStats = {
    completed: 892,
    pending: 45,
    cancelled: 23,
  };

  // Pie Chart
  const orderDistribution = [
    { name: "Completed", value: orderStats.completed, color: "#0d9488" },
    { name: "Pending", value: orderStats.pending, color: "#f59e0b" },
    { name: "Cancelled", value: orderStats.cancelled, color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* TITLE */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your medical store performance
          </p>
        </div>

        {/* ============================
            STATS CARDS
        ============================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                    <p className="text-sm text-teal-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-lg">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================
            ORDERS OVERVIEW
        ============================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PIE CHART */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6 border-l-4 border-teal-600 pl-3">
              Orders Overview
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {orderDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* STATUS CARDS */}
          <div className="space-y-4">
            {/* Completed */}
            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <HiOutlineCheckCircle className="text-teal-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {orderStats.completed}
                  </p>
                </div>
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <HiOutlineClock className="text-amber-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {orderStats.pending}
                  </p>
                </div>
              </div>
            </div>

            {/* Cancelled */}
            <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <HiOutlineXCircle className="text-red-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cancelled</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {orderStats.cancelled}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================
            SALES ANALYSIS
        ============================ */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 border-l-4 border-teal-600 pl-3">
              Sales Analysis
            </h2>

            <div className="flex gap-2">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSalesTimeframe(period)}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition ${
                    salesTimeframe === period
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={salesDatasets[salesTimeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke={grayText} />
              <YAxis stroke={grayText} />
              <Tooltip />
              <Bar dataKey="sales" fill={teal} radius={[6, 6, 0, 0]} />
              <Bar dataKey="orders" fill="#d1d5db" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ============================
            REVENUE ANALYSIS
        ============================ */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 border-l-4 border-teal-600 pl-3">
              Revenue Analysis
            </h2>

            <div className="flex gap-2">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setRevenueTimeframe(period)}
                  className={`px-4 py-1.5 text-sm rounded-lg border transition ${
                    revenueTimeframe === period
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueDatasets[revenueTimeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke={grayText} />
              <YAxis stroke={grayText} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={teal}
                strokeWidth={3}
                dot={{ fill: teal, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
