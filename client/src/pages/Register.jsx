import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import API from "../api/axios"; 

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return alert("Pehle Terms agree karo bhai!");

    setLoading(true);
    try {
      
      const res = await API.post("/auth/register", form);
      
      if (res.data.success) {
        alert("Account Successfully Ban Gaya!");
        navigate("/dashboard"); 
      }
    } catch (err) {
      
      alert(err.response?.data?.message || "Registration fail ho gaya!");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-amber-400", "bg-green-500"];
  const strength = passwordStrength();

  const fields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Bhupendra jogi",
      icon: (color) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.2" />
          <path d="M2 14C2 11.24 4.69 9 8 9C11.31 9 14 11.24 14 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Bhupendrajogi@example.com",
      icon: (color) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4C2 3.45 2.45 3 3 3H13C13.55 3 14 3.45 14 4V12C14 12.55 13.55 13 13 13H3C2.45 13 2 12.55 2 12V4Z" stroke={color} strokeWidth="1.2" />
          <path d="M2 4L8 8.5L14 4" stroke={color} strokeWidth="1.2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500 opacity-5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-orange-400 opacity-5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="h-px bg-linear-to-r from-transparent via-amber-500 to-transparent mb-8" />

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl shadow-black/60">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-stone-50 mb-1">Create account</h1>
            <p className="text-stone-500 text-sm">Join us — it only takes a moment</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {fields.map(({ id, label, type, placeholder, icon }) => (
              <div key={id}>
                <label className="block text-xs font-medium text-stone-400 mb-1.5 tracking-widest uppercase">{label}</label>
                <div className={`relative rounded-lg transition-all duration-200 ${focused === id ? "ring-1 ring-amber-500/60 shadow-lg shadow-amber-500/10" : "ring-1 ring-stone-700"}`}>
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    {icon(focused === id ? "#fbbf24" : "#44403c")}
                  </div>
                  <input
                    type={type}
                    value={form[id]}
                    onChange={handleChange(id)}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused("")}
                    placeholder={placeholder}
                    className="w-full bg-stone-800/50 text-stone-100 placeholder-stone-600 rounded-lg pl-10 pr-4 py-3 text-sm outline-none"
                    required
                  />
                </div>
              </div>
            ))}

            
            <div>
              <label className="block text-xs font-medium text-stone-400 mb-1.5 tracking-widest uppercase">Password</label>
              <div className={`relative rounded-lg transition-all duration-200 ${focused === "password" ? "ring-1 ring-amber-500/60 shadow-lg shadow-amber-500/10" : "ring-1 ring-stone-700"}`}>
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke={focused === "password" ? "#fbbf24" : "#44403c"} strokeWidth="1.2" />
                    <path d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7" stroke={focused === "password" ? "#fbbf24" : "#44403c"} strokeWidth="1.2" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  placeholder="Min. 8 characters"
                  className="w-full bg-stone-800/50 text-stone-100 placeholder-stone-600 rounded-lg pl-10 pr-10 py-3 text-sm outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-stone-600 hover:text-stone-400">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              
              
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor[strength] : "bg-stone-700"}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-start gap-3 mt-5">
              <button type="button" onClick={() => setAgreed(!agreed)} className={`mt-0.5 w-4 h-4 rounded shrink-0 border transition-all duration-200 flex items-center justify-center ${agreed ? "bg-amber-500 border-amber-500" : "bg-transparent border-stone-600"}`}>
                {agreed && "✓"}
              </button>
              <p className="text-stone-500 text-xs leading-relaxed">I agree to the Terms and Privacy Policy</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !agreed}
              className="w-full mt-5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-semibold text-sm py-3 rounded-lg transition-all"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-stone-500 text-xs mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}