import { TemplateId } from "../types/resume";
import { Layout, CheckCircle2 } from "lucide-react";

const templates: { id: TemplateId; name: string; description: string; previewColor: string }[] = [
  { id: 'minimalist', name: 'Minimalist', description: 'Clean & Classic', previewColor: 'bg-white' },
  { id: 'modern', name: 'Modern', description: 'Professional & Blue', previewColor: 'bg-primary' },
  { id: 'creative', name: 'Creative', description: 'Vibrant & Sidebar', previewColor: 'bg-slate-900' },
  { id: 'executive', name: 'Executive', description: 'Serif & Elegant', previewColor: 'bg-slate-50' },
  { id: 'tech', name: 'Tech', description: 'Monospace & Dark', previewColor: 'bg-[#0d1117]' },
  { id: 'academic', name: 'Academic', description: 'Traditional & Formal', previewColor: 'bg-white' },
  { id: 'compact', name: 'Compact', description: 'Dense & Efficient', previewColor: 'bg-white' },
  { id: 'bold', name: 'Bold', description: 'High-Impact', previewColor: 'bg-slate-900' },
];

export default function TemplateSelector({ 
  selectedId, 
  onSelect 
}: { 
  selectedId: TemplateId; 
  onSelect: (id: TemplateId) => void 
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
        <Layout className="w-4 h-4 text-primary" />
        Choose Template
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`group relative p-3 rounded-xl border-2 transition-all text-left overflow-hidden ${
              selectedId === t.id 
                ? 'border-primary bg-primary/10' 
                : 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10'
            }`}
          >
            <div className={`w-full h-12 rounded-lg mb-2 ${t.previewColor} border border-white/10 group-hover:scale-105 transition-transform overflow-hidden relative`}>
               {selectedId === t.id && (
                 <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                 </div>
               )}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white mb-0.5">{t.name}</p>
            <p className="text-[9px] text-slate-500 font-medium truncate">{t.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
