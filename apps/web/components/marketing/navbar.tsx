'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, ArrowRight, Menu, X, Globe } from 'lucide-react';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-2 group transition hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-violet shadow-premium transition group-hover:scale-110">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">SnapStudio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium text-white/60 md:flex">
          <Link href="/#features" className="hover:text-white transition">Features</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/studio" className="flex items-center gap-1 text-white hover:text-brand-cyan transition font-bold">
            AI Studio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {/* Language Toggle Placeholder */}
          <button className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-white/50 hover:bg-white/10 hover:text-white sm:flex transition">
            <Globe className="h-3 w-3" />
            <span>EN</span>
            <span className="text-white/20">|</span>
            <span className="opacity-50">UR</span>
          </button>
          
          <Link href="/login" className="hidden text-sm font-semibold text-white/80 hover:text-white sm:block">Sign in</Link>
          <Link href="/register" className="btn-primary-new !px-5 !py-2.5 !text-[10px] md:!px-6 md:!text-xs">Start free</Link>
          
          {/* Mobile Toggle */}
          <button 
            className="flex md:hidden text-white/60 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-6 border-b border-white/5 bg-background/95 p-8 backdrop-blur-xl md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4 text-lg font-bold text-white">
            <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/studio" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-cyan">AI Studio</Link>
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
             <Link href="/login" className="text-white/60 font-bold">Sign in</Link>
             <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/5">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Language</span>
                <div className="flex gap-4 font-black text-sm">
                  <span className="text-brand-violet underline underline-offset-4">EN</span>
                  <span className="text-white/20">UR</span>
                </div>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};
