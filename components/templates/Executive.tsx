import { ResumeData } from "../../types/resume";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-16 bg-white text-slate-900 font-serif max-w-[800px] mx-auto shadow-2xl min-h-[1050px] leading-relaxed">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase italic border-b-4 border-slate-900 inline-block px-12 pb-2">{data.name}</h1>
        <p className="text-xl text-slate-600 font-medium tracking-[0.2em] uppercase mt-4 mb-8 italic">{data.title}</p>
        
        <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500 border-t border-slate-100 pt-6">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span className="w-1 h-1 bg-slate-300 rounded-full my-auto" />}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span className="w-1 h-1 bg-slate-300 rounded-full my-auto" />}
          {data.contact.location && <span>{data.contact.location}</span>}
        </div>
      </header>

      <main className="space-y-16">
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-8 text-center bg-slate-50 py-3 border-y border-slate-100">Professional Profile</h2>
          <p className="text-slate-800 text-lg italic text-center max-w-2xl mx-auto leading-loose px-8">
            "{data.summary}"
          </p>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-10 text-center bg-slate-50 py-3 border-y border-slate-100">Expertise & Strategic Skills</h2>
          <div className="grid grid-cols-3 gap-y-4 gap-x-12 text-center">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-slate-700 font-bold text-sm border-b border-slate-50 pb-2 hover:text-slate-900 transition-colors uppercase tracking-widest">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-12 text-center bg-slate-50 py-3 border-y border-slate-100">Professional Experience</h2>
          <div className="space-y-16">
            {data.experience.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-baseline mb-4 border-b border-slate-100 pb-2">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:italic transition-all">{exp.role}</h3>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">{exp.period}</span>
                </div>
                <p className="text-slate-600 font-bold text-lg mb-6 uppercase tracking-wider">{exp.company}</p>
                <ul className="space-y-4 px-8">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-slate-800 list-disc marker:text-slate-300 leading-relaxed italic">
                        {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400 mb-10 text-center bg-slate-50 py-3 border-y border-slate-100">Educational Background</h2>
          <div className="grid grid-cols-2 gap-12 text-center">
            {data.education.map((edu, index) => (
              <div key={index} className="p-8 border border-slate-50 hover:bg-slate-50 transition-colors group">
                <h3 className="text-slate-900 font-bold text-lg mb-2 uppercase group-hover:italic">{edu.degree}</h3>
                <p className="text-slate-500 font-medium mb-2 italic">{edu.school}</p>
                <p className="text-slate-400 text-xs font-bold tracking-widest uppercase">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 pt-12 border-t-2 border-slate-900 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Confidential Portfolio &bull; MMXVI</p>
      </footer>
    </div>
  );
}
