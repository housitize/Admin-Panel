"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import {
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlineDownload,
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

  const exportCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(","));

    data.forEach((row) => {
      const values = headers.map((header) => JSON.stringify(row[header]));
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.csv";
    a.click();
  };

  const exportExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
    XLSX.writeFile(workbook, "report.xlsx");
  };

  const exportPDF = (data) => {
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(16);
    doc.text("Reports Export", 20, yPos);
    yPos += 15;

    data.forEach((item) => {
      doc.setFontSize(10);
      doc.text(`${item.name}`, 20, yPos);
      yPos += 6;
      doc.setFontSize(8);
      doc.text(
        `Type: ${item.type} | Status: ${item.status} | Project: ${item.project} | Date: ${item.date}`,
        20,
        yPos
      );
      yPos += 10;
    });

    doc.save("reports.pdf");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "Draft":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "In review":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Sales":
        return <HiOutlineChartBar className="w-4 h-4" />;
      case "Inventory":
        return <HiOutlineTable className="w-4 h-4" />;
      case "Orders":
        return <HiOutlineShoppingCart className="w-4 h-4" />;
      case "Users":
        return <HiOutlineUsers className="w-4 h-4" />;
      default:
        return <HiOutlineDocumentText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and export your reports
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 p-6 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-light text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
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
                <div className="p-3 bg-gray-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Table Card */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <HiOutlineTable className="w-4 h-4" />
                  New Sheet
                </button>

                {/* New Report Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowNewReport(!showNewReport)}
                    className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <HiOutlinePlus className="w-4 h-4" />
                    New Report
                    <HiOutlineChevronDown className="w-4 h-4" />
                  </button>
                  {showNewReport && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      {[
                        "Sales Report",
                        "Inventory Report",
                        "Expiry Report",
                        "Order Report",
                        "User Registration Report",
                      ].map((report) => (
                        <button
                          key={report}
                          className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                          onClick={() => setShowNewReport(false)}
                        >
                          {report}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Export Buttons */}
                <div className="flex gap-2 border-l border-gray-200 pl-2">
                  <button
                    onClick={() => exportCSV(filteredData)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Export CSV"
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => exportExcel(filteredData)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Export Excel"
                  >
                    Excel
                  </button>
                  <button
                    onClick={() => exportPDF(filteredData)}
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    title="Export PDF"
                  >
                    PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-4 w-12">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Type
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Project
                  </th>
                  <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Modified
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg">
                          <HiOutlineDocumentText className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(row.type)}
                        <span className="text-sm text-gray-600">
                          {row.type}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{row.project}</td>
                    <td className="p-4 text-sm text-gray-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500">
              Showing {filteredData.length} of {reports.length} reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
