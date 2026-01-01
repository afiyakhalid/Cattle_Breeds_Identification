import React from "react";

const AnalyticsDashboard = ({ data }) => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
      <p>Most searched breed: {data.most_searched_breed || "Loading..."}</p>
      <p>
        High confidence predictions: {data.confidence_distribution?.high || 0}%
      </p>
      <p>
        Medium confidence predictions: {data.confidence_distribution?.medium || 0}%
      </p>
      <p>
        Low confidence predictions: {data.confidence_distribution?.low || 0}%
      </p>
    </div>
  );
};

export default AnalyticsDashboard;