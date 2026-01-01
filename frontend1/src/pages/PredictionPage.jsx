import React, { useState } from "react";
import { Link } from "react-router-dom";
import PredictionForm from "../components/PredictionForm";

// Background texture for visual interest
const TEXTURE_URL = "https://www.transparenttextures.com/patterns/cubes.png";

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  
  // State for Manual Entry
  const [manualEntry, setManualEntry] = useState({ 
    breed: "", 
    location: "", 
    notes: "" 
  });
  const [saveStatus, setSaveStatus] = useState(null);

  // --- 1. HANDLE AI PREDICTION ---
  const handlePrediction = async (file) => {
    // Show large preview immediately
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setPrediction(result);
      
      // Auto-fill manual form
      setManualEntry(prev => ({ ...prev, breed: result.label }));
      
    } catch (error) {
      alert("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  // --- 2. HANDLE MANUAL SAVE ---
  const handleManualEntrySubmit = async (e) => {
    e.preventDefault();
    setSaveStatus("saving");

    const logData = {
      label: manualEntry.breed,
      location: manualEntry.location,
      notes: manualEntry.notes,
      confidence: 1.0, 
      role: "Farmer",
      user: "Current User",
      searched_at: new Date().toISOString()
    };

    try {
      const response = await fetch("http://localhost:8000/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData),
      });

      if (response.ok) {
        setSaveStatus("success");
        setManualEntry({ breed: "", location: "", notes: "" });
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      setSaveStatus("error");
    }
  };

  const handleReset = () => {
    setPreview(null);
    setPrediction(null);
    setManualEntry({ breed: "", location: "", notes: "" });
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCF8] font-['DM_Sans'] text-[#44403C]">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#292524] fixed h-full z-50 flex flex-col justify-between py-8 px-6 shadow-2xl">
        <div>
          <h1 className="font-['Fredoka'] text-3xl text-[#FEF3C7] mb-12 tracking-wide">MOOVVIEW</h1>
          <nav className="flex flex-col gap-3 font-['DM_Sans']">
             <Link to="/dashboard" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">Dashboard</Link>
             <Link to="/predict" className="py-3 px-4 bg-[#FEF3C7] text-[#451A03] font-bold rounded-sm shadow-md">Prediction</Link>
             <Link to="/library" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">Breed Library</Link>
             <Link to="/history" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">History Logs</Link>
             <Link to="/health" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">Health Monitor</Link>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        
        <main className="flex-1 p-8 lg:p-12 w-full max-w-[1600px] mx-auto">
          
          <header className="mb-10 border-b border-[#E7E5E4] pb-6">
            <h1 className="font-['Outfit'] text-5xl font-bold text-[#292524]">Analysis Lab</h1>
            <p className="text-[#A8A29E] mt-2 font-bold text-xs tracking-widest uppercase">
              Upload • Analyze • Archive
            </p>
          </header>

          <div className="flex flex-col gap-8 w-full">
            
            {/* --- SECTION 1: UPLOAD / IMAGE DISPLAY --- */}
            <section className="w-full bg-white rounded-[2rem] border border-[#E7E5E4] shadow-sm overflow-hidden relative">
               
               {!preview ? (
                 // STATE A: Upload Form (Full Width)
                 <div className="p-12 text-center bg-[#FAFAF9]">
                    <h2 className="font-['Outfit'] text-2xl font-bold text-[#292524] mb-6">1. Upload Cattle Image</h2>
                    <div className="max-w-2xl mx-auto">
                       <PredictionForm onPrediction={handlePrediction} loading={loading} />
                    </div>
                 </div>
               ) : (
                 // STATE B: Image Preview (Stays Visible)
                 <div className="flex flex-col md:flex-row h-[500px]">
                    <div className="w-full md:w-2/3 relative bg-black">
                       <img src={preview} alt="Analysis Target" className="w-full h-full object-contain opacity-90" />
                       {/* Overlay info */}
                       <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                          <p className="text-[#FEF3C7] text-xs font-bold uppercase tracking-widest">Target Image</p>
                       </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-[#292524] p-8 flex flex-col justify-center text-[#FDFCF8]">
                        <h3 className="font-['Outfit'] text-3xl text-[#FEF3C7] mb-2">Image Locked</h3>
                        <p className="text-[#A8A29E] text-sm mb-8">
                           {loading ? "Neural network is processing features..." : "Analysis complete. See results below."}
                        </p>
                        <button 
                          onClick={handleReset}
                          className="py-3 px-6 border border-[#A8A29E] text-[#A8A29E] rounded-sm hover:bg-[#FEF3C7] hover:text-[#292524] hover:border-[#FEF3C7] transition-all uppercase text-xs font-bold tracking-widest"
                        >
                          Scan Different Image
                        </button>
                    </div>
                 </div>
               )}
            </section>

            {/* --- SECTION 2: RESULTS (Full Width) --- */}
            {(loading || prediction) && (
              <section className="w-full bg-[#FEF3C7] rounded-[2rem] border border-[#FDE68A] p-10 shadow-lg relative overflow-hidden">
                 {/* Decorative BG */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                 <h2 className="font-['Outfit'] text-2xl font-bold text-[#92400E] mb-8 relative z-10">2. Analysis Report</h2>

                 {loading ? (
                    <div className="flex items-center gap-4 text-[#92400E] animate-pulse">
                       <div className="w-6 h-6 border-2 border-[#92400E] border-t-transparent rounded-full animate-spin"></div>
                       <span className="font-bold uppercase tracking-widest text-sm">Running Inference Model...</span>
                    </div>
                 ) : (
                    <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
                       <div>
                          <p className="text-[#B45309] font-bold text-xs uppercase tracking-widest mb-2">Primary Classification</p>
                          <h1 className="font-['Outfit'] text-8xl font-black text-[#451A03] leading-none">
                             {prediction.label}
                          </h1>
                       </div>
                       
                       <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#FDE68A] w-full md:w-96">
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-[#92400E] font-bold text-sm">Confidence Score</span>
                             <span className="text-[#451A03] font-black text-3xl">{Math.round(prediction.confidence * 100)}%</span>
                          </div>
                          <div className="w-full bg-white h-3 rounded-full overflow-hidden">
                             <div className="h-full bg-[#D97706]" style={{ width: `${prediction.confidence * 100}%` }}></div>
                          </div>
                       </div>
                    </div>
                 )}
              </section>
            )}

            {/* --- SECTION 3: MANUAL LOGGING (Full Width) --- */}
            <section className="w-full bg-white rounded-[2rem] border border-[#E7E5E4] p-10 shadow-sm mb-12">
               <h2 className="font-['Outfit'] text-2xl font-bold text-[#292524] mb-2">3. Archive to History</h2>
               <p className="text-[#78716C] mb-8">Confirm the details above and save this record to the farm database.</p>
               
               <form onSubmit={handleManualEntrySubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Breed Name</label>
                        <input 
                          type="text" 
                          required
                          value={manualEntry.breed}
                          onChange={(e) => setManualEntry({ ...manualEntry, breed: e.target.value })}
                          className="w-full bg-[#FAFAF9] border border-[#E7E5E4] p-4 rounded-xl font-bold text-[#292524] focus:outline-none focus:border-[#D97706]"
                          placeholder="e.g. Angus"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Location / Tag ID</label>
                        <input 
                          type="text" 
                          required
                          value={manualEntry.location}
                          onChange={(e) => setManualEntry({ ...manualEntry, location: e.target.value })}
                          className="w-full bg-[#FAFAF9] border border-[#E7E5E4] p-4 rounded-xl font-bold text-[#292524] focus:outline-none focus:border-[#D97706]"
                          placeholder="e.g. North Barn"
                        />
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <label className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">Observation Notes</label>
                     <textarea 
                        value={manualEntry.notes}
                        onChange={(e) => setManualEntry({ ...manualEntry, notes: e.target.value })}
                        className="w-full bg-[#FAFAF9] border border-[#E7E5E4] p-4 rounded-xl font-medium text-[#292524] focus:outline-none focus:border-[#D97706] h-32 resize-none"
                        placeholder="Add health details, weight, or other observations..."
                     ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      disabled={saveStatus === 'saving'}
                      className={`px-10 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all shadow-lg
                        ${saveStatus === 'success' 
                            ? 'bg-[#65A30D] text-white hover:bg-[#4D7C0F]' 
                            : 'bg-[#292524] text-[#FEF3C7] hover:bg-[#44403C]'}`}
                    >
                      {saveStatus === 'saving' ? "Saving..." : saveStatus === 'success' ? "Saved ✓" : "Save Record"}
                    </button>
                  </div>
                  
                  {saveStatus === 'error' && (
                    <p className="text-red-500 font-bold text-center">Error: Could not save to history logs.</p>
                  )}
               </form>
            </section>

          </div>
        </main>

        {/* --- FOOTER --- */}
        <footer className="w-full bg-[#292524] text-[#A8A29E] py-12 px-12 mt-auto border-t border-[#44403C]">
           <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                 <h2 className="font-['Fredoka'] text-2xl text-[#FEF3C7] mb-2">MOOVVIEW</h2>
                 <p className="text-xs font-bold uppercase tracking-widest">Advanced Livestock Intelligence System</p>
              </div>
              <div className="flex gap-8 text-sm font-medium">
                 <Link to="/dashboard" className="hover:text-[#FDFCF8] transition">Home</Link>
                 <Link to="/history" className="hover:text-[#FDFCF8] transition">Logs</Link>
                 <Link to="/library" className="hover:text-[#FDFCF8] transition">Encyclopedia</Link>
                 <a href="#" className="hover:text-[#FDFCF8] transition">Support</a>
              </div>
              <div className="text-xs opacity-50">
                 &copy; 2025 MOOVVIEW Inc. All rights reserved.
              </div>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default PredictionPage;