'use client';

import React from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import ClientOnly from '@/components/ui/client-only';

const styles = [
  {
    id: 'nordic',
    name: 'Nordic Minimal',
    tag: 'Clean & Bright',
    image: 'style_nordic_minimal_skincare_1776356071107.png',
    description: 'Soft natural light and organic wood textures for a high-end apothecary feel.'
  },
  {
    id: 'neon',
    name: 'Neon Galactic',
    tag: 'Futuristic',
    image: 'style_neon_galactic_headphones_1776356086065.png',
    description: 'Dynamic violet and cyan glow with deep moody shadows for tech and hardware.'
  },
  {
    id: 'golden',
    name: 'Golden Hour',
    tag: 'Liquid Gold',
    image: 'style_golden_hour_perfume_1776356102653.png',
    description: 'Warm, long-shadow sunlight perfect for lifestyle perfume and jewelry shots.'
  },
  {
    id: 'zen',
    name: 'Botanical Zen',
    tag: 'Organic',
    image: 'style_botanical_zen_beauty_v2_1776356127661.png',
    description: 'Water ripples and tropical greens for a fresh, serene beauty aesthetic.'
  },
  {
    id: 'industrial',
    name: 'Industrial Raw',
    tag: 'Edgy & Sharp',
    image: 'style_industrial_raw_watch_v2_1776356145891.png',
    description: 'Concrete and steel textures with hard shadows for tactical and luxury watches.'
  }
];

export const StyleShowcase = () => {
  return (
    <section className="mt-40">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.5em] text-brand-violet">Aesthetic Discovery</h2>
        <h2 className="mt-6 text-4xl font-black text-white md:text-6xl">Explore our Styles. <br /><span className="text-gradient">Pinterest Mode.</span></h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/50">
          Our AI hasn't just learned to remove backgrounds—it's mastered the art of studio lighting. Choose from hundreds of presets or build your own DNA.
        </p>
      </div>

      {/* Horizontal Exploration Slider */}
      <div className="mb-20 overflow-x-auto pb-10 hide-scrollbar scroll-smooth">
        <div className="flex gap-8 px-6 md:px-10 w-max">
          {styles.map((style) => (
            <div key={style.id} className="glass-card group w-[320px] md:w-[450px] !p-1 transition hover:rotate-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/5 shadow-2xl">
                <ClientOnly>
                  <ReactCompareSlider
                    itemOne={<ReactCompareSliderImage src={`/styles/${style.image}`} alt="Original" style={{ opacity: 0.5 }} />}
                    itemTwo={<ReactCompareSliderImage src={`/styles/${style.image}`} alt="AI Result" />}
                    style={{ width: '100%', height: '100%' }}
                  />
                </ClientOnly>
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 p-8 pt-20">
                  <span className="text-[10px] font-black tracking-widest text-brand-cyan uppercase">{style.tag}</span>
                  <h3 className="mt-2 text-2xl font-black text-white truncate">{style.name}</h3>
                  <p className="mt-4 text-xs font-medium text-white/50 leading-relaxed line-clamp-2">{style.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pinterest-Style Masonry Gallery Preview */}
      <div className="text-center mb-12">
        <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Layers className="h-5 w-5 text-brand-violet" /> Masonry Inspiration
        </h3>
      </div>
      
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 px-6 md:px-10 mb-20">
        {[...styles, ...styles].map((style, i) => (
          <div key={`${style.id}-${i}`} className="glass-card !p-0 overflow-hidden break-inside-avoid shadow-premium cursor-pointer group transition hover:scale-[1.02]">
            <div className="relative">
              <img 
                src={`/styles/${style.image}`} 
                alt={style.name}
                className="w-full transition-all duration-700"
              />
              <div className="absolute inset-0 bg-brand-violet/0 group-hover:bg-brand-violet/10 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="btn-secondary-new flex items-center gap-2 !px-10 !py-4 font-black shadow-premium">
          Explore Infinite Library <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
