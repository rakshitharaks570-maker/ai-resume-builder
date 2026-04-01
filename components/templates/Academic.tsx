import { ResumeData } from "../../types/resume";
import { BookOpen, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function AcademicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-16 bg-white text-[#1a1c1e] font-serif max-w-[800px] mx-auto shadow-2xl min-h-[1050px] leading-relaxed">
      <header className="mb-12 border-b-2 border-[#0f172a] pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-6 uppercase tracking-widest">{data.name}</h1>
        
        <div className="flex justify-center gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-widest text-[#444] flex-wrap">
          <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> {data.contact.email}</div>
          {data.contact.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> {data.contact.phone}</div>}
          {data.contact.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {data.contact.location}</div>}
        </div>
      </header>

      <main className="space-y-12">
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1a1c1e] mb-6 border-b border-[#e2e8f0] pb-2">Research Interests & Profile</h2>
          <p className="text-[#334155] text-lg indent-8 text-justify leading-loose">{data.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1a1c1e] mb-6 border-b border-[#e2e8f0] pb-2">Education</h2>
          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start gap-10">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{edu.school}</h3>
                  <p className="text-[#475569] font-bold italic">{edu.degree}</p>
                  {edu.description && <p className="text-[#64748b] text-sm mt-2 italic">{edu.description}</p>}
                </div>
                <span className="text-sm font-bold tabular-nums bg-[#f1f5f9] px-4 py-1 rounded border border-[#e2e8f0]">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1a1c1e] mb-8 border-b border-[#e2e8f0] pb-2">Professional Experience</h2>
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-2xl font-bold group-hover:underline transition-all underline-offset-4">{exp.company}</h3>
                  <span className="text-sm font-bold tabular-nums italic text-[#64748b]">{exp.period}</span>
                </div>
                <p className="text-lg font-bold text-[#334155] mb-4">{exp.role}</p>
                <ul className="space-y-3 px-6 list-outside marker:text-[#94a3b8]">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-[#475569] leading-relaxed list-disc hover:bg-[#f8fafc] transition-colors rounded pr-4">
                        {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#1a1c1e] mb-6 border-b border-[#e2e8f0] pb-2">Core Competencies</h2>
          <div className="grid grid-cols-2 gap-y-3 gap-x-12">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4 text-[#334155] border-b border-[#f1f5f9] pb-1">
                <BookOpen className="w-4 h-4 text-[#94a3b8]" />
                <span className="font-bold text-sm tracking-wide">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 pt-10 border-t border-[#f1f5f9] text-[#999] text-[9px] uppercase tracking-[0.5em] text-center">
         Generated via AI Resume Builder &bull; Curriculum Vitae &bull; {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}

