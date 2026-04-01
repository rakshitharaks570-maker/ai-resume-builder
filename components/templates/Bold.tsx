import { ResumeData } from "../../types/resume";

export default function BoldTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-0 bg-white text-[#1e293b] font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1050px] overflow-hidden">
      <header className="bg-[#0f172a] text-white p-16 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[rgba(99,102,241,0.1)] -skew-x-12 transform translate-x-1/4" />
        <div className="relative z-10">
          <h1 className="text-6xl font-black tracking-tighter mb-4 uppercase">{data.name}</h1>
          <div className="flex items-center gap-6">
            <p className="text-2xl font-bold text-[#6366f1] tracking-widest uppercase">{data.title}</p>
            <div className="h-px flex-1 bg-[rgba(255,255,255,0.2)]" />
          </div>
          
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8]">
            <span>{data.contact.email}</span>
            {data.contact.phone && <span>{data.contact.phone}</span>}
            {data.contact.location && <span>{data.contact.location}</span>}
          </div>
        </div>
      </header>

      <main className="p-16 space-y-16">
        <section className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0f172a] mb-2">The Pitch</h2>
            <div className="h-2 w-12 bg-[#6366f1] mb-6" />
          </div>
          <div className="col-span-8">
            <p className="text-[#475569] text-xl font-bold leading-relaxed">{data.summary}</p>
          </div>
        </section>

        <section className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-[#0f172a] mb-2">Execution</h2>
            <div className="h-2 w-12 bg-[#6366f1] mb-6" />
            
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-4">Core Arsenal</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1.5 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-widest rounded-sm transition-transform hover:scale-110">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#94a3b8] mb-4">Education</h3>
                {data.education.map((edu, index) => (
                   <div key={index} className="mb-4">
                      <p className="font-black text-[#1e293b] text-sm uppercase">{edu.degree}</p>
                      <p className="text-[#64748b] font-bold text-xs">{edu.school}</p>
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
                    <h3 className="text-3xl font-black text-[#0f172a] group-hover:text-[#6366f1] transition-colors uppercase tracking-tight">{exp.role}</h3>
                    <p className="text-xl font-bold text-[#94a3b8] mt-1">{exp.company}</p>
                  </div>
                  <span className="text-xs font-black bg-[#f1f5f9] px-4 py-2 rounded-full tabular-nums uppercase tracking-widest text-[#64748b]">{exp.period}</span>
                </div>
                <ul className="space-y-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-4 group-hover:translate-x-2 transition-transform">
                      <div className="w-2 h-2 bg-[#6366f1] mt-2 shrink-0" />
                      <p className="text-[#475569] font-bold leading-relaxed italic">{desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#6366f1] p-8 text-white text-center">
         <p className="text-xs font-black uppercase tracking-[0.5em]">Victory belongs to the most persevering &bull; AI Resume Builder Bold</p>
      </footer>
    </div>
  );
}
