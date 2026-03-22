"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Sparkles, PenTool, Youtube, Search, ArrowLeft, LayoutDashboard, LucideIcon } from "lucide-react";

interface SuiteHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  themeColor: "primary" | "emerald" | "rose" | "sky";
}

export default function SuiteHeader({ title, subtitle, icon: Icon, themeColor }: SuiteHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const themeClasses = {
    primary: "from-primary to-accent shadow-primary/30 text-primary border-primary/20",
    emerald: "from-emerald-500 to-green-600 shadow-emerald-500/30 text-emerald-500 border-emerald-500/20",
    rose: "from-red-500 to-rose-600 shadow-red-500/30 text-rose-500 border-rose-500/20",
    sky: "from-sky-500 to-indigo-600 shadow-sky-500/30 text-sky-500 border-sky-500/20",
  };

  const navItems = [
    { name: "Builder", path: "/", icon: Sparkles },
    { name: "Notes", path: "/notes-saver", icon: PenTool },
    { name: "YouTube", path: "/youtube-summariser", icon: Youtube },
    { name: "Jobs", path: "/job-search", icon: Search },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Top Bar */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/10 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${themeClasses[themeColor].split(' ').slice(0,2).join(' ')} p-2 rounded-xl text-white shadow-lg rotate-3`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
                {title.split(' ')[0]} <span className={`italic ${themeClasses[themeColor].split(' ')[3]}`}>{title.split(' ')[1] || ""}</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{subtitle}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black text-white uppercase tracking-wider">{session?.user?.name || "Operative"}</p>
              <p className={`text-[8px] font-bold uppercase tracking-widest leading-none ${themeClasses[themeColor].split(' ')[3]}`}>System Active</p>
           </div>
           <button 
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 hover:border-white/10 text-slate-400 hover:text-white"
              title="Terminate Session"
            >
              <LogOut className="w-5 h-5" />
            </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-white/5 w-fit backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                isActive 
                ? `bg-white/10 text-white shadow-lg border border-white/10` 
                : "text-slate-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-3.5 h-3.5 ${isActive ? themeClasses[themeColor].split(' ')[3] : ""}`} />
              <span className="hidden md:inline">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
