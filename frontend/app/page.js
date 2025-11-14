"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");

    const timer = setTimeout(() => {
      if (token) {
        router.replace("/admin");
      } else {
        router.replace("/login");
      }
    }, 1200); // adds a smooth transition

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
      <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col items-center">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-800">
          <FiLoader className="text-white text-3xl animate-spin" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold">Please wait...</h1>
        <p className="text-gray-500 mt-2">Redirecting you to the right page</p>

        <div className="mt-6 w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-slate-800 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
