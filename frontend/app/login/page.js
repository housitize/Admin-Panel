"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "../../Components/Login";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      router.replace("/admin");
    } else if (token && !user) {
      // Clear broken session
      localStorage.removeItem("token");
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    const value = "login";
    try {
      const resp = await axios.post(
        `${API_URL}/api/user/login`,
        formData,
        value
      );

      if (resp.data.success) {
        // Save valid session
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("user", JSON.stringify(resp.data.user));

        router.push("/admin/dashboard");
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Login
      formData={formData}
      setFormData={setFormData}
      loading={loading}
      error={error}
      onLogin={handleLogin}
    />
  );
}
