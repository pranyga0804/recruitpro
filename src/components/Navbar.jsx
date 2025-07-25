"use client";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center mb-10 flex-wrap gap-4">
      <h1 className="text-3xl font-bold text-[#00ccff]">RecruitPro Dashboard</h1>

      {session?.user && (
        <div className="text-right text-white">
          <p className="text-sm font-medium">{session.user.name}</p>
          <p className="text-xs text-gray-400">{session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
