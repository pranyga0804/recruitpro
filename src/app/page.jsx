"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          <span className="text-[#00ccff]">RecruitPro</span> Job Portal
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Simplifying recruitment with modern technology. Find Jobs, Post Openings & Manage Applications seamlessly.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/jobs">
            <button className="bg-[#00ccff] hover:bg-[#00aacc] text-black font-semibold px-6 py-3 rounded-md">
              Explore Jobs
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="border border-[#00ccff] hover:bg-[#00ccff33] text-[#00ccff] font-semibold px-6 py-3 rounded-md">
              Go to Dashboard
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="border border-white hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-md">
              Login / Register
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
