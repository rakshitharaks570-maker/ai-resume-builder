"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Search, MapPin, Briefcase, Sparkles, LogOut, ArrowLeft, ExternalLink, Filter } from "lucide-react";

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
      console.error("Failed to search jobs");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto p-4 md:p-8">
      {/* Background */}
      <div className="fixed inset-0 bg-blue-500/5 rounded-full blur-[180px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between mb-8 animate-fade-in glass-panel px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-700 p-2 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">AI Job Search</h1>
            <p className="text-xs text-slate-400">Powered by Firecrawl for {session?.user?.name}</p>
          </div>
        </div>
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      <main className="flex-1 space-y-8 animate-slide-up">
        {/* Search Bar */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
          
          <form onSubmit={handleSearch} className="grid md:grid-cols-12 gap-4">
            <div className="md:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Briefcase className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl transition-all"
                placeholder="Job Title or Keywords"
              />
            </div>

            <div className="md:col-span-4 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl transition-all"
                placeholder="City or Remote"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query || !location}
              className="md:col-span-3 btn-primary bg-gradient-to-r from-blue-500 to-indigo-600 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold disabled:opacity-60 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Sourcing Jobs...</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-500/10 p-2.5 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                  {job.salary}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{job.title}</h3>
              <p className="text-primary font-medium text-sm mb-4">{job.company}</p>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>

              <div className="text-slate-500 text-sm mb-6 line-clamp-3">
                {job.description}
              </div>

              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-slate-300 font-medium transition-all group-hover:bg-primary group-hover:text-white group-hover:border-primary"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel p-6 rounded-3xl h-64 border border-white/5 bg-slate-800/20" />
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <div className="bg-slate-800/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700">
              <Search className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-medium text-slate-300">Ready to find your next career move</h3>
            <p className="text-slate-500 mt-2">Enter keywords and location to start scraping live opportunities.</p>
          </div>
        )}
      </main>
    </div>
  );
}
