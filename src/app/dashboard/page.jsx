"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Navbar from "../../components/Navbar";  // Navbar with heading inside

export default function DashboardPage() {
  const { data: session } = useSession();
  const [summary, setSummary] = useState({ jobsCount: 0, applicationsCount: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await fetch("/api/dashboard/summary");
      const data = await res.json();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      <Navbar />

      {/* Top Right Logout Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Removed Duplicate Heading */}
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-20">
        <div className="bg-[#00ccff] text-black p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-4xl font-bold">{summary.jobsCount}</h2>
          <p className="text-lg font-medium mt-2">Total Jobs Posted</p>
        </div>
        <div className="bg-[#00ccff] text-black p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-4xl font-bold">{summary.applicationsCount}</h2>
          <p className="text-lg font-medium mt-2">Applications Received</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="/dashboard/applications"
          className="bg-[#00ccff] text-black px-6 py-3 rounded-md font-semibold hover:bg-cyan-400 transition-colors"
        >
          View Applications
        </a>
        <a
          href="/jobs"
          className="bg-[#00ccff] text-black px-6 py-3 rounded-md font-semibold hover:bg-cyan-400 transition-colors"
        >
          View Jobs
        </a>
        <a
          href="/post-job"
          className="bg-[#00ccff] text-black px-6 py-3 rounded-md font-semibold hover:bg-cyan-400 transition-colors"
        >
          Post New Job
        </a>
      </div>
    </div>
  );
}
