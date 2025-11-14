"use client";

import { useState } from "react";
import {
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineChevronDown,
} from "react-icons/hi";
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

const Dashboard = () => {
  const [salesTimeframe, setSalesTimeframe] = useState("week");
  const [revenueTimeframe, setRevenueTimeframe] = useState("week");

  // Stats Data
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

  // Sales Data
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

  // Revenue Data
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

  // Pie Chart Data
  const orderDistribution = [
    { name: "Completed", value: orderStats.completed, color: "#10b981" },
    { name: "Pending", value: orderStats.pending, color: "#f59e0b" },
    { name: "Cancelled", value: orderStats.cancelled, color: "#ef4444" },
  ];

  // Low Stock Medicines
  const lowStockMedicines = [
    { name: "Paracetamol 500mg", stock: 15, min: 50 },
    { name: "Amoxicillin 250mg", stock: 8, min: 30 },
    { name: "Ibuprofen 400mg", stock: 22, min: 40 },
    { name: "Vitamin D3", stock: 12, min: 35 },
    { name: "Aspirin 75mg", stock: 18, min: 45 },
  ];

  // Expiring Medicines
  const expiringMedicines = [
    { name: "Cough Syrup 100ml", stock: 35, expiry: "2025-01-15", days: 63 },
    { name: "Antibiotic Cream", stock: 28, expiry: "2025-01-28", days: 76 },
    { name: "Pain Relief Gel", stock: 42, expiry: "2025-02-10", days: 89 },
    { name: "Eye Drops", stock: 19, expiry: "2025-01-20", days: 68 },
    { name: "Multivitamin Tablets", stock: 55, expiry: "2025-02-05", days: 84 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, here's your overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-6 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-light text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 mt-2">{stat.change}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Overview */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Orders Overview
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart */}
            <div>
              <p className="text-sm text-gray-500 mb-4">
                Distribution by Status
              </p>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={orderDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Order Stats Cards */}
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <HiOutlineCheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completed</p>
                    <p className="text-xl font-light text-gray-900">
                      {orderStats.completed}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <HiOutlineClock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pending</p>
                    <p className="text-xl font-light text-gray-900">
                      {orderStats.pending}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <HiOutlineXCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Cancelled</p>
                    <p className="text-xl font-light text-gray-900">
                      {orderStats.cancelled}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <HiOutlineExclamationCircle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-medium text-gray-900">Low Stock</h2>
            </div>

            <div className="space-y-3">
              {lowStockMedicines.map((med, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{med.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Min: {med.min}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      {med.stock}
                    </p>
                    <span className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded">
                      Low
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiring Soon */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <HiOutlineClock className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-medium text-gray-900">
                Expiring Soon
              </h2>
            </div>

            <div className="space-y-3">
              {expiringMedicines.map((med, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{med.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{med.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {med.stock}
                    </p>
                    <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                      {med.days}d
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sales Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Sales Analysis
            </h2>
            <div className="flex gap-2">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSalesTimeframe(period)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                    salesTimeframe === period
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={salesDatasets[salesTimeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="label"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="sales" fill="#000000" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" fill="#d1d5db" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Revenue Analysis
            </h2>
            <div className="flex gap-2">
              {["day", "week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setRevenueTimeframe(period)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                    revenueTimeframe === period
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueDatasets[revenueTimeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="label"
                stroke="#9ca3af"
                style={{ fontSize: 12 }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#000000"
                strokeWidth={2}
                dot={{ fill: "#000000", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
