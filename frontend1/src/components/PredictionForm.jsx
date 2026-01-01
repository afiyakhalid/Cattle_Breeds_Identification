import React from "react";

const PredictionForm = ({ onPrediction }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
      onPrediction(file);
    } else {
      alert("Please upload a valid image file (JPG/PNG).");
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">Upload or Capture Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default PredictionForm;