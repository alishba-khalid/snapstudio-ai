import { Camera, Heart, Shield, Sparkles } from 'lucide-react';

const values = [
  { 
    title: 'Precision AI', 
    description: 'We believe in preserving the soul of the product. Our AI is tuned for high-fidelity preservation of shadows and textures.',
    icon: <Sparkles className="h-6 w-6 text-brand-violet" />
  },
  { 
    title: 'Accessibility', 
    description: 'Pro photography shouldn\'t cost $1500 per shoot. Our mission is to make studio quality available to every solo seller.',
    icon: <Heart className="h-6 w-6 text-red-400" />
  },
  { 
    title: 'Seller Privacy', 
    description: 'Your product designs are your business. We provide enterprise-grade security for your data and visual assets.',
    icon: <Shield className="h-6 w-6 text-brand-emerald" />
  }
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-black text-white md:text-6xl">Our Mission.</h1>
        <p className="mt-8 text-xl leading-relaxed text-white/60">
          SnapStudio AI was born out of a simple observation: selling online is 80% visual, but 90% of sellers can't afford professional studio shoots. 
          We are building the future of autonomous eCommerce photography, helping sellers in the UAE, Pakistan, and Beyond compete on a global scale.
        </p>
      </div>

      <div className="mt-32 grid gap-12 lg:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="glass-card p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{value.title}</h3>
            <p className="mt-4 text-white/50">{value.description}</p>
          </div>
        ))}
      </div>

      <section className="mt-40 rounded-[3rem] border border-white/5 bg-white/[0.02] p-12 md:p-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-black text-white md:text-5xl">The SnapStudio Team.</h2>
            <p className="mt-6 text-lg text-white/50">
              We are a team of AI researchers and eCommerce veterans based in Dubai and Lahore. We've spent the last 5 years building tools for marketplaces like Amazon and Daraz.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-background bg-slate-800" />
                ))}
              </div>
              <p className="text-sm font-semibold text-white/60">Join 12 passionate builders</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-card flex flex-col items-center justify-center p-8 text-center">
              <p className="text-3xl font-black text-white">2.5M+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30">Images Processed</p>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-8 text-center">
              <p className="text-3xl font-black text-white">4.9/5</p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
