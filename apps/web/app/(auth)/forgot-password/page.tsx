import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <section>
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Reset password</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">Forgot your password?</h1>
      </div>
      <form className="space-y-6">
        <label className="block text-sm font-medium text-slate-700">
          Email address
          <input type="email" required className="mt-2 w-full rounded-2xl border border-surface-200 bg-surface-50 px-4 py-3 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" />
        </label>
        <button type="submit" className="btn-primary w-full">
          Send reset link
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Remembered it? <Link href="/login" className="font-semibold text-brand-700 hover:text-brand-900">Sign in</Link>
      </p>
    </section>
  );
}
