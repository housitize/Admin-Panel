"use client";

import React, { useState } from "react";
import {
  FiUsers,
  FiShoppingBag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiGlobe,
  FiLock,
  FiEye,
  FiShield,
} from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { MdDashboard, MdWeb } from "react-icons/md";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedWebsite, setSelectedWebsite] = useState("all");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Mock user credentials
  const users = {
    superadmin: {
      username: "superadmin",
      password: "super123",
      role: "super_admin",
      access: ["website1", "website2", "website3"],
    },
    admin1: {
      username: "admin1",
      password: "admin1",
      role: "site_admin",
      access: ["website1"],
    },
    admin2: {
      username: "admin2",
      password: "admin2",
      role: "site_admin",
      access: ["website2"],
    },
    admin3: {
      username: "admin3",
      password: "admin3",
      role: "site_admin",
      access: ["website3"],
    },
  };

  // Mock website data
  const websiteData = {
    website1: {
      name: "Housitize Estate",
      url: "shop.example.com",
      users: 15420,
      orders: 3240,
      revenue: 125000,
      traffic: 45000,
      color: "bg-blue-400",
    },
    website2: {
      name: "Medicine Ondoor",
      url: "blog.example.com",
      users: 8930,
      orders: 0,
      revenue: 23400,
      traffic: 78000,
      color: "bg-slate-400",
    },
    website3: {
      name: "Housitize Cloud",
      url: "app.example.com",
      users: 5670,
      orders: 890,
      revenue: 89000,
      traffic: 34000,
      color: "bg-teal-400",
    },
  };

  const handleLogin = () => {
    const user = users[formData.username];

    if (user && user.password === formData.password) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setError("");
      if (user.role === "site_admin") {
        setSelectedWebsite(user.access[0]);
      }
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFormData({ username: "", password: "" });
    setSelectedWebsite("all");
    setActiveTab("dashboard");
    setError("");
  };

  const getAccessibleWebsites = () => {
    if (currentUser?.role === "super_admin") {
      return Object.keys(websiteData);
    }
    return currentUser?.access || [];
  };

  const getAggregatedStats = () => {
    const websites = getAccessibleWebsites();
    return websites.reduce(
      (acc, key) => {
        const site = websiteData[key];
        return {
          users: acc.users + site.users,
          orders: acc.orders + site.orders,
          revenue: acc.revenue + site.revenue,
          traffic: acc.traffic + site.traffic,
        };
      },
      { users: 0, orders: 0, revenue: 0, traffic: 0 }
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-800 p-3 rounded-xl">
              <FiShield className="text-white text-3xl" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            Admin Panel
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Multi-Website Management
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition text-black"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition text-black"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition"
            >
              Sign In
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Demo Credentials:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Super Admin:</strong> superadmin / super123
              </p>
              <p>
                <strong>Site 1 Admin:</strong> admin1 / admin1
              </p>
              <p>
                <strong>Site 2 Admin:</strong> admin2 / admin2
              </p>
              <p>
                <strong>Site 3 Admin:</strong> admin3 / admin3
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats =
    selectedWebsite === "all"
      ? getAggregatedStats()
      : websiteData[selectedWebsite];
  const isSuperAdmin = currentUser?.role === "super_admin";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-slate-800 p-2 rounded-lg">
              <MdDashboard className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-500">
                {isSuperAdmin ? "Super Administrator" : "Site Administrator"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
              <FiShield className="text-slate-700" />
              <span className="text-sm font-medium text-gray-700">
                {currentUser.username}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen sticky top-0 shadow-sm border-r border-gray-200">
          <nav className="p-4 space-y-2">
            {["dashboard", "websites", "users", "analytics", "settings"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === tab
                      ? "bg-slate-100 text-slate-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab === "dashboard" && <MdDashboard className="text-xl" />}
                  {tab === "websites" && <MdWeb className="text-xl" />}
                  {tab === "users" && <FiUsers className="text-xl" />}
                  {tab === "analytics" && <FiBarChart2 className="text-xl" />}
                  {tab === "settings" && <FiSettings className="text-xl" />}
                  <span className="font-medium capitalize">{tab}</span>
                </button>
              )
            )}
          </nav>

          {/* Access Info */}
          <div className="p-4 mt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FiLock className="text-slate-700" />
                <span className="text-sm font-semibold text-gray-800">
                  Access Level
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {isSuperAdmin
                  ? "Full access to all websites"
                  : `Access to ${currentUser.access.length} website(s)`}
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          {isSuperAdmin && (
            <div className="mb-6 bg-white p-4 rounded-xl shadow-sm">
              <label className="block text-sm font-medium text-gray-600 mb-3">
                Select Website
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedWebsite("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedWebsite === "all"
                      ? "bg-slate-800 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Websites
                </button>
                {Object.entries(websiteData).map(([key, site]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWebsite(key)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedWebsite === key
                        ? `${site.color} text-white`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {site.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {selectedWebsite === "all"
                  ? "All Websites Overview"
                  : websiteData[selectedWebsite]?.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                  icon={<FiUsers />}
                  title="Users"
                  value={stats.users}
                />
                <StatCard
                  icon={<FiShoppingBag />}
                  title="Orders"
                  value={stats.orders}
                />
                <StatCard
                  icon={<HiOutlineChartBar />}
                  title="Revenue"
                  value={`$${stats.revenue}`}
                />
                <StatCard
                  icon={<FiEye />}
                  title="Page Views"
                  value={stats.traffic}
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Managed Websites
                </h3>
                <div className="space-y-4">
                  {getAccessibleWebsites().map((key) => {
                    const site = websiteData[key];
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`${site.color} p-3 rounded-lg`}>
                            <FiGlobe className="text-white text-xl" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {site.name}
                            </h4>
                            <p className="text-sm text-gray-500">{site.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div>
                            <p className="text-gray-500">Users</p>
                            <p className="font-semibold text-gray-800">
                              {site.users.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Revenue</p>
                            <p className="font-semibold text-gray-800">
                              ${site.revenue.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-gray-500">
                This section is under development.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-4 text-slate-700 text-2xl">
      {icon}
    </div>
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-3xl font-semibold text-gray-800">
      {value.toLocaleString()}
    </p>
  </div>
);

export default AdminPanel;
