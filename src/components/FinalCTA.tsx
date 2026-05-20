import React from "react";
import { motion } from "motion/react";
import { Download, ShieldCheck, Flame, Cpu } from "lucide-react";
import { trackCTA } from "../lib/analytics";

export const FinalCTA = ({ onOpenDownload, onOpenCheckout }: { onOpenDownload?: () => void, onOpenCheckout?: () => void }) => {
  const handleDownload = () => {
    trackCTA('final_cta_download_exe');
    onOpenDownload?.();
  };

  return (
    <section className="py-20 px-10 bg-[#F0B429] relative overflow-hidden">
      {/* Dynamic decoration background grids/circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15)_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/10 border border-black/10 text-black text-[10px] font-black tracking-[0.2em] uppercase mb-6"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Offline-First Quant Computing
        </motion.div>
        
        <h2 className="text-5xl md:text-8xl font-bold text-black tracking-[-0.04em] font-display mb-6 leading-[1.0]">
          The future of quant <br />is local.
        </h2>
        
        <p className="text-black/70 text-base md:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
          Unlock maximum security and absolute models IP protection. Get stable low-latency performance with direct compiler adapters right on your Windows desktop.
        </p>

        <div className="max-w-md mx-auto flex flex-col gap-4">
          <button 
            onClick={handleDownload}
            className="w-full bg-black text-[#F0B429] font-black py-4 rounded-xl hover:shadow-2xl hover:bg-black/90 active:scale-[0.98] transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4" /> Download IDE (.exe)
          </button>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2 items-center">
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (onOpenCheckout) onOpenCheckout();
              }}
              className="lemonsqueezy-button px-6 py-2.5 rounded-lg bg-transparent border-2 border-black text-black font-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-black hover:text-[#F0B429] transition-all cursor-pointer"
            >
              Upgrade to Pro Now
            </button>
            <span className="text-[10px] text-black/50 font-bold tracking-widest uppercase font-mono">
              Build Size: ~324.8 MB
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
