"use client";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>

      {/* Single Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Title, Company, Location..."
          className="px-4 py-2 rounded-md border border-gray-600 bg-black text-white placeholder-gray-400 w-full md:w-1/2"
        />
      </div>

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-[#00ccff] text-black p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p className="mt-2">{job.description}</p>
              <a
                href={`/jobs/${job.id}`}
                className="block mt-4 text-center bg-black text-[#00ccff] py-2 rounded hover:bg-[#111] transition-colors"
              >
                View Details
              </a>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">No Jobs Found</p>
        )}
      </div>
    </div>
  );
}
