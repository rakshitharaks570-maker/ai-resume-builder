import { ResumeData } from "../../types/resume";

export default function CompactTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-8 bg-white text-slate-800 font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1050px] text-xs leading-tight">
      <header className="flex justify-between items-end border-b pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900 leading-none">{data.name}</h1>
          <p className="text-sm font-bold text-primary mt-1 uppercase tracking-widest">{data.title}</p>
        </div>
        <div className="text-right text-[10px] text-slate-500 font-medium space-y-0.5">
          <p>{data.contact.email}</p>
          {data.contact.phone && <p>{data.contact.phone}</p>}
          {data.contact.location && <p>{data.contact.location}</p>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <section className="mb-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 border-b-2 border-slate-100 pb-1">Summary</h2>
            <p className="text-slate-600 leading-relaxed font-medium">{data.summary}</p>
          </section>
        </div>

        <div className="col-span-8">
          <section className="mb-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 border-b-2 border-slate-100 pb-1">Professional Experience</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-black text-slate-900">{exp.role}</h3>
                    <span className="text-[9px] font-bold text-slate-400 tabular-nums uppercase">{exp.period}</span>
                  </div>
                  <p className="text-primary font-bold text-[11px] mb-2">{exp.company}</p>
                  <ul className="list-disc pl-3 space-y-1 marker:text-slate-300">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-slate-600 leading-tight pl-1 font-medium">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-6 border-l pl-6 border-slate-50">
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 border-b-2 border-slate-100 pb-1">Core Skills</h2>
            <div className="grid grid-cols-1 gap-1">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700 font-bold bg-slate-50 px-2 py-1 rounded">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 border-b-2 border-slate-100 pb-1">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-[11px] font-black text-slate-900 leading-tight">{edu.degree}</h3>
                  <p className="text-slate-500 font-bold text-[9px] mt-0.5">{edu.school}</p>
                  <p className="text-slate-400 text-[8px] mt-1 tabular-nums">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-auto pt-8 flex justify-between items-center text-[8px] text-slate-300 font-black uppercase tracking-[0.3em]">
         <span>ResumeAI Compact v1.0</span>
         <span>Page 1 of 1</span>
      </footer>
    </div>
  );
}
