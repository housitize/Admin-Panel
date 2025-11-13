"use client";
import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

const EmployeePanel = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [attendanceFilter, setAttendanceFilter] = useState("All");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Ravi Sharma",
      email: "ravi@mod.com",
      phone: "9876543210",
      role: "Pharmacist",
      attendance: "Working",
      salary: 15000,
    },
    {
      id: 2,
      name: "Neha Verma",
      email: "neha@mod.com",
      phone: "9123456789",
      role: "Delivery Staff",
      attendance: "Leave",
      salary: 12000,
    },
  ]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.phone.includes(search);
    const matchesRole = roleFilter === "All" || emp.role === roleFilter;
    const matchesAttendance =
      attendanceFilter === "All" || emp.attendance === attendanceFilter;
    return matchesSearch && matchesRole && matchesAttendance;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Employee Management
        </h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <FiPlus /> Add Employee
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option className=" text-black">All</option>
          <option className=" text-black">Pharmacist</option>
          <option className=" text-black">Delivery Staff</option>
          <option className=" text-black">HR</option>
          <option className=" text-black">Manager</option>
        </select>

        <select
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option className=" text-black">All</option>
          <option className=" text-black">Working</option>
          <option className=" text-black">Leave</option>
          <option className=" text-black">Half Day</option>
        </select>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Attendance</th>
              <th className="px-4 py-3">Salary</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40"
              >
                <td className="px-4 py-3">{emp.id}</td>
                <td className="px-4 py-3">{emp.name}</td>
                <td className="px-4 py-3">{emp.email}</td>
                <td className="px-4 py-3">{emp.phone}</td>
                <td className="px-4 py-3">{emp.role}</td>
                <td className="px-4 py-3">
                  <select
                    value={emp.attendance}
                    onChange={(e) =>
                      setEmployees((prev) =>
                        prev.map((p) =>
                          p.id === emp.id
                            ? { ...p, attendance: e.target.value }
                            : p
                        )
                      )
                    }
                    className="border rounded-md px-2 py-1"
                  >
                    <option>Working</option>
                    <option>Leave</option>
                    <option>Half Day</option>
                  </select>
                </td>
                <td className="px-4 py-3">₹{emp.salary}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button className="p-2 bg-yellow-400 rounded-md hover:bg-yellow-500 text-white">
                    <FiEdit />
                  </button>
                  <button className="p-2 bg-red-500 rounded-md hover:bg-red-600 text-white">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePanel;
