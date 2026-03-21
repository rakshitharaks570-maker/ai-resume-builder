import { ResumeData } from "../../types/resume";

export default function BoldTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-0 bg-white text-slate-800 font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1050px] overflow-hidden">
      <header className="bg-slate-900 text-white p-16 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 transform translate-x-1/4" />
        <div className="relative z-10">
          <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">{data.name}</h1>
          <div className="flex items-center gap-6">
            <p className="text-2xl font-bold text-primary tracking-widest uppercase">{data.title}</p>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <span>{data.contact.email}</span>
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.location && <span>{data.contact.location}</span>}
          </div>
        </div>
      </header>

      <main className="p-16 space-y-16">
        <section className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">The Pitch</h2>
            <div className="h-2 w-12 bg-primary mb-6" />
          </div>
          <div className="col-span-8">
            <p className="text-slate-600 text-xl font-bold leading-relaxed">{data.summary}</p>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 mb-2">Execution</h2>
            <div className="h-2 w-12 bg-primary mb-6" />
            
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Core Arsenal</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-transform hover:scale-110">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Education</h3>
                {data.education.map((edu, index) => (
                   <div key={index} className="mb-4">
                      <p className="font-black text-slate-800 text-sm uppercase">{edu.degree}</p>
                      <p className="text-slate-500 font-bold text-xs">{edu.school}</p>
                   </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-span-8 space-y-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">{exp.role}</h3>
                    <p className="text-xl font-bold text-slate-400 mt-1">{exp.company}</p>
                  </div>
                  <span className="text-xs font-black bg-slate-100 px-4 py-2 rounded-full tabular-nums uppercase tracking-widest text-slate-500">{exp.period}</span>
                </div>
                <ul className="space-y-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-4 group-hover:translate-x-2 transition-transform">
                      <div className="w-2 h-2 bg-primary mt-2 shrink-0" />
                      <p className="text-slate-600 font-bold leading-relaxed italic">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-primary p-8 text-white text-center">
         <p className="text-xs font-black uppercase tracking-[0.5em]">Victory belongs to the most persevering &bull; ResumeAI Bold</p>
      </footer>
    </div>
  );
}
