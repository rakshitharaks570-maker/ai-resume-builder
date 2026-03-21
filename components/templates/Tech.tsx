import { ResumeData } from "../../types/resume";
import { Terminal, Code, Cpu, Globe, Rocket } from "lucide-react";

export default function TechTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-12 bg-[#0d1117] text-[#c9d1d9] font-mono max-w-[800px] mx-auto shadow-2xl min-h-[1050px] border border-[#30363d] leading-relaxed">
      <header className="mb-12 border-b border-[#30363d] pb-8 relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Code className="w-32 h-32" />
        </div>
        
        <div className="flex items-center gap-4 mb-4">
           <Terminal className="text-[#58a6ff] w-8 h-8" />
           <h1 className="text-4xl font-bold text-[#f0f6fc]">{data.name}</h1>
        </div>
        
        <p className="text-xl text-[#8b949e] font-bold mb-6 flex items-center gap-2">
           <span className="text-[#58a6ff]">&gt;</span> {data.title}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-3 bg-[#161b22] px-4 py-2 rounded-lg border border-[#30363d]">
            <Globe className="w-4 h-4 text-[#79c0ff]" />
            <span>{data.contact.email}</span>
          </div>
          {data.contact.location && (
            <div className="flex items-center gap-3 bg-[#161b22] px-4 py-2 rounded-lg border border-[#30363d]">
              <Cpu className="w-4 h-4 text-[#79c0ff]" />
              <span>{data.contact.location}</span>
            </div>
          )}
        </div>
      </header>

      <main className="space-y-12">
        <section>
          <h2 className="text-[#f0f6fc] text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-3 italic">
            <span className="text-[#ff7b72]">01.</span> profile.md
          </h2>
          <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#58a6ff] transition-all group-hover:w-2" />
            <p className="text-[#8b949e] leading-relaxed italic">{data.summary}</p>
          </div>
        </section>

        <section>
          <h2 className="text-[#f0f6fc] text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3 italic">
            <span className="text-[#ff7b72]">02.</span> tech_stack.json
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1.5 bg-[#238636]/10 text-[#7ee787] text-[10px] font-bold rounded-md border border-[#238636]/30 uppercase tracking-tighter transition-all hover:bg-[#238636]/20">
                "{skill}"
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[#f0f6fc] text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-3 italic">
            <span className="text-[#ff7b72]">03.</span> experience_logs.log
          </h2>
          <div className="space-y-10">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-10 border-l border-[#30363d]">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#58a6ff] shadow-[0_0_10px_rgba(88,166,255,0.5)]" />
                
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-bold text-[#f0f6fc] hover:text-[#58a6ff] transition-colors">{exp.role}</h3>
                  <span className="text-[10px] font-bold text-[#8b949e] bg-[#161b22] px-3 py-1 rounded-full border border-[#30363d] uppercase tracking-tighter">{exp.period}</span>
                </div>
                <p className="text-[#58a6ff] font-bold text-sm mb-4">@ {exp.company}</p>
                <ul className="space-y-3">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-[#8b949e] text-xs flex items-start gap-3">
                       <span className="text-[#ff7b72] mt-0.5">$</span>
                       <span className="leading-normal">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[#f0f6fc] text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-3 italic">
            <span className="text-[#ff7b72]">04.</span> education.git
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.education.map((edu, index) => (
              <div key={index} className="p-5 bg-[#161b22] rounded-xl border border-[#30363d] transition-all hover:border-[#58a6ff]/50">
                <h3 className="text-[#f0f6fc] font-bold text-xs uppercase tracking-tight mb-2 leading-tight">{edu.degree}</h3>
                <p className="text-[#8b949e] text-[10px] mb-3">{edu.school}</p>
                <div className="inline-flex items-center gap-2 text-[10px] font-bold text-[#58a6ff] bg-[#58a6ff]/5 px-3 py-1 rounded-full"><Rocket className="w-3 h-3" /> {edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 pt-8 border-t border-[#30363d] text-center">
         <p className="text-[10px] font-bold text-[#484f58] uppercase tracking-[0.4em]">Compiled with ResumeAI &bull; v2.0.4</p>
      </footer>
    </div>
  );
}
