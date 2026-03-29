import { useEffect, useState } from "react";

export default function ErrorPage({ code = 404, title = "Page Not Found", message = "The page you're looking for has wandered off into the void." }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6 overflow-hidden relative font-mono">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 3px)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg w-full">

        {/* Error code */}
        <div className="relative inline-block mb-2">
          <span
            className={`text-[10rem] font-black leading-none tracking-tighter text-white select-none transition-all duration-75 ${
              glitch ? "text-indigo-400" : ""
            }`}
            style={{
              textShadow: glitch
                ? "4px 0 #f472b6, -4px 0 #34d399"
                : "0 0 80px rgba(99,102,241,0.4)",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {code}
          </span>
          {/* Glitch duplicate */}
          {glitch && (
            <>
              <span
                className="absolute inset-0 text-[10rem] font-black leading-none tracking-tighter text-pink-400 opacity-70"
                style={{ fontFamily: "'Courier New', monospace", transform: "translate(4px, 0)" }}
                aria-hidden
              >
                {code}
              </span>
              <span
                className="absolute inset-0 text-[10rem] font-black leading-none tracking-tighter text-emerald-400 opacity-70"
                style={{ fontFamily: "'Courier New', monospace", transform: "translate(-4px, 0)" }}
                aria-hidden
              >
                {code}
              </span>
            </>
          )}
        </div>

        {/* Divider line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
          <span className="text-indigo-400/60 text-xs uppercase tracking-widest">error</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-3 tracking-wide">
          {title}
        </h1>

        {/* Message */}
        <p className="text-slate-400 text-sm leading-relaxed mb-10">
          {message}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 text-sm font-semibold text-slate-300 border border-slate-700 rounded-lg hover:border-indigo-500/60 hover:text-white hover:bg-indigo-500/10 transition-all duration-200"
          >
            ← Go Back
          </button>
          <a
            href="/"
            className="px-6 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/30"
          >
            Go Home →
          </a>
        </div>

        {/* Footer hint */}
        <p className="mt-10 text-xs text-slate-600 tracking-widest uppercase">
          if this keeps happening, contact support
        </p>
      </div>
    </div>
  );
}