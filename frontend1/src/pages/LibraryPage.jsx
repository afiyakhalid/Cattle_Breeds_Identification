import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- PROFESSIONAL MOCK DATA (With Stable, High-Quality Images) ---
// --- INDIAN BREEDS DATA (Local Files) ---
const MOCK_BREEDS = [
  { 
    id: 1, 
    name: "Gir", 
    category: "High-Yield Dairy", 
    origin: "Gujarat",
    price: "Premium",
    climate: "Hot / Tropical",
    milk_output: "High (A2 Milk)",
    image: "/breeds/gir.jpg", 
    description: "Famous for its distinct rounded forehead and long pendulous ears. Highly resistant to diseases and produces premium A2 milk.",
    traits: ["A2 Milk", "Heat Tolerant", "Docile"]
  },
  { 
    id: 2, 
    name: "Sahiwal", 
    category: "High-Yield Dairy", 
    origin: "Punjab",
    price: "Premium",
    climate: "Hot / Arid",
    milk_output: "High (High Fat)",
    image: "/breeds/sahiwal.jpg", 
    description: "One of the best dairy breeds in India. Known for tick resistance and ability to thrive in extreme heat while maintaining milk yield.",
    traits: ["Tick Resistant", "Heat Tolerance", "High Yield"]
  },
  { 
    id: 3, 
    name: "Red Sindhi", 
    category: "High-Yield Dairy", 
    origin: "Sindh / Punjab",
    price: "Moderate",
    climate: "Tropical",
    milk_output: "Moderate - High",
    image: "/breeds/red_sindhi.jpg", 
    description: "Compact red cattle widely used for crossbreeding. Very hardy and economical for small-scale dairy farmers.",
    traits: ["Hardy", "Red Coat", "Economic"]
  },
  { 
    id: 4, 
    name: "Ongole", 
    category: "Disease Resistant", 
    origin: "Andhra Pradesh",
    price: "Premium",
    climate: "Tropical",
    milk_output: "Dual Purpose",
    image: "/breeds/ongole.jpg", 
    description: "Majestic white cattle known for immense strength and disease resistance. Historically exported to America to create the Brahman breed.",
    traits: ["Strong Immunity", "Large Frame", "Dual Purpose"]
  },
  { 
    id: 5, 
    name: "Tharparkar", 
    category: "Regional Adaptation", 
    origin: "Rajasthan",
    price: "Moderate",
    climate: "Desert / Arid",
    milk_output: "Moderate",
    image: "/breeds/tharparkar.jpg", 
    description: "The 'White Pearl' of the desert. Can survive on scarce fodder and water during droughts while still producing milk.",
    traits: ["Drought Resistant", "Disease Resistant", "White Coat"]
  },
  { 
    id: 6, 
    name: "Kankrej", 
    category: "Regional Adaptation", 
    origin: "Gujarat",
    price: "Moderate",
    climate: "Hot / Humid",
    milk_output: "Dual Purpose",
    image: "/breeds/kankrej.jpg", 
    description: "One of the heaviest Indian breeds with massive, lyre-shaped horns. Known for its unique 'Sawai' gait (smooth walk).",
    traits: ["Heavy Draft", "Large Horns", "Unique Gait"]
  },
  { 
    id: 7, 
    name: "Hallikar", 
    category: "Economic Entry", 
    origin: "Karnataka",
    price: "Budget",
    climate: "Semi-Arid",
    milk_output: "Draft Focus",
    image: "/breeds/hallikar.jpg", 
    description: "The pride of Karnataka. Best known for draft power and endurance in the field rather than high milk volumes.",
    traits: ["Draft Power", "Agile", "Low Maintenance"]
  },
  { 
    id: 8, 
    name: "Vechur", 
    category: "Economic Entry", 
    origin: "Kerala",
    price: "Premium (Rare)",
    climate: "Hot / Humid",
    milk_output: "Low (Medicinal)",
    image: "/breeds/vechur.jpg", 
    description: "The world's smallest cattle breed. Requires minimal feed and its milk is considered medicinal and easily digestible.",
    traits: ["Miniature", "Medicinal Milk", "Zero Maintenance"]
  }
];

const CATEGORIES = [
  { id: "All", label: "Full Library", desc: "View all available breeds" },
  { id: "High-Yield Dairy", label: "High-Yield Dairy", desc: "Top milk volume producers" },
  { id: "Regional Adaptation", label: "Regional Adaptation", desc: "Breeds for specific climates" },
  { id: "Disease Resistant", label: "Disease Resistant", desc: "Hardy & low maintenance" },
  { id: "Economic Entry", label: "Economic Entry", desc: "Budget-friendly options" }
];

const LibraryPage = () => {
  const [breeds, setBreeds] = useState(MOCK_BREEDS);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState(""); 
  const [selectedBreed, setSelectedBreed] = useState(null);

  // --- FILTER LOGIC ---
  const filteredBreeds = breeds.filter((breed) => {
    // 1. Category
    const matchesCategory = activeCategory === "All" || breed.category === activeCategory;
    
    // 2. Search
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 3. Location (Smart Match)
    let matchesLocation = true;
    if (activeCategory === "Regional Adaptation" && locationFilter) {
       const loc = locationFilter.toLowerCase();
       const climate = breed.climate.toLowerCase();
       const origin = breed.origin.toLowerCase();
       
       const isHot = loc.includes("delhi") || loc.includes("hot") || loc.includes("tropical") || loc.includes("india");
       const isCold = loc.includes("cold") || loc.includes("snow") || loc.includes("highland");

       if (isHot) {
         matchesLocation = climate.includes("hot") || climate.includes("tropical") || climate.includes("heat");
       } else if (isCold) {
         matchesLocation = climate.includes("cold") || climate.includes("extreme");
       } else {
         matchesLocation = climate.includes(loc) || origin.includes(loc);
       }
    }

    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="flex min-h-screen bg-[#FDFCF8] font-['DM_Sans'] text-[#44403C]">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#292524] fixed h-full z-20 flex flex-col justify-between py-8 px-6 shadow-xl rounded-r-3xl">
        <div>
          <h1 className="font-['Fredoka'] text-3xl text-[#FEF3C7] mb-12 tracking-wide">MOOVVIEW</h1>
          <nav className="flex flex-col gap-3 font-['DM_Sans']">
             <Link to="/dashboard" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Dashboard</Link>
             <Link to="/predict" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Prediction</Link>
             <Link to="/library" className="py-3 px-4 bg-[#FEF3C7] text-[#451A03] font-bold rounded-2xl shadow-lg transform scale-105">Breed Library</Link>
             <Link to="/history" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">History Logs</Link>
             <Link to="/health" className="py-3 px-4 text-[#D6D3D1] hover:text-white rounded-2xl transition">Health Monitor</Link>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8 lg:p-12 relative">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h1 className="font-['Outfit'] text-5xl font-bold text-[#292524]">Cattle Library</h1>
            <p className="text-[#A8A29E] mt-2 font-bold text-xs tracking-widest uppercase">
              Professional Breed Encyclopedia
            </p>
          </div>
          
          <div className="w-full md:w-96">
            <input 
               type="text" 
               placeholder="SEARCH LIBRARY..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-6 pr-4 py-4 bg-white border border-[#E7E5E4] text-xs font-bold tracking-wide rounded-full focus:border-[#D97706] outline-none placeholder-[#D6D3D1] shadow-sm transition-all focus:shadow-md"
            />
          </div>
        </div>

        {/* FOLDERS */}
        <div className="mb-10">
           <h3 className="font-['Outfit'] text-xl font-bold text-[#292524] mb-6">Select Category</h3>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {CATEGORIES.map((cat) => (
                <button 
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setLocationFilter(""); }}
                  className={`group relative p-6 h-36 rounded-3xl text-left transition-all duration-300 border overflow-hidden flex flex-col justify-between
                    ${activeCategory === cat.id 
                        ? "bg-[#292524] text-[#FEF3C7] border-[#292524] shadow-xl scale-105 z-10" 
                        : "bg-white text-[#44403C] border-[#E7E5E4] hover:border-[#D97706] hover:shadow-lg"
                    }`}
                >
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${activeCategory === cat.id ? "text-[#A8A29E]" : "text-[#D97706]"}`}>Folder</span>
                  <div>
                    <span className="font-['Outfit'] text-lg font-bold leading-tight block mb-1">{cat.label}</span>
                    <span className={`text-[10px] font-medium leading-tight block ${activeCategory === cat.id ? "text-[#A8A29E]" : "text-[#A8A29E]"}`}>
                        {cat.desc}
                    </span>
                  </div>
                </button>
              ))}
           </div>
        </div>

        {/* REGIONAL DRILL-DOWN */}
        {activeCategory === "Regional Adaptation" && (
           <div className="mb-10 bg-[#FEF3C7] p-8 rounded-3xl border border-[#FDE68A] animate-fade-in">
              <h3 className="font-['Outfit'] text-2xl font-bold text-[#92400E] mb-2">Regional Drill-Down</h3>
              <p className="text-[#B45309] text-sm mb-4 font-medium">Which climate or region are you farming in?</p>
              <div className="flex gap-4">
                 <input 
                   type="text" 
                   placeholder="e.g. Delhi, Cold, Tropical..." 
                   value={locationFilter}
                   onChange={(e) => setLocationFilter(e.target.value)}
                   className="flex-1 px-6 py-3 bg-white border border-[#FDE68A] rounded-xl text-sm font-bold text-[#451A03] outline-none focus:ring-2 focus:ring-[#D97706]"
                 />
              </div>
           </div>
        )}

        {/* GRID */}
        <div className="space-y-6">
           {loading ? (
              <div className="py-20 text-center text-[#A8A29E] font-bold uppercase tracking-widest animate-pulse">Loading...</div>
           ) : filteredBreeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {filteredBreeds.map((breed) => (
                    <div 
                        key={breed.id} 
                        onClick={() => setSelectedBreed(breed)}
                        className="group bg-white rounded-[2.5rem] border border-[#E7E5E4] overflow-hidden hover:shadow-2xl hover:border-[#D97706] transition-all duration-300 cursor-pointer"
                    >
                       <div className="h-64 w-full overflow-hidden relative">
                          <img src={breed.image} alt={breed.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                          <div className="absolute top-4 left-4 bg-[#292524]/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#FEF3C7] shadow-lg">
                             {breed.origin}
                          </div>
                       </div>
                       <div className="p-8">
                          <h4 className="font-['Outfit'] text-2xl font-bold text-[#292524] mb-2">{breed.name}</h4>
                          <p className="text-[#78716C] text-sm font-medium leading-relaxed mb-6 line-clamp-2">{breed.description}</p>
                          <div className="flex items-center justify-between border-t border-[#F5F5F4] pt-4">
                              <span className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">{breed.category}</span>
                              <span className="text-xs font-bold text-[#D97706] uppercase tracking-wide group-hover:underline">View &rarr;</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           ) : (
              <div className="py-24 text-center border-2 border-dashed border-[#E7E5E4] rounded-3xl">
                 <p className="text-[#A8A29E] font-bold uppercase tracking-widest text-xs">
                    {activeCategory === "Regional Adaptation" && locationFilter 
                       ? `No matching breeds for region "${locationFilter}"` 
                       : "No breeds found"}
                 </p>
              </div>
           )}
        </div>

        {/* MODAL */}
        {selectedBreed && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292524]/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-[#FDFCF8] rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
                 <button 
                    onClick={() => setSelectedBreed(null)}
                    className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#292524] shadow-lg hover:bg-[#F5F5F4]"
                 >✕</button>
                 <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                    <img src={selectedBreed.image} alt={selectedBreed.name} className="w-full h-full object-cover"/>
                 </div>
                 <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#FDFCF8]">
                    <span className="inline-block px-3 py-1 bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">{selectedBreed.category}</span>
                    <h2 className="font-['Outfit'] text-4xl font-bold text-[#292524] mb-4">{selectedBreed.name}</h2>
                    <p className="text-[#78716C] font-medium leading-relaxed mb-8 text-lg">{selectedBreed.description}</p>
                    <div className="grid grid-cols-2 gap-6 mb-8">
                       <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4]"><span className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-1">Origin</span><span className="font-bold text-[#292524] text-lg">{selectedBreed.origin}</span></div>
                       <div className="p-4 bg-white rounded-2xl border border-[#E7E5E4]"><span className="block text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest mb-1">Climate</span><span className="font-bold text-[#292524] text-lg">{selectedBreed.climate}</span></div>
                    </div>
                 </div>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

export default LibraryPage;