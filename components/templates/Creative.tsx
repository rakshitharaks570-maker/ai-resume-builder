import { ResumeData } from "../../types/resume";
import { Mail, Phone, MapPin, Globe, Award, Zap, Link } from "lucide-react";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="flex bg-white max-w-[800px] mx-auto shadow-2xl min-h-[1100px] overflow-hidden leading-snug">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#0f172a] text-white p-10 flex flex-col">
        <div className="mb-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#6366f1] to-[#9333ea] rounded-[2rem] mx-auto mb-6 flex items-center justify-center rotate-3 shadow-2xl shadow-[rgba(99,102,241,0.2)] transition-transform hover:rotate-6">
             <span className="text-4xl font-black italic tracking-tighter">{data.name.charAt(0)}</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter mb-1 uppercase italic leading-none">{data.name}</h1>
          <p className="text-[10px] font-black text-[#818cf8] uppercase tracking-[0.3em] mt-2">{data.title}</p>
        </div>

        <section className="mb-12">
          <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#64748b] mb-8 border-b border-[rgba(255,255,255,0.05)] pb-2">Comm-Link</h2>
          <ul className="space-y-6 text-[10px] text-[#cbd5e1] font-bold uppercase tracking-widest">
            <li className="flex items-center gap-4 transition-colors hover:text-white">
              <Mail className="w-4 h-4 text-[#6366f1] shrink-0" />
              <span className="truncate">{data.contact.email}</span>
            </li>
            {data.contact.phone && (
              <li className="flex items-center gap-4 transition-colors hover:text-white">
                <Phone className="w-4 h-4 text-[#6366f1] shrink-0" />
                <span>{data.contact.phone}</span>
              </li>
            )}
            {data.contact.location && (
              <li className="flex items-center gap-4 transition-colors hover:text-white">
                <MapPin className="w-4 h-4 text-[#6366f1] shrink-0" />
                <span>{data.contact.location}</span>
              </li>
            )}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#64748b] mb-8 border-b border-[rgba(255,255,255,0.05)] pb-2">Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-2 bg-[rgba(255,255,255,0.05)] text-[#818cf8] text-[9px] font-black rounded-xl border border-[rgba(255,255,255,0.05)] uppercase tracking-tighter transition-all hover:bg-[rgba(99,102,241,0.2)] hover:text-white cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-auto">
          <div className="p-6 bg-[rgba(99,102,241,0.1)] rounded-[1.5rem] border border-[rgba(255,255,255,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-[rgba(99,102,241,0.3)]" />
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3 h-3 text-[#6366f1]" />
              <span className="text-[9px] font-black text-white uppercase tracking-[0.3em]">Neural Status</span>
            </div>
            <p className="text-[9px] text-[#64748b] font-bold leading-relaxed uppercase tracking-tight">
              Optimized for high-impact professional narrative.
            </p>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-16 flex flex-col bg-white">
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4f46e5] italic">About Profile</h2>
            <div className="flex-1 h-px bg-[#f1f5f9]" />
          </div>
          <p className="text-[#475569] leading-relaxed text-lg font-medium">{data.summary}</p>
        </section>

        <section className="mb-16">
           <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4f46e5] italic">Deployment History</h2>
            <div className="flex-1 h-px bg-[#f1f5f9]" />
          </div>
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-black text-[#0f172a] leading-none group-hover:text-[#4f46e5] transition-colors uppercase italic">{exp.role}</h3>
                    <p className="text-[#4f46e5] font-black text-sm uppercase tracking-widest mt-2">{exp.company}</p>
                  </div>
                  <span className="text-[9px] font-black text-[#94a3b8] border border-[#f1f5f9] px-3 py-1.5 rounded-lg uppercase tracking-widest shrink-0">{exp.period}</span>
                </div>
                <ul className="space-y-3 mt-6">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-[#475569] flex items-start gap-4">
                       <span className="w-1.5 h-1.5 bg-[rgba(99,102,241,0.3)] rounded-full mt-2.5 shrink-0" />
                       <span className="leading-relaxed font-medium text-[15px]">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4f46e5] italic">Academic Grid</h2>
            <div className="flex-1 h-px bg-[#f1f5f9]" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {data.education.map((edu, index) => (
              <div key={index} className="p-6 bg-[#f8fafc] rounded-[1.5rem] border border-[#f1f5f9] transition-all hover:bg-white hover:border-[#e0e7ff] hover:shadow-xl hover:shadow-[rgba(99,102,241,0.05)] group">
                <div className="flex justify-between items-center text-sm font-black text-[#0f172a] uppercase tracking-tight mb-2 group-hover:text-[#4f46e5] transition-colors">
                  {edu.degree}
                  <span className="text-[9px] font-black text-[#4f46e5] bg-white border border-[#f1f5f9] px-3 py-1 rounded-full shadow-sm">{edu.year}</span>
                </div>
                <p className="text-[#64748b] font-bold text-[10px] uppercase tracking-widest">{edu.school}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


