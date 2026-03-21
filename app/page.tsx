"use client";

import { useState, useEffect } from "react";
import { Sparkles, FileText, User, Briefcase, ChevronRight, Loader2, Download, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const generateResume = async () => {
    if (!name || !skills) return;

    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, skills }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      console.error(error);
      setResult("An error occurred while generating your resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[150px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between mb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl text-white shadow-lg shadow-primary/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">ResumeAI</h1>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 hover:border-slate-600"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      {/* Navigation Sub-header */}
      <nav className="flex items-center gap-2 mb-8 bg-slate-900/40 p-1.5 rounded-2xl border border-white/5 w-fit animate-fade-in">
        <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20 transition-all">
          Resume Builder
        </button>
        <button 
          onClick={() => router.push("/notes-saver")}
          className="px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all font-medium"
        >
          Notes Saver
        </button>
        <button 
          onClick={() => router.push("/youtube-summariser")}
          className="px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all font-medium"
        >
          YT Summariser
        </button>
        <button 
          onClick={() => router.push("/job-search")}
          className="px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all font-medium"
        >
          Job Search
        </button>
      </nav>

      <main className="flex-1 grid lg:grid-cols-12 gap-8 items-start relative">
        {/* Left Column - Form */}
        <div className="lg:col-span-4 xl:col-span-5 flex flex-col gap-6 w-full animate-slide-up">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            {/* Subtle top decoration line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Build Your Resume
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Enter your details and let AI craft a professional resume instantly.
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Core Skills</label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 pointer-events-none text-slate-400">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm resize-none"
                    placeholder="React, Next.js, TypeScript, UI/UX Design..."
                  />
                </div>
              </div>

              <button
                onClick={generateResume}
                disabled={loading || !name || !skills}
                className="btn-primary w-full py-3.5 mt-2 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Crafting Resume...</span>
                  </>
                ) : (
                  <>
                    <span>Generate with AI</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Pro Tip Card */}
          <div className="glass-panel p-5 rounded-2xl flex items-start gap-4 border-l-4 border-l-accent hidden lg:flex">
            <div className="p-2 bg-accent/20 rounded-full text-accent mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Pro Tip</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Be specific with your skills. Instead of just "Programming", mention tools like "Node.js, PostgreSQL, and Docker" for better AI matching.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-8 xl:col-span-7 h-full min-h-[500px] animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel h-full w-full rounded-2xl border-dashed border-2 p-6 md:p-10 flex flex-col relative overflow-hidden transition-all duration-500">
            {loading ? (
               <div className="h-full w-full flex flex-col items-center justify-center text-center p-8">
                 <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                   <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                   <div className="absolute inset-2 border-b-2 border-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                   <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                 </div>
                 <h3 className="text-xl font-medium text-white mb-2">Analyzing Profile...</h3>
                 <p className="text-slate-400 text-sm max-w-sm">
                   Our highly trained AI is synthesizing your skills into a commanding professional narrative.
                 </p>
               </div>
            ) : result ? (
              <div className="h-full flex flex-col animate-fade-in relative z-10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-slow"></span>
                    Generated Resume
                  </h3>
                  
                  <button className="text-sm bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors border border-white/10">
                    <Download className="w-4 h-4" />
                    Copy Text
                  </button>
                </div>
                
                <div className="markdown-body overflow-y-auto pr-4 custom-scrollbar flex-1 whitespace-pre-wrap">
                  {result}
                </div>
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                <div className="bg-slate-800/50 p-6 rounded-3xl mb-6 shadow-Inner">
                  <FileText className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-xl font-medium text-slate-300 mb-2">Awaiting Input</h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Fill out the form on the left and click Generate to see your AI-crafted resume appear here in seconds.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-500 pb-4">
        &copy; {new Date().getFullYear()} AI Resume Builder. Empowering careers everywhere.
      </footer>
    </div>
  );
}