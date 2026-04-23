import { Download, Filter, MoreHorizontal, Search, Share2, Grid, List as ListIcon, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';

const filters = ['All', 'Lifestyle', 'Studio White', 'Background Removed', 'Ghost Mannequin'];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Your Gallery</h1>
          <p className="mt-1 text-white/40">Manage and export your processed product photos.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1">
            <button className="rounded-lg bg-brand-violet p-2 shadow-premium text-white">
              <Grid className="h-4 w-4" />
            </button>
            <button className="p-2 text-white/30 hover:text-white transition">
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
          <button className="btn-primary-new !px-5 !py-2.5 flex items-center gap-2">
            <Zap className="h-4 w-4" /> Bulk Export
          </button>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Search images by name or project..." 
            className="w-full rounded-2xl border border-white/5 bg-white/5 py-3 pl-12 pr-4 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {filters.map((filter) => (
            <button 
              key={filter} 
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition ${
                filter === 'All' 
                  ? 'bg-brand-violet text-white shadow-premium' 
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
          <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-bold text-white/50 hover:bg-white/10 hover:text-white transition">
            <Filter className="h-3 w-3" /> More Filters
          </button>
        </div>
      </div>

      {/* Image Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="group glass-card !p-0 overflow-hidden cursor-pointer relative aspect-[4/5]">
            <div className="h-full w-full bg-slate-800/50 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-white/5" />
            </div>
            
            {/* Hover Actions */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-white leading-none">Marketplace_Shot_{i}.png</p>
                  <span className="text-[10px] font-bold text-brand-cyan tracking-tighter">LIFESTYLE SCENE</span>
                </div>
                <button className="text-white/40 hover:text-white">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg bg-white/10 py-2 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/20 transition backdrop-blur-md">
                  <Download className="inline h-3 w-3 mr-1" /> Download
                </button>
                <button className="rounded-lg bg-brand-violet p-2 text-white shadow-premium">
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Selection Checkbox */}
            <div className="absolute left-4 top-4 h-5 w-5 rounded-md border border-white/20 bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-20 flex items-center justify-center gap-4">
        <button className="px-6 py-2 text-sm font-bold text-white/30 hover:text-white transition">Previous</button>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((page) => (
            <button key={page} className={`h-8 w-8 rounded-lg text-xs font-bold transition ${page === 1 ? 'bg-brand-violet text-white' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
              {page}
            </button>
          ))}
        </div>
        <button className="px-6 py-2 text-sm font-bold text-white/30 hover:text-white transition">Next</button>
      </div>
    </div>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  );
}
