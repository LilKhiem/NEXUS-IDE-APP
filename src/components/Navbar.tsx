import React from 'react';

import { trackCTA } from '../lib/analytics';

export const Navbar = ({ onOpenDownload }: { onOpenDownload: () => void }) => {
  const handleDownload = () => {
    trackCTA('navbar_download_ide');
    onOpenDownload();
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 px-10 py-4 flex items-center justify-between bg-black/85 backdrop-blur-lg border-b border-[#1A2333]">
      <div className="font-display text-2xl font-bold tracking-[-0.03em]">
        NEXUS <span className="text-[#F0B429]">IDE</span>
      </div>
      <ul className="hidden md:flex gap-8 list-none text-xs tracking-widest text-[#7A8BA0] uppercase font-['JetBrains_Mono']">
        <li><a href="#how" className="hover:text-white transition">How it Works</a></li>
        <li><a href="#features" className="hover:text-white transition">Features</a></li>
        <li><a href="#how" className="hover:text-white transition">Onboarding Guide</a></li>
        <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
      </ul>
      <button 
        onClick={handleDownload}
        className="bg-[#F0B429] text-black font-['JetBrains_Mono'] text-[11px] font-bold tracking-widest uppercase px-5 py-2 rounded hover:opacity-85 transition"
      >
        Download App (.exe)
      </button>
    </nav>
  );
};

