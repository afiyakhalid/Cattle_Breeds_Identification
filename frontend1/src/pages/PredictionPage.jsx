import React, { useState } from "react";
import PredictionForm from "../components/PredictionForm";

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    setPrediction(result);
  };

  return (
    <div className="p-8">
      <PredictionForm onPrediction={handlePrediction} />
      {prediction && (
        <div className="mt-4 bg-green-100 p-4 rounded-lg">
          <h3>Result: {prediction.label}</h3>
          <p>Confidence: {prediction.confidence.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionPage;