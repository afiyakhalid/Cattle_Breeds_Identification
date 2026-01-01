import React, { useState, useEffect } from "react";
import AnalyticsDashboard from "../components/AnalyticsDashboard";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Analytics Overview</h2>
      <AnalyticsDashboard data={analytics} />
    </div>
  );
};

export default AnalyticsPage;