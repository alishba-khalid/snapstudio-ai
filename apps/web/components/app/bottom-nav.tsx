'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Sparkles, Image as ImageIcon, Briefcase, Settings } from 'lucide-react';

const items = [
  { name: 'Home', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Studio', icon: Sparkles, href: '/studio' },
  { name: 'Gallery', icon: ImageIcon, href: '/gallery' },
  { name: 'Projects', icon: Briefcase, href: '/projects' },
  { name: 'Settings', icon: Settings, href: '/settings' },
];

export const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-background/80 px-6 py-3 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-brand-violet' : 'text-white/40'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'fill-brand-violet/20' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
