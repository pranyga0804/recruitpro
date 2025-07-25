"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        alert("✅ Login successful!");
        router.push("/dashboard"); // Redirect after login
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#00ccff] rounded-2xl shadow-xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Login to RecruitPro
        </h1>

        {error && (
          <p className="text-red-700 bg-white text-center p-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-black mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-[#00ccff] py-2 rounded-md font-semibold hover:bg-[#222] hover:text-white transition-colors"
        >
          Login
        </button>

        <p className="text-sm text-center text-black mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="underline hover:text-blue-700">Register</a>
        </p>
      </form>
    </div>
  );
}
