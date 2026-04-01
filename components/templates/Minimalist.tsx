import { ResumeData } from "../../types/resume";

export default function MinimalistTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="p-10 bg-white text-[#1e293b] font-sans max-w-[800px] mx-auto shadow-2xl min-h-[1050px]">
      <header className="border-b-2 border-[#f1f5f9] pb-8 mb-8">
        <h1 className="text-4xl font-light tracking-tight text-[#0f172a] mb-2">{data.name}</h1>
        <p className="text-xl text-[#64748b] font-medium tracking-wide border-l-4 border-[#e2e8f0] pl-4">{data.title}</p>
        
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#94a3b8]">
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.location && <span>{data.contact.location}</span>}
          {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-10">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#cbd5e1] mb-4">Profile</h2>
            <p className="text-[#475569] leading-relaxed text-lg">{data.summary}</p>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#cbd5e1] mb-6">Experience</h2>
            <div className="space-y-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-semibold text-[#1e293b] group-hover:text-[#6366f1] transition-colors">{exp.role}</h3>
                    <span className="text-sm text-[#94a3b8] tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-[#64748b] font-medium mb-3">{exp.company}</p>
                  <ul className="list-none space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-[#475569] leading-relaxed pl-4 border-l border-[#f1f5f9] italic transition-all hover:bg-[#f8fafc]">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-10 border-l border-[#f8fafc] pl-10">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#cbd5e1] mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-[#f8fafc] text-[#475569] text-xs font-semibold rounded-full border border-[#f1f5f9]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#cbd5e1] mb-4">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="text-[#1e293b] font-semibold">{edu.degree}</h3>
                  <p className="text-[#64748b] text-sm">{edu.school}</p>
                  <p className="text-[#94a3b8] text-xs mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

