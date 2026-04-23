export default function ApiKeysPage() {
  return (
    <div className="space-y-8">
      <div className="card">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">API keys</p>
        <p className="mt-3 text-slate-600">Generate keys for automated uploads, marketplace exports, and integrations.</p>
      </div>
      <div className="rounded-[2rem] border border-surface-200 bg-white p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Your current key</p>
        <div className="mt-4 rounded-3xl bg-surface-50 p-4 text-sm text-slate-700">sk_live_************1234</div>
        <button className="btn-primary mt-6">Create new API key</button>
      </div>
    </div>
  );
}
