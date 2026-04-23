import { Palette, Plus, Search, CheckCircle2 } from 'lucide-react';

const styles = [
  { name: 'Minimalist White', type: 'Studio', isDefault: true, color: '#FFFFFF' },
  { name: 'Luxury Marble', type: 'Lifestyle', isDefault: false, color: '#E5E5E5' },
  { name: 'Midnight Glow', type: 'Creative', isDefault: false, color: '#030712' },
];

export default function BrandStylesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-white">Brand Styles</h1>
          <p className="mt-1 text-white/40">Lock in your visual DNA for consistent generations.</p>
        </div>
        <button className="btn-primary-new flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Style
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {styles.map((style) => (
          <div key={style.name} className="glass-card group relative cursor-pointer">
            <div 
              className="h-32 w-full rounded-2xl mb-6 shadow-inner ring-1 ring-white/10" 
              style={{ background: `linear-gradient(135deg, ${style.color} 0%, rgba(255,255,255,0.05) 100%)` }}
            />
            {style.isDefault && (
              <div className="absolute top-10 right-10 rounded-full bg-brand-emerald p-1.5 text-white shadow-premium">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            )}
            <h3 className="text-lg font-bold text-white">{style.name}</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-lg bg-white/5 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white/40 border border-white/5">
                {style.type}
              </span>
            </div>
            
            <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="flex-1 rounded-lg bg-white/5 py-1.5 text-[10px] font-bold text-white hover:bg-white/10">Edit</button>
              <button className="flex-1 rounded-lg bg-white/5 py-1.5 text-[10px] font-bold text-white hover:bg-white/10">Set Default</button>
            </div>
          </div>
        ))}
        
        {/* Empty State / Add New */}
        <div className="rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-10 group cursor-pointer hover:border-brand-violet/50 transition-colors">
          <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-brand-violet/20 group-hover:text-brand-violet transition">
            <Plus className="h-6 w-6" />
          </div>
          <p className="text-xs font-bold text-white/30">Add New Style</p>
        </div>
      </div>

      <section className="mt-20 glass-card !p-12 border-brand-violet/20 bg-brand-violet/5">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-violet shadow-premium text-white">
              <Palette className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-black text-white italic italic">Why lock your brand style?</h2>
            <p className="max-w-md text-sm text-white/50 leading-relaxed">
              Consistent products photos build trust. By locking your brand style, our AI ensures every generation uses the same lighting, focal length, and mood.
            </p>
          </div>
          <div className="rounded-[2rem] bg-black/60 p-8 border border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan mb-4">Pro Tip</p>
            <p className="text-xs text-white/70 italic">
              "Upload 5 high-quality examples of your existing brand photography and we'll train a private model just for your store."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
