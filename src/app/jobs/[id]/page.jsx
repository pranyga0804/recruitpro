"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data);
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please select a resume file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resumeFile);
    formData.append("jobId", id);

    const res = await fetch("/api/apply", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Application submitted!");
    } else {
      alert("Failed to submit application");
    }
  };

  if (!job) return <p className="text-white text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#00ccff] text-black p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
        <p className="mb-2"><span className="font-semibold">Company:</span> {job.company}</p>
        <p className="mb-2"><span className="font-semibold">Location:</span> {job.location}</p>
        <p className="mb-2"><span className="font-semibold">Salary:</span> {job.salary}</p>
        <p className="mb-4">{job.description}</p>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 text-black"
          />

          <label className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 text-black"
          />

          <label className="block text-sm font-medium mb-1">Upload Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 mb-4 text-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-[#00ccff] py-2 rounded-md font-semibold hover:bg-[#222] transition-colors"
          >
            Submit Application
          </button>
        </form>

        <a href="/dashboard" className="block text-sm mt-4 underline hover:text-blue-700">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
