"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, ShieldCheck, ArrowRight, Wand2, Star, Globe, Cpu, Target, PenTool } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SuiteHeader from "../components/SuiteHeader";

export default function LandingPage() {
  const { status } = useSession();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden relative">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        {/* Sub-pixel Grid Architecture */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <SuiteHeader 
          title="ResumeAI"
          subtitle="Precision Engineering"
          icon={Sparkles}
          themeColor="rose"
        />

        <main className="pt-24 pb-32 flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.4em] text-rose-400 mb-10 shadow-2xl shadow-rose-500/10"
          >
            <Star className="w-3 h-3 fill-current" />
            Empowering Elite Careers with Neural Intelligence
          </motion.div>

          {/* Hero Section */}
          <div className="text-center space-y-10 max-w-5xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] title-glow uppercase"
            >
              ENGINEER YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-rose-400 animate-gradient">FUTURE.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed tracking-tight"
            >
              The industry-standard AI resume system. Bypassing modern ATS filters through structural precision and high-impact semantic optimization.
            </motion.p>

            {/* Side-by-Side CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 pt-10"
            >
              <Link 
                href={status === "authenticated" ? "/builder" : "/login"}
                className="px-14 py-6 rounded-[2.5rem] bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group shadow-2xl shadow-rose-600/20 active:scale-[0.98] transition-all"
              >
                Launch Builder
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <button className="px-14 py-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all active:scale-[0.98]">
                Explore Templates
              </button>
            </motion.div>
          </div>

          {/* Minimalist Feature Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="w-full max-w-4xl mt-32 grid md:grid-cols-3 gap-12 border-t border-white/5 pt-12 pb-12"
          >
            <SimpleFeature icon={Zap} label="NEURAL SYNC" />
            <SimpleFeature icon={Target} label="ATS PRECISION" />
            <SimpleFeature icon={PenTool} label="HIGH IMPACT" />
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

function SimpleFeature({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 group cursor-default">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-rose-400 group-hover:bg-rose-500/10 transition-all duration-500 relative">
         <Icon className="w-5 h-5 relative z-10" />
         <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-white transition-colors">{label}</span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-20 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-rose-600/20 rounded-xl flex items-center justify-center text-rose-500">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-white italic tracking-tighter">RESUME<span className="text-rose-500">AI</span></span>
      </div>

      <div className="flex gap-10">
         <span className="hover:text-indigo-400 cursor-pointer transition-colors">Neural Hub</span>
         <span className="hover:text-indigo-400 cursor-pointer transition-colors">Core Systems</span>
         <span className="hover:text-indigo-400 cursor-pointer transition-colors">Intel</span>
      </div>

      <p className="text-slate-800">&copy; {new Date().getFullYear()} VAULT ARCHIVE</p>
    </footer>
  );
}