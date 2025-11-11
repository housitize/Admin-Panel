import React from "react";
import { MdDashboard } from "react-icons/md";
import { FiSearch, FiSun, FiMoon, FiBell, FiChevronDown } from "react-icons/fi";

const Header = ({
  username,
  isSuperAdmin,
  onLogout,
  setIsDarkMode,
  isDarkMode,
  showProfile,
  setShowProfile,
}) => (
  <header
    className={`sticky top-0 z-50 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    } shadow-sm border-b border-gray-200`}
  >
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-800 p-2 rounded-lg">
          <MdDashboard className="text-white text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500">
            {isSuperAdmin ? "Super Admin" : "Admin"}
          </p>
        </div>
      </div>

      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <FiSearch className="text-gray-500 w-4 h-4" />
        <input
          type="text"
          placeholder="Search medicines, users..."
          className="bg-transparent outline-none ml-2 text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon />}
        </button>

        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <FiBell />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <img
              src="https://api.dicebear.com/7.x/identicon/svg?seed=admin"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{username}</span>
              <FiChevronDown className="w-4 h-4" />
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Account
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
);

export default Header;
