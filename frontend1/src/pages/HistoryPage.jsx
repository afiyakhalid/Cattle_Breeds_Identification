import React, { useState, useEffect } from "react";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/history")
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Prediction History</h2>
      <ul>
        {history.map((entry) => (
          <li
            key={entry.id}
            className="p-4 mb-4 bg-blue-100 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <p><b>Breed:</b> {entry.label}</p>
            <p><b>Confidence:</b> {entry.confidence.toFixed(2)}%</p>
            <p><b>Time:</b> {new Date(entry.searched_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPage;