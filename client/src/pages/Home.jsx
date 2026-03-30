import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { Sparkles, ArrowRight, UtensilsCrossed } from "lucide-react";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      alert("Logout fail ho gaya!");
    }
  };


  if (loading) return <div className="min-h-screen bg-stone-950" />;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 relative overflow-hidden flex flex-col">
      
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-amber-500 opacity-[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-100 h-75 rounded-full bg-orange-400 opacity-[0.04] blur-3xl" />
        
      
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full border border-stone-800/50" />
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 rounded-full border border-stone-800/40" />
        
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d6d3d1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

     
      <div className="h-px bg-linear-to-r from-transparent via-amber-500 to-transparent shrink-0" />

     
      <Navbar user={user} onLogout={handleLogout} />

      
      <main className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-12">

        
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-8">
          <Sparkles size={11} className="text-amber-400" />
          <span className="text-amber-400 text-xs tracking-widest uppercase font-medium">
            AI Powered Recipe Generator
          </span>
        </div>

        
        <h1
          className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight mb-6 leading-none"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-stone-50">Smart</span>
          <span className="text-amber-400">Byte</span>
        </h1>

        
        <p className="text-stone-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-10">
          Fridge mein jo hai — bas batao.<br />
          Hum recipe bana denge.
        </p>

        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {user ? (
            
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 active:scale-[0.97] shadow-lg shadow-amber-500/20 group"
            >
              Go to My Dashboard
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            
            <>
              <button
                onClick={() => navigate("/register")}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 active:scale-[0.97] shadow-lg shadow-amber-500/20"
              >
                Shuru Karo — Free Hai
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700 text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:bg-stone-800/40"
              >
                Pehle se account hai? Sign In
              </button>
            </>
          )}
        </div>

       
        <div className="flex items-center gap-4 mt-16 mb-8 w-full max-w-xs">
          <div className="flex-1 h-px bg-stone-800" />
          <span className="text-stone-600 text-xs tracking-widest uppercase whitespace-nowrap">Kaise kaam karta hai</span>
          <div className="flex-1 h-px bg-stone-800" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-full px-4 py-2">
            <span className="text-amber-500 font-bold">1</span>
            <span>Ingredients daalo</span>
          </div>
          <div className="w-4 h-px bg-stone-700 shrink-0 hidden sm:block" />
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-full px-4 py-2">
            <span className="text-amber-500 font-bold">2</span>
            <span>AI process karta hai</span>
          </div>
          <div className="w-4 h-px bg-stone-700 shrink-0 hidden sm:block" />
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-full px-4 py-2">
            <span className="text-amber-500 font-bold">3</span>
            <span>Recipe tayaar!</span>
          </div>
        </div>
      </main>

      
      <footer className="relative shrink-0 border-t border-stone-800/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 bg-amber-500 rounded flex items-center justify-center">
              <UtensilsCrossed size={8} className="text-stone-950" />
            </div>
            <span className="text-stone-600 text-xs" style={{ fontFamily: "'Georgia', serif" }}>
              SmartByte
            </span>
          </div>
          <p className="text-stone-700 text-xs">© 2026 SmartByte</p>
        </div>
      </footer>
      
      
      <div className="h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent shrink-0" />
    </div>
  );
}