import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { LogOut, UtensilsCrossed, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import RecipeSearch from "../components/RecipeSearch";

export default function Dashboard() {
  const [saving,setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false); 
  const [inputText, setInputText] = useState("");      
  const [recipe, setRecipe] = useState(null);  
  const [savedRecipies,setsavedRecipies] = useState ([]);     
  
  const navigate = useNavigate();
  
  const handleView = (data) => {
  setRecipe(data);
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};
  
  
  const fecthSavedRecipies = async ()=>{
    try {
      const res = await API.get('/recipes/my-recipes');
      if(res.data.success){
        setsavedRecipies(res.data.recipes)
      }
    } catch (error) {

      console.log('Error while loding saved recipies')
    }
  }

  
  const handleGenerate = async () => {
    if (!inputText) return alert("Pehle ingredients toh likho bhai!");

    setGenerating(true);
    try {
      const ingredientsArray = inputText.split(",").map(i => i.trim());
      const res = await API.post('/recipes/generate', { ingredients: ingredientsArray });
      
      if (res.data.success) {
        setRecipe(res.data.recipe);
      }
    } catch (error) {
      console.log('Error Fetching recipe');
      alert("AI thoda busy hai, dubara try karo!");
    } finally {
      setGenerating(false);
    }
  }

  const handleSave = async ()=>{
    if(!recipe) return;

    setSaving(true);

    try {
      const res = await API.post('/recipes/save',recipe);

      if(res.data.success){
        alert('Saving successfull')
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Saving Failed";
      alert(errorMsg);
    }
    finally{
      setSaving(false);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fecthSavedRecipies();
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await API.get("/auth/logout");
      navigate("/");
    } catch (err) {
      alert("Logout fail ho gaya!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
          </svg>
          <span className="text-stone-500 text-sm tracking-widest uppercase">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-500 opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-400 opacity-5 blur-3xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#d6d3d1"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="h-px bg-linear-to-r from-transparent via-amber-500 to-transparent" />

      <Navbar user={user} onLogout={handleLogout} />

      <main className="relative max-w-6xl mx-auto px-6 py-16">
       
        <RecipeSearch
          inputText={inputText}
          setInputText={setInputText}
          onGenerate={handleGenerate}
          generating={generating}
        />

        
        <div className="max-w-2xl mx-auto">
          <div className="h-px bg-linear-to-r from-transparent via-stone-800 to-transparent mb-10" />

          {recipe ? (
            
            <div className="bg-stone-900 border border-stone-800 p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-amber-500 mb-2">
                {recipe.name}
              </h3>
              <p className="text-stone-400 italic mb-4 text-sm">
                {recipe.description}
              </p>
              <div className="text-[10px] text-amber-400/60 mb-6 uppercase tracking-[0.2em]">
                ⏳ Prep: {recipe.prepTime}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                    Ingredients
                  </h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {recipe.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="text-stone-300 text-sm flex items-center gap-2"
                      >
                        <div className="w-1 h-1 bg-amber-500/50 rounded-full" />{" "}
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">
                    Instructions
                  </h4>
                  <div className="space-y-4">
                    {recipe.instructions.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-amber-500 font-mono text-sm">
                          {i + 1}.
                        </span>
                        <p className="text-stone-400 text-sm leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full mt-10 bg-stone-800 border border-stone-700 hover:bg-stone-700 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
              >
                {saving ? (
                  <>
                    <div className="w-3 h-3 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Recipe"
                )}
              </button>
            </div>
          ) : (
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl border border-stone-800 bg-stone-900 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed size={20} className="text-stone-700" />
              </div>
              <p className="text-stone-600 text-sm">
                Apni ingredients daalo aur AI se recipes dhundo
              </p>
            </div>
          )}
        </div>

        

        <div className="mt-24 max-w-4xl mx-auto">
          <h3 className="text-stone-100 font-semibold text-sm tracking-widest uppercase mb-8 flex items-center gap-3">
            <div className="w-6 h-px bg-amber-500/50" />
            Your Saved Collection
          </h3>

          {savedRecipies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedRecipies.map((r) => (
                <div
                  key={r._id}
                  className="bg-stone-900/50 border border-stone-800/60 p-5 rounded-2xl hover:border-amber-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles size={14} className="text-amber-500/40" />
                  </div>
                  <h4 className="text-stone-200 font-medium mb-1 group-hover:text-amber-400 transition-colors">
                    {r.name}
                  </h4>
                  <p className="text-stone-500 text-xs line-clamp-2 mb-4">
                    {r.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-[10px] text-stone-600 uppercase tracking-widest">
                      ⏳ {r.prepTime}
                    </span>
                    <button
                      onClick={() => handleView(r)}
                      className="text-[10px] text-amber-500 font-bold uppercase tracking-tighter hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-900/30 border border-dashed border-stone-800 rounded-3xl p-12 text-center">
              <p className="text-stone-600 text-sm">
                Abhi tak koi recipe save nahi ki gayi hai.
              </p>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
    </div>
  );
}