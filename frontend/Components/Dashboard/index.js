'use client';
import React, { useState } from "react";
import { FiUsers, FiShoppingBag, FiPackage, FiDollarSign, FiAlertTriangle, FiAlertCircle, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// StatCard Component
const StatCard = ({ icon, title, value, color = "blue", subtitle }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`text-${color}-600 text-4xl opacity-80`}>{icon}</div>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [salesTimeframe, setSalesTimeframe] = useState("week");
  const [revenueTimeframe, setRevenueTimeframe] = useState("week");
  
  // Sample Data
  const dashboardStats = {
    totalMedicines: 1247,
    totalOrders: {
      pending: 45,
      completed: 892,
      cancelled: 23,
      total: 960
    },
    totalUsers: 3456,
    revenue: 125680
  };

  // Daily Sales Data
  const dailySalesData = [
    { day: "Mon", sales: 4200, orders: 45 },
    { day: "Tue", sales: 3800, orders: 38 },
    { day: "Wed", sales: 5100, orders: 52 },
    { day: "Thu", sales: 4600, orders: 48 },
    { day: "Fri", sales: 6200, orders: 65 },
    { day: "Sat", sales: 7100, orders: 72 },
    { day: "Sun", sales: 5800, orders: 58 }
  ];

  // Weekly Sales Data
  const weeklySalesData = [
    { week: "Week 1", sales: 28400, orders: 285 },
    { week: "Week 2", sales: 32100, orders: 320 },
    { week: "Week 3", sales: 29800, orders: 298 },
    { week: "Week 4", sales: 35200, orders: 352 }
  ];

  // Monthly Sales Data
  const monthlySalesData = [
    { month: "Jan", sales: 95000, orders: 950 },
    { month: "Feb", sales: 88000, orders: 880 },
    { month: "Mar", sales: 105000, orders: 1050 },
    { month: "Apr", sales: 98000, orders: 980 },
    { month: "May", sales: 112000, orders: 1120 },
    { month: "Jun", sales: 125000, orders: 1250 }
  ];

  // Yearly Sales Data
  const yearlySalesData = [
    { year: "2020", sales: 980000, orders: 9800 },
    { year: "2021", sales: 1150000, orders: 11500 },
    { year: "2022", sales: 1320000, orders: 13200 },
    { year: "2023", sales: 1480000, orders: 14800 },
    { year: "2024", sales: 1650000, orders: 16500 }
  ];

  // Daily Revenue Data
  const dailyRevenueData = [
    { day: "Mon", revenue: 8500 },
    { day: "Tue", revenue: 7200 },
    { day: "Wed", revenue: 9800 },
    { day: "Thu", revenue: 8900 },
    { day: "Fri", revenue: 12400 },
    { day: "Sat", revenue: 14200 },
    { day: "Sun", revenue: 11000 }
  ];

  // Weekly Revenue Data
  const weeklyRevenueData = [
    { week: "Week 1", revenue: 54800 },
    { week: "Week 2", revenue: 62300 },
    { week: "Week 3", revenue: 58100 },
    { week: "Week 4", revenue: 68500 }
  ];

  // Monthly Revenue Data
  const monthlyRevenueData = [
    { month: "Jan", revenue: 185000 },
    { month: "Feb", revenue: 172000 },
    { month: "Mar", revenue: 205000 },
    { month: "Apr", revenue: 192000 },
    { month: "May", revenue: 218000 },
    { month: "Jun", revenue: 245000 }
  ];

  // Yearly Revenue Data
  const yearlyRevenueData = [
    { year: "2020", revenue: 1920000 },
    { year: "2021", revenue: 2250000 },
    { year: "2022", revenue: 2580000 },
    { year: "2023", revenue: 2900000 },
    { year: "2024", revenue: 3240000 }
  ];

  // Low Stock Medicines
  const lowStockMedicines = [
    { name: "Paracetamol 500mg", stock: 15, minStock: 50 },
    { name: "Amoxicillin 250mg", stock: 8, minStock: 30 },
    { name: "Ibuprofen 400mg", stock: 22, minStock: 40 },
    { name: "Vitamin D3", stock: 12, minStock: 35 },
    { name: "Aspirin 75mg", stock: 18, minStock: 45 }
  ];

  // Expiring Soon Medicines
  const expiringMedicines = [
    { name: "Cough Syrup 100ml", stock: 35, expiry: "2025-01-15", daysLeft: 63 },
    { name: "Antibiotic Cream", stock: 28, expiry: "2025-01-28", daysLeft: 76 },
    { name: "Pain Relief Gel", stock: 42, expiry: "2025-02-10", daysLeft: 89 },
    { name: "Eye Drops", stock: 19, expiry: "2025-01-20", daysLeft: 68 },
    { name: "Multivitamin Tablets", stock: 55, expiry: "2025-02-05", daysLeft: 84 }
  ];

  // Order Status Data for Pie Chart
  const orderStatusData = [
    { name: "Completed", value: dashboardStats.totalOrders.completed, color: "#10b981" },
    { name: "Pending", value: dashboardStats.totalOrders.pending, color: "#f59e0b" },
    { name: "Cancelled", value: dashboardStats.totalOrders.cancelled, color: "#ef4444" }
  ];

  // Get sales data based on selected timeframe
  const getSalesChartData = () => {
    switch(salesTimeframe) {
      case "day": return dailySalesData;
      case "week": return weeklySalesData;
      case "month": return monthlySalesData;
      case "year": return yearlySalesData;
      default: return weeklySalesData;
    }
  };

  const getSalesXAxisKey = () => {
    switch(salesTimeframe) {
      case "day": return "day";
      case "week": return "week";
      case "month": return "month";
      case "year": return "year";
      default: return "week";
    }
  };

  // Get revenue data based on selected timeframe
  const getRevenueChartData = () => {
    switch(revenueTimeframe) {
      case "day": return dailyRevenueData;
      case "week": return weeklyRevenueData;
      case "month": return monthlyRevenueData;
      case "year": return yearlyRevenueData;
      default: return weeklyRevenueData;
    }
  };

  const getRevenueXAxisKey = () => {
    switch(revenueTimeframe) {
      case "day": return "day";
      case "week": return "week";
      case "month": return "month";
      case "year": return "year";
      default: return "week";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Medicine Management Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={<FiPackage />} 
          title="Total Medicines" 
          value={dashboardStats.totalMedicines}
          color="purple"
        />
        <StatCard 
          icon={<FiShoppingBag />} 
          title="Total Orders" 
          value={dashboardStats.totalOrders.total}
          color="blue"
          subtitle={`${dashboardStats.totalOrders.pending} Pending`}
        />
        <StatCard 
          icon={<FiUsers />} 
          title="Total Customers" 
          value={dashboardStats.totalUsers}
          color="green"
        />
        <StatCard 
          icon={<FiDollarSign />} 
          title="Total Revenue" 
          value={`$${dashboardStats.revenue.toLocaleString()}`}
          color="indigo"
        />
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          <FiShoppingBag className="mr-2 text-blue-600" />
          Orders Overview
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Status Pie Chart */}
          <div>
            <h4 className="text-md font-medium text-gray-600 mb-4">Order Status Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Order Stats */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FiCheckCircle className="text-green-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Completed Orders</p>
                  <p className="text-2xl font-bold text-green-600">{dashboardStats.totalOrders.completed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FiClock className="text-yellow-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-yellow-600">{dashboardStats.totalOrders.pending}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FiXCircle className="text-red-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Cancelled Orders</p>
                  <p className="text-2xl font-bold text-red-600">{dashboardStats.totalOrders.cancelled}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FiAlertTriangle className="mr-2 text-red-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Low Stock Medicines</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-sm font-semibold text-gray-600">Medicine</th>
                  <th className="text-center py-2 px-3 text-sm font-semibold text-gray-600">Stock</th>
                  <th className="text-center py-2 px-3 text-sm font-semibold text-gray-600">Min</th>
                  <th className="text-center py-2 px-3 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {lowStockMedicines.map((medicine, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 text-sm text-gray-700">{medicine.name}</td>
                    <td className="py-3 px-3 text-sm text-center font-semibold text-red-600">{medicine.stock}</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-600">{medicine.minStock}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                        Low
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expiring Soon Alert */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <FiAlertCircle className="mr-2 text-orange-500 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Expiring Soon</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-sm font-semibold text-gray-600">Medicine</th>
                  <th className="text-center py-2 px-3 text-sm font-semibold text-gray-600">Stock</th>
                  <th className="text-center py-2 px-3 text-sm font-semibold text-gray-600">Expiry</th>
                  <th className="text-center py-2 px-3 text-sm font-semibold text-gray-600">Days Left</th>
                </tr>
              </thead>
              <tbody>
                {expiringMedicines.map((medicine, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 text-sm text-gray-700">{medicine.name}</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-600">{medicine.stock}</td>
                    <td className="py-3 px-3 text-sm text-center text-gray-600">{medicine.expiry}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        medicine.daysLeft < 70 ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {medicine.daysLeft}d
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sales Analysis Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Sales Analysis</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSalesTimeframe("day")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                salesTimeframe === "day" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setSalesTimeframe("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                salesTimeframe === "week" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSalesTimeframe("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                salesTimeframe === "month" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSalesTimeframe("year")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                salesTimeframe === "year" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={getSalesChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={getSalesXAxisKey()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" name="Sales ($)" />
            <Bar dataKey="orders" fill="#10b981" name="Orders Count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Analysis Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Revenue Analysis</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setRevenueTimeframe("day")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                revenueTimeframe === "day" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setRevenueTimeframe("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                revenueTimeframe === "week" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setRevenueTimeframe("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                revenueTimeframe === "month" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setRevenueTimeframe("year")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                revenueTimeframe === "year" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={getRevenueChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={getRevenueXAxisKey()} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Revenue ($)"
              dot={{ fill: '#8b5cf6', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;