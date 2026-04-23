import Link from 'next/link';
import { Camera, Globe, Link2, Share2, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-40 border-t border-white/5 bg-background py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-16 md:flex-row md:justify-between">
          <div className="max-w-xs space-y-6">
            <Link href="/" className="flex items-center gap-2 group transition hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-violet shadow-premium transition group-hover:scale-110">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SnapStudio</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/40">
              Transforming eCommerce photography through state-of-the-art AI. Based in Dubai & Lahore.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="rounded-full bg-white/5 p-2 text-white/40 transition hover:bg-brand-violet hover:text-white">
                <Globe className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full bg-white/5 p-2 text-white/40 transition hover:bg-brand-violet hover:text-white">
                <Link2 className="h-4 w-4" />
              </Link>
              <Link href="#" className="rounded-full bg-white/5 p-2 text-white/40 transition hover:bg-brand-violet hover:text-white">
                <Share2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-24">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Product</h4>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/#features" className="hover:text-white transition">Features</Link>
                <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
                <Link href="/studio" className="hover:text-white transition">AI Studio</Link>
                <Link href="/gallery" className="hover:text-white transition">Gallery</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Company</h4>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/about" className="hover:text-white transition">Our Story</Link>
                <Link href="/careers" className="hover:text-white transition">Careers</Link>
                <Link href="/blog" className="hover:text-white transition">Blog</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Legal</h4>
              <nav className="flex flex-col gap-2 text-sm text-white/60">
                <Link href="/terms" className="hover:text-white transition">Terms</Link>
                <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
                <Link href="/cookies" className="hover:text-white transition">Cookies</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 md:flex-row">
          <p className="text-xs text-white/20">© 2026 SnapStudio AI. All rights reserved.</p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-emerald" /> 
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
