"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, FileText, User, Briefcase, ChevronRight, Loader2, Download, LogOut, Printer, Copy, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ResumeData, TemplateId } from "../types/resume";
import TemplateSelector from "../components/TemplateSelector";

// Import Templates
import MinimalistTemplate from "../components/templates/Minimalist";
import ModernTemplate from "../components/templates/Modern";
import CreativeTemplate from "../components/templates/Creative";
import ExecutiveTemplate from "../components/templates/Executive";
import TechTemplate from "../components/templates/Tech";
import AcademicTemplate from "../components/templates/Academic";
import CompactTemplate from "../components/templates/Compact";
import BoldTemplate from "../components/templates/Bold";
import SuiteHeader from "../components/SuiteHeader";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const generateResume = async () => {
    if (!name || !skills) return;

    setLoading(true);
    setResumeData(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, skills }),
      });

      const data = await res.json();
      
      // Handle potential stringified JSON from AI
      let parsedData = data.result;
      if (typeof parsedData === 'string') {
        try {
          // Extract JSON if AI wrapped it in markdown code blocks
          const jsonMatch = parsedData.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedData = JSON.parse(jsonMatch[0]);
          } else {
            parsedData = JSON.parse(parsedData);
          }
        } catch (e) {
          console.error("Failed to parse AI JSON:", e);
        }
      }
      
      setResumeData(parsedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = resumeRef.current;
    if (!printContent) return;

    const originalContents = document.body.innerHTML;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Get all stylesheets to preserve styles
    const styles = Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('');
        } catch (e) {
          return '';
        }
      })
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Resume - ${resumeData?.name}</title>
          <style>${styles}</style>
          <style>
            @media print {
              body { background: white !important; -webkit-print-color-adjust: exact; }
              .no-print { display: none !important; }
            }
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div style="width: 100%; max-width: 800px; margin: 0 auto;">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = () => {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const copyToClipboard = () => {
    if (!resumeData) return;
    const text = `
${resumeData.name} - ${resumeData.title}
${resumeData.summary}

EXPERIENCE:
${resumeData.experience.map(exp => `${exp.role} at ${exp.company} (${exp.period})\n${exp.description.join('\n')}`).join('\n\n')}

SKILLS:
${resumeData.skills.join(', ')}

EDUCATION:
${resumeData.education.map(edu => `${edu.degree} from ${edu.school} (${edu.year})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const renderTemplate = () => {
    if (!resumeData) return null;
    const props = { data: resumeData };
    
    switch (selectedTemplate) {
      case "minimalist": return <MinimalistTemplate {...props} />;
      case "modern": return <ModernTemplate {...props} />;
      case "creative": return <CreativeTemplate {...props} />;
      case "executive": return <ExecutiveTemplate {...props} />;
      case "tech": return <TechTemplate {...props} />;
      case "academic": return <AcademicTemplate {...props} />;
      case "compact": return <CompactTemplate {...props} />;
      case "bold": return <BoldTemplate {...props} />;
      default: return <ModernTemplate {...props} />;
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest animate-pulse">Establishing Secure Session...</p>
      </div>
    );
  }

  // If unauthenticated, the useEffect will handle redirection. 
  // We show a simple message in case the router is slow.
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-4 h-4 animate-spin text-slate-700 mb-2" />
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">Redirecting to Portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto flex flex-col">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header & Nav */}
      <SuiteHeader 
        title="ResumeAI Pro"
        subtitle="Premium Intelligence"
        icon={Sparkles}
        themeColor="primary"
      />

      <main className="flex-1 grid lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-4 flex flex-col gap-6 animate-slide-up">
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border-t-2 border-primary/30">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                <FileText className="w-6 h-6 text-primary" />
                Construction
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium italic">
                Input your credentials to synchronize with the AI.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-bold placeholder:text-slate-600 focus:ring-2 focus:ring-primary/20"
                    placeholder="ENTER FULL NAME"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Core Capability</label>
                <div className="relative group">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="glass-input w-full pl-11 pr-4 py-4 rounded-2xl text-sm font-bold resize-none placeholder:text-slate-600 focus:ring-2 focus:ring-primary/20"
                    placeholder="REACT, TYPESCRIPT, ARCHITECTURE..."
                  />
                </div>
              </div>

              <TemplateSelector 
                selectedId={selectedTemplate}
                onSelect={setSelectedTemplate}
              />

              <button
                onClick={generateResume}
                disabled={loading || !name || !skills}
                className="btn-primary w-full py-4 mt-2 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Synchronizing...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Initialize Generation</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="glass-panel p-6 rounded-3xl flex items-start gap-4 border-l-4 border-l-primary/50">
            <div className="p-2 bg-primary/10 rounded-xl text-primary animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white mb-1 uppercase tracking-widest">Intelligence Report</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                Our neural processors are optimized for specific skills. Explicitly define your tech stack for maximum impact scores.
              </p>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-8 h-full min-h-[600px] animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel h-full w-full rounded-3xl border-2 border-white/5 flex flex-col relative overflow-hidden">
            {loading ? (
               <div className="flex-1 flex flex-col items-center justify-center p-8">
                 <div className="relative w-32 h-32 mb-8">
                   <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                   <div className="absolute inset-4 border-b-4 border-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkles className="text-primary w-8 h-8 animate-pulse" />
                   </div>
                 </div>
                 <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Synthesizing...</h3>
                 <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Allocating resources for premium template: {selectedTemplate}</p>
               </div>
            ) : resumeData ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/40 backdrop-blur-md sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                    <h3 className="text-xs font-black text-white uppercase tracking-widest leading-none">Draft Finalized</h3>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={copyToClipboard}
                      className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all border border-white/5"
                    >
                      {copySuccess ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                      {copySuccess ? "Copied" : "Copy Raw"}
                    </button>
                    <button 
                      onClick={handlePrint}
                      className="text-[10px] font-black uppercase tracking-widest bg-primary hover:bg-primary/80 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20 rotate-[-1deg] hover:rotate-0"
                    >
                      <Printer className="w-4 h-4" />
                      Print PDF
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto bg-slate-100 p-8 md:p-12 custom-scrollbar">
                  <div ref={resumeRef} className="origin-top transition-transform duration-500">
                    {renderTemplate()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 opacity-40">
                <div className="bg-slate-800/50 p-10 rounded-[2.5rem] mb-8 shadow-inner border border-white/5 rotate-3">
                  <FileText className="w-20 h-20 text-slate-500" />
                </div>
                <h3 className="text-4xl font-black text-slate-300 mb-2 uppercase tracking-tighter italic">Idle State</h3>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] max-w-xs text-center">
                  Establish a connection by providing input data on the control panel.
                </p>
                <div className="mt-12 flex gap-4">
                   <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0s' }}></div>
                   <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 rounded-full bg-slate-800 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-12 flex justify-between items-center px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 pb-8 border-t border-white/5 pt-8">
        <div>&copy; {new Date().getFullYear()} ResumeAI Intelligence Systems</div>
        <div className="flex gap-6">
           <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
           <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
           <span className="hover:text-primary cursor-pointer transition-colors">Contact</span>
        </div>
      </footer>
    </div>
  );
}