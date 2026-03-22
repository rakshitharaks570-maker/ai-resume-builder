"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, Plus, PenTool, LogOut, ArrowLeft, Search, StickyNote, Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import SuiteHeader from "../../components/SuiteHeader";

export default function NotesSaver() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<{ id: string; title: string; content: string; lastModified: number }[]>([]);
  const [activeNote, setActiveNote] = useState<{ id: string; title: string; content: string; lastModified: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/notes-saver");
    }
  }, [status, router]);

  useEffect(() => {
    const saved = localStorage.getItem("ai-notes-saver");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const saveNotes = (updatedNotes: any[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("ai-notes-saver", JSON.stringify(updatedNotes));
    setSaveStatus("saving");
    setTimeout(() => setSaveStatus("saved"), 600);
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "",
      content: "",
      lastModified: Date.now(),
    };
    const updated = [newNote, ...notes];
    saveNotes(updated);
    setActiveNote(newNote);
    setTimeout(() => editorRef.current?.focus(), 100);
  };

  const updateNote = (field: "title" | "content", value: string) => {
    if (!activeNote) return;
    const updatedDraft = { ...activeNote, [field]: value, lastModified: Date.now() };
    setActiveNote(updatedDraft);
    const updatedNotes = notes.map((n) => (n.id === activeNote.id ? updatedDraft : n));
    // Sort by last modified
    updatedNotes.sort((a, b) => b.lastModified - a.lastModified);
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Permanently delete this intelligence record?")) {
      const updated = notes.filter((n) => n.id !== id);
      saveNotes(updated);
      if (activeNote?.id === id) setActiveNote(null);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-4" />
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Authenticating Vault...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header & Nav */}
      <SuiteHeader 
        title="Vault Notes"
        subtitle="Encrypted Intelligence"
        icon={PenTool}
        themeColor="emerald"
      />

      <main className="flex-1 grid lg:grid-cols-12 gap-6 items-stretch min-h-[600px]">
        {/* Sidebar Container */}
        <div className="lg:col-span-4 flex flex-col gap-4 animate-slide-up">
          <div className="glass-panel p-6 rounded-[2rem] flex flex-col h-full border-t-2 border-emerald-500/30">
            <button
              onClick={createNote}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl py-4 font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all mb-6 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              <Plus className="w-5 h-5" />
              Initialize New Entry
            </button>

            <div className="relative mb-6 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
               <input 
                  type="text" 
                  placeholder="SEARCH ARCHIVES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-11 pr-4 py-3.5 rounded-2xl text-[10px] font-black tracking-widest uppercase placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500/20"
               />
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
              {filteredNotes.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center opacity-40">
                  <div className="bg-slate-800/50 p-6 rounded-3xl mb-4">
                    <StickyNote className="w-10 h-10 text-slate-500" />
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-loose">
                    {searchQuery ? "No matches found in database" : "Central database empty. Initialize entry above."}
                  </p>
                </div>
              ) : (
                filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setActiveNote(note)}
                    className={`group relative p-5 rounded-2xl cursor-pointer transition-all border ${
                       activeNote?.id === note.id 
                       ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5" 
                       : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-xs font-black uppercase tracking-wider truncate pr-4 ${activeNote?.id === note.id ? "text-white" : "text-slate-300"}`}>
                          {note.title || "UNTITLED_RECORD"}
                        </h3>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={(e) => deleteNote(note.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-400/20 rounded-lg transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-1 italic">
                        {note.content || "Cipher text empty..."}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[8px] font-black text-slate-600 uppercase tracking-widest">
                         <Clock className="w-2.5 h-2.5" />
                         {new Date(note.lastModified).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {activeNote?.id === note.id && (
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500">
                          <ChevronRight className="w-4 h-4" />
                       </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Editor Container */}
        <div className="lg:col-span-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel h-full w-full rounded-[2.5rem] border-2 border-white/5 flex flex-col relative overflow-hidden">
            {activeNote ? (
              <div className="flex-1 flex flex-col h-full animate-fade-in relative z-10">
                <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/40 backdrop-blur-md">
                  <div className="flex-1 mr-4">
                    <input
                      type="text"
                      value={activeNote.title}
                      onChange={(e) => updateNote("title", e.target.value)}
                      className="bg-transparent text-3xl font-black text-white w-full focus:outline-none placeholder:text-slate-800 uppercase tracking-tighter"
                      placeholder="ENTER RECORD TITLE"
                    />
                    <div className="flex items-center gap-2 mt-1">
                       <span className={`w-1.5 h-1.5 rounded-full ${saveStatus === 'saving' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                       <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500">
                          {saveStatus === 'saving' ? 'Synchronizing Cloud...' : saveStatus === 'saved' ? 'Database Updated' : 'System Optimized'}
                       </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl transition-all ${saveStatus === 'saved' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                       {saveStatus === 'saved' ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-8 md:p-12 relative">
                   <div className="absolute top-0 left-0 w-full h-full p-8 md:p-12 -z-10 opacity-[0.02] pointer-events-none select-none">
                      <p className="text-[12rem] font-black uppercase leading-none break-all">{activeNote.title || "RECORD"}</p>
                   </div>
                   <textarea
                    ref={editorRef}
                    value={activeNote.content}
                    onChange={(e) => updateNote("content", e.target.value)}
                    className="w-full h-full bg-transparent text-slate-300 resize-none focus:outline-none leading-relaxed text-lg font-medium selection:bg-emerald-500/30 selection:text-white placeholder:text-slate-800"
                    placeholder="Initialize entry description and intelligence payload..."
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 opacity-40 text-center">
                <div className="bg-slate-800/50 p-12 rounded-[3.5rem] mb-8 shadow-inner border border-white/5 rotate-[-5deg]">
                  <PenTool className="w-24 h-24 text-slate-500" />
                </div>
                <h3 className="text-5xl font-black text-slate-300 mb-2 uppercase tracking-tighter italic">Idle State</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] max-w-sm mx-auto leading-loose">
                  Neural path inactive. Select a record from the encrypted archive or synchronize a new intelligence entry.
                </p>
                <div className="mt-12 flex gap-6">
                   <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            
            {/* Subtle light effect at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 flex justify-between items-center px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 pb-8 border-t border-white/5 pt-8">
        <div>&copy; {new Date().getFullYear()} Vault Intelligence Labs</div>
        <div className="flex gap-6">
           <span className="hover:text-emerald-500 cursor-pointer transition-colors">Encryption</span>
           <span className="hover:text-emerald-500 cursor-pointer transition-colors">Cloud Sync</span>
           <span className="hover:text-emerald-500 cursor-pointer transition-colors">Protocol</span>
        </div>
      </footer>
    </div>
  );
}
