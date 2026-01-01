import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Heart, Leaf, Search, ShieldCheck, Smile 
} from "lucide-react";

// Colors borrowed from your reference:
// Background: #F9F4EF (Cream)
// Dark Text: #2D2424 (Warm Black)
// Accent: #D97757 (Terracotta/Burnt Orange) for buttons
// Secondary BG: #FBEFCA (Soft Yellow)
// Footer BG: #261F1D (Deep Brown)

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F9F4EF] font-sans text-[#2D2424] overflow-x-hidden selection:bg-[#FBEFCA]">
      
      {/* --- FLOATING PILL NAVBAR --- */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="bg-white/90 backdrop-blur-sm shadow-sm rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl border border-[#F0EBE6]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#D97757] rounded-full flex items-center justify-center text-white font-['Fredoka'] text-lg pt-1 group-hover:rotate-12 transition">
              M
            </div>
            <span className="font-['Outfit'] font-bold text-xl tracking-tight text-[#2D2424]">
              MoovView
            </span>
          </Link>

          {/* Links (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-8 font-['DM_Sans'] font-medium text-sm text-[#5A4E4E]">
            <Link to="/about" className="hover:text-[#D97757] transition">Our Mission</Link>
            <Link to="/library" className="hover:text-[#D97757] transition">Breeds</Link>
            <Link to="/health" className="hover:text-[#D97757] transition">Farmers</Link>
            <Link to="/blog" className="hover:text-[#D97757] transition">Stories</Link>
          </div>

          {/* CTA Button */}
          <Link 
            to="/auth" 
            className="bg-[#2D2424] hover:bg-[#D97757] text-white px-6 py-2.5 rounded-full font-['Outfit'] font-semibold text-sm transition-all transform hover:scale-105"
          >
            SignUp/Login
          </Link>
        </nav>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
        <p className="font-['DM_Sans'] text-xs font-bold tracking-[0.2em] text-[#8C7E7E] uppercase mb-6">
          PRECISION BY DESIGN. NATURAL BY NATURE.
        </p>
        
        <h1 className="font-['Outfit'] font-extrabold text-5xl md:text-7xl leading-[1.1] mb-8 text-[#2D2424]">
          A gentle space for growing herds — rooted in 
          <span className="text-[#D97757]"> warmth</span>, 
          <span className="text-[#6B8E23]"> nature</span>, and 
          everyday discovery.
        </h1>

        <p className="font-['DM_Sans'] text-lg md:text-xl text-[#5A4E4E] max-w-2xl mx-auto leading-relaxed mb-12">
          Where computer vision becomes learning, and farming feels like harmony. 
          Identify breeds and monitor health with a single, kind glance.
        </p>
      </header>

      {/* --- ICON GRID (The 4 Icons) --- */}
      {/* <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
        <Feature 
          icon={<Smile className="text-[#D97757]" size={32}/>} 
          title="BREED ID"
          desc="Instant recognition that sees every animal as an individual."
        />
        <Feature 
          icon={<Leaf className="text-[#6B8E23]" size={32}/>} 
          title="NATURE FIRST"
          desc="Non-invasive monitoring that respects the herd's peace."
        />
        <Feature 
          icon={<Heart className="text-[#E09F3E]" size={32}/>} 
          title="HEALTH CHECK"
          desc="Early detection built on kindness and curiosity."
        />
        <Feature 
          icon={<ShieldCheck className="text-[#5D8AA8]" size={32}/>} 
          title="SECURE DATA"
          desc="Your farm's legacy protected with gentle strength."
        />
      </section> */}
      <section className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-4 gap-8">
  <FeatureCard 
    image="/breeds/cute1.jpg"
    title="BREED ID"
    desc="Instant recognition that sees every animal as an individual."
  />
  <FeatureCard 
    image="/breeds/cute2.jpg"
    title="NATURE FIRST"
    desc="Non-invasive monitoring that respects the herd's peace."
  />
  <FeatureCard 
    image="/breeds/cute3.jpg"
    title="HEALTH CHECK"
    desc="Early detection built on kindness and curiosity."
  />
  <FeatureCard 
    image="https://images.unsplash.com/photo-1614064641938-3bbee52942c7"
    title="SECURE DATA"
    desc="Your farm's legacy protected with quiet, modern security."
  />
</section>


      {/* --- WAVY SEPARATOR (SVG) --- */}
      {/* This mimics the "Curiosity, Kindness" wave text from your image */}
      <div className="w-full overflow-hidden bg-[#FBEFCA] py-20 relative">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-[#F9F4EF]">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>

        {/* Floating Text on the "Wave" Background */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex items-center justify-center min-h-[300px]">
           <h2 className="font-['Outfit'] text-4xl md:text-6xl font-bold text-[#2D2424] text-center rotate-[-2deg] leading-tight">
             create space for <br className="md:hidden"/>
             <span className="bg-[#D97757] text-white px-4 py-1 rounded-full mx-2 rotate-2 inline-block">precision,</span> 
             insight, and <br/>
             <span className="relative inline-block mt-2">
                calm discovery.
                {/* Underline Doodle */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#2D2424]" viewBox="0 0 100 10" preserveAspectRatio="none">
                   <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
             </span>
           </h2>
        </div>
      </div>

      {/* --- PHOTO & PHILOSOPHY SECTION (Yellow BG) --- */}
      <section className="bg-[#FBEFCA] pb-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          
          {/* Left: Image with "Tape" effect */}
          <div className="w-full md:w-1/2 relative">
             <div className="relative z-10 rotate-[-2deg] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/breeds/big1.jpg" 
                  alt="Cattle in field" 
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
             </div>
             {/* Tape Graphic */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#F4E3C1]/80 rotate-2 z-20 backdrop-blur-sm shadow-sm"></div>
             
             {/* Cute Doodle */}
             <div className="absolute -bottom-10 -left-10 text-[#D97757]">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                   <circle cx="50" cy="50" r="30" />
                   <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50 M22 22 L29 29 M71 71 L78 78 M22 78 L29 71 M71 29 L78 22" />
                </svg>
             </div>
          </div>

          {/* Right: Text */}
          <div className="w-full md:w-1/2">
            <div className="bg-white inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-6 border border-[#2D2424]/10">
              OUR PHILOSOPHY
            </div>
            <h2 className="font-['Outfit'] text-5xl font-bold mb-8 leading-tight text-[#2D2424]">
              Livestock deserves <br/>
              presence — not <br/>
              performance.
            </h2>
            <p className="font-['DM_Sans'] text-lg text-[#5A4E4E] leading-relaxed mb-8">
              At MoovView, we believe that farming isn't about hitting aggressive metrics — it's about meaningful moments. We slow down the pace of technology to create space for accuracy, kindness, and deep understanding of your herd.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 bg-[#2D2424] text-[#F9F4EF] px-8 py-4 rounded-full font-bold hover:bg-[#D97757] transition shadow-lg">
              Read Our Story <ArrowRight size={18}/>
            </Link>
          </div>

        </div>
      </section>

      {/* --- STATS SECTION (Dark Footer Style) --- */}
      <section className="bg-[#261F1D] text-[#F9F4EF] py-24 relative overflow-hidden">
         {/* Top Curve for smooth transition */}
         <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[40px] fill-[#FBEFCA]">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
                <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
                <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
            </svg>
         </div>

         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-10">
            <Stat number="98%" label="Accuracy Rate" />
            <Stat number="0%" label="Stress for Cattle" />
            <Stat number="100%" label="Secure & Private" />
            <Stat number="24/7" label="Peace of Mind" />
         </div>

         {/* Footer Bottom */}
         <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-white/40 font-['DM_Sans']">
            <p>© 2024 MoovView Inc. Grown in Brooklyn.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-white transition">Privacy</a>
               <a href="#" className="hover:text-white transition">Terms</a>
               <a href="#" className="hover:text-white transition">Instagram</a>
            </div>
         </div>
      </section>

    </div>
  );
};

// --- HELPER COMPONENTS ---

// const Feature = ({ icon, title, desc }) => (
//   <div className="flex flex-col items-center">
//     <div className="mb-6 opacity-90 transform hover:scale-110 transition duration-300">
//       {icon}
//     </div>
//     <h3 className="font-['Outfit'] font-bold text-lg mb-3 tracking-wide">{title}</h3>
//     <p className="font-['DM_Sans'] text-[#5A4E4E] leading-snug max-w-[200px] mx-auto">
//       {desc}
//     </p>
//   </div>
// );
const FeatureCard = ({ image, title, desc }) => (
  <div className="bg-white rounded-3xl p-6 text-center shadow-sm border border-[#F0EBE6] hover:shadow-md transition group">
    
    <div className="w-full h-36 rounded-2xl overflow-hidden mb-6">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
    </div>

    <h3 className="font-['Outfit'] font-bold text-lg mb-3 tracking-wide">
      {title}
    </h3>

    <p className="font-['DM_Sans'] text-[#5A4E4E] leading-snug text-sm">
      {desc}
    </p>
  </div>
);


const Stat = ({ number, label }) => (
  <div>
    <div className="font-['Outfit'] font-bold text-5xl md:text-6xl mb-2 text-[#FBEFCA]">
      {number}
    </div>
    <div className="font-['DM_Sans'] font-medium text-white/70">
      {label}
    </div>
  </div>
);

export default Home;