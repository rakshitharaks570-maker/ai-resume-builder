"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Youtube, Send, Sparkles, LogOut, ArrowLeft, Clipboard, Check } from "lucide-react";

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
        setSummary(`Error: ${data.error}`);
      } else {
        setSummary(data.summary);
      }
    } catch (err) {
      setSummary("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="fixed inset-0 bg-red-500/5 rounded-full blur-[180px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between mb-8 animate-fade-in glass-panel px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-gradient-to-br from-red-500 to-rose-700 p-2 rounded-xl text-white shadow-lg shadow-red-500/20">
            <Youtube className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">AI YouTube Summariser</h1>
            <p className="text-xs text-slate-400">Powered by Gemini & OpenAI for {session?.user?.name}</p>
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

      <main className="flex-1 max-w-3xl mx-auto w-full animate-slide-up">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500" />
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-400" />
              Summarize Any Video
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Paste the YouTube URL below to get an instant AI-powered summary.
            </p>
          </div>

          <form onSubmit={handleSummarize} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                <Youtube className="h-5 w-5" />
              </div>
              <input
                type="text"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl text-base transition-all"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || !videoUrl}
              className="w-full btn-primary bg-gradient-to-r from-red-500 to-rose-600 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg hover:shadow-red-500/20 disabled:opacity-60 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Synthesizing Transcript...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Get Summary</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Summary Results */}
        <div className={`glass-panel rounded-3xl overflow-hidden transition-all duration-500 ${summary ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-slate-900/40">
            <h3 className="text-lg font-semibold text-white flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              AI Insight Summary
            </h3>
            <button
              onClick={copyToClipboard}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-all active:scale-95 flex items-center gap-2 text-sm"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Clipboard className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="p-6 sm:p-8 bg-slate-900/20">
            <div className="markdown-body text-slate-300 whitespace-pre-wrap leading-relaxed">
              {summary}
            </div>
          </div>
        </div>
        
        {!summary && !loading && (
          <div className="text-center py-12 opacity-40">
            <div className="bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
              <Youtube className="w-10 h-10 text-slate-500" />
            </div>
            <p className="text-slate-400">Ready to summarize your favorite videos</p>
          </div>
        )}
      </main>
    </div>
  );
}
