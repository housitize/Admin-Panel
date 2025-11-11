"use client";

import React, { useState } from "react";
import axios from "axios";
import Header from "../Navbar";
import Sidebar from "../Sidebar";
import Dashboard from "../Dashboard";
import Medicines from "../Medicines";
import Placeholder from "../Placeholder";
import InputField from "../InputField";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
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
      category: "Pain Relief",
      price: 25,
      stock: 80,
    },
    { id: 2, name: "Cetirizine", category: "Allergy", price: 15, stock: 120 },
    {
      id: 3,
      name: "Amoxicillin",
      category: "Antibiotic",
      price: 75,
      stock: 20,
    },
  ];

  const handleLogin = async () => {
    console.log("formData", formData);
    try{
      const resp = await axios.post(`${API_URL}/api/user/login`, formData  , value = "login");
      console.log("resp", resp);
      if(resp?.data?.success){
        setIsLoggedIn(true);
        setCurrentUser(resp?.data?.user);
        setActiveTab("dashboard");
        setError("");
        localStorage.setItem("token", resp?.data?.token);
        alert("Login successful");
      }
    }catch(err){
      console.log(err);
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setFormData({ password: "" , email:"" , role:"" });
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

          <div className="space-y-3">
            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-4 py-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition text-black"
              >
                <option value="super_admin" className="cursor-pointer">Super Admin</option>
                <option value="admin" className="cursor-pointer">Admin</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full cursor-pointer bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition"
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
                <strong>Super Admin:</strong> Super / Admin / superadmin@gmail.com / superadmin@123
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
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
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
