// src/app/test/page.jsx
"use client";
import { useSession } from "next-auth/react";

export default function TestPage() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <h1>Test Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
