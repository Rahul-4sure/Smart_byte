import API from '../api/axios'
import { useState } from "react";
import { redirect, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
        const res = await API.post('/auth/login',{email,password});
        if (res.data.success) {
                alert("Login Successfull!");
                navigate('/dashboard'); 
            }
    } catch (error) {
         alert(error.response?.data?.message || "Login Failed");   
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500 opacity-5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-400 opacity-5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-stone-800 opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full border border-stone-800 opacity-20" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d6d3d1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

     
      <div className="relative w-full max-w-sm">
       
        <div className="h-px bg-linear-to-r from-transparent via-amber-500 to-transparent mb-8" />

        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 shadow-2xl shadow-black/60">
         
          <div className="mb-8">
          
            <h1
              className="text-2xl font-bold text-stone-50 mb-1"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Welcome back
            </h1>
            <p className="text-stone-500 text-sm">Login in to your account to continue</p>
          </div>

          
          <div className="space-y-4">
            
            <div className="group">
              <label className="block text-xs font-medium text-stone-400 mb-1.5 tracking-widest uppercase">
                Email
              </label>
              <div
                className={`relative rounded-lg transition-all duration-200 ${
                  focused === "email"
                    ? "ring-1 ring-amber-500/60 shadow-lg shadow-amber-500/10"
                    : "ring-1 ring-stone-700"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transition-colors duration-200 ${
                      focused === "email" ? "text-amber-400" : "text-stone-600"
                    }`}
                  >
                    <path
                      d="M2 4C2 3.45 2.45 3 3 3H13C13.55 3 14 3.45 14 4V12C14 12.55 13.55 13 13 13H3C2.45 13 2 12.55 2 12V4Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path d="M2 4L8 8.5L14 4" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  placeholder="you@example.com"
                  className="w-full bg-stone-800/50 text-stone-100 placeholder-stone-600 rounded-lg pl-10 pr-4 py-3 text-sm outline-none"
                />
              </div>
            </div>

            
            <div className="group">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-stone-400 tracking-widest uppercase">
                  Password
                </label>


                {/* <button className="text-xs text-amber-500 hover:text-amber-400 transition-colors">
                  Forgot?
                </button> */}

                
              </div>
              <div
                className={`relative rounded-lg transition-all duration-200 ${
                  focused === "password"
                    ? "ring-1 ring-amber-500/60 shadow-lg shadow-amber-500/10"
                    : "ring-1 ring-stone-700"
                }`}
              >
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`transition-colors duration-200 ${
                      focused === "password" ? "text-amber-400" : "text-stone-600"
                    }`}
                  >
                    <rect
                      x="3"
                      y="7"
                      width="10"
                      height="7"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M5 7V5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                    <circle cx="8" cy="10.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  placeholder="••••••••"
                  className="w-full bg-stone-800/50 text-stone-100 placeholder-stone-600 rounded-lg pl-10 pr-10 py-3 text-sm outline-none"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-stone-600 hover:text-stone-400 transition-colors"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M2 2L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-stone-950 font-semibold text-sm py-3 rounded-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 tracking-wide"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>


          
          <p className="text-center text-stone-500 text-xs mt-6">
            Don't have an account?{" "}
            <button onClick={()=>{navigate('/register')}} className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
              Create one
            </button>
          </p>
        </div>

        
        <div className="h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent mt-8" />
      </div>
    </div>
  );
}