import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// --- VISUAL ASSETS ---
const HERO_CATTLE_IMG = "https://images.unsplash.com/photo-1545468800-85cc9bc6b231?q=80&w=1000&auto=format&fit=crop";
const BG_TEXTURE_IMG = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1000&auto=format&fit=crop";

// --- INDIAN BREED DATA ---
const PIE_DATA = [
  { name: "Gir", value: 40, color: "#78350F" },
  { name: "Sahiwal", value: 30, color: "#D97706" },
  { name: "Ongole", value: 20, color: "#FCD34D" },
  { name: "Red Sindhi", value: 10, color: "#A8A29E" },
];

const Dashboard = () => {
  const [totalScans, setTotalScans] = useState(0);
  const [recentLogs, setRecentLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "User", role: "Farmer" }); // Default user state

  // --- 1. FETCH USER & DATA ---
  useEffect(() => {
    // A. Get User from Login
    const storedUser = localStorage.getItem("moovview_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // B. Fetch Backend Data
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/history");
        if (response.ok) {
          const data = await response.json();
          setTotalScans(data.length);
          // Sort by newest
          const sorted = data.sort((a, b) => new Date(b.searched_at) - new Date(a.searched_at));
          setRecentLogs(sorted.slice(0, 5));
        }
      } catch (error) {
        console.error("Backend offline, using fallback UI.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#FDFCF8] text-[#44403C] font-['DM_Sans']">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#292524] fixed h-full z-20 flex flex-col justify-between py-8 px-6 shadow-2xl rounded-r-3xl">
        <div>
          <div className="mb-12">
            <h1 className="font-['Fredoka'] text-3xl text-[#FEF3C7] tracking-wide">
              MOOVVIEW
            </h1>
          </div>
          <nav className="flex flex-col gap-3">
            <NavItem to="/dashboard" label="Dashboard" />
            <NavItem to="/profile" label="User Profile" /> {/* ADDED PROFILE LINK */}
            <NavItem to="/predict" label="Prediction" />
            <NavItem to="/library" label="Breed Library" />
            <NavItem to="/history" label="History Logs" />
            <NavItem to="/visualization" label="Visualization" />
            <NavItem to="/health" label="Health Monitor" />
            <NavItem to="/analytics" label="Analytics" />
          </nav>
        </div>
        <div className="border-t border-[#44403C] pt-6">
          <p className="font-['Outfit'] text-[#E7E5E4] font-semibold text-lg">{user.name}</p>
          <p className="text-[#A8A29E] text-sm">{user.role}</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main 
        className="flex-1 ml-64 p-8 lg:p-12 relative min-h-screen animate-fade-in"
        style={{
           backgroundImage: `linear-gradient(to bottom, rgba(253, 252, 248, 0.95), rgba(253, 252, 248, 0.98)), url(${BG_TEXTURE_IMG})`,
           backgroundSize: 'cover',
           backgroundAttachment: 'fixed'
        }}
      >
        {/* Header */}
        <header className="flex justify-between items-end mb-10 relative z-10 animate-slide-up">
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h2 className="font-['Outfit'] text-5xl font-bold text-[#292524]">
                 Welcome, {user.name}
               </h2>
               <span className="bg-[#FEF3C7] text-[#92400E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#FDE68A]">
                 {user.role}
               </span>
            </div>
            <p className="text-[#78716C] text-lg">Here's what's happening with your herd today.</p>
          </div>
          <div className="bg-white px-6 py-3 font-bold text-[#57534E] border border-[#E7E5E4] shadow-sm rounded-full">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* --- GRID LAYOUT --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* 1. TOTAL SCANS */}
          <div className="col-span-1 md:col-span-2 bg-[#FEF3C7] p-8 flex flex-col justify-between h-64 shadow-sm border border-[#FDE68A] rounded-3xl relative overflow-hidden">
            <div className="flex justify-between items-start z-10">
               <div>
                 <span className="font-bold text-[#92400E] uppercase tracking-wide text-xs block mb-1">Total Scans</span>
                 <span className="text-[#B45309] text-xs font-medium">Real-time Database Count</span>
               </div>
               <div className="bg-[#FFFBEB] px-4 py-2 text-[#B45309] text-xs font-bold rounded-full border border-[#FDE68A]">
                 Live Updates
               </div>
            </div>
            
            <div className="z-10">
              <div className="font-['Outfit'] text-7xl font-bold text-[#451A03] mb-4 tracking-tight">
                {loading ? "..." : totalScans}
              </div>
              <div className="flex gap-8 border-t border-[#FDE68A] pt-4 mt-2">
                <div>
                  <span className="block text-[10px] font-bold text-[#92400E] uppercase tracking-wider">Status</span>
                  <span className="font-['Outfit'] text-xl font-bold text-[#451A03]">Active</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#92400E] uppercase tracking-wider">Accuracy</span>
                  <span className="font-['Outfit'] text-xl font-bold text-[#451A03]">98.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SICK COWS */}
          <div className="bg-white p-6 rounded-3xl border border-[#E7E5E4] shadow-sm flex flex-col justify-between h-64 hover:border-red-200 transition-colors">
             <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 font-bold mb-4">!</div>
             <div>
                <span className="block text-4xl font-['Outfit'] font-bold text-[#292524]">3</span>
                <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider">Sick Animals</span>
             </div>
             <p className="text-sm text-[#78716C] mt-2">Check Quarantine Zone A.</p>
          </div>

          {/* 3. RESEARCH COUNT */}
          <div className="bg-[#292524] p-6 rounded-3xl shadow-lg flex flex-col justify-between h-64 text-[#F5F5F4]">
             <div className="w-12 h-12 rounded-full bg-[#44403C] flex items-center justify-center text-[#FEF3C7] font-bold mb-4">R</div>
             <div>
                <span className="block text-4xl font-['Outfit'] font-bold text-[#FEF3C7]">14</span>
                <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-wider">In Research</span>
             </div>
             <p className="text-sm text-[#A8A29E] mt-2">Tagging in progress.</p>
          </div>

          {/* 4. PIE CHART (Indian Breeds) */}
          <div className="col-span-1 md:col-span-2 bg-white p-8 shadow-md border-2 border-[#E7E5E4] h-80 flex items-center justify-around rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FEF3C7] px-6 py-2 rounded-bl-3xl border-b border-l border-[#FDE68A]">
               <span className="text-xs font-bold text-[#92400E] uppercase tracking-widest">Population</span>
            </div>

            <div className="w-1/2 h-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#292524', border: 'none', borderRadius: '8px', color: '#FEF3C7' }}
                    itemStyle={{ color: '#FEF3C7' }} 
                    cursor={false} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-1/2 flex flex-col gap-4 pl-4 border-l border-[#F5F5F4]">
              <h3 className="font-['Outfit'] text-xl font-bold text-[#292524]">Indian Breeds</h3>
              {PIE_DATA.map((item) => (
                 <div key={item.name} className="flex items-center justify-between w-full pr-4">
                   <div className="flex items-center gap-2">
                     <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                     <span className="text-[#57534E] text-sm font-bold uppercase tracking-wide">{item.name}</span>
                   </div>
                   <span className="text-[#292524] font-['Outfit'] font-bold text-lg">{item.value}%</span>
                 </div>
              ))}
            </div>
          </div>

          {/* 5. HEALTH OVERVIEW */}
          <div 
            className="col-span-1 md:col-span-2 relative p-8 h-80 text-[#F5F5F4] flex flex-col justify-between shadow-lg rounded-3xl overflow-hidden"
            style={{
                backgroundImage: `url(${HERO_CATTLE_IMG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-[#292524]/80 z-0"></div>
            
            <div className="relative z-10">
              <h3 className="font-['Outfit'] text-2xl font-bold mb-2 text-[#FEF3C7]">Health Status</h3>
              <p className="text-[#D6D3D1] text-sm leading-relaxed max-w-[80%]">
                Herd health is optimal. Vaccination drive scheduled for tomorrow.
              </p>
            </div>
            <div className="relative z-10 flex items-end gap-8">
              <div>
                 <span className="font-['Outfit'] text-6xl font-bold text-[#FEF3C7]">98%</span>
                 <p className="text-xs font-bold text-[#D6D3D1] uppercase tracking-wider">Healthy</p>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div>
                 <span className="font-['Outfit'] text-2xl font-bold text-[#FEF3C7]">15</span>
                 <p className="text-xs font-bold text-[#D6D3D1] uppercase tracking-wider">Pending</p>
              </div>
            </div>
          </div>

          {/* 6. ACTIVITY LOGS */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white p-8 border border-[#E7E5E4] shadow-sm rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-['Outfit'] text-xl font-bold text-[#292524]">Recent Scan Activity</h3>
              <Link to="/history" className="text-[#D97706] text-sm font-bold uppercase tracking-wider hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest border-b border-[#F5F5F4]">
                    <th className="py-4 pl-4">Detected Breed</th>
                    <th className="py-4">Location</th>
                    <th className="py-4">Time</th>
                    <th className="py-4">Confidence</th>
                  </tr>
                </thead>
                <tbody className="font-['Outfit'] text-[#44403C]">
                  {loading ? (
                    <tr><td colSpan="4" className="py-8 text-center text-[#A8A29E]">Loading data...</td></tr>
                  ) : recentLogs.length > 0 ? (
                    recentLogs.map((log, index) => (
                      <tr key={index} className="border-b border-[#F5F5F4] hover:bg-[#FAFAF9] transition-colors">
                        <td className="py-4 pl-4 font-bold">{log.label || "Unknown"}</td>
                        <td className="py-4 font-medium text-sm">{log.location || "N/A"}</td>
                        <td className="py-4 text-[#78716C] font-['DM_Sans'] text-sm">
                          {log.searched_at ? new Date(log.searched_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}
                        </td>
                        <td className="py-4">
                          <span className="text-[#D97706] font-bold text-xs">
                            {log.confidence ? `${Math.round(log.confidence * 100)}%` : "100%"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="py-8 text-center text-[#A8A29E]">No scans recorded yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`block py-3 px-5 text-sm font-bold transition-all duration-300 rounded-2xl ${
        isActive 
          ? "bg-[#FEF3C7] text-[#451A03] shadow-md translate-x-2" 
          : "text-[#D6D3D1] hover:text-white hover:bg-[#44403C]"
      }`}
    >
      {label}
    </Link>
  );
};

export default Dashboard;