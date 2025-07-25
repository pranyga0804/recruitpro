"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
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
  );
}
