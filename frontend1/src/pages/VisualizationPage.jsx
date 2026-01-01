import React, { useState } from "react";
import { Link } from "react-router-dom";

// --- 1. DATA: 29 INDIAN BREEDS ---
const INDIAN_BREEDS = [
  "Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Kankrej", "Ongole", 
  "Krishna Valley", "Deoni", "Hallikar", "Amritmahal", "Khillari", 
  "Kangayam", "Bargur", "Umblachery", "Alambadi", "Pulikulam", 
  "Punganur", "Malnad Gidda", "Vechur", "Kasaragod Dwarf", "Rathi", 
  "Hariana", "Nagori", "Mewati", "Ponwar", "Siri", "Badri", 
  "Gangatiri", "Gaolao"
];

// --- 2. DATA: MOCK COORDINATES (Simulating Density in States) ---
// Simple X/Y percentages to place dots on the India map
const MAP_LOCATIONS = {
  "Gujarat": { x: 20, y: 45, label: "Gujarat Hub" },
  "Punjab": { x: 25, y: 20, label: "Punjab Dairy" },
  "Rajasthan": { x: 22, y: 35, label: "Rajasthan Arid" },
  "Andhra": { x: 45, y: 70, label: "Ongole Tract" },
  "Karnataka": { x: 35, y: 75, label: "Mysore Belt" },
  "Tamil Nadu": { x: 40, y: 85, label: "Kangayam Zone" },
  "UP": { x: 45, y: 35, label: "Gangetic Plains" },
  "Maharashtra": { x: 30, y: 55, label: "Deoni Tract" },
  "Odisha": { x: 60, y: 50, label: "Eastern Coast" },
  "Kerala": { x: 32, y: 90, label: "Vechur Unit" }
};

// Map breeds to their primary regions for the visualization
const BREED_DISTRIBUTION = {
  "Gir": ["Gujarat", "Maharashtra", "Rajasthan"],
  "Sahiwal": ["Punjab", "UP", "Rajasthan"],
  "Red Sindhi": ["Punjab", "Kerala", "Tamil Nadu"],
  "Ongole": ["Andhra", "Tamil Nadu"],
  "Kangayam": ["Tamil Nadu", "Kerala"],
  "Hallikar": ["Karnataka", "Maharashtra"],
  "Tharparkar": ["Rajasthan", "Gujarat"],
  "Hariana": ["Punjab", "UP"],
  // Default for others
  "default": ["UP", "Andhra", "Karnataka"]
};

const VisualizationPage = () => {
  const [selectedBreed, setSelectedBreed] = useState("Gir");
  const [hoveredZone, setHoveredZone] = useState(null);

  // Get active zones for the selected breed
  const activeZones = BREED_DISTRIBUTION[selectedBreed] || BREED_DISTRIBUTION["default"];

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
             <Link to="/visualization" className="py-3 px-4 bg-[#FEF3C7] text-[#451A03] font-bold rounded-2xl shadow-lg transform scale-105">Visualization</Link>
             <Link to="/health" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Health Monitor</Link>
          </nav>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-64 p-8 lg:p-12 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 border-b border-[#E7E5E4] pb-6 flex-shrink-0">
          <div>
            <h1 className="font-['Outfit'] text-4xl font-bold text-[#292524]">Geospatial Tracking</h1>
            <p className="text-[#A8A29E] mt-2 font-bold text-xs tracking-widest uppercase">
              Real-time Distribution of 29 Indigenous Indian Breeds
            </p>
          </div>
          <div className="text-right">
             <div className="text-3xl font-['Outfit'] font-bold text-[#D97706]">29</div>
             <div className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Breeds Tracked</div>
          </div>
        </div>

        {/* --- CONTENT LAYOUT --- */}
        <div className="flex gap-8 h-full overflow-hidden">
          
          {/* LEFT PANEL: BREED SELECTOR LIST */}
          <div className="w-72 flex-shrink-0 flex flex-col bg-white border border-[#E7E5E4] rounded-3xl shadow-sm overflow-hidden h-full">
             <div className="p-5 border-b border-[#F5F5F4] bg-[#FAFAF9]">
                <span className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Select Indigenous Breed</span>
             </div>
             <div className="overflow-y-auto flex-1 p-2 space-y-1 custom-scrollbar">
                {INDIAN_BREEDS.map(breed => (
                   <button
                     key={breed}
                     onClick={() => setSelectedBreed(breed)}
                     className={`w-full text-left px-5 py-3 rounded-xl flex justify-between items-center transition-all duration-200
                        ${selectedBreed === breed 
                           ? "bg-[#292524] text-[#FEF3C7] shadow-md" 
                           : "text-[#44403C] hover:bg-[#F5F5F4]"}`
                     }
                   >
                      <span className="font-bold text-sm">{breed}</span>
                      {selectedBreed === breed && (
                         <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                      )}
                   </button>
                ))}
             </div>
          </div>

          {/* RIGHT PANEL: MAP VISUALIZATION */}
          <div className="flex-1 bg-[#292524] rounded-3xl shadow-2xl relative overflow-hidden flex items-center justify-center border border-[#44403C]">
             
             {/* BACKGROUND GRID EFFECT */}
             <div className="absolute inset-0 opacity-10" 
                  style={{backgroundImage: 'radial-gradient(#FEF3C7 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
             </div>

             {/* MAP CONTAINER */}
             <div className="relative w-[500px] h-[600px]">
                
                {/* SVG MAP OF INDIA (Simplified Outline) */}
                <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl">
                   <path 
                     d="M 140,10 L 180,20 L 220,50 L 260,60 L 320,80 L 300,120 L 340,140 L 300,180 L 280,250 L 260,300 L 240,400 L 200,480 L 160,490 L 120,440 L 100,350 L 60,280 L 20,220 L 40,180 L 80,150 L 100,100 L 120,50 Z" 
                     fill="#44403C" 
                     stroke="#57534E" 
                     strokeWidth="2"
                   />
                </svg>

                {/* INTERACTIVE MARKERS */}
                {Object.keys(MAP_LOCATIONS).map((zoneKey) => {
                  const isActive = activeZones.includes(zoneKey);
                  const coords = MAP_LOCATIONS[zoneKey];
                  
                  return (
                    <div
                      key={zoneKey}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                      onMouseEnter={() => setHoveredZone(zoneKey)}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      {/* Active Pulse Effect */}
                      {isActive && (
                        <>
                          <div className="absolute w-12 h-12 bg-[#D97706] rounded-full opacity-20 animate-ping"></div>
                          <div className="absolute w-12 h-12 bg-[#D97706] rounded-full opacity-10 animate-pulse"></div>
                        </>
                      )}

                      {/* The Dot */}
                      <div className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300
                        ${isActive 
                           ? "bg-[#FEF3C7] border-[#D97706] scale-125 shadow-[0_0_15px_rgba(217,119,6,0.6)]" 
                           : "bg-[#57534E] border-[#44403C] opacity-30 hover:opacity-100"}`
                      }></div>

                      {/* Hover Tooltip */}
                      {(hoveredZone === zoneKey || isActive) && (
                        <div className={`absolute left-6 top-0 bg-[#FDFCF8] px-3 py-2 rounded-xl shadow-lg border border-[#D97706] min-w-[120px] z-10 transition-all duration-300
                           ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"}`
                        }>
                           <span className="block text-[9px] font-bold text-[#A8A29E] uppercase tracking-widest mb-0.5">Region</span>
                           <span className="block font-['Outfit'] font-bold text-[#292524] text-sm whitespace-nowrap">{coords.label}</span>
                           {isActive && (
                             <div className="mt-1 pt-1 border-t border-[#E7E5E4] flex justify-between items-center">
                                <span className="text-[9px] text-[#D97706] font-bold">High Density</span>
                                <span className="text-[9px] text-[#292524] font-bold">120+</span>
                             </div>
                           )}
                        </div>
                      )}
                    </div>
                  );
                })}
             </div>

             {/* Live Status Indicator */}
             <div className="absolute top-6 right-6 bg-[#1C1917] px-4 py-2 rounded-full border border-[#44403C] flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">
                  Live Satellite Feed
                </span>
             </div>

             {/* Legend */}
             <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-[#FEF3C7] border border-[#D97706]"></span>
                   <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-wide">Active Population</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="w-3 h-3 rounded-full bg-[#57534E]"></span>
                   <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-wide">Inactive Zone</span>
                </div>
             </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default VisualizationPage;