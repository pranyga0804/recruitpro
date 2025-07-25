"use client";
import { useEffect, useState } from "react";

export default function ApplicationsDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();

        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error("API did not return array:", data);
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      }
    };

    fetchApplications();
  }, []);

  const updateStatus = (id, status) => {
    setApplications((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  const deleteApplication = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this application?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setApplications((prevApps) => prevApps.filter((app) => app.id !== id));
    } else {
      alert("Failed to delete application.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#00ccff]">Applications Dashboard</h1>

      <table className="w-full table-auto border-collapse border border-[#00ccff]">
        <thead className="bg-[#00ccff] text-black">
          <tr>
            <th className="border border-[#00ccff] px-4 py-2">Name</th>
            <th className="border border-[#00ccff] px-4 py-2">Email</th>
            <th className="border border-[#00ccff] px-4 py-2">Applied Job</th>
            <th className="border border-[#00ccff] px-4 py-2">Resume</th>
            <th className="border border-[#00ccff] px-4 py-2">Status</th>
            <th className="border border-[#00ccff] px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id}>
                <td className="border border-[#00ccff] px-4 py-2">{app.name}</td>
                <td className="border border-[#00ccff] px-4 py-2">{app.email}</td>
                <td className="border border-[#00ccff] px-4 py-2">
                  {app.job?.title || "N/A"}
                </td>
                <td className="border border-[#00ccff] px-4 py-2">
                  <a
                    href={app.resumeURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#00ccff]"
                  >
                    View Resume
                  </a>
                </td>
                <td className="border border-[#00ccff] px-4 py-2">
                  {app.status || "Pending"}
                </td>
                <td className="border border-[#00ccff] px-4 py-2 space-y-2">
                  <div className="space-x-2">
                    <button
                      onClick={() => updateStatus(app.id, "Accepted")}
                      className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, "Rejected")}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, "On Hold")}
                      className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Hold
                    </button>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => deleteApplication(app.id)}
                      className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No Applications Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6">
        <a
          href="/dashboard"
          className="inline-block bg-[#00ccff] text-black px-4 py-2 rounded hover:bg-[#00b5e6]"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
