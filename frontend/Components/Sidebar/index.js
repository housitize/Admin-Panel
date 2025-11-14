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
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard /> },
    { id: "medicines", label: "Medicines", icon: <FiPackage /> },
    { id: "categories", label: "Categories", icon: <FiLayers /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "users", label: "Users", icon: <FiUsers /> },
    { id: "inventory", label: "Inventory", icon: <FiBox /> },
    { id: "reports", label: "Reports", icon: <FiPieChart /> },
    { id: "profile", label: "Settings", icon: <FiSettings /> },
  ];

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
    router.push(`/admin/${tabId}`); // ⭐ Redirect to route
  };

  return (
    <aside className="w-64 bg-white h-screen sticky top-0 shadow-sm border-r flex flex-col justify-between">
      <div>
        <div className="p-5 border-b">
          <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            💊 Medicine Ondoor
          </h1>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavigation(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg transition ${
                activeTab === tab.id
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
