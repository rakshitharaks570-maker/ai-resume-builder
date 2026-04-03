import { ResumeData } from "../../types/resume";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-0 bg-white text-[#0f172a] font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1100px] overflow-hidden flex flex-col">
      {/* High-Impact Header */}
      <div className="bg-[#0f172a] text-white p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[rgba(99,102,241,0.1)] rounded-full -mr-40 -mt-40 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[rgba(168,85,247,0.1)] rounded-full -ml-32 -mb-32 blur-3xl" />
        
        <div className="relative z-10 flex flex-col gap-4">
          <h1 className="text-6xl font-black tracking-tighter leading-none uppercase italic">{data.name}</h1>
          <p className="text-xl text-[#818cf8] font-bold tracking-[0.2em] uppercase">{data.title}</p>
          
          <div className="flex flex-wrap gap-6 mt-6 items-center text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
            {data.contact.email && (
              <span className="flex items-center gap-2 border border-[rgba(255,255,255,0.1)] px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)]">
                {data.contact.email}
              </span>
            )}
            {data.contact.phone && (
              <span className="flex items-center gap-2 border border-[rgba(255,255,255,0.1)] px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)]">
                {data.contact.phone}
              </span>
            )}
            {data.contact.location && (
              <span className="flex items-center gap-2 border border-[rgba(255,255,255,0.1)] px-4 py-2 rounded-full bg-[rgba(255,255,255,0.05)]">
                {data.contact.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-16 grid grid-cols-12 gap-16 flex-1">
        {/* Left Column: Experience */}
        <div className="col-span-8">
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e11d48]">Professional Narrative</h2>
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </div>
            <p className="text-[#475569] leading-relaxed text-lg font-medium">{data.summary}</p>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e11d48]">Operational Experience</h2>
              <div className="flex-1 h-px bg-[#f1f5f9]" />
            </div>
            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <div key={index} className="group transition-all">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-black text-[#0f172a] tracking-tight group-hover:text-[#e11d48] transition-colors">{exp.role}</h3>
                    <span className="text-[10px] font-black text-[#94a3b8] border border-[#f1f5f9] px-3 py-1.5 rounded-lg uppercase tracking-widest">{exp.period}</span>
                  </div>
                  <p className="text-[#e11d48] font-bold text-sm mb-4 uppercase tracking-widest">{exp.company}</p>
                  <ul className="space-y-3">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-[#475569] flex items-start gap-3">
                         <div className="w-1.5 h-1.5 rounded-full bg-[rgba(225,29,72,0.3)] mt-2.5 shrink-0" />
                         <span className="leading-relaxed font-medium text-[15px]">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Skills & Education */}
        <div className="col-span-4 space-y-16">
          <section>
             <div className="flex items-center gap-4 mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e11d48]">Core Expertise</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-[#fff1f2] text-[#334155] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#fee2e2] hover:border-[#fecdd3] hover:bg-white hover:text-[#e11d48] transition-all cursor-default shadow-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4f46e5]">Foundations</h2>
            </div>
            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <div key={index} className="group">
                  <h3 className="text-[#0f172a] font-black text-sm uppercase tracking-tight mb-2 group-hover:text-[#4f46e5] transition-colors leading-tight">{edu.degree}</h3>
                  <p className="text-[#64748b] font-bold text-xs mb-1">{edu.school}</p>
                  <p className="text-[#4f46e5] text-[9px] font-black uppercase tracking-[0.2em]">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer / Border */}
      <div className="h-4 bg-[#0f172a]" />
    </div>
  );
}

