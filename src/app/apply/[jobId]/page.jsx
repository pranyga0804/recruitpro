"use client";
import { useState } from "react";

export default function ApplyPage({ params }) {
  const { jobId } = params;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("resume", formData.resume);
    form.append("jobId", jobId);

    const res = await fetch("/api/apply", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-[#00ccff] mb-6">Apply for Job</h1>

      {success ? (
        <p className="text-green-500">Application submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
            className="w-full p-2 rounded text-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
            className="w-full p-2 rounded text-black"
          />
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="w-full text-white"
          />
          <button
            type="submit"
            className="bg-[#00ccff] text-black px-6 py-2 rounded-md font-semibold hover:bg-cyan-400 transition-colors"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
