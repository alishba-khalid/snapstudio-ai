'use client';

import React, { useState } from 'react';
import { Check, X, Zap, Globe, Info } from 'lucide-react';
import Link from 'next/link';

type Currency = 'USD' | 'PKR' | 'AED';

const currencyConfig = {
  USD: { symbol: '$', suffix: '/month' },
  PKR: { symbol: 'Rs. ', suffix: '/mo' },
  AED: { symbol: 'AED ', suffix: '/mo' }
};

const plans = [
  {
    name: 'Starter',
    prices: { USD: '9.99', PKR: '2,499', AED: '35' },
    description: 'Perfect for small sellers starting their AI journey.',
    features: ['50 images per month', 'Standard background removal', 'Basic lifestyle scenes', 'Community support'],
    notIncluded: ['Brand style locking', 'Bulk processing', 'Ghost mannequin', 'API access'],
    cta: 'Start Free',
    isPopular: false
  },
  {
    name: 'Growth',
    prices: { USD: '39.99', PKR: '10,999', AED: '145' },
    description: 'The sweet spot for growing marketplace vendors.',
    features: ['300 images per month', 'Priority background removal', 'All lifestyle scenes', 'Brand style locking', 'Batch processing (50/job)', 'Ghost mannequin'],
    notIncluded: ['API access', 'White-labeling'],
    cta: 'Choose Growth',
    isPopular: true
  },
  {
    name: 'Scale',
    prices: { USD: '99.99', PKR: '27,499', AED: '365' },
    description: 'For high-volume merchants and agencies.',
    features: ['Unlimited images*', 'Industrial-grade consistency', 'Bulk processing (500/job)', 'API access', 'White-labeling (Add-on)', 'Dedicated account manager'],
    notIncluded: [],
    cta: 'Scale Now',
    isPopular: false
  }
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('USD');

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-violet/20 bg-brand-violet/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-violet">
          <Zap className="h-3 w-3" /> Save 90% on Photoshoots
        </div>
        <h1 className="text-5xl font-black text-white md:text-7xl tracking-tighter italic">Simple, Local Pricing.</h1>
        <p className="mx-auto max-w-2xl text-lg text-white/50 font-medium">
          Whether you are selling on Daraz.pk, Amazon.ae, or your own Shopify store, we have a plan for you.
        </p>

        {/* Currency Toggle */}
        <div className="mt-12 flex items-center justify-center gap-4">
           <div className="flex rounded-2xl bg-white/5 p-1.5 border border-white/5 backdrop-blur-md">
             {(['USD', 'PKR', 'AED'] as Currency[]).map((c) => (
               <button
                 key={c}
                 onClick={() => setCurrency(c)}
                 className={`px-6 py-2.5 text-xs font-black transition-all rounded-xl ${
                   currency === c 
                    ? 'bg-brand-violet text-white shadow-premium' 
                    : 'text-white/40 hover:text-white'
                 }`}
               >
                 {c}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className={`glass-card flex flex-col p-10 transition-all hover:scale-[1.02] ${plan.isPopular ? 'border-brand-violet ring-1 ring-brand-violet/50 shadow-premium bg-brand-violet/[0.02]' : ''}`}>
            {plan.isPopular && (
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-violet px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                <Zap className="h-3 w-3" /> Most Popular
              </div>
            )}
            <h3 className="text-2xl font-black text-white italic">{plan.name}</h3>
            <p className="mt-4 text-sm font-medium text-white/40 leading-relaxed">{plan.description}</p>
            
            <div className="mt-10 flex items-baseline gap-1">
              <span className="text-sm font-bold text-white/30 uppercase tracking-widest">{currencyConfig[currency].symbol}</span>
              <span className="text-5xl font-black text-white tracking-tighter">{plan.prices[currency]}</span>
              <span className="text-xs font-bold text-white/20 uppercase tracking-widest">{currencyConfig[currency].suffix}</span>
            </div>

            <div className="mt-10 flex-1 space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 text-sm font-semibold text-white/70">
                  <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-emerald/20 text-brand-emerald">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                  {feature}
                </div>
              ))}
              {plan.notIncluded.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm font-medium text-white/20">
                  <X className="h-4 w-4" />
                  {feature}
                </div>
              ))}
            </div>

            <Link 
              href="/register" 
              className={`mt-12 block rounded-full py-5 text-center text-xs font-black uppercase tracking-widest transition shadow-xl ${
                plan.isPopular 
                  ? 'bg-brand-violet text-white hover:scale-105 active:scale-95' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
         <Info className="h-3 w-3" /> All plans include 14-day money-back guarantee
      </div>

      {/* Comparison Table */}
      <section className="mt-40">
        <h2 className="text-center text-4xl font-black text-white italic tracking-tighter">Feature Breakdown</h2>
        <div className="mt-16 overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                <th className="p-8">Capabilities</th>
                <th className="p-8">Starter</th>
                <th className="p-8">Growth</th>
                <th className="p-8">Scale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-bold text-white/70">
              <tr>
                <td className="p-8">AI Image Credits</td>
                <td className="p-8">50 / mo</td>
                <td className="p-8 text-brand-violet">300 / mo</td>
                <td className="p-8 font-black text-white">Unlimited*</td>
              </tr>
              <tr>
                <td className="p-8">Scene Presets</td>
                <td className="p-8 text-white/30">Basic</td>
                <td className="p-8">All 100+</td>
                <td className="p-8">Custom DNA</td>
              </tr>
              <tr>
                <td className="p-8">Commercial Rights</td>
                <td className="p-8">✓</td>
                <td className="p-8">✓</td>
                <td className="p-8">✓</td>
              </tr>
              <tr>
                <td className="p-8">Priority Support</td>
                <td className="p-8 text-white/30">Email</td>
                <td className="p-8 text-brand-emerald">WhatsApp</td>
                <td className="p-8">Dedicated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
