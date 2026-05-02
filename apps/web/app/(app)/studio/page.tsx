'use client';

import React, { useState, useRef } from 'react';
import { Box, Camera, Image as ImageIcon, Layout, Share2, Upload, Wand2, Palette, Sparkles, Sun, Leaf, Factory, Loader2, AlertCircle, Download, Zap, Plus, X } from 'lucide-react';
import { generateLifestyle } from '@/lib/ai-actions';
import { processImageForMarketplace, MARKETPLACE_SPECS, downloadImage } from '@/lib/compliance';
import { useTranslation } from '@/lib/i18n';
import { useUpload } from '@/hooks/use-upload';

export default function StudioPage() {
  const { t, isRtl } = useTranslation();
  const { uploadFile, isUploading: isUploadingToR2 } = useUpload();
  
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [batchFiles, setBatchFiles] = useState<{file: string, raw: File, result?: string, status: 'idle' | 'uploading' | 'processing' | 'done' | 'error'}[]>([]);
  
  const [file, setFile] = useState<string | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    if (isBatchMode) {
      const newFiles = selectedFiles.map(file => ({
        file: URL.createObjectURL(file),
        raw: file,
        status: 'idle' as const
      }));
      setBatchFiles(prev => [...prev, ...newFiles]);
      setError(null);
    } else {
      const selectedFile = selectedFiles[0];
      setRawFile(selectedFile);
      setPublicUrl(null);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleBatchGenerate = async () => {
    if (batchFiles.length === 0 || !selectedStyle) return;
    
    setIsProcessing(true);
    setError(null);

    const updatedBatch = [...batchFiles];
    
    for (let i = 0; i < updatedBatch.length; i++) {
      try {
        updatedBatch[i].status = 'uploading';
        setBatchFiles([...updatedBatch]);
        
        let r2Url;
        try {
          r2Url = await uploadFile(updatedBatch[i].raw);
        } catch (e) {
          console.warn("R2 Upload failed for batch item, using local DataURL");
          r2Url = updatedBatch[i].file;
        }
        
        updatedBatch[i].status = 'processing';
        setBatchFiles([...updatedBatch]);
        
        const outputUrl = await generateLifestyle(r2Url, selectedStyle);
        
        updatedBatch[i].result = outputUrl;
        updatedBatch[i].status = 'done';
        setBatchFiles([...updatedBatch]);
      } catch (err: any) {
        console.error(`Batch item ${i} failed:`, err);
        updatedBatch[i].status = 'error';
        setBatchFiles([...updatedBatch]);
      }
    }
    
    setIsProcessing(false);
  };

  const handleGenerate = async () => {
    if (isBatchMode) {
      return handleBatchGenerate();
    }

    if (!file || !selectedStyle || !rawFile) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      let currentUrl = publicUrl;
      
      // Upload to R2 if not already done
      if (!currentUrl) {
        try {
          currentUrl = await uploadFile(rawFile);
          setPublicUrl(currentUrl);
        } catch (e) {
          console.warn("R2 Upload failed, falling back to local DataURL");
          currentUrl = file;
        }
      }
      
      if (!currentUrl) throw new Error("Failed to get image URL");
      const outputUrl = await generateLifestyle(currentUrl, selectedStyle);
      setResult(outputUrl);
    } catch (err: any) {
      console.error('AI Generation failed:', err);
      setError(err.message || 'Something went wrong with the AI generation.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = async (market: string) => {
    if (!result) return;
    
    setIsExporting(market);
    try {
      const spec = MARKETPLACE_SPECS[market];
      if (!spec) return;
      
      const processedUrl = await processImageForMarketplace(result, spec);
      downloadImage(processedUrl, `snapstudio_${market.toLowerCase().replace('.', '_')}_export.jpg`);
    } catch (err) {
      console.error('Export failed:', err);
      setError('Failed to process image for export.');
    } finally {
      setIsExporting(null);
    }
  };

  const styles = [
    { name: 'Background removal', icon: <ImageIcon className="h-4 w-4" /> },
    { name: 'Studio White', icon: <Camera className="h-4 w-4" /> },
    { name: 'Nordic Minimal', icon: <Palette className="h-4 w-4 text-orange-200" /> },
    { name: 'Neon Galactic', icon: <Sparkles className="h-4 w-4 text-brand-violet" /> },
    { name: 'Golden Hour', icon: <Sun className="h-4 w-4 text-yellow-400" /> },
    { name: 'Botanical Zen', icon: <Leaf className="h-4 w-4 text-brand-emerald" /> },
    { name: 'Industrial Raw', icon: <Factory className="h-4 w-4 text-white/40" /> }
  ];

  return (
    <div className={`mx-auto max-w-7xl px-6 py-10 md:px-10 ${isRtl ? 'font-urdu' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <header className={`mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${isRtl ? 'text-right' : ''}`}>
        <div>
          <h1 className="text-3xl font-black text-white md:text-4xl italic">{t('studio.title')}</h1>
          <p className="mt-2 text-white/50">{t('studio.description')}</p>
        </div>
        
        <div className="flex items-center gap-2 rounded-2xl bg-white/5 p-1.5 border border-white/5">
          <button 
            onClick={() => { setIsBatchMode(false); setError(null); setResult(null); }}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition ${!isBatchMode ? 'bg-brand-violet text-white shadow-premium' : 'text-white/40 hover:text-white'}`}
          >
            Single Shot
          </button>
          <button 
            onClick={() => { setIsBatchMode(true); setError(null); setResult(null); }}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition flex items-center gap-2 ${isBatchMode ? 'bg-brand-violet text-white shadow-premium' : 'text-white/40 hover:text-white'}`}
          >
            <Zap className="h-3 w-3" /> Batch Mode
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <main className="space-y-8">
          {/* Upload Section - STEP 1 */}
          <section className="glass-card p-1">
            <div className={`p-4 border-b border-white/5 ${isRtl ? 'text-right' : ''}`}>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-violet">{t('studio.step1')}</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-tight ml-2 inline-block">{t('studio.step1Title')}</h3>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
              multiple={isBatchMode}
            />

            {isBatchMode ? (
              <div className="p-4">
                {batchFiles.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {batchFiles.map((item, idx) => (
                      <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5 group">
                        <img src={item.file} className="h-full w-full object-cover" alt={`Batch ${idx}`} />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <button 
                            onClick={() => setBatchFiles(prev => prev.filter((_, i) => i !== idx))}
                            className="bg-red-500 p-1.5 rounded-lg text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        {item.status !== 'idle' && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Loader2 className="h-6 w-6 text-brand-violet animate-spin" />
                          </div>
                        )}
                      </div>
                    ))}
                    <button 
                      onClick={triggerUpload}
                      className="aspect-square flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition text-white/30 hover:text-white"
                    >
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-[10px] font-bold uppercase">Add More</span>
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={triggerUpload}
                    className="rounded-[1.75rem] border-2 border-dashed border-white/5 bg-white/5 p-12 text-center transition hover:bg-white/[0.07] cursor-pointer group"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-violet/20 shadow-premium transition group-hover:scale-110">
                      <Upload className="h-10 w-10 text-brand-violet" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Batch Upload</h3>
                    <p className="mt-2 text-white/40">Select multiple product photos for processing</p>
                    <button className="btn-primary-new mt-8 !px-6 !py-3 !text-xs" onClick={(e) => { e.stopPropagation(); triggerUpload(); }}>
                      <Upload className="h-4 w-4" /> Select Files
                    </button>
                  </div>
                )}
              </div>
            ) : file ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-white/5">
                <img src={file} className="h-full w-full object-cover" alt="Source" />
                <button 
                  onClick={() => setFile(null)}
                  className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md hover:bg-black/70 transition"
                >
                  {t('studio.changeImage')}
                </button>
              </div>
            ) : (
              <div 
                onClick={triggerUpload}
                className="rounded-[1.75rem] border-2 border-dashed border-white/5 bg-white/5 p-12 text-center transition hover:bg-white/[0.07] cursor-pointer group"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-violet/20 shadow-premium transition group-hover:scale-110">
                  <Upload className="h-10 w-10 text-brand-violet" />
                </div>
                <h3 className="text-xl font-bold text-white">{t('studio.uploadTitle')}</h3>
                <p className="mt-2 text-white/40">{t('studio.uploadDesc')}</p>
                
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <button className="btn-primary-new flex gap-2 !px-6 !py-3 !text-xs" onClick={(e) => { e.stopPropagation(); triggerUpload(); }}>
                    <Upload className="h-4 w-4" /> {t('studio.selectFiles')}
                  </button>
                  <button className="btn-secondary-new flex gap-2 !px-6 !py-3 !text-xs" onClick={(e) => e.stopPropagation()}>
                    <Camera className="h-4 w-4" /> {t('studio.useCamera')}
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Processing Options - STEP 2 */}
          <section className="glass-card p-8">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wand2 className="h-5 w-5 text-brand-cyan" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">{t('studio.step2')} — {t('studio.step2Title')}</h3>
              </div>
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{styles.length} Presets Loaded</span>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {styles.map((option) => (
                <button 
                  key={option.name} 
                  onClick={() => setSelectedStyle(option.name)}
                  className={`group flex flex-col gap-4 rounded-2xl border p-6 text-left transition ${
                    selectedStyle === option.name 
                      ? 'border-brand-violet bg-brand-violet/10 ring-1 ring-brand-violet/50' 
                      : 'border-white/5 bg-white/5 hover:border-brand-violet/50 hover:bg-brand-violet/10'
                  }`}
                >
                  <div className={`rounded-xl p-3 transition ${
                    selectedStyle === option.name ? 'bg-brand-violet text-white' : 'bg-white/5 group-hover:bg-brand-violet/20'
                  }`}>
                    {option.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white/70 group-hover:text-white block uppercase tracking-tighter">{option.name}</span>
                    <p className="mt-1 text-[10px] text-white/20">AI Ready</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </main>

        <aside className="space-y-8">
          {/* Preview Panel */}
          <section className="glass-card p-8">
            <div className={`flex items-center justify-between mb-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">{t('studio.livePreview')}</h3>
              <span className="rounded-full bg-brand-emerald/10 px-2 py-0.5 text-[10px] font-bold text-brand-emerald border border-brand-emerald/20">
                Studio Mode
              </span>
            </div>
            
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center relative">
              {isProcessing ? (
                <div className="text-center">
                  <Loader2 className="mx-auto h-10 w-10 text-brand-violet animate-spin mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">{t('studio.magic')}</p>
                  {isBatchMode && (
                    <p className="mt-2 text-[8px] text-white/30 uppercase tracking-[0.2em]">
                      Processing {batchFiles.filter(f => f.status === 'done').length} / {batchFiles.length}
                    </p>
                  )}
                </div>
              ) : isBatchMode && batchFiles.some(f => f.result) ? (
                <div className="grid grid-cols-2 gap-2 p-2 h-full w-full overflow-y-auto">
                   {batchFiles.filter(f => f.result).map((f, i) => (
                     <img key={i} src={f.result} className="aspect-square w-full object-cover rounded-lg border border-white/10" alt="Result" />
                   ))}
                </div>
              ) : result ? (
                <img src={result} className="h-full w-full object-cover animate-in fade-in zoom-in duration-700" alt="Result" />
              ) : (
                <div className="text-center p-10">
                  <ImageIcon className="mx-auto h-12 w-12 text-white/10 mb-4" />
                  <p className="text-sm text-white/30 font-medium">
                    {isBatchMode ? (batchFiles.length > 0 ? 'Select style to begin' : 'Upload files to begin') : (file ? 'Select style to begin' : 'No image selected')}
                  </p>
                </div>
              )}
            </div>

            <button 
              onClick={handleGenerate}
              disabled={(!isBatchMode && !file) || (isBatchMode && batchFiles.length === 0) || !selectedStyle || isProcessing || isUploadingToR2}
              className="btn-primary-new w-full mt-6 shadow-premium disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
            >
              {isUploadingToR2 ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Uploading to R2...
                </span>
              ) : isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> {t('studio.processing')}
                </span>
              ) : t('studio.generate')}
            </button>
          </section>

          {/* Export Panel */}
          <section className={`glass-card p-8 transition-all duration-500 ${!result ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
            <div className={`flex items-center justify-between mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <Share2 className="h-4 w-4 text-brand-emerald" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{t('studio.exportTitle')}</h3>
              </div>
              <div className="flex gap-1">
                <div className="h-1 w-1 rounded-full bg-brand-emerald" />
                <div className="h-1 w-1 rounded-full bg-brand-emerald" />
                <div className="h-1 w-1 rounded-full bg-brand-emerald" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'Amazon.ae', color: 'bg-[#FF9900]/10 border-[#FF9900]/20 text-[#FF9900]' },
                { name: 'Daraz.pk', color: 'bg-[#F47321]/10 border-[#F47321]/20 text-[#F47321]' },
                { name: 'Noon.com', color: 'bg-[#FFE200]/10 border-[#FFE200]/20 text-[#FFE200]' },
                { name: 'Shopify Store', color: 'bg-[#95BF47]/10 border-[#95BF47]/20 text-[#95BF47]' }
              ].map((market) => (
                <button 
                   key={market.name} 
                   onClick={() => handleExport(market.name.split('.')[0])}
                   disabled={isExporting !== null}
                   className={`group relative overflow-hidden rounded-2xl border p-4 text-sm font-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-between ${market.color}`}
                 >
                   <span className="relative z-10">{market.name}</span>
                   {isExporting === market.name.split('.')[0] ? (
                     <Loader2 className="h-4 w-4 animate-spin" />
                   ) : (
                     <Download className="h-4 w-4 opacity-40 group-hover:opacity-100 transition" />
                   )}
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition" />
                </button>
              ))}
            </div>
            
            <p className="mt-6 text-[10px] text-center font-bold text-white/20 uppercase tracking-widest">
              High-Res JPG • 1500px • RGB (255,255,255)
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
