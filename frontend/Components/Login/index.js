"use client";

import React from "react";
import InputField from "../InputField";

const Login = ({ formData, setFormData, loading, error, onLogin }) => {
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
            onEnter={onLogin}
          />

          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onEnter={onLogin}
          />

          {/* Role Dropdown */}
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
              <option value="">Select Role</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={onLogin}
            disabled={loading}
            className="w-full cursor-pointer bg-slate-800 text-white py-3 rounded-lg font-medium hover:bg-slate-700 transition"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="ml-2">Loading...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Demo Credentials:
          </p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <strong>Super Admin:</strong> Super / Admin / superadmin@gmail.com
              / superadmin@123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
