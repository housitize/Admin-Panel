"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiSave,
  FiCamera,
  FiShield,
} from "react-icons/fi";

const ProfileSettings = () => {
  const [mounted, setMounted] = useState(false); // Prevent hydration error

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      setFormData({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email || "",
        role: user.role || "",
        phone: user.phone || "",
        password: "",
        confirmPassword: "",
      });
    }

    setMounted(true);
  }, []);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
  };

  if (!mounted) return null; // Fix hydration issue

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-500">
          Manage your personal information and account preferences
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <div className="relative">
            <Image
              src="/icon"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-100 shadow-sm"
              width={128}
              height={128}
            />
            <button className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
              <FiCamera size={16} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              {formData.name}
            </h2>
            <p className="text-gray-500">{formData.role}</p>
            <button className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Change Profile Photo
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <Section title="Personal Information" icon={<FiUser />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                label="Email Address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <Input
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <Input
                label="Role"
                value={formData.role}
                disabled
                className="bg-gray-50"
              />
            </div>
          </Section>

          {/* Security */}
          <Section title="Security Settings" icon={<FiShield />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="New Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
            </div>
          </Section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiSave /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, icon, children }) => (
  <div className="border-b border-gray-100 pb-8">
    <div className="flex items-center gap-2 mb-5">
      <div className="text-blue-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const Input = ({ label, type = "text", value, onChange, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
        disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
      }`}
    />
  </div>
);

export default ProfileSettings;
