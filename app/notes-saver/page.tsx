"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2, Plus, PenTool, LogOut, ArrowLeft } from "lucide-react";

export default function NotesSaver() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<{ id: string; title: string; content: string }[]>([]);
  const [activeNote, setActiveNote] = useState<{ id: string; title: string; content: string } | null>(null);

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
  };

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
    };
    const updated = [newNote, ...notes];
    saveNotes(updated);
    setActiveNote(newNote);
  };

  const updateNote = (field: "title" | "content", value: string) => {
    if (!activeNote) return;
    const updatedDraft = { ...activeNote, [field]: value };
    setActiveNote(updatedDraft);
    saveNotes(notes.map((n) => (n.id === activeNote.id ? updatedDraft : n)));
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
    if (activeNote?.id === id) setActiveNote(null);
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
      <div className="fixed inset-0 bg-primary/10 rounded-full blur-[180px] -z-10 mix-blend-screen pointer-events-none" />

      {/* Header */}
      <header className="flex items-center justify-between mb-8 animate-fade-in glass-panel px-6 py-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/")} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-2 rounded-xl text-white shadow-lg">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Notes Saver</h1>
            <p className="text-xs text-slate-400">Securely synced for {session?.user?.name}</p>
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

      <main className="flex-1 grid lg:grid-cols-4 gap-6 animate-slide-up">
        {/* Sidebar */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-4 flex flex-col h-[600px] overflow-hidden">
          <button
            onClick={createNote}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl py-3 font-medium hover:scale-[1.02] active:scale-[0.98] transition-all mb-4"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
            {notes.length === 0 ? (
              <div className="text-center p-8 text-slate-500 text-sm">
                No notes yet. Click new note to start!
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note)}
                  className={`group p-4 rounded-xl cursor-pointer transition-all border ${activeNote?.id === note.id ? "bg-white/10 border-white/20 shadow-md" : "bg-transparent border-transparent hover:bg-white/5"}`}
                >
                  <div className="flex items-center justify-between pointer-events-none">
                    <h3 className="font-medium text-white truncate pr-2">{note.title || "Untitled Note"}</h3>
                    <button 
                      onClick={(e) => deleteNote(note.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:bg-red-400/20 rounded-lg transition-all pointer-events-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 pointer-events-none">
                    {note.content || "Empty..."}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3 glass-panel rounded-2xl flex flex-col overflow-hidden h-[600px]">
          {activeNote ? (
            <div className="flex flex-col h-full animate-fade-in">
              <div className="border-b border-white/5 p-4 md:p-6 flex items-center gap-4 bg-slate-900/40">
                <input
                  type="text"
                  value={activeNote.title}
                  onChange={(e) => updateNote("title", e.target.value)}
                  className="bg-transparent text-2xl font-bold text-white w-full focus:outline-none placeholder:text-slate-600"
                  placeholder="Note Title"
                />
                <button className="flex items-center justify-center p-2.5 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors shrink-0" title="Saved automatically">
                  <Save className="w-5 h-5" />
                </button>
              </div>
              <textarea
                value={activeNote.content}
                onChange={(e) => updateNote("content", e.target.value)}
                className="flex-1 w-full bg-transparent p-4 md:p-6 text-slate-300 resize-none focus:outline-none leading-relaxed text-base"
                placeholder="Start typing your awesome note here..."
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-slate-500 opacity-80">
              <PenTool className="w-16 h-16 mb-4 text-slate-600" />
              <h2 className="text-xl font-medium text-slate-300">Select a Note</h2>
              <p className="text-sm mt-2 max-w-sm text-center">
                Choose a note from the sidebar or create a new one to begin writing.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
