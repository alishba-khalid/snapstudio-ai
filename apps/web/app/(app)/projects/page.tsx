import { Folder, Plus, Search, MoreHorizontal } from 'lucide-react';

const projects = [
  { name: 'Summer Collection 2026', images: 42, lastUpdated: '2 hours ago' },
  { name: 'Amazon Store Hero Shots', images: 12, lastUpdated: '5 hours ago' },
  { name: 'Social Media Assets', images: 84, lastUpdated: '1 day ago' },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-white">Projects</h1>
          <p className="mt-1 text-white/40">Organize your shoots into focused collections.</p>
        </div>
        <button className="btn-primary-new flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input 
          type="text" 
          placeholder="Filter projects..." 
          className="w-full rounded-2xl border border-white/5 bg-white/5 py-3 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project) => (
          <div key={project.name} className="glass-card group hover:scale-[1.02] transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="rounded-2xl bg-brand-violet/10 p-4 text-brand-violet transition group-hover:bg-brand-violet group-hover:text-white shadow-sm">
                <Folder className="h-8 w-8" />
              </div>
              <button className="text-white/20 hover:text-white">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-brand-violet transition-colors">{project.name}</h3>
            <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
              <span>{project.images} Images</span>
              <span>Updated {project.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
