// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import Header from "../Navbar";
// import Sidebar from "../Sidebar";
// import Dashboard from "../Dashboard";
// import Medicines from "../Medicines";
// import Placeholder from "../Placeholder";
// import Login from "../Login";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const AdminPanel = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const websiteData = {
//     users: 12340,
//     orders: 2340,
//     revenue: 90500,
//     traffic: 64000,
//   };

//   const medicines = [
//     {
//       id: 1,
//       name: "Paracetamol",
//       company: "Sun Pharma",
//       category: "Pain Relief",
//       type: "tablet",
//       stripSize: "10 tablets",
//       batchNo: "BT2024001",
//       expiryDate: "Dec 2025",
//       price: 45,
//       discount: 10,
//       stock: 150,
//       lowStock: false,
//     },
//     {
//       id: 2,
//       name: "Amoxicillin",
//       company: "Cipla",
//       category: "Antibiotic",
//       type: "capsule",
//       stripSize: "15 capsules",
//       batchNo: "BT2024002",
//       expiryDate: "Jun 2026",
//       price: 120,
//       discount: 5,
//       stock: 45,
//       lowStock: false,
//     },
//   ];

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.post(`${API_URL}/api/user/login`, formData);
//       if (resp?.data?.success) {
//         setIsLoggedIn(true);
//         setCurrentUser(resp.data.user);
//         localStorage.setItem("token", resp.data.token);
//         setError("");
//       }
//     } catch (err) {
//       setError("Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     localStorage.removeItem("token");
//   };

//   if (!isLoggedIn) {
//     return (
//       <Login
//         formData={formData}
//         setFormData={setFormData}
//         loading={loading}
//         error={error}
//         onLogin={handleLogin}
//       />
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen ${
//         isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
//       }`}
//     >
//       <Header
//         firstName={currentUser?.firstName}
//         lastName={currentUser?.lastName}
//         isSuperAdmin={currentUser?.role === "super_admin"}
//         onLogout={handleLogout}
//         setIsDarkMode={setIsDarkMode}
//         isDarkMode={isDarkMode}
//         showProfile={showProfile}
//         setShowProfile={setShowProfile}
//       />

//       <div className="flex">
//         <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//         <main className="flex-1 p-6 overflow-y-auto">
//           {activeTab === "dashboard" && <Dashboard websiteData={websiteData} />}
//           {activeTab === "medicines" && <Medicines medicines={medicines} />}
//           {activeTab !== "dashboard" && activeTab !== "medicines" && (
//             <Placeholder title={activeTab} />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;
