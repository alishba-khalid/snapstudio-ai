import Link from 'next/link';
import { ArrowLeft, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="glass-card !p-10 shadow-premium border-white/10">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-white">Welcome back</h2>
        <p className="mt-2 text-sm text-white/40">Enter your credentials to access your studio.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Password</label>
            <Link href="/forgot-password" title="Forgot Password" className="text-[10px] font-bold text-brand-violet hover:underline">Forgot?</Link>
          </div>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-white/20 focus:border-brand-violet/50 focus:outline-none transition-all"
          />
        </div>

        <button className="btn-primary-new w-full shadow-premium">
          Sign In
        </button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
            <span className="bg-[#030712] px-3 text-white/20">Or continue with</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
            <Lock className="h-4 w-4" /> Single Sign-On
          </button>
          <button className="flex items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition">
            <Mail className="h-4 w-4" /> Google
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/40 font-medium">
        Don't have an account? <Link href="/register" className="text-brand-violet font-bold hover:underline">Register now</Link>
      </p>
    </div>
  );
}
