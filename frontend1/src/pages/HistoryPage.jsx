import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- 1. STATIC MOCK DATA (Always Visible) ---
// This represents "Previous Logs" by other farmers/researchers
const STATIC_MOCK_DATA = [
  { 
    id: "mock-1", 
    label: "Angus", 
    location: "North Pasture", 
    confidence: 0.98, 
    searched_at: "2025-10-24T09:30:00", 
    user: "John Doe", 
    role: "Farmer", 
    notes: "Routine weight check. Animal looks healthy." 
  },
  { 
    id: "mock-2", 
    label: "Jersey", 
    location: "Milking Barn B", 
    confidence: 0.85, 
    searched_at: "2025-10-23T14:15:00", 
    user: "Dr. Sarah V.", 
    role: "Researcher", 
    notes: "Noticed slight limp in left hind leg. Monitoring." 
  },
  { 
    id: "mock-3", 
    label: "Holstein", 
    location: "Main Stable", 
    confidence: 0.92, 
    searched_at: "2025-10-23T11:00:00", 
    user: "Mike Ross", 
    role: "Farm Hand", 
    notes: "Morning feeding scan. Milk yield is up 5%." 
  },
  { 
    id: "mock-4", 
    label: "Hereford", 
    location: "Quarantine Zone", 
    confidence: 0.99, 
    searched_at: "2025-10-22T16:45:00", 
    user: "Research Team", 
    role: "Researcher", 
    notes: "Dataset collection for genetic study #402." 
  },
  { 
    id: "mock-5", 
    label: "Highland", 
    location: "East Hills", 
    confidence: 0.45, 
    searched_at: "2025-10-21T08:20:00", 
    user: "John Doe", 
    role: "Farmer", 
    notes: "Coat is very thick, hard to scan. Manual entry." 
  }
];

const HistoryPage = () => {
  const [realHistory, setRealHistory] = useState([]); // Data from your database
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // --- 2. FETCH REAL DATA FROM BACKEND ---
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8000/history");
        if (response.ok) {
          const data = await response.json();
          // We only set the REAL data here. We will merge it later.
          setRealHistory(data);
        }
      } catch (error) {
        console.warn("Backend offline, only showing mock data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // --- 3. MERGE REAL + MOCK DATA ---
  // Newest real data on top, then mock data
  const combinedHistory = [...realHistory, ...STATIC_MOCK_DATA].sort((a, b) => 
    new Date(b.searched_at) - new Date(a.searched_at)
  );

  // --- 4. FILTER LOGIC ---
  const filteredHistory = combinedHistory.filter(item => 
    (item.label || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.location || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.user || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FDFCF8] font-['DM_Sans'] text-[#44403C]">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#292524] fixed h-full z-20 flex flex-col justify-between py-8 px-6 shadow-2xl rounded-r-3xl">
        <div>
          <h1 className="font-['Fredoka'] text-3xl text-[#FEF3C7] mb-12 tracking-wide">MOOVVIEW</h1>
          <nav className="flex flex-col gap-3 font-['DM_Sans']">
             <Link to="/dashboard" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Dashboard</Link>
             <Link to="/predict" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Prediction</Link>
             <Link to="/library" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Breed Library</Link>
             <Link to="/history" className="py-3 px-4 bg-[#FEF3C7] text-[#451A03] font-bold rounded-2xl shadow-lg transform scale-105">History Logs</Link>
             <Link to="/health" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Health Monitor</Link>
          </nav>
        </div>
        <div className="border-t border-[#44403C] pt-6">
          <p className="font-['Outfit'] text-[#E7E5E4] font-semibold text-lg">John Doe</p>
          <p className="text-[#A8A29E] text-sm">Head Farmer</p>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6">
          <div>
            <h1 className="font-['Outfit'] text-5xl font-bold text-[#292524]">Scan Logs</h1>
            <p className="text-[#A8A29E] mt-2 font-bold text-xs tracking-widest uppercase">
              Archive of AI Predictions & Manual Entries
            </p>
          </div>

          {/* Rounded Search Bar */}
          <div className="w-full md:w-72">
             <input 
               type="text" 
               placeholder="SEARCH BREED, LOCATION..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-6 pr-4 py-3 bg-white border border-[#E7E5E4] text-xs font-bold tracking-wide rounded-full focus:border-[#D97706] outline-none placeholder-[#D6D3D1] shadow-sm transition-all focus:shadow-md"
             />
          </div>
        </div>

        {/* --- LOGS LIST --- */}
        <div className="space-y-6">
          {loading ? (
             <div className="py-20 text-center text-[#A8A29E] font-bold uppercase tracking-widest animate-pulse">
               Loading History...
             </div>
          ) : filteredHistory.length > 0 ? (
            filteredHistory.map((entry, index) => (
              <div 
                key={index}
                className="group bg-white p-0 rounded-3xl border border-[#E7E5E4] hover:border-[#D97706] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-stretch overflow-hidden"
              >
                
                {/* 1. Date Column (Left - Rounded Corners) */}
                <div className="w-32 bg-[#FAFAF9] border-r border-[#F5F5F4] p-6 flex flex-col items-center justify-center text-center group-hover:bg-[#FFFBEB] transition-colors">
                   <span className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-1">
                     {entry.searched_at ? new Date(entry.searched_at).toLocaleString('default', { month: 'short' }) : 'DATE'}
                   </span>
                   <span className="block font-['Outfit'] text-4xl font-bold text-[#292524]">
                     {entry.searched_at ? new Date(entry.searched_at).getDate() : '--'}
                   </span>
                   <span className="block text-[10px] font-bold text-[#D6D3D1] mt-1">
                     {entry.searched_at ? new Date(entry.searched_at).getFullYear() : ''}
                   </span>
                </div>

                {/* 2. Main Details */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-['Outfit'] text-3xl font-bold text-[#292524] group-hover:text-[#D97706] transition-colors">
                      {entry.label || "Unknown Breed"}
                    </h3>
                    
                    {/* Location Badge (Rounded) */}
                    {entry.location && (
                      <span className="px-4 py-1.5 bg-[#F5F5F4] text-[#57534E] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#E7E5E4] group-hover:bg-white transition-colors">
                        📍 {entry.location}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[#78716C] text-sm font-medium mb-6 leading-relaxed max-w-2xl">
                    {entry.notes ? entry.notes : <span className="text-[#D6D3D1] italic">No notes provided for this scan.</span>}
                  </p>

                  <div className="flex items-center gap-8 border-t border-[#F5F5F4] pt-4">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-[#A8A29E] uppercase tracking-widest mb-0.5">Confidence</span>
                       <span className={`text-sm font-bold ${entry.confidence > 0.8 ? "text-[#65A30D]" : "text-[#D97706]"}`}>
                         {entry.confidence ? Math.round(entry.confidence * 100) : 0}%
                       </span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-[#A8A29E] uppercase tracking-widest mb-0.5">Logged By</span>
                       <span className="text-sm font-bold text-[#292524]">
                         {entry.user || "Farmer"}
                       </span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-bold text-[#A8A29E] uppercase tracking-widest mb-0.5">Time</span>
                       <span className="text-sm font-bold text-[#292524]">
                         {entry.searched_at ? new Date(entry.searched_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                       </span>
                    </div>
                    
                    {/* Role Badge */}
                    <div className={`ml-auto px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        entry.role === 'Researcher' ? 'bg-blue-50 text-blue-600' : 'bg-[#ECFCCB] text-[#3F6212]'
                    }`}>
                        {entry.role || "Farmer"}
                    </div>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-[#E7E5E4] rounded-3xl">
              <p className="text-[#A8A29E] font-bold uppercase tracking-widest text-xs">No logs found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default HistoryPage;