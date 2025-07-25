"use client";
import { useState } from "react";

export default function PostJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Job Posted Successfully!");
      setForm({ title: "", description: "", company: "", location: "", salary: "" });
    } else {
      alert("Failed to post job.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#00ccff] text-black p-8 rounded-2xl w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Post a Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Salary</label>
            <input
              type="text"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-[#00ccff] font-bold py-2 rounded hover:bg-gray-900"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );  
}
