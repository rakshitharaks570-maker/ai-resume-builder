import { ResumeData } from "../../types/resume";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-16 bg-white text-[#0f172a] font-serif max-w-[800px] mx-auto shadow-2xl min-h-[1050px] leading-relaxed">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4 uppercase italic border-b-4 border-[#0f172a] inline-block px-12 pb-2">{data.name}</h1>
        <p className="text-xl text-[#475569] font-medium tracking-[0.2em] uppercase mt-4 mb-8 italic">{data.title}</p>
        
        <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-[#64748b] border-t border-[#f1f5f9] pt-6">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span className="w-1 h-1 bg-[#cbd5e1] rounded-full my-auto" />}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span className="w-1 h-1 bg-[#cbd5e1] rounded-full my-auto" />}
          {data.contact.location && <span>{data.contact.location}</span>}
        </div>
      </header>

      <main className="space-y-16">
        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#94a3b8] mb-8 text-center bg-[#f8fafc] py-3 border-y border-[#f1f5f9]">Professional Profile</h2>
          <p className="text-[#1e293b] text-lg italic text-center max-w-2xl mx-auto leading-loose px-8">
            "{data.summary}"
          </p>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#94a3b8] mb-10 text-center bg-[#f8fafc] py-3 border-y border-[#f1f5f9]">Expertise & Strategic Skills</h2>
          <div className="grid grid-cols-3 gap-y-4 gap-x-12 text-center">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-[#334155] font-bold text-sm border-b border-[#f8fafc] pb-2 hover:text-[#0f172a] transition-colors uppercase tracking-widest">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#94a3b8] mb-12 text-center bg-[#f8fafc] py-3 border-y border-[#f1f5f9]">Professional Experience</h2>
          <div className="space-y-16">
            {data.experience.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-baseline mb-4 border-b border-[#f1f5f9] pb-2">
                  <h3 className="text-2xl font-bold text-[#0f172a] group-hover:italic transition-all">{exp.role}</h3>
                  <span className="text-sm font-bold text-[#94a3b8] uppercase tracking-widest italic">{exp.period}</span>
                </div>
                <p className="text-[#475569] font-bold text-lg mb-6 uppercase tracking-wider">{exp.company}</p>
                <ul className="space-y-4 px-8">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-[#1e293b] list-disc marker:text-[#cbd5e1] leading-relaxed italic">
                        {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-[#94a3b8] mb-10 text-center bg-[#f8fafc] py-3 border-y border-[#f1f5f9]">Educational Background</h2>
          <div className="grid grid-cols-2 gap-12 text-center">
            {data.education.map((edu, index) => (
              <div key={index} className="p-8 border border-[#f8fafc] hover:bg-[#f8fafc] transition-colors group">
                <h3 className="text-[#0f172a] font-bold text-lg mb-2 uppercase group-hover:italic">{edu.degree}</h3>
                <p className="text-[#64748b] font-medium mb-2 italic">{edu.school}</p>
                <p className="text-[#94a3b8] text-xs font-bold tracking-widest uppercase">{edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-24 pt-12 border-t-2 border-[#0f172a] text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#cbd5e1]">Confidential Portfolio &bull; MMXVI</p>
      </footer>
    </div>
  );
}
