"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Sparkles, ArrowLeft, LucideIcon, Globe, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface SuiteHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  themeColor: "primary" | "emerald" | "rose" | "sky" | "violet";
}

export default function SuiteHeader({ title, subtitle, icon: Icon, themeColor }: SuiteHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between mb-12"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => router.push("/")}>
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-xl shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-500">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
              RESUME<span className="text-indigo-500">AI</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Globe className="w-3 h-3 text-slate-500" />
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">Neural Intelligence Active</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
         <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-2">
               <ShieldCheck className="w-3 h-3 text-emerald-500" />
               <p className="text-[10px] font-black text-white uppercase tracking-wider">{session?.user?.name || "GUEST PROTOCOL"}</p>
            </div>
            <p className="text-[8px] font-bold uppercase tracking-[0.3em] leading-none text-slate-600 mt-1 italic">ENCRYPTED SESSION</p>
         </div>
         <div className="h-8 w-[1px] bg-white/5 mx-2" />
         <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 hover:border-white/10 text-slate-500 hover:text-white group"
            title="Terminate Session"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
      </div>
    </motion.header>
  );
}
