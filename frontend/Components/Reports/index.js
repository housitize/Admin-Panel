"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import {
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlinePlus,
  HiOutlineChevronDown,
  HiOutlineTable,
  HiOutlineChartBar,
  HiOutlineShoppingCart,
  HiOutlineExclamationCircle,
  HiOutlineUsers,
} from "react-icons/hi";

const initialReports = [
  {
    id: 1,
    name: "Daily Sales Report - 06 July",
    type: "Sales",
    status: "Approved",
    project: "Retail Store A",
    date: "06.07.2024",
  },
  {
    id: 2,
    name: "Monthly Inventory Report - July",
    type: "Inventory",
    status: "Draft",
    project: "Main Warehouse",
    date: "06.07.2024",
  },
  {
    id: 3,
    name: "Expiry Report",
    type: "Expiry",
    status: "In review",
    project: "Warehouse 3",
    date: "06.07.2024",
  },
  {
    id: 4,
    name: "User Registrations",
    type: "Users",
    status: "Approved",
    project: "Online System",
    date: "06.07.2024",
  },
  {
    id: 5,
    name: "Order Summary Report",
    type: "Orders",
    status: "Approved",
    project: "Retail Store A",
    date: "06.07.2024",
  },
];

const statsData = [
  {
    label: "Total Sales",
    value: "₹3.12L",
    change: "+8.2%",
    icon: HiOutlineChartBar,
  },
  {
    label: "Total Orders",
    value: "1,845",
    change: "+5.5%",
    icon: HiOutlineShoppingCart,
  },
  { label: "Customers", value: "9,230", change: "+12%", icon: HiOutlineUsers },
  {
    label: "Low Stock",
    value: "3",
    change: "Critical",
    icon: HiOutlineExclamationCircle,
  },
];

export default function ReportsDashboard() {
  const [reports, setReports] = useState(initialReports);
  const [search, setSearch] = useState("");
  const [showNewReport, setShowNewReport] = useState(false);

  const filteredData = reports.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-teal-100 text-teal-700";
      case "Draft":
        return "bg-amber-100 text-amber-700";
      case "In review":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type) => {
    const className = "w-4 h-4 text-teal-600";
    switch (type) {
      case "Sales":
        return <HiOutlineChartBar className={className} />;
      case "Inventory":
        return <HiOutlineTable className={className} />;
      case "Orders":
        return <HiOutlineShoppingCart className={className} />;
      case "Users":
        return <HiOutlineUsers className={className} />;
      default:
        return <HiOutlineDocumentText className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-light text-teal-700">Reports</h1>
          <p className="text-sm text-gray-500">
            Manage and export your reports
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 p-6 rounded-lg"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-light text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      stat.change.includes("+")
                        ? "text-green-600"
                        : stat.change === "Critical"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>

                <div className="p-3 bg-teal-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-teal-700" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Card */}
        <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="relative max-w-md w-full">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm">
                  <HiOutlineTable className="w-4 h-4 text-teal-600" />
                  New Sheet
                </button>

                {/* Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowNewReport((v) => !v)}
                    className="px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm flex items-center gap-2"
                  >
                    <HiOutlinePlus className="w-4 h-4" /> New Report
                    <HiOutlineChevronDown className="w-4 h-4" />
                  </button>

                  {showNewReport && (
                    <div className="absolute right-0 bg-white border border-gray-300 rounded-lg mt-2 w-56 shadow">
                      {[
                        "Sales Report",
                        "Inventory Report",
                        "Expiry Report",
                        "Order Report",
                        "User Registration Report",
                      ].map((item) => (
                        <button
                          key={item}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowNewReport(false)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Export Buttons */}
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-teal-700 hover:bg-teal-50 text-sm">
                  CSV
                </button>
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-teal-700 hover:bg-teal-50 text-sm">
                  Excel
                </button>
                <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-teal-700 hover:bg-teal-50 text-sm">
                  PDF
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="p-4 w-12">
                    <input
                      type="checkbox"
                      className="rounded border border-gray-300"
                    />
                  </th>
                  {["Name", "Type", "Status", "Project", "Modified"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left p-4 text-xs font-medium text-gray-600 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border border-gray-300"
                      />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-50 rounded-lg">
                          <HiOutlineDocumentText className="w-4 h-4 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2 text-teal-700">
                        {getTypeIcon(row.type)}
                        <span className="text-sm">{row.type}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-gray-700">{row.project}</td>
                    <td className="p-4 text-sm text-gray-600">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-300 bg-gray-50">
            <p className="text-xs text-gray-500">
              Showing {filteredData.length} of {reports.length} reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
