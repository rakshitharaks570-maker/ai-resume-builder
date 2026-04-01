"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, FileText, User, Briefcase, ChevronRight, Loader2, Download, 
  LogOut, Printer, Copy, CheckCircle2, Layout, GraduationCap, Trophy, 
  Plus, Trash2, Send, Wand2, ChevronLeft, Save, Share2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ResumeData, TemplateId, Experience, Education } from "../../types/resume";
import TemplateSelector from "../../components/TemplateSelector";
import { motion, AnimatePresence } from "framer-motion";

// Import Templates
import MinimalistTemplate from "../../components/templates/Minimalist";
import ModernTemplate from "../../components/templates/Modern";
import CreativeTemplate from "../../components/templates/Creative";
import ExecutiveTemplate from "../../components/templates/Executive";
import TechTemplate from "../../components/templates/Tech";
import BoldTemplate from "../../components/templates/Bold";
import SuiteHeader from "../../components/SuiteHeader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const INITIAL_DATA: ResumeData = {
  name: "ALEX RIVERS",
  title: "SENIOR SOFTWARE ARCHITECT",
  summary: "A brief professional summary will appear here once generated or edited.",
  contact: {
    email: "alex.rivers@intel.vault",
    phone: "+1 (555) 000-0000",
    location: "San Francisco, CA",
  },
  skills: ["React", "TypeScript", "Node.js", "System Design"],
  experience: [
    {
      company: "Tech Systems",
      role: "Lead Engineer",
      period: "2020 - Present",
      description: ["Spearheaded the development of a micro-services architecture."],
    }
  ],
  education: [
    {
      school: "Stanford University",
      degree: "B.S. in Computer Science",
      year: "2018",
    }
  ]
};

type Step = "basics" | "experience" | "education" | "skills" | "summary";

export default function BuilderPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeStep, setActiveStep] = useState<Step>("basics");
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      loadResumeData();
    }
  }, [status, router]);

  const saveResumeData = () => {
    localStorage.setItem("resume_data_v1", JSON.stringify(resumeData));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const loadResumeData = () => {
    const saved = localStorage.getItem("resume_data_v1");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  };

  const updateData = (path: string, value: any) => {
    setResumeData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", period: "", description: [""] }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", year: "" }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const improveSummary = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Improve this professional summary for a ${resumeData.title} background: ${resumeData.summary}. Focus on impact and high-end results. Keep it professional and ATS-friendly.` 
        }),
      });
      const data = await res.json();
      updateData('summary', data.result || resumeData.summary);
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) {
      alert("Neural Render Target not found.");
      return;
    }

    setLoading(true);
    try {
      // Add a short delay for final paint
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const options = {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: 800,
        onclone: (clonedDoc: Document) => {
          // AGGRESSIVE NEURAL GUARD:
          // Recursively scan and force-convert any oklch/oklab color functions
          // which are unsupported by the PDF engine's parser.
          const elements = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            
            // We use computed style check if possible, but in a clone 
            // we primarily target elements that might have these styles.
            const style = el.getAttribute("style") || "";
            if (style.includes("oklch") || style.includes("oklab")) {
              el.style.color = "#000000";
              el.style.backgroundColor = "transparent";
              el.style.borderColor = "#e2e8f0";
            }
            
            // Force reset any tailwind-generated dynamic color properties
            // that are known to cause html2canvas parsing failures.
            if (el.className?.includes("text-") || el.className?.includes("bg-")) {
               el.style.color = window.getComputedStyle(el).color.includes("ok") ? "#0f172a" : "";
               el.style.backgroundColor = window.getComputedStyle(el).backgroundColor.includes("ok") ? "transparent" : "";
            }
          }
        }
      };

      const canvas = await html2canvas(element, options);
      const imgData = canvas.toDataURL("image/png", 1.0);
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
      
      const finalWidth = imgProps.width * ratio;
      const finalHeight = imgProps.height * ratio;
      
      const marginX = (pdfWidth - finalWidth) / 2;
      const marginY = 0;

      pdf.addImage(imgData, "PNG", marginX, marginY, finalWidth, finalHeight, undefined, 'FAST');
      pdf.save(`Resume-${resumeData.name.replace(/\s+/g, '-')}-Neural-Sync.pdf`);
      
      saveResumeData();
      setLoading(false);
    } catch (error) {
      console.error("PDF Engineering Error:", error);
      alert("PDF SYNCHRONIZATION FAILED. CHECK NEURAL CONSOLE.");
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    const props = { data: resumeData };
    switch (selectedTemplate) {
      case "minimalist": return <MinimalistTemplate {...props} />;
      case "modern": return <ModernTemplate {...props} />;
      case "creative": return <CreativeTemplate {...props} />;
      case "executive": return <ExecutiveTemplate {...props} />;
      case "tech": return <TechTemplate {...props} />;
      case "bold": return <BoldTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
        <div className="relative">
          <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mb-6 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse text-indigo-500/50">Synchronizing Neural Core...</p>
      </div>
    );
  }

  const steps = [
    { id: "basics", label: "Basics", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Trophy },
    { id: "summary", label: "Summary", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-indigo-500/30">
      {/* Success Notification */}
      <AnimatePresence>
        {copySuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-indigo-600 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl shadow-indigo-500/40 border border-indigo-400/30"
          >
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Neural State Cached Successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editor Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-black italic tracking-tighter text-xl text-white uppercase mt-0.5">RESUME<span className="text-indigo-400">AI</span> <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded ml-2 uppercase not-italic tracking-widest">Core v4.0</span></h1>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={downloadPDF} disabled={loading} className="btn-primary px-8 py-2.5 rounded-full text-[10px] flex items-center gap-3 active:scale-95 transition-all">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Execute PDF Export
          </button>
          <div className="h-4 w-[1px] bg-white/10" />
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-slate-500 hover:text-white transition-colors group">
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>


      <main className="flex-1 flex overflow-hidden">
        {/* Step Navigation Sidebar */}
        <nav className="w-20 lg:w-64 border-r border-white/5 bg-black/30 flex flex-col p-4 gap-2">
          {steps.map((step) => (
            <button 
              key={step.id}
              onClick={() => setActiveStep(step.id as Step)}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all group ${activeStep === step.id ? 'bg-indigo-500/10 text-indigo-400 shadow-inner border border-indigo-500/20' : 'text-slate-500 hover:bg-white/5'}`}
            >
              <step.icon className={`w-5 h-5 ${activeStep === step.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
              <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest">{step.label}</span>
            </button>
          ))}
          
          <div className="mt-auto p-4 hidden lg:block">
            <div className="glass-panel p-4 rounded-2xl border-indigo-500/20">
               <div className="flex items-center gap-2 mb-2 text-indigo-400">
                  <Wand2 className="w-3 h-3" />
                  <span className="text-[9px] font-black uppercase">Elite Tip</span>
               </div>
               <p className="text-[9px] text-slate-500 leading-relaxed uppercase tracking-tighter">Use specific action verbs for 20% higher impact scores.</p>
            </div>
          </div>
        </nav>

        {/* Editor Form Panel */}
        <section className="flex-1 overflow-y-auto custom-scrollbar bg-slate-950/20 p-8 lg:p-12">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {activeStep === "basics" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  <div className="mb-12">
                    <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Core Identity</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Provide the foundational data for your neural profile.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                      <input 
                        value={resumeData.name} 
                        onChange={(e) => updateData('name', e.target.value.toUpperCase())}
                        className="glass-input w-full p-4 rounded-2xl text-sm font-bold uppercase tracking-widest" 
                        placeholder="ENTER NAME"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Core Designation</label>
                      <input 
                        value={resumeData.title} 
                        onChange={(e) => updateData('title', e.target.value.toUpperCase())}
                        className="glass-input w-full p-4 rounded-2xl text-sm font-bold uppercase tracking-widest" 
                        placeholder="ENTER TITLE"
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Comm-Link Email</label>
                        <input value={resumeData.contact.email} onChange={(e) => updateData('contact.email', e.target.value)} className="glass-input w-full p-4 rounded-2xl text-sm font-bold" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Frequency Phone</label>
                        <input value={resumeData.contact.phone} onChange={(e) => updateData('contact.phone', e.target.value)} className="glass-input w-full p-4 rounded-2xl text-sm font-bold" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Location Sector</label>
                      <input value={resumeData.contact.location} onChange={(e) => updateData('contact.location', e.target.value)} className="glass-input w-full p-4 rounded-2xl text-sm font-bold" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === "experience" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                   <div className="flex justify-between items-end mb-12">
                     <div>
                        <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Exp Grid</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Log your previous deployments and operations.</p>
                     </div>
                     <button onClick={addExperience} className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
                        <Plus className="w-5 h-5" />
                     </button>
                   </div>

                   {resumeData.experience.map((exp, idx) => (
                     <div key={idx} className="glass-panel p-8 rounded-3xl relative group">
                        <button onClick={() => removeExperience(idx)} className="absolute top-4 right-4 text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                           <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-500">Operation / Role</label>
                              <input value={exp.role} onChange={(e) => {
                                const newExp = [...resumeData.experience];
                                newExp[idx].role = e.target.value;
                                updateData('experience', newExp);
                              }} className="glass-input w-full p-3 rounded-xl text-xs font-bold" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-500">Base / Company</label>
                              <input value={exp.company} onChange={(e) => {
                                const newExp = [...resumeData.experience];
                                newExp[idx].company = e.target.value;
                                updateData('experience', newExp);
                              }} className="glass-input w-full p-3 rounded-xl text-xs font-bold" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black uppercase text-slate-500">Operation Timeline</label>
                           <input value={exp.period} onChange={(e) => {
                             const newExp = [...resumeData.experience];
                             newExp[idx].period = e.target.value;
                             updateData('experience', newExp);
                           }} className="glass-input w-full p-3 rounded-xl text-xs font-bold" placeholder="2020 - PRESENT" />
                        </div>
                        <div className="mt-6 space-y-2">
                           <label className="text-[9px] font-black uppercase text-slate-500">Operation Details (One per line)</label>
                           <textarea 
                             rows={3} 
                             value={exp.description.join('\n')} 
                             onChange={(e) => {
                               const newExp = [...resumeData.experience];
                               newExp[idx].description = e.target.value.split('\n');
                               updateData('experience', newExp);
                             }}
                             className="glass-input w-full p-4 rounded-xl text-xs font-bold resize-none leading-relaxed" 
                           />
                        </div>
                     </div>
                   ))}
                </motion.div>
              )}

              {activeStep === "education" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                   <div className="flex justify-between items-end mb-12">
                     <div>
                        <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Edu Grid</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Log your academic foundations and credentials.</p>
                     </div>
                     <button onClick={addEducation} className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl hover:bg-indigo-500/20 transition-all border border-indigo-500/20">
                        <Plus className="w-5 h-5" />
                     </button>
                   </div>

                   {resumeData.education.map((edu, idx) => (
                     <div key={idx} className="glass-panel p-8 rounded-3xl relative group">
                        <button onClick={() => removeEducation(idx)} className="absolute top-4 right-4 text-slate-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                           <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                           <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-500">Institute / School</label>
                              <input value={edu.school} onChange={(e) => {
                                const newEdu = [...resumeData.education];
                                newEdu[idx].school = e.target.value;
                                updateData('education', newEdu);
                              }} className="glass-input w-full p-3 rounded-xl text-xs font-bold" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] font-black uppercase text-slate-500">Credential / Degree</label>
                              <input value={edu.degree} onChange={(e) => {
                                const newEdu = [...resumeData.education];
                                newEdu[idx].degree = e.target.value;
                                updateData('education', newEdu);
                              }} className="glass-input w-full p-3 rounded-xl text-xs font-bold" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[9px] font-black uppercase text-slate-500">Graduation Year</label>
                           <input value={edu.year} onChange={(e) => {
                             const newEdu = [...resumeData.education];
                             newEdu[idx].year = e.target.value;
                             updateData('education', newEdu);
                           }} className="glass-input w-full p-3 rounded-xl text-xs font-bold" placeholder="2018" />
                        </div>
                     </div>
                   ))}
                </motion.div>
              )}

              {activeStep === "skills" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                  <div className="mb-12">
                    <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Neural Expertise</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Define your core capabilities and technical reach.</p>
                  </div>

                  <div className="glass-panel p-8 rounded-[2.5rem]">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-3">
                        {resumeData.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl group transition-all hover:border-indigo-500/40">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">{skill}</span>
                            <button onClick={() => {
                              const newSkills = resumeData.skills.filter((_, i) => i !== idx);
                              updateData('skills', newSkills);
                            }} className="text-slate-600 hover:text-red-500 transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="relative group pt-4 border-t border-white/5">
                        <input 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              if (input.value.trim()) {
                                updateData('skills', [...resumeData.skills, input.value.trim()]);
                                input.value = '';
                              }
                            }
                          }}
                          className="glass-input w-full p-4 rounded-2xl text-xs font-bold uppercase tracking-widest" 
                          placeholder="ADD SKILL (PRESS ENTER)"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 bg-white/5 p-2 rounded-lg">
                           <kbd className="text-[8px] font-bold">ENTER</kbd>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === "summary" && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  <div className="mb-12">
                    <h2 className="text-3xl font-black italic tracking-tighter mb-2 uppercase">Neural Summary</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">A high-impact summation of your professional essence.</p>
                  </div>

                  <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/30" />
                    <textarea 
                      rows={8}
                      value={resumeData.summary}
                      onChange={(e) => updateData('summary', e.target.value)}
                      className="glass-input w-full p-6 rounded-3xl text-sm font-bold leading-relaxed resize-none transition-all"
                      placeholder="DESCRIBE YOUR PROFESSIONAL ARC..."
                    />
                    
                    <button 
                      onClick={improveSummary}
                      disabled={aiLoading}
                      className="mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                      {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      {aiLoading ? "Synchronizing with AI..." : "Enhance with Neural Link"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-16 flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/5 shadow-2xl">
               <button 
                 onClick={() => {
                   const idx = steps.findIndex(s => s.id === activeStep);
                   if (idx > 0) setActiveStep(steps[idx-1].id as Step);
                 }}
                 className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest pl-4"
               >
                 <ChevronLeft className="w-4 h-4" />
                 Previous
               </button>
               
               <TemplateSelector 
                 selectedId={selectedTemplate}
                 onSelect={setSelectedTemplate}
               />

               <button 
                 onClick={() => {
                   const idx = steps.findIndex(s => s.id === activeStep);
                   if (idx < steps.length - 1) setActiveStep(steps[idx+1].id as Step);
                 }}
                 className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full text-[10px] uppercase font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
               >
                 {activeStep === "summary" ? "Finalize" : "Next Protocol"}
                 <ChevronRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </section>

        {/* Live Preview Column */}
        <section className="hidden xl:flex w-[48%] bg-secondary/30 border-l border-white/5 flex-col overflow-hidden relative">
          {/* Preview Header */}
          <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/40">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Real-time Visualization</span>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const url = window.location.href;
                    navigator.clipboard.writeText(url);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 transition-all active:scale-90" 
                  title="Copy Neural Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={saveResumeData}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 transition-all active:scale-90" 
                  title="Cache Neural State"
                >
                  <Save className="w-4 h-4" />
                </button>
             </div>
          </div>
          
          {/* Scrollable Preview Area */}
          <div className="flex-1 overflow-y-auto p-12 bg-slate-900/50 flex justify-center custom-scrollbar">
             <div className="w-full origin-top transform scale-90 lg:scale-100" style={{ maxWidth: '800px' }}>
                <div ref={resumeRef} className="shadow-2xl shadow-black/80 rounded-sm overflow-hidden">
                   {renderTemplate()}
                </div>
             </div>
          </div>
          
          {/* Zoom / Info Bar */}
          <div className="h-10 bg-black/60 border-t border-white/5 flex items-center justify-center">
             <span className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">Neural Template Rendered at 100% Precision</span>
          </div>
        </section>
      </main>
    </div>
  );
}
