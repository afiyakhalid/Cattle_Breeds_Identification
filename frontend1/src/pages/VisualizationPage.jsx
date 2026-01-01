import React, { useState, useEffect } from "react";
import MapVisualization from "../components/MapVisualization";

const VisualizationPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/breeds")
      .then((res) => res.json())
      .then((data) =>
        setLocations(
          data.map((breed) => ({
            lat: breed.geolocation.latitude,
            lng: breed.geolocation.longitude,
            name: breed.name,
          }))
        )
      );
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Geolocation Mapping</h2>
      <MapVisualization locations={locations} />
    </div>
  );
};

export default VisualizationPage;