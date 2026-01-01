import React from "react";

const PredictionForm = ({ onPrediction, loading }) => {
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Check if file exists and format is correct
    if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
      // Pass file UP to PredictionPage
      onPrediction(file);
    } else {
      alert("Please upload a valid image file (JPG or PNG).");
    }
  };

  return (
    <div className="h-full w-full">
      <label 
        className={`relative flex flex-col items-center justify-center w-full h-80 
        border border-dashed border-[#A8A29E] bg-[#FAFAF9] hover:bg-[#FFFBEB] hover:border-[#D97706]
        cursor-pointer transition-all duration-300 rounded-sm group`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center p-6">
            {/* Big Text Visual instead of Icon */}
            <div className="font-['Outfit'] text-7xl font-light text-[#E7E5E4] group-hover:text-[#FCD34D] transition-colors mb-4">
              +
            </div>
            
            <p className="mb-2 text-xl font-['Outfit'] font-bold text-[#44403C] tracking-wide uppercase">
              {loading ? "ANALYZING..." : "UPLOAD PHOTO"}
            </p>
            <p className="text-xs font-bold text-[#A8A29E] tracking-widest uppercase">
              JPG or PNG Format
            </p>
        </div>
        
        {/* Hidden Input */}
        <input 
          id="file-upload"
          type="file" 
          className="hidden" 
          onChange={handleFileChange}
          accept="image/*"
          disabled={loading}
        />
      </label>
    </div>
  );
};

export default PredictionForm;