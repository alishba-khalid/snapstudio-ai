interface PageProps {
  params: { id: string };
}

export default function ProjectDetailPage({ params }: PageProps) {
  return (
    <div className="space-y-8">
      <div className="card">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">Project detail</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">{params.id.replace(/-/g, ' ')}</h1>
        <p className="mt-3 text-slate-600">Edit the project workflow, review processed images, and download marketplace-ready exports.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Status</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">Live</p>
        </div>
        <div className="card">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Images</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">42</p>
        </div>
        <div className="card">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Marketplace</p>
          <p className="mt-4 text-3xl font-bold text-slate-950">Daraz & Shopify</p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="rounded-[2rem] border border-surface-200 bg-white p-4 shadow-soft">
            <div className="h-40 rounded-[1.5rem] bg-slate-100" />
            <p className="mt-4 text-sm font-semibold text-slate-950">Image preview {index + 1}</p>
            <p className="mt-2 text-sm text-slate-500">AI styling ready for export.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
