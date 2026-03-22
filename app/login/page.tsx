"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2, ShieldCheck, Sparkles, Orbit } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("AUTHENTICATION_FAILED: Invalid neural credentials.");
        setLoading(false);
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("SYSTEM_OFFLINE: Unexpected connection error.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Background Deep Space Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[180px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[180px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-sky-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* Branding Logo */}
        <div className="flex flex-col items-center mb-10">
           <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-[2rem] text-white shadow-2xl shadow-primary/40 rotate-6 mb-6 relative">
              <Orbit className="w-10 h-10 animate-spin-slow" />
              <div className="absolute -top-1 -right-1">
                 <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
           </div>
           <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
              AI <span className="text-primary">Suite</span>
           </h1>
           <div className="flex items-center gap-2 mt-2">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">SECURE ACCESS PROTOCOL</p>
           </div>
        </div>

        <div className="glass-panel p-10 sm:p-12 rounded-[3rem] border-t-2 border-primary/30 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          
          <div className="text-center mb-10">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Establish Connection</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Provide neural link credentials</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl text-center italic animate-shake">
                {error}
              </div>
            )}
            
            <div className="space-y-2 group">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Identity Vector</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full pl-14 pr-4 py-4.5 rounded-2xl text-sm font-bold placeholder:text-slate-800 transition-all"
                  placeholder="USER@VAULT.INTEL"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1">Security Cipher</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-14 pr-4 py-4.5 rounded-2xl text-sm font-bold placeholder:text-slate-800 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-5 rounded-[2rem] flex items-center justify-center gap-3 mt-4 transition-all group relative overflow-hidden text-white"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing...</span>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorize Access</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] bg-white/5 flex-1"></div>
            <span className="text-slate-600 text-[9px] font-black tracking-widest uppercase italic">OR</span>
            <div className="h-[1px] bg-white/5 flex-1"></div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full mt-8 py-4.5 rounded-[2rem] flex items-center justify-center gap-3 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl shadow-white/5 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="group-hover:tracking-[0.3em] transition-all">Continue with Google</span>
          </button>
        </div>
        
        <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          Neural Pathway Encrypted &copy; {new Date().getFullYear()} Vault Intel
        </p>
      </div>
    </div>
  );
}
