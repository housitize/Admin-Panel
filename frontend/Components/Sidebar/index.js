"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import {
  FiPackage,
  FiLayers,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiPieChart,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const router = useRouter();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { id: "medicines", label: "Medicines", icon: <FiPackage size={22} /> },
    { id: "categories", label: "Categories", icon: <FiLayers size={22} /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag size={22} /> },
    { id: "users", label: "Users", icon: <FiUsers size={22} /> },
    { id: "inventory", label: "Inventory", icon: <FiBox size={22} /> },
    { id: "reports", label: "Reports", icon: <FiPieChart size={22} /> },
    { id: "profile", label: "Settings", icon: <FiSettings size={22} /> },
  ];

  const handleNavigation = (id) => {
    setActiveTab(id);
    router.push(`/admin/${id}`);
  };

  return (
    <aside className="w-16 bg-teal-600 h-screen fixed top-0 flex flex-col justify-between py-4 shadow-xl">
      {/* Menu */}
      <div className="flex flex-col items-center gap-2  mt-20">
        {menuItems.map((item) => (
          <div key={item.id} className="relative group">
            <button
              onClick={() => handleNavigation(item.id)}
              className={`p-3 rounded-xl flex items-center justify-center transition-all
                ${
                  activeTab === item.id
                    ? "bg-white text-teal-600 shadow-md"
                    : "text-white hover:bg-teal-500"
                }
              `}
            >
              {item.icon}
            </button>

            {/* Tooltip */}
            <div
              className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
              bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-md transition
              whitespace-nowrap z-50"
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="relative group flex justify-center mb-6">
        <button
          onClick={handleLogout}
          className="p-3 rounded-xl text-white hover:bg-red-500 transition-all"
        >
          <FiLogOut size={22} />
        </button>

        {/* Tooltip */}
        <div
          className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
          bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-md transition
          whitespace-nowrap"
        >
          Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
