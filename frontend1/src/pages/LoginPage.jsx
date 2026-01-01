import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Farmer"); // Default role
  const [name, setName] = useState("");
  const [region, setRegion] = useState(""); // Farm Location or Research Area

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Save user info to local storage so ProfilePage can read it
    const userData = {
      name: name || "User",
      role: role,
      region: region || "General",
      joined: new Date().toLocaleDateString()
    };
    localStorage.setItem("moovview_user", JSON.stringify(userData));

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#292524] text-[#44403C] font-['DM_Sans'] p-6">
      
      <div className="bg-[#FDFCF8] w-full max-w-md p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-3 bg-[#D97706]"></div>

        <div className="text-center mb-10">
          <h1 className="font-['Fredoka'] text-4xl text-[#292524] mb-2 tracking-wide">MOOVVIEW</h1>
          <p className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-[#F5F5F4] border-none rounded-xl px-5 py-4 font-bold text-[#292524] focus:ring-2 focus:ring-[#D97706] outline-none transition-all"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Role Selection (Toggle) */}
          <div>
            <label className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-3">I am a...</label>
            <div className="flex gap-4 p-1 bg-[#F5F5F4] rounded-2xl">
              <button
                type="button"
                onClick={() => setRole("Farmer")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  role === "Farmer" ? "bg-[#292524] text-[#FEF3C7] shadow-lg" : "text-[#A8A29E] hover:text-[#292524]"
                }`}
              >
                FARMER
              </button>
              <button
                type="button"
                onClick={() => setRole("Researcher")}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                  role === "Researcher" ? "bg-[#292524] text-[#FEF3C7] shadow-lg" : "text-[#A8A29E] hover:text-[#292524]"
                }`}
              >
                RESEARCHER
              </button>
            </div>
          </div>

          {/* Dynamic Field based on Role */}
          <div>
            <label className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-1">
              {role === "Farmer" ? "Farm Location" : "Research Institution / Area"}
            </label>
            <input 
              type="text" 
              className="w-full bg-[#F5F5F4] border-none rounded-xl px-5 py-4 font-bold text-[#292524] focus:ring-2 focus:ring-[#D97706] outline-none transition-all"
              placeholder={role === "Farmer" ? "e.g. North Valley" : "e.g. Bovine Genetics Lab"}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-5 rounded-2xl text-sm tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Enter Dashboard &rarr;
          </button>

        </form>
        
        <p className="text-center text-xs text-[#A8A29E] mt-8 font-medium">
          Protected by MoovView Secure Login
        </p>
      </div>
    </div>
  );
};

export default LoginPage;