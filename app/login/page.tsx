"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Loader2, 
  ArrowRight, 
  Fingerprint, 
  ShieldCheck,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("AUTHENTICATION FAILED. PLEASE VERIFY CREDENTIALS.");
    } else {
      router.push("/builder");
    }
    setLoading(false);
  };

  const handleQuickAccess = async () => {
    setLoading(true);
    const result = await signIn("credentials", {
      email: "admin@resume.ai",
      password: "neural-link-2026",
      redirect: false,
    });
    if (result?.ok) {
      router.push("/builder");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
            AI RESUME <span className="text-indigo-500">BUILDER</span>
          </h1>
          <div className="flex items-center gap-2">
             <Globe className="w-3 h-3 text-slate-500" />
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">SECURE ACCESS PROTOCOL</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="glass-panel p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-black uppercase tracking-widest italic">Initialization</h2>
            <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center gap-2">
               <Fingerprint className="w-3 h-3 text-indigo-400" />
               <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Neural Link v4.0</span>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black p-4 rounded-xl mb-6 text-center tracking-widest uppercase"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Comm-Link / Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full pl-11 pr-4 py-4 rounded-2xl text-xs font-bold placeholder:text-slate-700"
                  placeholder="ID@VAULT.INTEL"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Access Key / Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-600 group-focus-within:text-indigo-400 transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-11 pr-4 py-4 rounded-2xl text-xs font-bold placeholder:text-slate-700"
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group shadow-xl shadow-indigo-500/10"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              {loading ? "AUTHENTICATING..." : "AUTHORIZE ACCESS"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="bg-[#050505] px-4 text-slate-600">OR START WITH GOOGLE</span>
            </div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/builder" })}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 hover:bg-neutral-200 active:scale-[0.98] mb-10 shadow-xl shadow-white/5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google Protocol
          </button>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="bg-[#050505] px-4 text-slate-600">OR CREDENTIALS</span>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleQuickAccess}
              disabled={loading}
              className="w-full py-5 rounded-2xl bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-indigo-400/30 active:scale-[0.98]"
            >
              <Fingerprint className="w-5 h-5" />
              Immediate Admin Entry
            </button>
            <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                <div className="flex items-center justify-center gap-2 mb-1">
                   <ShieldCheck className="w-3 h-3 text-emerald-400" />
                   <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest text-center">Open Node Access Active</p>
                </div>
                <p className="text-[8px] font-bold text-slate-500 text-center tracking-widest leading-relaxed uppercase">Enter any personal email and password to initialize a session and access the builder.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-6">
           <a 
             href="https://ai-resume-builder-rakshitharaks570.vercel.app/login" 
             target="_blank" 
             rel="noopener noreferrer"
             className="inline-flex items-center gap-2 text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] hover:text-white transition-colors group"
           >
             <Globe className="w-3 h-3 group-hover:animate-spin-slow" />
             Access Professional Global Node
           </a>
           <div className="flex justify-center gap-6 opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-glow" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-glow" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shadow-glow" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
