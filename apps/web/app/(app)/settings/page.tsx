import { Bell, CreditCard, Key, Lock, User, ShieldCheck, Sparkles } from 'lucide-react';

const tabs = [
  { name: 'General', icon: <User className="h-4 w-4" />, active: true },
  { name: 'Billing', icon: <CreditCard className="h-4 w-4" />, active: false },
  { name: 'Security', icon: <Lock className="h-4 w-4" />, active: false },
  { name: 'API Keys', icon: <Key className="h-4 w-4" />, active: false },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-white">Settings</h1>
        <p className="mt-2 text-white/40">Manage your profile, billing, and API access.</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-1">
          {tabs.map((tab) => (
            <button 
              key={tab.name} 
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                tab.active 
                  ? 'bg-brand-violet/10 text-brand-violet ring-1 ring-brand-violet/20' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </aside>

        <main className="space-y-8">
          {/* Profile Section */}
          <section className="glass-card !p-8">
            <h3 className="text-xl font-bold text-white mb-8">Public Profile</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-brand-violet/20 border-2 border-brand-violet/30 flex items-center justify-center">
                  <User className="h-10 w-10 text-brand-violet" />
                </div>
                <div>
                  <button className="btn-secondary-new !px-4 !py-2 !text-xs">Change Avatar</button>
                  <p className="mt-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">JPG, PNG, or WEBP (Max 2MB)</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Display Name</label>
                  <input type="text" defaultValue="Ahmed Khan" className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white focus:border-brand-violet/50 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Email Address</label>
                  <input type="email" defaultValue="ahmed@snapstudio.ai" className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white focus:border-brand-violet/50 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Business Type</label>
                  <select className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white focus:border-brand-violet/50 focus:outline-none transition-all appearance-none cursor-pointer">
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Food & Beverage</option>
                    <option>Home Decor</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex justify-end">
              <button className="btn-primary-new !px-8 !py-3">Save Changes</button>
            </div>
          </section>

          {/* Billing Preview Section */}
          <section className="glass-card !p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Subscription</h3>
              <span className="rounded-full bg-brand-emerald/10 px-3 py-1 text-[10px] font-bold text-brand-emerald border border-brand-emerald/20 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Active
              </span>
            </div>

            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 md:flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-brand-violet flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Growth Monthly Plan</p>
                  <p className="text-xs text-white/40">$39.00 / month • Renews May 14, 2026</p>
                </div>
              </div>
              <button className="mt-4 md:mt-0 px-6 py-2 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition">
                Manage Billing
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
