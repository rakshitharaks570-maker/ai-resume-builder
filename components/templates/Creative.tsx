import { ResumeData } from "../../types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Zap } from "lucide-react";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="flex bg-white max-w-[800px] mx-auto shadow-2xl min-h-[1050px] overflow-hidden leading-snug">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-white p-8 flex flex-col">
        <div className="mb-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-accent to-primary rounded-3xl mx-auto mb-6 flex items-center justify-center rotate-3 shadow-lg shadow-primary/20 transition-transform hover:rotate-6">
             <span className="text-4xl font-black">{data.name.charAt(0)}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">{data.name}</h1>
          <p className="text-sm font-medium text-primary uppercase tracking-[0.2em]">{data.title}</p>
        </div>

        <section className="mb-10">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 border-b border-white/5 pb-2">Contact</h2>
          <ul className="space-y-4 text-xs text-slate-300 font-medium">
            <li className="flex items-center gap-4 transition-colors hover:text-white">
              <div className="p-2 bg-white/5 rounded-lg"><Mail className="w-4 h-4 text-primary" /></div>
              <span className="truncate">{data.contact.email}</span>
            </li>
            {data.contact.phone && (
              <li className="flex items-center gap-4 transition-colors hover:text-white">
                <div className="p-2 bg-white/5 rounded-lg"><Phone className="w-4 h-4 text-primary" /></div>
                <span>{data.contact.phone}</span>
              </li>
            )}
            {data.contact.location && (
              <li className="flex items-center gap-4 transition-colors hover:text-white">
                <div className="p-2 bg-white/5 rounded-lg"><MapPin className="w-4 h-4 text-primary" /></div>
                <span>{data.contact.location}</span>
              </li>
            )}
            {data.contact.github && (
               <li className="flex items-center gap-4 transition-colors hover:text-white">
                <div className="p-2 bg-white/5 rounded-lg"><Github className="w-4 h-4 text-primary" /></div>
                <span>{data.contact.github}</span>
              </li>
            )}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-6 border-b border-white/5 pb-2">Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1.5 bg-white/5 text-primary text-[10px] font-black rounded-lg border border-white/5 uppercase tracking-wider transition-all hover:bg-primary/20 hover:text-white">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-auto">
          <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Top Talent</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              Consistently delivers high-value solutions with a focus on impact and technical excellence.
            </p>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-12 flex flex-col">
        <section className="mb-12">
          <h2 className="text-3xl font-black text-slate-800 mb-6 flex items-baseline gap-4">
             About Me
             <span className="h-1 w-12 bg-primary rounded-full" />
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg font-medium">{data.summary}</p>
        </section>

        <section className="mb-12">
           <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-baseline gap-4">
             Experience
             <span className="h-1 w-12 bg-primary rounded-full" />
          </h2>
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{exp.role}</h3>
                    <p className="text-primary font-bold text-lg">{exp.company}</p>
                  </div>
                  <span className="bg-slate-50 text-slate-400 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-slate-100">{exp.period}</span>
                </div>
                <ul className="space-y-3 mt-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-slate-600 flex items-start gap-3">
                       <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                       <span className="leading-relaxed font-medium">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-baseline gap-4">
             Education
             <span className="h-1 w-12 bg-primary rounded-full" />
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {data.education.map((edu, index) => (
              <div key={index} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100 hover:scale-[1.02]">
                <h3 className="text-slate-900 font-black text-base leading-tight mb-2 uppercase tracking-wide">{edu.degree}</h3>
                <p className="text-slate-500 font-bold text-xs mb-3">{edu.school}</p>
                <div className="inline-block px-3 py-1 bg-white rounded-full text-[10px] font-black text-primary border border-slate-100 shadow-sm">{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
