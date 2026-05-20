import { Search, Database, ShieldCheck, Cpu, Zap, Lock, MessageSquare } from "lucide-react";

const researchEngineFeatures = [
  { 
    icon: MessageSquare, 
    title: "NEXUS Local Chat — offline-first private AI", 
    desc: "Runs standard local LLMs directly on your desktop hardware. Keep your research intents, prompts, and training hyperparameters offline with 100% data intellectual property protection." 
  },
  { 
    icon: Search, 
    title: "Sandboxed Backtesters — isolated validation", 
    desc: "Run heavy genetic optimization models and monte carlo backtests inside highly secure, offline-first local sandbox runtimes. No cloud latency, no subscription caps, no outbound IP leakage." 
  },
  { 
    icon: Database, 
    title: "Local Filesystem Stream — zero-upload ingestion", 
    desc: "Directly feed local parquets, SQLite bases, CSV files, and high-frequency order book files from your local folders. Stream with native speed and zero network bottlenecks." 
  },
  { 
    icon: ShieldCheck, 
    title: "Deterministic Run Hygiene — offline ledger", 
    desc: "Every backtest, walk-forward validation matrix, and Sharpe ratio stress test is hashed and logged on a local SQLite ledger for immediate, bulletproof walkback tracking." 
  }
];

const agenticCrewFeatures = [
  { 
    icon: Cpu, 
    title: "Multi-Threaded Agentic Crew — native core speed", 
    desc: "Dozens of localized agents probe the objective function space, trade thresholds, and slippage curves simultaneously, fully utilizing your computer CPU/GPU processors." 
  },
  { 
    icon: Lock, 
    title: "Risk & Overfit Guards — localized defenses", 
    desc: "Robustness calculations, probability of backtest overfitting (PBO), and transaction cost stresses are calculated on compile-time inside standard system libraries." 
  },
  { 
    icon: Zap, 
    title: "Direct Native Compiling — multi-connector support", 
    desc: "Build highly optimized binary files with C++, Rust or Python connectors. Export ready-to-run systems directly to local Metatrader setup, Interactive Brokers APIs, or CCXT." 
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#F0B429] uppercase mb-4 font-['JetBrains_Mono']">LOCAL ARCHITECTURE</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] font-display mb-6">Fully private. Infinite execution speed.</h3>
          <p className="text-[#7A8BA0] font-['JetBrains_Mono'] text-sm max-w-3xl mx-auto">
            Engineered for elite quants who care about local data integrity, walk-forward sweeps, and PBO — not cloud-bound AI wrappers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Research Engine */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1A2333]"></div>
              <span className="text-[10px] font-bold text-[#F0B429] tracking-[0.2em] uppercase font-['JetBrains_Mono']">Research Engine</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1A2333]"></div>
            </div>
            
            <div className="grid gap-6">
              {researchEngineFeatures.map((f, i) => (
                <div key={i} className="p-8 rounded-2xl border border-[#1A2333] bg-[#0A101A] group hover:border-[#F0B429]/30 transition-all">
                  <f.icon className="w-6 h-6 text-[#F0B429] mb-4" />
                  <h4 className="text-xl font-bold mb-3 font-display">{f.title}</h4>
                  <p className="text-sm text-[#7A8BA0] leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Agentic Crew */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#1A2333]"></div>
              <span className="text-[10px] font-bold text-[#F0B429] tracking-[0.2em] uppercase font-['JetBrains_Mono']">Agentic Crew & Risk Guards</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#1A2333]"></div>
            </div>

            <div className="grid gap-6">
              {agenticCrewFeatures.map((f, i) => (
                <div key={i} className="p-8 rounded-2xl border border-[#1A2333] bg-[#0A101A] group hover:border-[#F0B429]/30 transition-all">
                  <f.icon className="w-6 h-6 text-[#F0B429] mb-4" />
                  <h4 className="text-xl font-bold mb-3 font-display">{f.title}</h4>
                  <p className="text-sm text-[#7A8BA0] leading-relaxed">{f.desc}</p>
                </div>
              ))}
              
              {/* Visual Element for Agentic Crew */}
              <div className="relative aspect-[16/9] rounded-2xl border border-[#1A2333] bg-[#05080D] overflow-hidden p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0B429]/5 to-transparent"></div>
                <div className="relative flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border border-[#F0B429]/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full border border-[#F0B429] border-t-transparent animate-spin"></div>
                    <Cpu className="w-8 h-8 text-[#F0B429]" />
                    {[0, 120, 240].map((angle, i) => (
                      <div key={i} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded bg-[#0A101A] border border-[#F0B429]/30 flex items-center justify-center">
                          <Zap className="w-2 h-2 text-[#F0B429]" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-[9px] font-bold text-[#F0B429] tracking-[0.2em] uppercase mb-1">24 Specialized Agents</div>
                    <p className="text-[10px] text-[#4A5568]">Orchestrated by the NEXUS Core</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[#7A8BA0] text-sm font-['JetBrains_Mono'] max-w-3xl mx-auto border-t border-[#1A2333] pt-12">
            Everything you see below — the validation log, robustness score, performance table, equity and drawdown charts — is generated automatically by this engine. No manual Jupyter wiring, no one‑off scripts.
          </p>
        </div>
      </div>
    </section>
  );
};
