import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- MOCK DATA (Fallback) ---
const MOCK_LOGS = [
  { id: 1, breed: "Angus #802", date: "2025-10-24", status: "Healthy", notes: "Routine checkup. Weight gain steady." },
  { id: 2, breed: "Jersey #104", date: "2025-10-23", status: "Attention Needed", notes: "Slight temperature elevation. Monitor feed intake." },
  { id: 3, breed: "Holstein #33", date: "2025-10-20", status: "Healthy", notes: "Hoof trimming completed. No issues." },
  { id: 4, breed: "Hereford #12", date: "2025-10-18", status: "Critical", notes: "Severe limping detected. Vet scheduled immediately." },
];

const HealthPage = () => {
  const [healthLogs, setHealthLogs] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Form State (Now includes 'status')
  const [formData, setFormData] = useState({ 
    breed: "", 
    notes: "", 
    checkup_date: "",
    status: "Healthy" // Default value
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  // --- 1. FETCH LOGS ---
  useEffect(() => {
    const fetchHealthLogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/health");
        if (response.ok) {
          const data = await response.json();
          setHealthLogs(data.length > 0 ? data : MOCK_LOGS);
        } else {
          setHealthLogs(MOCK_LOGS);
        }
      } catch (error) {
        setHealthLogs(MOCK_LOGS);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthLogs();
  }, []);

  // --- 2. SUBMIT FORM ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    try {
      const response = await fetch("http://localhost:8000/health", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Add new log to local state immediately
        setHealthLogs([{ ...formData, id: Date.now() }, ...healthLogs]);
        // Reset form
        setFormData({ breed: "", notes: "", checkup_date: "", status: "Healthy" });
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  // Filter Logic
  const filteredLogs = healthLogs.filter((log) => 
    log.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#FDFCF8] font-['DM_Sans'] text-[#44403C]">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#292524] fixed h-full z-20 flex flex-col justify-between py-8 px-6 shadow-xl rounded-r-3xl">
        <div>
          <h1 className="font-['Fredoka'] text-3xl text-[#FEF3C7] mb-12 tracking-wide">MOOVVIEW</h1>
          <nav className="flex flex-col gap-3 font-['DM_Sans']">
             <Link to="/dashboard" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Dashboard</Link>
             <Link to="/predict" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Prediction</Link>
             <Link to="/library" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Breed Library</Link>
             <Link to="/history" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">History Logs</Link>
             <Link to="/health" className="py-3 px-4 bg-[#FEF3C7] text-[#451A03] font-bold rounded-2xl shadow-lg transform scale-105">Health Monitor</Link>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-64 p-8 lg:p-12">
        
        {/* HEADER */}
        <header className="mb-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[#D97706] font-bold tracking-widest uppercase text-xs mb-2 block">Veterinary Dashboard</span>
              <h1 className="font-['Outfit'] text-5xl font-bold text-[#292524]">
                Health Diagnostics
              </h1>
            </div>
            <div className="bg-[#FEF3C7] px-6 py-3 rounded-full border border-[#FDE68A]">
               <span className="text-xs font-bold text-[#92400E] uppercase tracking-wide">
                 Live Monitoring Active
               </span>
            </div>
          </div>
          <p className="text-[#78716C] text-lg max-w-3xl leading-relaxed">
            Monitor vital signs and log urgent health issues. Use the form below to flag sick animals for immediate veterinary attention.
          </p>
        </header>

        {/* --- BIG INSIGHT CARDS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {/* Card 1: Heart Rate */}
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E7E5E4] hover:border-[#D97706] transition-colors relative overflow-hidden">
              <div className="relative z-10">
                 <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest block mb-2">Avg. Heart Rate</span>
                 <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-['Outfit'] text-6xl font-bold text-[#292524]">78</span>
                    <span className="text-sm font-bold text-[#D97706]">BPM</span>
                 </div>
                 <div className="w-full bg-[#F5F5F4] h-2 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-[#D97706] w-[70%]"></div>
                 </div>
                 <p className="text-xs text-[#78716C] font-bold">Normal Range (60-80)</p>
              </div>
           </div>

           {/* Card 2: Temperature */}
           <div className="bg-[#292524] p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden text-[#FDFCF8]">
              <div className="relative z-10">
                 <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest block mb-2">Avg. Body Temp</span>
                 <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-['Outfit'] text-6xl font-bold text-[#FEF3C7]">38.6</span>
                    <span className="text-sm font-bold text-[#A8A29E]">CELSIUS</span>
                 </div>
                 <div className="inline-block px-3 py-1 bg-[#44403C] rounded-lg text-xs font-bold uppercase tracking-wider text-[#65A30D]">
                    Optimal State
                 </div>
              </div>
           </div>

           {/* Card 3: Activity */}
           <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-[#E7E5E4] hover:border-[#D97706] transition-colors relative overflow-hidden">
              <div className="relative z-10">
                 <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest block mb-2">Rumination</span>
                 <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-['Outfit'] text-6xl font-bold text-[#292524]">450</span>
                    <span className="text-sm font-bold text-[#D97706]">MIN/DAY</span>
                 </div>
                 <div className="flex gap-1 h-8 items-end">
                    <div className="w-2 bg-[#F5F5F4] h-4 rounded-sm"></div>
                    <div className="w-2 bg-[#F5F5F4] h-6 rounded-sm"></div>
                    <div className="w-2 bg-[#D97706] h-8 rounded-sm"></div>
                    <div className="w-2 bg-[#F5F5F4] h-5 rounded-sm"></div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT: ADD REPORT FORM */}
           <div className="bg-white p-8 rounded-[2.5rem] border border-[#E7E5E4] shadow-sm h-fit">
              <h3 className="font-['Outfit'] text-2xl font-bold text-[#292524] mb-6 border-b border-[#F5F5F4] pb-4">
                Add New Log
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-2">Cattle ID</label>
                  <input 
                    type="text" 
                    value={formData.breed}
                    onChange={(e) => setFormData({...formData, breed: e.target.value})}
                    className="w-full bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl px-5 py-4 font-bold text-[#292524] focus:outline-none focus:border-[#D97706] transition-colors"
                    placeholder="E.g. Angus #402"
                    required
                  />
                </div>
                
                {/* --- NEW STATUS SELECTOR --- */}
                <div>
                  <label className="block text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-2">Health Condition</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className={`w-full border-r-[16px] border-transparent rounded-2xl px-5 py-4 font-bold outline-none cursor-pointer appearance-none transition-colors
                      ${formData.status === 'Healthy' ? 'bg-[#ECFCCB] text-[#3F6212]' : 
                        formData.status === 'Attention Needed' ? 'bg-[#FEF3C7] text-[#92400E]' : 
                        'bg-red-50 text-red-600 border-red-100'}
                    `}
                  >
                    <option value="Healthy">Healthy (Routine)</option>
                    <option value="Attention Needed">Attention Needed</option>
                    <option value="Critical">Critical / Sick (Urgent)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-2">Checkup Date</label>
                  <input 
                    type="date" 
                    value={formData.checkup_date}
                    onChange={(e) => setFormData({...formData, checkup_date: e.target.value})}
                    className="w-full bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl px-5 py-4 font-bold text-[#292524] focus:outline-none focus:border-[#D97706]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#A8A29E] uppercase tracking-wider mb-2">Vet Notes</label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-[#FAFAF9] border border-[#E7E5E4] rounded-2xl px-5 py-4 font-medium text-[#292524] focus:outline-none focus:border-[#D97706] h-32 resize-none"
                    placeholder="Describe symptoms, treatment, or issues..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={submitStatus === 'submitting'}
                  className="w-full bg-[#292524] text-[#FEF3C7] font-bold text-sm tracking-widest uppercase py-5 rounded-2xl hover:bg-[#44403C] transition-all shadow-lg"
                >
                  {submitStatus === 'submitting' ? "SAVING..." : "SAVE REPORT"}
                </button>

                {submitStatus === 'success' && <p className="text-[#65A30D] text-xs font-bold text-center uppercase tracking-wide">Report Saved</p>}
              </form>
           </div>

           {/* RIGHT: HISTORY LIST */}
           <div className="lg:col-span-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                 <h3 className="font-['Outfit'] text-2xl font-bold text-[#292524]">Recent History</h3>
                 
                 {/* Search Bar */}
                 <div className="w-full md:w-64">
                    <input 
                      type="text" 
                      placeholder="SEARCH RECORDS..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-6 py-3 bg-white border border-[#E7E5E4] text-xs font-bold tracking-wide rounded-full focus:border-[#D97706] outline-none placeholder-[#D6D3D1] shadow-sm"
                    />
                 </div>
              </div>

              {loading ? (
                <div className="text-center py-12 text-[#A8A29E] font-bold uppercase tracking-widest text-xs">Loading records...</div>
              ) : (
                <div className="space-y-4">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, index) => (
                      <div key={index} className="bg-white p-6 rounded-[2rem] border border-[#E7E5E4] hover:border-[#D97706] transition-colors shadow-sm flex flex-col md:flex-row gap-6 items-start">
                         
                         {/* Date Block */}
                         <div className="flex-shrink-0 bg-[#FAFAF9] p-5 rounded-2xl text-center min-w-[90px] border border-[#F5F5F4]">
                            <span className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">
                              {new Date(log.date || log.checkup_date).toLocaleString('default', { month: 'short' })}
                            </span>
                            <span className="block text-3xl font-['Outfit'] font-bold text-[#292524]">
                              {new Date(log.date || log.checkup_date).getDate()}
                            </span>
                         </div>

                         {/* Content */}
                         <div className="flex-1 pt-1">
                            <div className="flex justify-between items-start mb-2">
                               <h4 className="font-['Outfit'] font-bold text-xl text-[#292524]">{log.breed}</h4>
                               
                               {/* Status Badge - Color Coded */}
                               <span className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg border ${
                                 log.status === "Critical" || log.status === "Sick"
                                   ? "bg-red-50 text-red-600 border-red-100" 
                                   : log.status === "Attention Needed"
                                     ? "bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]"
                                     : "bg-[#ECFCCB] text-[#3F6212] border-lime-200"
                               }`}>
                                 {log.status || "Checkup"}
                               </span>
                            </div>
                            <p className="text-[#78716C] text-sm leading-relaxed font-medium">
                              {log.notes}
                            </p>
                         </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center border-2 border-dashed border-[#E7E5E4] rounded-3xl">
                      <p className="text-[#A8A29E] font-bold uppercase tracking-widest text-xs">No records found</p>
                    </div>
                  )}
                </div>
              )}
           </div>

        </div>

      </main>
    </div>
  );
};

export default HealthPage;