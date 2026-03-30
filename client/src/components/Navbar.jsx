import { LogOut, UtensilsCrossed, UserPlus, LogIn, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="relative z-50 w-full border-b border-stone-800/60 bg-stone-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LEFT SIDE: Brand Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
            <UtensilsCrossed size={16} className="text-stone-950" />
          </div>
          <div className="flex flex-col">
            <span className="text-stone-100 font-bold text-sm tracking-[0.2em] uppercase leading-none">
              SmartByte
            </span>
            {user && (
              <span className="text-stone-500 text-[10px] mt-1 font-medium italic">
                Welcome back, <span className="text-amber-500/80">{user.name}</span>
              </span>
            )}
          </div>
        </Link>

        {/* RIGHT SIDE: Conditional Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Dashboard Button */}
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden sm:flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-all text-xs font-bold uppercase tracking-widest px-3 py-2"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </button>

              <div className="hidden sm:block w-px h-4 bg-stone-800 mx-1" />

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-stone-900/50 border border-stone-800 hover:border-stone-700 px-4 py-2 rounded-xl text-stone-400 hover:text-stone-100 transition-all text-xs font-bold uppercase tracking-widest active:scale-95"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-stone-400 hover:text-stone-100 text-xs font-bold uppercase tracking-widest px-4 py-2"
              >
                <LogIn size={14} />
                <span>Login</span>
              </Link>
              
              <Link
                to="/register"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2.5 rounded-xl transition-all text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-amber-500/10 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}