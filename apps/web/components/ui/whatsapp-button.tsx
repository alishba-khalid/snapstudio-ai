'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/YOUR_NUMBER" // Placeholder for user's number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 active:scale-95 group"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-black/80 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100 backdrop-blur-md border border-white/10">
        Chat with Support
      </span>
    </a>
  );
};
