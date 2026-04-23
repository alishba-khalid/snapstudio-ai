import Link from 'next/link';
import { ArrowRight, Box, Camera, Download, Layers, Sparkles, Zap, Smartphone, Check, HelpCircle, Star, Quote } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import ClientOnly from '@/components/ui/client-only';
import { WhatsAppButton } from '@/components/ui/whatsapp-button';

const features = [
  { 
    title: 'AI Background Removal', 
    description: 'Ultra-precise clipping that preserves shadows and textures.',
    icon: <Layers className="h-6 w-6 text-brand-cyan" />,
    className: 'md:col-span-2'
  },
  { 
    title: 'Instant Lifestyle Scenes', 
    description: '100+ AI-generated settings for every marketplace.',
    icon: <Sparkles className="h-6 w-6 text-brand-violet" />,
    className: 'md:col-span-2'
  },
  { 
    title: 'Single-Click Export', 
    description: 'Optimized files for Amazon, Daraz, and more.',
    icon: <Download className="h-6 w-6 text-brand-emerald" />,
    className: 'md:col-span-1'
  },
  { 
    title: 'Batch Processing', 
    description: 'Upload 100 images and get results in minutes.',
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    className: 'md:col-span-2'
  },
  { 
    title: 'Marketplace Compliance', 
    description: 'Exact specs for Amazon.ae, Daraz, and Noon.',
    icon: <Box className="h-6 w-6 text-blue-400" />,
    className: 'md:col-span-1'
  }
];

import { StyleShowcase } from '@/components/marketing/style-showcase';

export default function HomePage() {
  return (
    <div className="relative isolate min-h-screen bg-background pt-10">
      <main className="mx-auto max-w-7xl px-6 pt-20 md:px-10">
        {/* Hero Section */}
        <section className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-violet/20 bg-brand-violet/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-violet shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              The Future of Product Photography
            </div>
            <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
              Studio-quality photos. <br />
              <span className="text-gradient">In 10 seconds.</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/60">
              Transform raw snapshots into professional marketplace assets. Built specifically for high-growth sellers in South Asia and the UAE.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/register" className="btn-primary-new">
                Get started today
              </Link>
              <Link href="/studio" className="btn-secondary-new">
                Try the Demo
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card overflow-hidden p-2">
              <div className="relative aspect-[4/3] rounded-[1.75rem] bg-slate-800/50 overflow-hidden shadow-2xl">
                <ClientOnly>
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" alt="Original" style={{ opacity: 0.5 }} />}
                    itemTwo={<ReactCompareSliderImage src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000" alt="Enhanced" />}
                    style={{ width: '100%', height: '100%' }}
                  />
                </ClientOnly>
                
                {/* Floating Labels */}
                <div className="absolute left-6 top-6 z-10 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/50 backdrop-blur-md border border-white/10">
                  Original
                </div>
                <div className="absolute bottom-6 right-6 z-10 rounded-full bg-brand-violet px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-premium">
                  AI Enhanced
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-32 w-32 rounded-3xl bg-brand-cyan/20 blur-2xl" />
          </div>
        </section>

        {/* Marketplace Logos / Social Proof */}
        <section className="mt-32">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-white/20">compliance engine for global scale</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-30 grayscale transition hover:grayscale-0 hover:opacity-100">
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl font-black italic tracking-tighter text-white">Amazon<span className="text-brand-violet">.ae</span></span>
               <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Verified Specs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl font-black tracking-tighter text-white">Daraz</span>
               <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Official Guidelines</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl font-black tracking-tighter text-white">Noon</span>
               <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">100% Approval Rate</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <span className="text-3xl font-black tracking-tighter text-white">Shopify</span>
               <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Direct Sync</span>
            </div>
          </div>
        </section>

        {/* How It Works - MOVED HIGHER FOR UX */}
        <section id="how-it-works" className="mt-40">
          <div className="text-center">
            <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-brand-violet">The Process</h2>
            <h2 className="mt-6 text-4xl font-black text-white md:text-5xl">Built for speed.</h2>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {[
              { step: '01', title: 'Upload', desc: 'Snap a photo with your phone and drop it in.', icon: <Smartphone className="h-6 w-6" /> },
              { step: '02', title: 'AI Magic', desc: 'Our neural engines remove background and add scenes.', icon: <Sparkles className="h-6 w-6" /> },
              { step: '03', title: 'Sell', desc: 'Export high-res files ready for any marketplace.', icon: <Check className="h-6 w-6" /> }
            ].map((item) => (
              <div key={item.step} className="group relative">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-white ring-1 ring-white/10 transition group-hover:bg-brand-violet group-hover:scale-110 group-hover:shadow-premium">
                  {item.icon}
                </div>
                <p className="text-[10px] font-black tracking-widest text-brand-cyan uppercase">{item.step}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{item.title}</h3>
                <p className="mt-4 text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Style Showcase - MOVED LOWER TO PREVENT OVERWHELM */}
        <StyleShowcase />

        {/* Features Bento Grid */}
        <section id="features" className="mt-40">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white md:text-5xl uppercase italic tracking-tighter">Powerful features.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50 font-medium">
              Everything you need to automate your product listings and skyrocket your conversions.
            </p>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-4">
            {features.map((feature, idx) => (
              <div key={idx} className={`glass-card p-8 group hover:border-brand-violet/50 transition-all hover:-translate-y-1 ${feature.className}`}>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand-violet/20 group-hover:text-brand-violet transition shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-white/40 leading-relaxed">{feature.description}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-cyan opacity-0 group-hover:opacity-100 transition">
                  Learn more <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance Section - NEW */}
        <section className="mt-40 overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] p-12 md:p-24 relative">
          <div className="absolute right-0 top-0 h-96 w-96 bg-brand-cyan/10 blur-[120px] -z-10" />
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-emerald/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-emerald border border-brand-emerald/20">
                <Check className="h-3 w-3" /> 100% Marketplace Approval
              </div>
              <h2 className="mt-8 text-4xl font-black text-white md:text-6xl">Zero Rejections. <br />Guaranteed.</h2>
              <p className="mt-8 text-lg text-white/50 leading-relaxed">
                Marketplaces like Amazon and Daraz have strict photo requirements. SnapStudio automatically resizes, compresses, and adjusts backgrounds to ensure your products go live instantly.
              </p>
              
              <ul className="mt-12 space-y-6">
                {[
                  { title: 'Automatic White-Balance', desc: 'Compliant with Amazon RGB(255,255,255) standards.' },
                  { title: 'Smart Resizing', desc: 'Optimized 1500px squares for Daraz & Noon listings.' },
                  { title: 'Lossless Compression', desc: 'Smaller file sizes for faster page loads without quality loss.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-violet/20 text-brand-violet">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{item.title}</p>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
               <div className="glass-card !p-0 overflow-hidden shadow-2xl rotate-2">
                  <div className="bg-slate-900 p-4 border-b border-white/10 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500/50" />
                      <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                      <div className="h-2 w-2 rounded-full bg-green-500/50" />
                    </div>
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-4">Compliance Checker</span>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-brand-emerald/20">
                       <span className="text-xs font-bold text-white">Background (Pure White)</span>
                       <span className="text-[10px] font-black text-brand-emerald uppercase">Pass</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-brand-emerald/20">
                       <span className="text-xs font-bold text-white">Dimensions (1500x1500px)</span>
                       <span className="text-[10px] font-black text-brand-emerald uppercase">Pass</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                       <span className="text-xs font-bold text-white">File Size (&lt; 5MB)</span>
                       <span className="text-[10px] font-black text-brand-emerald uppercase">Pass</span>
                    </div>
                  </div>
               </div>
               {/* Floating elements */}
               <div className="absolute -bottom-6 -left-6 glass-card !px-6 !py-4 shadow-premium -rotate-3 border-brand-violet/30">
                  <p className="text-[10px] font-black text-brand-violet uppercase mb-1">Approved for</p>
                  <p className="text-xl font-black text-white italic">Daraz.pk</p>
               </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-40">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-black text-white md:text-5xl">Trusted by the best.</h2>
              <p className="mt-8 text-xl text-white/50 leading-relaxed">
                "We cut our photography costs from Rs. 1500 to Rs. 15 per image. SnapStudio isn't just a tool; it's our entire photography department."
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-800" />
                <div>
                  <p className="font-bold text-white">Ahmed Zakaria</p>
                  <p className="text-xs text-white/30 truncate max-w-[200px]">Founder, Luxe Leather Dubai</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="glass-card !p-8 border-brand-emerald/20 bg-brand-emerald/5">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-brand-emerald text-brand-emerald" />)}
                </div>
                <p className="text-sm font-medium text-white/80 italic">"The ghost mannequin feature is a game changer for my fashion brand."</p>
                <p className="mt-6 text-xs font-bold text-white/40">— Sarah M., Lahore</p>
              </div>
              <div className="glass-card !p-8 border-brand-violet/20 bg-brand-violet/5">
                 <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-brand-violet text-brand-violet" />)}
                </div>
                <p className="text-sm font-medium text-white/80 italic">"Literally 10x faster than our previous workflow. A must-have."</p>
                <p className="mt-6 text-xs font-bold text-white/40">— Kevin T., Shopify Expert</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-40 pb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white md:text-5xl italic">Common Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {[
              { q: 'Is it cheaper than a photographer?', a: 'Yes. 98% cheaper. Average cost per image drops from $15 to $0.15.' },
              { q: 'Can I use it for bulky items?', a: 'Absolutely. Our AI handles furniture, electronics, and small home decor items with ease.' },
              { q: 'Are images marketplace-ready?', a: 'Yes. We export in exact specs for Amazon, Daraz, and Noon automatically.' }
            ].map((faq, i) => (
              <div key={i} className="glass-card !p-6 group cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white">{faq.q}</h4>
                  <HelpCircle className="h-4 w-4 text-white/20 group-hover:text-brand-violet transition" />
                </div>
                <p className="mt-4 text-sm text-white/40 leading-relaxed overflow-hidden transition-all duration-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="pricing" className="mt-40 rounded-[3rem] bg-gradient-to-br from-brand-violet to-brand-cyan p-12 text-center md:p-24">
          <h2 className="text-4xl font-black text-white md:text-6xl italic">Ready to transform your brand?</h2>
          <p className="mx-auto mt-8 max-w-xl text-xl font-semibold text-white/80">
            Join 2,000+ sellers who are saving thousands on professional photography costs.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/register" className="rounded-full bg-white px-10 py-5 text-lg font-black text-brand-violet transition hover:scale-105 active:scale-95 shadow-xl">
              Start Your Free Project
            </Link>
            <Link href="/pricing" className="text-lg font-bold text-white hover:underline underline-offset-8 transition">
              View all plans
            </Link>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </div>
  );
}
