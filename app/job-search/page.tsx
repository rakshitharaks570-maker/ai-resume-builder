"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Search, MapPin, Briefcase, Sparkles, ExternalLink, Filter, TrendingUp, Globe, Building2, DollarSign, Clock } from "lucide-react";
import SuiteHeader from "../../components/SuiteHeader";

export default function JobSearch() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/job-search");
    }
  }, [status, router]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !location) return;

    setLoading(true);
    setJobs([]);
    try {
      const res = await fetch("/api/job-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, location }),
      });
      const data = await res.json();
      if (data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Neural search bridge failed.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-sky-500 mb-4" />
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Authenticating Career Link...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] bg-sky-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header & Nav */}
      <SuiteHeader 
        title="Career Scout"
        subtitle="Global Opportunity Mesh"
        icon={Search}
        themeColor="sky"
      />

      <main className="flex-1 space-y-10 animate-slide-up mt-8">
        {/* Search Control Center */}
        <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden border-t-2 border-sky-500/30">
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                <Sparkles className="w-6 h-6 text-sky-500" />
                Initialize Target Search
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium italic">
                Scouring deep-web job boards for high-impact opportunities...
              </p>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                  <Globe className="w-3.5 h-3.5 text-sky-500" />
                  Remote Enabled
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/5 px-4 py-2.5 rounded-xl border border-white/10">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  High Demand
               </div>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="grid lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-5 relative group">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">Position / Tech Stack</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-500 transition-colors">
                  <Briefcase className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="glass-input w-full pl-14 pr-4 py-5 rounded-3xl text-base font-bold placeholder:text-slate-700"
                  placeholder="EX: PRODUCT DESIGNER..."
                />
              </div>
            </div>

            <div className="lg:col-span-4 relative group">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block ml-1">Geographic Vector</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-500 transition-colors">
                  <MapPin className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="glass-input w-full pl-14 pr-4 py-5 rounded-3xl text-base font-bold placeholder:text-slate-700"
                  placeholder="EX: NEW YORK / REMOTE..."
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <button
                type="submit"
                disabled={loading || !query || !location}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-5 rounded-3xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-sky-500/20 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Scout Jobs</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {jobs.length > 0 ? (
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {jobs.map((job, idx) => (
               <div 
                 key={job.id || idx} 
                 className="glass-panel p-8 rounded-[2.5rem] border border-white/5 hover:border-sky-500/30 transition-all group hover:-translate-y-2 relative overflow-hidden"
                 style={{ animationDelay: `${idx * 0.1}s` }}
               >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <TrendingUp className="w-12 h-12 text-sky-500" />
                 </div>
                 
                 <div className="flex justify-between items-start mb-6">
                   <div className="bg-sky-500/10 p-4 rounded-[1.25rem] text-sky-500 group-hover:scale-110 transition-transform border border-sky-500/20">
                     <Building2 className="w-7 h-7" />
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-black px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 uppercase tracking-widest flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        {job.salary || "NEGOTIABLE"}
                      </span>
                   </div>
                 </div>
                 
                 <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter leading-none group-hover:text-sky-500 transition-colors">
                    {job.title}
                 </h3>
                 <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6 italic">{job.company}</p>
                 
                 <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                       <MapPin className="w-3.5 h-3.5 text-sky-500" />
                       {job.location || "Remote"}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                       <Clock className="w-3.5 h-3.5 text-sky-500" />
                       Full-Time
                    </div>
                 </div>

                 <div className="text-slate-400 text-sm mb-8 line-clamp-3 font-medium leading-relaxed italic border-l-2 border-white/5 pl-4">
                   {job.description}
                 </div>

                 <a
                   href={job.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-full py-4 rounded-2xl bg-white/5 hover:bg-sky-500 hover:text-white border border-white/10 flex items-center justify-center gap-3 text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                 >
                   Establish Connection
                   <ExternalLink className="w-4 h-4" />
                 </a>
               </div>
             ))}
           </div>
        ) : loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-panel p-10 rounded-[2.5rem] h-[400px] border border-white/5 relative overflow-hidden animate-pulse">
                 <div className="w-16 h-16 bg-white/5 rounded-2xl mb-8" />
                 <div className="w-3/4 h-8 bg-white/5 rounded-lg mb-4" />
                 <div className="w-1/2 h-4 bg-white/5 rounded-lg mb-8" />
                 <div className="space-y-3">
                    <div className="w-full h-4 bg-white/5 rounded-lg" />
                    <div className="w-full h-4 bg-white/5 rounded-lg" />
                    <div className="w-2/3 h-4 bg-white/5 rounded-lg" />
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center opacity-30 text-center scale-90 md:scale-100">
            <div className="bg-slate-800/50 w-32 h-32 rounded-[3rem] flex items-center justify-center mx-auto mb-8 border border-white/5 rotate-[-5deg] shadow-inner">
              <Filter className="w-16 h-16 text-slate-500" />
            </div>
            <h3 className="text-5xl font-black text-slate-200 mb-2 uppercase tracking-tighter italic">No Target Locked</h3>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
              Enter search vectors above to initialize career path synthesis.
            </p>
            <div className="mt-12 flex gap-5">
               <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0s' }}></div>
               <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 flex justify-between items-center px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 pb-10 border-t border-white/5 pt-10">
        <div>&copy; {new Date().getFullYear()} CareerScout Neural Interface</div>
        <div className="flex gap-8">
           <span className="hover:text-sky-500 cursor-pointer transition-colors">Opportunity Mesh</span>
           <span className="hover:text-sky-500 cursor-pointer transition-colors">Pathfinder Protocol</span>
           <span className="hover:text-sky-500 cursor-pointer transition-colors">Entity Search</span>
        </div>
      </footer>
    </div>
  );
}
