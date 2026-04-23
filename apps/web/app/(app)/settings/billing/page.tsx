export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div className="card">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Billing</p>
        <p className="mt-3 text-slate-600">Manage your pricing plan, invoices, and payment methods.</p>
      </div>
      <div className="rounded-[2rem] border border-surface-200 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Current plan</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-950">Growth</p>
            <p className="text-slate-600">$49 / month</p>
          </div>
          <button className="btn-primary">Change plan</button>
        </div>
      </div>
    </div>
  );
}
