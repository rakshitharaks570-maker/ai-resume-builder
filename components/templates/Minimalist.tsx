import { ResumeData } from "../../types/resume";

export default function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-10 bg-white text-slate-800 font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1050px]">
      <header className="border-b-2 border-slate-100 pb-8 mb-8">
        <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-2">{data.name}</h1>
        <p className="text-xl text-slate-500 font-medium tracking-wide border-l-4 border-slate-200 pl-4">{data.title}</p>
        
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span>{data.contact.location}</span>}
          {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-4">Profile</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{data.summary}</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-6">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-semibold text-slate-800 group-hover:text-primary transition-colors">{exp.role}</h3>
                    <span className="text-sm text-slate-400 tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-slate-500 font-medium mb-3">{exp.company}</p>
                  <ul className="list-none space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-slate-600 leading-relaxed pl-4 border-l border-slate-100 italic transition-all hover:bg-slate-50/50">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-10 border-l border-slate-50 pl-10">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-full border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-4">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-slate-800 font-semibold">{edu.degree}</h3>
                  <p className="text-slate-500 text-sm">{edu.school}</p>
                  <p className="text-slate-400 text-xs mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
