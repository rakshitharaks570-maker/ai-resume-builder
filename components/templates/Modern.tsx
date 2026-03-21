import { ResumeData } from "../../types/resume";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-0 bg-white text-slate-800 font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1050px] overflow-hidden">
      <div className="bg-primary text-white p-12 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 blur-3xl" />
        
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 relative z-10">{data.name}</h1>
        <p className="text-2xl text-primary-foreground/90 font-medium tracking-wide mb-8 relative z-10">{data.title}</p>
        
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/80 relative z-10">
          {data.contact.email && <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full">{data.contact.email}</span>}
          {data.contact.location && <span className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full">{data.contact.location}</span>}
        </div>
      </div>

      <div className="p-12 grid grid-cols-12 gap-12">
        <div className="col-span-12">
          <section className="mb-12">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Professional Summary
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg border-l-2 border-slate-100 pl-6">{data.summary}</p>
          </section>
        </div>

        <div className="col-span-8">
          <section className="mb-12">
            <h2 className="text-xl font-bold text-primary mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Work Experience
            </h2>
            <div className="space-y-12">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />
                  <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-bold text-slate-800">{exp.role}</h3>
                    <span className="text-sm font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-lg tabular-nums uppercase tracking-wider">{exp.period}</span>
                  </div>
                  <p className="text-primary font-bold text-lg mb-4">{exp.company}</p>
                  <ul className="space-y-3">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-slate-600 flex items-start gap-2">
                         <span className="text-primary mt-1.5">•</span>
                         <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-primary/5 text-primary text-sm font-bold rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Education
            </h2>
            <div className="space-y-8">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-transform hover:-translate-y-1">
                  <h3 className="text-slate-800 font-bold text-lg leading-tight mb-2">{edu.degree}</h3>
                  <p className="text-primary font-semibold text-sm mb-2">{edu.school}</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
