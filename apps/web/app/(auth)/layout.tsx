import Link from 'next/link';
import { Camera } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-brand-violet/10 blur-[150px]" />
      </div>

      <Link href="/" className="flex items-center gap-2 mb-10 transition hover:opacity-80">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-violet shadow-premium">
          <Camera className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">SnapStudio</span>
      </Link>

      <div className="w-full max-w-md">
        {children}
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs text-white/30">
          Secure, AI-powered product photography. <br />
          © 2026 SnapStudio AI.
        </p>
      </div>
    </div>
  );
}
