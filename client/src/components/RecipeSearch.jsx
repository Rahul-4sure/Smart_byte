import { Sparkles } from "lucide-react";

export default function RecipeSearch({ inputText, setInputText, onGenerate, generating }) {
  return (
    <div className="max-w-2xl mx-auto text-center mb-16">
      {/* AI Badge */}
      <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-6">
        <Sparkles size={11} className="text-amber-400" />
        <span className="text-amber-400 text-xs tracking-widest uppercase font-medium">
          AI Powered
        </span>
      </div>

      <h2 className="text-4xl font-bold text-stone-50 mb-3">
        Kya pakana hai aaj?
      </h2>
      <p className="text-stone-500 text-sm mb-8">
        Jo ingredients paas ho batao — hum recipe suggest karenge
      </p>

      {/* Search bar container */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-amber-500/5 blur-xl" />
        <div className="relative bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex items-center gap-3 px-5 py-1 focus-within:border-amber-500/50 transition-all">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. Paneer, Tomato, Onion..."
            className="flex-1 bg-transparent text-stone-100 placeholder-stone-600 py-3.5 text-sm outline-none"
          />
          <button
            onClick={onGenerate}
            disabled={generating}
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-stone-950 p-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
          >
            {generating ? (
              <div className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}