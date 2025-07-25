"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ApplyPage({ params }) {
  const [job, setJob] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${params.id}`);
      const data = await res.json();
      setJob(data);
    }
    fetchJob();
  }, [params.id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Apply for {job.title}</h1>
      <form
        action="/api/apply"
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="jobId" value={job.id} />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="border px-3 py-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border px-3 py-2 rounded"
        />

        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
