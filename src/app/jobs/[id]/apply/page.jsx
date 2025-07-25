import React from 'react';

export default function ApplyPage({ params }) {
  const { id } = params;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Apply for Job ID: {id}</h1>
      <form
        action="/api/apply"
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input type="hidden" name="jobId" value={id} />

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

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
}
