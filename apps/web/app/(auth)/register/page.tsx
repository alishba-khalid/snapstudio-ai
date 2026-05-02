import Link from 'next/link';
import { Globe, Mail, Sparkles, Lock } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="glass-card !p-10 shadow-premium border-white/10">
      <div className="mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-violet/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-violet border border-brand-violet/20">
          <Sparkles className="h-3 w-3" /> Special Promo: 10 Free Images
        </div>
        <h2 className="text-3xl font-black text-white">Join the Studio</h2>
        <p className="mt-2 text-sm text-white/40">Start creating pro product photos today.</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">First Name</label>
            <input 
              type="text" 
              placeholder="Elon" 
              className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Last Name</label>
            <input 
              type="text" 
              placeholder="Musk" 
              className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Password</label>
          <input 
            type="password" 
            placeholder="Min. 8 characters" 
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-start gap-3 px-1">
          <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/10 bg-white/5 text-brand-violet focus:ring-brand-violet/50" />
          <p className="text-[10px] leading-relaxed text-white/30">
            I agree to the <Link href="/terms" className="text-white/50 hover:text-white">Terms of Service</Link> and <Link href="/privacy" className="text-white/50 hover:text-white">Privacy Policy</Link>.
          </p>
        </div>

        <button className="btn-primary-new w-full shadow-premium">
          Create Account
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
            <span className="bg-[#030712] px-3 text-white/20">Or register with</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
            <Lock className="h-4 w-4" /> SSO
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
            <Mail className="h-4 w-4" /> Google
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/40 font-medium">
        Already have an account? <Link href="/login" className="text-brand-violet font-bold hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
