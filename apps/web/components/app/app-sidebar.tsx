'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, LayoutDashboard, Image as ImageIcon, Wand2, Settings, LogOut, ChevronRight, Folder, Palette } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: 'AI Studio', href: '/studio', icon: <Wand2 className="h-4 w-4" /> },
  { name: 'Projects', href: '/projects', icon: <Folder className="h-4 w-4" /> },
  { name: 'Gallery', href: '/gallery', icon: <ImageIcon className="h-4 w-4" /> },
  { name: 'Brand Styles', href: '/brand-styles', icon: <Palette className="h-4 w-4" /> },
  { name: 'Settings', href: '/settings', icon: <Settings className="h-4 w-4" /> },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/5 bg-background/50 backdrop-blur-2xl hidden md:block">
      <div className="flex h-full flex-col p-6">
        <Link href="/dashboard" className="flex items-center gap-2 mb-10 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-violet transition group-hover:scale-110">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SnapStudio</span>
        </Link>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-violet/10 text-brand-violet ring-1 ring-brand-violet/20'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="rounded-[1.5rem] bg-white/[0.03] p-5 border border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Usage Allowance</p>
            <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
              <span>184 / 300</span>
              <span className="text-white/30">Images</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-2/3 bg-brand-violet transition-all" />
            </div>
            <button className="mt-5 w-full rounded-xl bg-white/5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition border border-white/5">
              Upgrade
            </button>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/40 transition hover:bg-red-500/10 hover:text-red-400">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};
