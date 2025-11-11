"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiSave,
  FiCamera,
  FiShield,
} from "react-icons/fi";

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: "Ishit Verma",
    email: "ishit.verma@example.com",
    role: "Super Admin",
    phone: "+91 98765 43210",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-6 py-10`}
    >
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
            <p className="text-sm text-gray-500 mt-2">
              Use 8 or more characters with a mix of letters, numbers & symbols.
            </p>
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

// select resuable component
// const Select = ({ label, value, onChange, options }) => (
//   <div className="text-black">
//     <label className="block text-sm font-medium text-gray-600 mb-1">
//       {label}
//     </label>
//     <select
//       value={value}
//       onChange={onChange}
//       className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
//     >
//       {options.map((opt) => (
//         <option key={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );

// toggle resusable component
// const Toggle = ({ label, checked, onChange, icon }) => (
//   <div className="flex items-center justify-between p-4 border rounded-xl w-full sm:w-1/2 hover:shadow-md transition bg-gray-50">
//     <div className="flex items-center gap-3">
//       <div className="text-blue-600">{icon}</div>
//       <span className="font-medium text-gray-700 text-sm">{label}</span>
//     </div>
//     <button
//       onClick={onChange}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
//         checked ? "bg-blue-600" : "bg-gray-300"
//       }`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
//           checked ? "translate-x-6" : "translate-x-1"
//         }`}
//       />
//     </button>
//   </div>
// );

export default ProfileSettings;
