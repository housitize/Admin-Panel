"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

export default function AdminLayout({ children }) {
  const router = useRouter();

  const [mounted, setMounted] = useState(false); // 👈 FIX
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // 👇 Now this runs only on client side
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setMounted(true); // 👈 Allow component to render only after client loads
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.replace("/login");
    }
  }, [mounted, user, router]);

  // 👇 Prevent hydration error by rendering nothing until mounted
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Navbar
        firstName={user.firstName}
        lastName={user.lastName}
        isSuperAdmin={user.role === "super_admin"}
        setIsDarkMode={setIsDarkMode}
        isDarkMode={isDarkMode}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.replace("/login");
        }}
      />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.replace("/login");
          }}
        />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
