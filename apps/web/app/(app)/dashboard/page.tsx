import { Plus, FolderPlus, Sparkles, Image as ImageIcon, ArrowUpRight, Clock, Box } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { name: 'Images this month', value: '184', total: '300', unit: 'images', icon: <ImageIcon className="h-4 w-4" /> },
  { name: 'Lifestyle clips', value: '2', total: '5', unit: 'clips', icon: <Sparkles className="h-4 w-4" /> },
  { name: 'Storage used', value: '2.4', total: '10', unit: 'GB', icon: <Box className="h-4 w-4" /> },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Good morning, Ahmed 👋</h1>
          <p className="mt-1 text-white/40">Here is what is happening with your projects today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/studio" className="btn-primary-new flex items-center gap-2 !px-5 !py-2.5">
            <Plus className="h-4 w-4" /> New Image
          </Link>
          <button className="btn-secondary-new flex items-center gap-2 !px-5 !py-2.5">
            <FolderPlus className="h-4 w-4" /> New Project
          </button>
        </div>
      </header>

      {/* Stats Row */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card !p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-white/5 p-2 text-white/60">
                {stat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{stat.name}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">{stat.value}</span>
              <span className="text-sm font-semibold text-white/30">/ {stat.total} {stat.unit}</span>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div 
                className="h-full bg-brand-violet transition-all" 
                style={{ width: `${(Number(stat.value) / Number(stat.total)) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Recent Work - Conditional Rendering for UX */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-cyan" /> Your Gallery
            </h2>
            <Link href="/gallery" className="text-xs font-bold text-brand-violet hover:underline flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          
          {/* Dashboard Empty State Hero */}
          <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-12 text-center md:p-20 group cursor-pointer hover:bg-white/[0.04] transition-all">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-brand-violet/20 shadow-premium group-hover:scale-110 transition">
              <Plus className="h-12 w-12 text-brand-violet" />
            </div>
            <h2 className="text-3xl font-black text-white">Create your first shoot</h2>
            <p className="mx-auto mt-4 max-w-sm text-white/40 font-medium">
              Upload your raw product photos and let our AI transform them into studio-quality assets in seconds.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-10 lg:flex-row">
              <Link href="/studio" className="btn-primary-new !px-10 !py-4 shadow-premium group-hover:scale-105 transition">
                Start New Project
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-20">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">Amazon</span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">Daraz</span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">Shopify</span>
            </div>
          </div>
        </section>

        {/* Action Sidebar */}
        <aside className="space-y-6">
          <div className="glass-card !bg-brand-violet shadow-premium border-none">
            <h3 className="text-lg font-bold text-white">Upgrade to Scale</h3>
            <p className="mt-2 text-xs font-medium text-white/70">
              Get unlimited credits, bulk export, and full API access for your entire team.
            </p>
            <button className="mt-6 w-full rounded-xl bg-white py-3 text-xs font-black text-brand-violet shadow-xl hover:scale-105 active:scale-95 transition">
              Upgrade Now
            </button>
          </div>

          <div className="glass-card space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Tutorials</h3>
            {[
              "Setting up custom brand styles",
              "Optimizing for Shopify",
              "How to use ghost mannequin"
            ].map((tut) => (
              <Link key={tut} href="#" className="flex items-center gap-3 text-xs font-semibold text-white/60 hover:text-white transition">
                <div className="h-1 w-1 rounded-full bg-brand-cyan" />
                {tut}
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
