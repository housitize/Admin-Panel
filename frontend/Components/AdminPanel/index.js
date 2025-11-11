"use client";

import React, { useState } from "react";
import Header from "../Navbar";
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";
import Medicines from "../Medicines";
import Placeholder from "../Placeholder";
import InputField from "../InputField";

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const users = {
    superadmin: {
      username: "superadmin",
      password: "super123",
      role: "super_admin",
    },
    admin: { username: "admin", password: "admin123", role: "admin" },
  };

  const websiteData = {
    users: 12340,
    orders: 2340,
    revenue: 90500,
    traffic: 64000,
  };

  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      company: "Sun Pharma",
      category: "Pain Relief",
      type: "tablet",
      stripSize: "10 tablets",
      batchNo: "BT2024001",
      expiryDate: "Dec 2025",
      price: 45,
      discount: 10,
      stock: 150,
      lowStock: false
    },
    {
      id: 2,
      name: "Amoxicillin",
      company: "Cipla",
      category: "Antibiotic",
      type: "capsule",
      stripSize: "15 capsules",
      batchNo: "BT2024002",
      expiryDate: "Jun 2026",
      price: 120,
      discount: 5,
      stock: 45,
      lowStock: false
    },
    {
      id: 3,
      name: "Cetirizine",
      company: "Dr. Reddy's",
      category: "Allergy",
      type: "tablet",
      stripSize: "10 tablets",
      batchNo: "BT2024003",
      expiryDate: "Mar 2025",
      price: 35,
      discount: 15,
      stock: 12,
      lowStock: true
    },
    {
      id: 4,
      name: "Omeprazole",
      company: "Lupin",
      category: "Gastric",
      type: "capsule",
      stripSize: "14 capsules",
      batchNo: "BT2024004",
      expiryDate: "Sep 2026",
      price: 85,
      discount: 8,
      stock: 89,
      lowStock: false
    },
    {
      id: 5,
      name: "Azithromycin",
      company: "Zydus",
      category: "Antibiotic",
      type: "tablet",
      stripSize: "6 tablets",
      batchNo: "BT2024005",
      expiryDate: "Nov 2025",
      price: 150,
      discount: 12,
      stock: 8,
      lowStock: true
    }
  ];

  const handleLogin = () => {
    const user = users[formData.username];
    if (user && user.password === formData.password) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setError("");
    } else setError("Invalid credentials");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFormData({ username: "", password: "" });
    setActiveTab("dashboard");
    setError("");
  };

  const isSuperAdmin = currentUser?.role === "super_admin";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-slate-800 p-3 rounded-xl text-white text-2xl">
              💊
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
            Medicine Admin Panel
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Secure login to manage your pharmacy data
          </p>

          <div className="space-y-6">
            <InputField
              label="Username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              onEnter={handleLogin}
            />
            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onEnter={handleLogin}
            />
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
                <strong>Admin:</strong> admin / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Header
        username={currentUser.username}
        isSuperAdmin={isSuperAdmin}
        onLogout={handleLogout}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard websiteData={websiteData} />}
          {activeTab === "medicines" && <Medicines medicines={medicines} />}
          {activeTab !== "dashboard" && activeTab !== "medicines" && (
            <Placeholder
              title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
