"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineCog,
} from "react-icons/hi";

const Header = ({
  firstName,
  lastName,
  isSuperAdmin,
  onLogout,
  setIsDarkMode,
  isDarkMode,
  showProfile,
  setShowProfile,
}) => {
  const router = useRouter();
  const [showAllDropdown, setShowAllDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          {/* LOGO */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <span className="text-lg font-medium text-gray-900">Upstream</span>
          </div>

          {/* DROPDOWN: All */}
          <div className="relative">
            <button
              onClick={() => setShowAllDropdown(!showAllDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
            >
              <span className="text-sm text-gray-700 font-medium">All</span>
              <HiOutlineChevronDown className="text-gray-500 w-4 h-4" />
            </button>

            {showAllDropdown && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50">
                {[
                  "Dashboard",
                  "Medicines",
                  "Categories",
                  "Orders",
                  "Reports",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SEARCH BAR */}
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg min-w-[320px] text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* NOTIFICATION ICON */}
          <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <HiOutlineBell className="text-gray-600 w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* DIVIDER */}
          <div className="h-6 w-px bg-gray-200"></div>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {firstName?.[0]}
                  {lastName?.[0]}
                </span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {firstName} {lastName}
                </p>
                <p className="text-xs text-gray-500">Organization admin</p>
              </div>
              <HiOutlineChevronDown
                className={`text-gray-500 w-4 h-4 transition-transform ${
                  showProfile ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-56 z-50 overflow-hidden">
                {/* Top User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {firstName} {lastName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Organization admin
                  </p>
                </div>

                {/* Menu */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      router.push("/admin/profile");
                    }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <HiOutlineUser className="w-4 h-4 text-gray-500" />
                    Profile Settings
                  </button>

                  <button
                    onClick={() => setShowProfile(false)}
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <HiOutlineCog className="w-4 h-4 text-gray-500" />
                    Account Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 py-2">
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
