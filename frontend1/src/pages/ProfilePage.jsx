import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    name: "Loading...", 
    email: "", 
    role: "", 
    region: "", 
    joined: "" 
  });
  
  const [stats, setStats] = useState({ scans: 0, healthLogs: 0 });

  useEffect(() => {
    // 1. Get User Info
    const storedUser = localStorage.getItem("moovview_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/auth'); // Kick out if no user found
    }

    // 2. Fetch Stats
    const fetchStats = async () => {
      try {
        const historyRes = await fetch("http://localhost:8000/history");
        const historyData = await historyRes.json();
        const healthRes = await fetch("http://localhost:8000/health");
        const healthData = await healthRes.json();

        setStats({
          scans: historyData.length || 0,
          healthLogs: healthData.length || 0
        });
      } catch (e) {
        setStats({ scans: 0, healthLogs: 0 });
      }
    };
    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("moovview_user");
    navigate('/auth');
  };

  return (
    <div className="flex min-h-screen bg-[#FDFCF8] font-['DM_Sans'] text-[#44403C]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#292524] fixed h-full z-20 flex flex-col justify-between py-8 px-6 shadow-xl">
        <div>
          <h1 className="font-['Fredoka'] text-3xl text-[#FEF3C7] mb-12 tracking-wide">MOOVVIEW</h1>
          <nav className="flex flex-col gap-3 font-['DM_Sans']">
             <Link to="/dashboard" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">Dashboard</Link>
             <Link to="/profile" className="py-3 px-4 bg-[#FEF3C7] text-[#451A03] font-bold rounded-sm shadow-md">User Profile</Link>
             <Link to="/predict" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">Prediction</Link>
             <Link to="/library" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">Breed Library</Link>
             <Link to="/history" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-sm transition">History Logs</Link>
          </nav>
        </div>
        <div className="border-t border-[#44403C] pt-6">
          <button onClick={handleLogout} className="block w-full text-left py-3 px-4 text-red-400 hover:text-red-300 font-bold text-sm uppercase tracking-widest rounded-sm transition">
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 lg:p-16">
        <header className="mb-12 border-b border-[#E7E5E4] pb-8">
          <h1 className="font-['Outfit'] text-5xl font-bold text-[#292524] mb-2">My Profile</h1>
          <p className="text-[#A8A29E] font-bold text-xs tracking-widest uppercase">Account Details</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* USER CARD */}
          <div className="bg-white p-10 rounded-[3rem] shadow-lg border border-[#E7E5E4] text-center lg:col-span-1 h-fit">
             <div className="w-32 h-32 bg-[#292524] rounded-full mx-auto mb-6 flex items-center justify-center text-[#FEF3C7] text-5xl font-['Outfit'] font-bold border-4 border-[#FDFCF8] shadow-xl">
               {user.name.charAt(0).toUpperCase()}
             </div>
             
             {/* Name Display */}
             <h2 className="font-['Outfit'] text-3xl font-bold text-[#292524] mb-1">{user.name}</h2>
             
             {/* Role Badge */}
             <div className="inline-block px-3 py-1 bg-[#FEF3C7] rounded-full border border-[#FDE68A] mb-4">
                <p className="text-[#92400E] font-bold text-[10px] uppercase tracking-widest">{user.role} Account</p>
             </div>

             {/* Email Display (FIXED: Shows current email) */}
             <p className="text-[#78716C] font-medium text-sm mb-8 bg-[#F5F5F4] py-2 rounded-xl border border-[#E7E5E4]">
               {user.email}
             </p>
             
             <div className="bg-[#FAFAF9] p-6 rounded-3xl border border-[#F5F5F4] text-left space-y-4">
                <div>
                   <span className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Region / Area</span>
                   <span className="block font-bold text-[#292524] text-lg">{user.region}</span>
                </div>
                <div>
                   <span className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Member Since</span>
                   <span className="block font-bold text-[#292524] text-lg">{user.joined}</span>
                </div>
             </div>
          </div>

          {/* ACTIVITY STATS */}
          <div className="lg:col-span-2 space-y-8">
             <h3 className="font-['Outfit'] text-2xl font-bold text-[#292524]">Contribution Summary</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#FEF3C7] p-8 rounded-[2.5rem] border border-[#FDE68A] flex flex-col justify-between h-48">
                   <span className="text-[#92400E] font-bold text-xs uppercase tracking-widest">Total Predictions</span>
                   <div className="text-right">
                      <span className="font-['Outfit'] text-7xl font-bold text-[#451A03]">{stats.scans}</span>
                      <p className="text-[#B45309] text-xs font-bold mt-2">Breeds Identified</p>
                   </div>
                </div>
                <div className="bg-[#292524] p-8 rounded-[2.5rem] border border-[#44403C] flex flex-col justify-between h-48">
                   <span className="text-[#A8A29E] font-bold text-xs uppercase tracking-widest">Health Logs</span>
                   <div className="text-right">
                      <span className="font-['Outfit'] text-7xl font-bold text-[#FEF3C7]">{stats.healthLogs}</span>
                      <p className="text-[#A8A29E] text-xs font-bold mt-2">Checkups Performed</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;