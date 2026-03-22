"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Youtube, Send, Sparkles, ArrowLeft, Clipboard, Check, Play, History, TrendingUp, Info } from "lucide-react";
import SuiteHeader from "../../components/SuiteHeader";

export default function YoutubeSummariser() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/youtube-summariser");
    }
  }, [status, router]);

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return;

    setLoading(true);
    setSummary("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });
      const data = await res.json();
      if (data.error) {
        setSummary(`SYSTEM_ERROR: ${data.error}`);
      } else {
        setSummary(data.summary);
      }
    } catch (err) {
      setSummary("CRITICAL_FAILURE: Neural link to video transcript lost.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500 mb-4" />
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Stream...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Header & Nav */}
      <SuiteHeader 
        title="Stream Synth"
        subtitle="Neural Video Summarization"
        icon={Youtube}
        themeColor="rose"
      />

      <main className="flex-1 max-w-4xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-start animate-slide-up mt-8">
        {/* Input Control Panel */}
        <div className="lg:col-span-12 xl:col-span-12">
          <div className="glass-panel p-8 sm:p-10 rounded-[2.5rem] relative overflow-hidden border-t-2 border-rose-500/30">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                  <Sparkles className="w-6 h-6 text-rose-500" />
                  Signal Extraction
                </h2>
                <p className="text-slate-400 text-sm mt-1 font-medium italic">
                  Feed the visual stream URL into the synthesizer for analysis.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-dashed border-white/10">
                 <History className="w-3 h-3" />
                 Buffer Status: Optimized
              </div>
            </div>

            <form onSubmit={handleSummarize} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-rose-500 transition-colors">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <input
                  type="text"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="glass-input w-full pl-14 pr-4 py-5 rounded-2xl text-base font-bold placeholder:text-slate-600 focus:ring-2 focus:ring-rose-500/20"
                  placeholder="PASTE YOUTUBE URL (WATCH/REEL/LIVE)..."
                />
              </div>

              <button
                type="submit"
                disabled={loading || !videoUrl}
                className="w-full btn-primary bg-gradient-to-r from-red-500 to-rose-600 py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-red-500/20 disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99] group relative overflow-hidden text-white"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                    <span>Processing Pulse...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Initialize Synthesis</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results / History Column */}
        <div className="lg:col-span-12 xl:col-span-12">
           {loading ? (
             <div className="glass-panel p-16 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-white/5">
                <div className="relative w-24 h-24 mb-8">
                   <div className="absolute inset-0 border-t-4 border-rose-500 rounded-full animate-spin"></div>
                   <div className="absolute inset-4 border-b-4 border-red-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-rose-500 w-6 h-6 animate-pulse" />
                   </div>
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Deconstructing Stream</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">Allocating neural memory for abstract generation...</p>
             </div>
           ) : summary ? (
             <div className="glass-panel rounded-[2.5rem] overflow-hidden border-2 border-white/5 animate-fade-in relative">
               <div className="flex items-center justify-between p-7 border-b border-white/5 bg-slate-900/40 backdrop-blur-xl">
                 <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                    <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Abstract Synoposis</h3>
                 </div>
                 <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all active:scale-95 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border border-white/5"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Clipboard className="w-4 h-4" />}
                      {copied ? "Cloned" : "Clone Buffer"}
                    </button>
                 </div>
               </div>
               
               <div className="p-8 md:p-12 bg-slate-900/10 relative">
                  <div className="absolute top-10 right-10 rotate-12 opacity-[0.03] pointer-events-none select-none">
                     <TrendingUp className="w-64 h-64 text-rose-500" />
                  </div>
                  <div className="markdown-body text-slate-300 whitespace-pre-wrap leading-loose text-lg font-medium selection:bg-rose-500/20 selection:text-white italic">
                    {summary}
                  </div>
               </div>
               
               <div className="p-6 bg-rose-500/5 border-t border-white/5 flex items-center gap-3">
                  <Info className="w-4 h-4 text-rose-500" />
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural summary generated via deep-transcript analysis protocol v2.4</p>
               </div>
             </div>
           ) : (
             <div className="py-20 flex flex-col items-center justify-center opacity-30 text-center">
                <div className="bg-slate-800/50 p-12 rounded-[3.5rem] mb-8 shadow-inner border border-white/5 rotate-[-3deg]">
                  <Youtube className="w-24 h-24 text-slate-500" />
                </div>
                <h3 className="text-5xl font-black text-slate-300 mb-2 uppercase tracking-tighter italic">Idle State</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose">
                  Stream synthesizer offline. Establish link by providing a visual data vector above.
                </p>
                <div className="mt-12 flex gap-4">
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
             </div>
           )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 flex justify-between items-center px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 pb-8 border-t border-white/5 pt-8">
        <div>&copy; {new Date().getFullYear()} SynthStream Intelligence Networks</div>
        <div className="flex gap-6">
           <span className="hover:text-rose-500 cursor-pointer transition-colors">Neural Pipeline</span>
           <span className="hover:text-rose-500 cursor-pointer transition-colors">Abstract Hub</span>
           <span className="hover:text-rose-500 cursor-pointer transition-colors">Data Protocol</span>
        </div>
      </footer>
    </div>
  );
}
