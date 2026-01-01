import React, { useState } from "react";

const HealthPage = () => {
  const [healthReport, setHealthReport] = useState({ breed: "", notes: "", checkup_date: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/health", {
      method: "POST",
      body: JSON.stringify(healthReport),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setStatus("Health report submitted successfully!");
      setHealthReport({ breed: "", notes: "", checkup_date: "" });
    } else {
      setStatus("Error submitting the health report.");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Health Monitoring</h2>
      <form onSubmit={handleSubmit} className="bg-blue-100 p-6 rounded-lg shadow">
        <label className="block mb-4">
          Breed:
          <input
            type="text"
            value={healthReport.breed}
            onChange={(e) => setHealthReport({ ...healthReport, breed: e.target.value })}
            className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4">
          Notes:
          <textarea
            value={healthReport.notes}
            onChange={(e) => setHealthReport({ ...healthReport, notes: e.target.value })}
            className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded"
          ></textarea>
        </label>
        <label className="block mb-4">
          Last Checkup Date:
          <input
            type="date"
            value={healthReport.checkup_date}
            onChange={(e) => setHealthReport({ ...healthReport, checkup_date: e.target.value })}
            className="block w-full mt-2 px-4 py-2 border border-gray-300 rounded"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
};

export default HealthPage;