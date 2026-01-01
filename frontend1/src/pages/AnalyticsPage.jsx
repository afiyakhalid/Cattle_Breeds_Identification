// import React from "react";
// import { 
//   PieChart, Pie, Cell, AreaChart, Area, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis
// } from "recharts";
// import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";

// // --- MOCK DATA (Guaranteed to show up) ---

// // 1. Donut Chart Data
// const BREED_DATA = [
//   { name: "Angus", value: 25.5, color: "#FF6B6B" },   // Red/Salmon
//   { name: "Hereford", value: 18.6, color: "#FFD93D" }, // Yellow
//   { name: "Jersey", value: 3.9, color: "#6BCB77" },    // Green
//   { name: "Holstein", value: 3.2, color: "#E0E0E0" },  // Grey
// ];

// // 2. Flow/Area Chart Data
// const HEALTH_FLOW_DATA = [
//   { name: "Mon", healthy: 40, sick: 24, recovered: 24 },
//   { name: "Tue", healthy: 30, sick: 13, recovered: 22 },
//   { name: "Wed", healthy: 20, sick: 48, recovered: 22 },
//   { name: "Thu", healthy: 27, sick: 39, recovered: 20 },
//   { name: "Fri", healthy: 18, sick: 48, recovered: 21 },
//   { name: "Sat", healthy: 23, sick: 38, recovered: 25 },
//   { name: "Sun", healthy: 34, sick: 43, recovered: 21 },
// ];

// // 3. Line Chart Data
// const YIELD_TREND_DATA = [
//   { name: 'Jan', value: 30 },
//   { name: 'Feb', value: 32 },
//   { name: 'Mar', value: 45 },
//   { name: 'Apr', value: 50 },
//   { name: 'May', value: 85 }, // The peak
//   { name: 'Jun', value: 70 },
// ];

// const AnalyticsPage = () => {
//   return (
//     <div className="min-h-screen bg-[#F0F2F5] font-['DM_Sans'] text-[#2D3436] p-6 lg:p-10">
      
//       {/* HEADER SECTION */}
//       <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
//         <div>
//           <h1 className="font-['Outfit'] text-4xl font-extrabold text-[#2D3436] mb-1">
//             Farm Analytics
//           </h1>
//           <p className="text-[#636E72] font-medium">Your Herd Statistics</p>
//         </div>

//         {/* Top Stats Row */}
//         <div className="flex flex-wrap gap-8 bg-transparent">
//           <StatBox label="Total Herd" value="120" sub="$22.5M Value" />
//           <StatBox label="New Calves" value="8" sub="+2 this week" />
//           <StatBox label="Health Alerts" value="112" sub="$17.5M Risk" />
//         </div>
//       </header>

//       {/* --- MAIN GRID LAYOUT --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
//         {/* 1. BREED DISTRIBUTION (Donut Chart) - Spans 4 columns */}
//         <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm relative flex flex-col justify-between">
//           <div className="flex justify-between items-start mb-4">
//             <h3 className="font-['Outfit'] text-xl font-bold">Breeds by Value</h3>
//             <div className="flex gap-2">
//                <span className="px-3 py-1 bg-gray-50 rounded-full text-xs font-bold text-gray-500 flex items-center gap-1">
//                  This month
//                </span>
//                <button className="text-gray-400"><MoreHorizontal size={20}/></button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//              {/* The Donut */}
//              <div className="w-40 h-40 relative">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={BREED_DATA}
//                       innerRadius={55}
//                       outerRadius={75}
//                       startAngle={90}
//                       endAngle={-270}
//                       dataKey="value"
//                       stroke="none"
//                     >
//                       {BREED_DATA.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                   </PieChart>
//                 </ResponsiveContainer>
//                 {/* Center Text */}
//                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//                   <span className="font-['Outfit'] text-2xl font-bold text-[#2D3436]">$25.5M</span>
//                   <span className="text-[10px] text-gray-400 font-bold uppercase">Total Amount</span>
//                 </div>
//              </div>

//              {/* The Legend */}
//              <div className="flex flex-col gap-3">
//                 {BREED_DATA.map((item) => (
//                   <div key={item.name} className="flex items-center justify-between w-32">
//                      <div className="flex items-center gap-2">
//                        <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
//                        <span className="text-xs font-bold text-gray-600">{item.name}</span>
//                      </div>
//                      <span className="text-xs font-bold text-[#2D3436]">${item.value}M</span>
//                   </div>
//                 ))}
//              </div>
//           </div>
//         </div>

//         {/* 2. MAP PREVIEW (Static Image) - Spans 8 columns */}
//         <div className="lg:col-span-8 bg-white p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
//            <div className="flex justify-between items-start mb-4 relative z-10">
//             <h3 className="font-['Outfit'] text-xl font-bold">Grazing Heatmap</h3>
//             <div className="flex gap-2">
//                <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-100">
//                  This month
//                </span>
//                <button className="text-gray-400 bg-white/50 rounded-full p-1"><MoreHorizontal size={20}/></button>
//             </div>
//           </div>

//           {/* STATIC MAP IMAGE */}
//           <div className="absolute inset-0 top-16 m-4 rounded-[1.5rem] overflow-hidden">
//              <img 
//                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" 
//                alt="Field Map" 
//                className="w-full h-full object-cover opacity-90"
//              />
//              {/* Overlay Gradient for readability */}
//              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
             
//              {/* Fake Map Markers */}
//              <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-green-400/30 rounded-full blur-2xl"></div>
//              <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-red-400/30 rounded-full blur-3xl"></div>
             
//              {/* Map Controls UI */}
//              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
//                <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 font-bold">+</button>
//                <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 font-bold">-</button>
//              </div>
             
//              {/* Map Legend */}
//              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-sm text-xs space-y-1">
//                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> &lt; 60% Grazed</div>
//                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> &lt; 40% Grazed</div>
//                 <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> &lt; 20% Grazed</div>
//              </div>
//           </div>
//         </div>

//         {/* 3. FLOW DETAILS (Stacked Area Chart) - Spans 6 columns */}
//         <div className="lg:col-span-6 bg-white p-8 rounded-[2rem] shadow-sm">
//            <div className="flex justify-between items-center mb-8">
//               <div>
//                 <h3 className="font-['Outfit'] text-xl font-bold">Health Flow Details</h3>
//                 <div className="flex gap-8 mt-4">
//                   <div>
//                     <span className="block text-2xl font-bold text-[#2D3436]">27.8 K</span>
//                     <span className="text-xs text-gray-400 font-bold uppercase">Scans</span>
//                   </div>
//                   <div>
//                     <span className="block text-2xl font-bold text-[#2D3436]">67 %</span>
//                     <span className="text-xs text-gray-400 font-bold uppercase">Healthy</span>
//                   </div>
//                   <div>
//                     <span className="block text-2xl font-bold text-[#2D3436]">24 %</span>
//                     <span className="text-xs text-gray-400 font-bold uppercase">Sick</span>
//                   </div>
//                 </div>
//               </div>
//               <button className="text-gray-400"><MoreHorizontal size={20}/></button>
//            </div>
           
//            <div className="h-48">
//              <ResponsiveContainer width="100%" height="100%">
//                <AreaChart data={HEALTH_FLOW_DATA} stackOffset="expand">
//                  <defs>
//                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
//                      <stop offset="5%" stopColor="#55EFC4" stopOpacity={0.8}/>
//                      <stop offset="95%" stopColor="#55EFC4" stopOpacity={0}/>
//                    </linearGradient>
//                    <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
//                      <stop offset="5%" stopColor="#FF7675" stopOpacity={0.8}/>
//                      <stop offset="95%" stopColor="#FF7675" stopOpacity={0}/>
//                    </linearGradient>
//                    <linearGradient id="colorYellow" x1="0" y1="0" x2="0" y2="1">
//                      <stop offset="5%" stopColor="#FFEAA7" stopOpacity={0.8}/>
//                      <stop offset="95%" stopColor="#FFEAA7" stopOpacity={0}/>
//                    </linearGradient>
//                  </defs>
//                  <Area type="monotone" dataKey="healthy" stackId="1" stroke="#00B894" fill="url(#colorGreen)" strokeWidth={0} />
//                  <Area type="monotone" dataKey="recovered" stackId="1" stroke="#FDCB6E" fill="url(#colorYellow)" strokeWidth={0} />
//                  <Area type="monotone" dataKey="sick" stackId="1" stroke="#D63031" fill="url(#colorRed)" strokeWidth={0} />
//                </AreaChart>
//              </ResponsiveContainer>
//              {/* Custom X Axis labels simulation */}
//              <div className="flex justify-between px-4 mt-2 text-xs font-bold text-gray-400">
//                 <span>39%</span><span>45%</span><span>57%</span><span>50%</span><span>75%</span>
//              </div>
//            </div>
//         </div>

//         {/* 4. LINE CHART TREND - Spans 6 columns */}
//         <div className="lg:col-span-6 bg-white p-8 rounded-[2rem] shadow-sm flex flex-col justify-between">
//            <div className="flex justify-between items-start mb-4">
//             <h3 className="font-['Outfit'] text-xl font-bold">New Request Trend</h3>
//             <button className="text-gray-400"><MoreHorizontal size={20}/></button>
//            </div>
           
//            <div className="h-48 w-full">
//              <ResponsiveContainer width="100%" height="100%">
//                <LineChart data={YIELD_TREND_DATA}>
//                  {/* Secondary gray lines to mimic the reference chart's "background" lines */}
//                  <Line type="monotone" dataKey="value" stroke="#E0E0E0" strokeWidth={4} strokeDasharray="0" dot={false} 
//                    data={YIELD_TREND_DATA.map(d => ({...d, value: d.value * 0.4}))} 
//                  />
//                  <Line type="monotone" dataKey="value" stroke="#E0E0E0" strokeWidth={4} strokeDasharray="0" dot={false} 
//                    data={YIELD_TREND_DATA.map(d => ({...d, value: d.value * 0.7}))} 
//                  />
                 
//                  {/* Main Red Line */}
//                  <Line 
//                    type="monotone" 
//                    dataKey="value" 
//                    stroke="#FF7675" 
//                    strokeWidth={5} 
//                    dot={false}
//                    activeDot={{ r: 8 }}
//                  />
//                  {/* The "Current" Dot simulation */}
//                  <ReferenceDot x="May" y={85} />
//                </LineChart>
//              </ResponsiveContainer>
//            </div>
           
//            <div className="h-8 border-l-2 border-gray-200 ml-4 pl-4 flex items-center gap-8 mt-2">
//               <div className="w-full h-1 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // --- SUB-COMPONENTS ---

// const StatBox = ({ label, value, sub }) => (
//   <div className="flex flex-col">
//      <div className="flex justify-between w-48 text-xs font-bold text-gray-400 uppercase mb-1">
//        <span>{label}</span>
//      </div>
//      <div className="flex items-center gap-3">
//         <span className="text-2xl font-['Outfit'] font-bold text-[#2D3436]">{value} req.</span>
//         <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-bold text-gray-500">{sub}</span>
//      </div>
//   </div>
// );

// // Helper for the custom dot on the line chart (simplification)
// const ReferenceDot = (props) => {
//    // This is a placeholder; Recharts handles dots internally usually, 
//    // but this function prevents errors if you tried to use a custom component directly.
//    return null; 
// };

// export default AnalyticsPage;
import React, { useState, useEffect } from "react";
import { 
  PieChart, Pie, Cell, AreaChart, Area, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid
} from "recharts";
import { MoreHorizontal } from "lucide-react";

// --- UPDATED MOCK DATA (INDIAN BREEDS) ---

// 1. Donut Chart: Value/Distribution of Indian Breeds
const BREED_DATA = [
  { name: "Gir", value: 45, color: "#78350F" },       // Dark Brown
  { name: "Sahiwal", value: 30, color: "#D97706" },   // Amber
  { name: "Ongole", value: 15, color: "#FCD34D" },    // Light Yellow
  { name: "Red Sindhi", value: 10, color: "#A8A29E" },// Stone
];

// 2. Trend Chart: Logical "Scan Volume" increasing over time
const SCAN_ACTIVITY_DATA = [
  { month: 'Jan', scans: 45 },
  { month: 'Feb', scans: 52 },
  { month: 'Mar', scans: 48 }, // Slight dip
  { month: 'Apr', scans: 70 }, // Growth
  { month: 'May', scans: 92 }, // Peak season
  { month: 'Jun', scans: 120 },// Current
];

const HEALTH_FLOW_DATA = [
  { name: "Week 1", healthy: 40, sick: 5, attention: 10 },
  { name: "Week 2", healthy: 42, sick: 3, attention: 12 },
  { name: "Week 3", healthy: 35, sick: 8, attention: 15 },
  { name: "Week 4", healthy: 50, sick: 2, attention: 5 },
];

const AnalyticsPage = () => {
  const [totalScans, setTotalScans] = useState(0);
  const [loading, setLoading] = useState(true);

  // --- FETCH REAL DATA (For Total Count) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/history");
        if (response.ok) {
          const data = await response.json();
          setTotalScans(data.length); 
        } else {
          setTotalScans(128); // Fallback
        }
      } catch (error) {
        console.error("Backend offline, using fallback.");
        setTotalScans(128); 
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F2F5] font-['DM_Sans'] text-[#2D3436] p-6 lg:p-10">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="font-['Outfit'] text-4xl font-extrabold text-[#2D3436] mb-1">
            Farm Analytics
          </h1>
          <p className="text-[#636E72] font-medium">Real-time Herd Statistics</p>
        </div>

        <div className="flex flex-wrap gap-8 bg-transparent">
          <StatBox label="Total Scans" value={loading ? "..." : totalScans} sub="Verified Logs" />
          <StatBox label="Active Herd" value="42" sub="Indigenous Breeds" />
          <StatBox label="Health Alerts" value="3" sub="Action Required" />
        </div>
      </header>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. INDIAN BREED DISTRIBUTION */}
        <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm relative flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-['Outfit'] text-xl font-bold">Breed Composition</h3>
            <button className="text-gray-400"><MoreHorizontal size={20}/></button>
          </div>

          <div className="flex items-center justify-between">
             <div className="w-40 h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={BREED_DATA}
                      innerRadius={55}
                      outerRadius={75}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                    >
                      {BREED_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-['Outfit'] text-2xl font-bold text-[#2D3436]">100%</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Indigenous</span>
                </div>
             </div>

             <div className="flex flex-col gap-3">
                {BREED_DATA.map((item) => (
                  <div key={item.name} className="flex items-center justify-between w-32">
                     <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full" style={{backgroundColor: item.color}}></span>
                       <span className="text-xs font-bold text-gray-600">{item.name}</span>
                     </div>
                     <span className="text-xs font-bold text-[#2D3436]">{item.value}%</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* 2. STATIC MAP */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-['Outfit'] text-xl font-bold">Grazing Heatmap</h3>
            <button className="text-gray-400 bg-white/50 rounded-full p-1"><MoreHorizontal size={20}/></button>
          </div>

          <div className="absolute inset-0 top-16 m-4 rounded-[1.5rem] overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" 
               alt="Field Map" 
               className="w-full h-full object-cover opacity-90"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
             
             {/* Map Markers */}
             <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-green-400/40 rounded-full blur-xl animate-pulse"></div>
             <div className="absolute top-1/2 right-1/3 w-40 h-40 bg-red-400/40 rounded-full blur-2xl animate-pulse"></div>
             
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-sm text-xs space-y-1">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> &lt; 60% Grazed</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> &lt; 20% Grazed</div>
             </div>
          </div>
        </div>

        {/* 3. HEALTH FLOW */}
        <div className="lg:col-span-6 bg-white p-8 rounded-[2rem] shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-['Outfit'] text-xl font-bold">Health Flow</h3>
                <div className="flex gap-8 mt-4">
                  <div>
                    <span className="block text-2xl font-bold text-[#2D3436]">
                        {loading ? "..." : totalScans}
                    </span>
                    <span className="text-xs text-gray-400 font-bold uppercase">Total Logs</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#2D3436]">92%</span>
                    <span className="text-xs text-gray-400 font-bold uppercase">Optimal</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400"><MoreHorizontal size={20}/></button>
           </div>
           
           <div className="h-48">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={HEALTH_FLOW_DATA} stackOffset="expand">
                 <defs>
                   <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#55EFC4" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#55EFC4" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#FF7675" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#FF7675" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <Area type="monotone" dataKey="healthy" stackId="1" stroke="#00B894" fill="url(#colorGreen)" />
                 <Area type="monotone" dataKey="sick" stackId="1" stroke="#FF7675" fill="url(#colorRed)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* 4. SCAN ACTIVITY TREND (Fixed) */}
        <div className="lg:col-span-6 bg-white p-8 rounded-[2rem] shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start mb-4">
            <h3 className="font-['Outfit'] text-xl font-bold">Monthly Scan Activity</h3>
            <button className="text-gray-400"><MoreHorizontal size={20}/></button>
           </div>
           
           <div className="h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={SCAN_ACTIVITY_DATA}>
                 <defs>
                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7675" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF7675" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none' }}
                    labelStyle={{ color: '#A8A29E', fontSize: '12px', fontWeight: 'bold' }}
                 />
                 <XAxis dataKey="month" hide />
                 <Area 
                   type="monotone" 
                   dataKey="scans" 
                   stroke="#FF7675" 
                   strokeWidth={4} 
                   fill="url(#colorActivity)" 
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
           
           <div className="flex justify-between items-center px-4 mt-2">
              <span className="text-xs font-bold text-gray-400 uppercase">Jan</span>
              <span className="text-xs font-bold text-gray-400 uppercase">Jun</span>
           </div>
        </div>

      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const StatBox = ({ label, value, sub }) => (
  <div className="flex flex-col">
     <div className="flex justify-between w-48 text-xs font-bold text-gray-400 uppercase mb-1">
       <span>{label}</span>
     </div>
     <div className="flex items-center gap-3">
        <span className="text-2xl font-['Outfit'] font-bold text-[#2D3436]">{value}</span>
        <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-bold text-gray-500">{sub}</span>
     </div>
  </div>
);

export default AnalyticsPage;