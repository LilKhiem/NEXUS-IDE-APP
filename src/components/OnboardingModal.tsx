import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Cpu, 
  Terminal, 
  Compass, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  Flame,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [downloadStep, setDownloadStep] = useState<'progress' | 'guide'>('progress');
  const [progress, setProgress] = useState(0);
  const [downloadLogs, setDownloadLogs] = useState<string[]>([]);
  const [guideStep, setGuideStep] = useState(1);

  // Download simulation
  useEffect(() => {
    if (!isOpen) return;

    // Reset state when opened
    setDownloadStep('progress');
    setProgress(0);
    setDownloadLogs(['[INFO] Connecting to secure CDN mirror: aws-us-east-1.nexus.quant...']);
    setGuideStep(1);

    const logsList = [
      '[INFO] Connection established over TLS 1.3.',
      '[INFO] File payload resolved: NEXUS_IDE_Setup_v2.0.0_x64.exe (324.8 MB)',
      '[DEBUG] Stream active. Initializing memory buffered write...',
      '[DEBUG] Buffered block 512MB/1024MB written to disk...',
      '[INFO] Performing local virus signatures analysis...',
      '[VALIDATION] SHA-256 hash verified: 8f2bd2c08e50b9247d89052b610effca63d91ae04928d3f112cca6d9ea1d09e3 ✓',
      '[SUCCESS] Download Complete. Ready for local sandbox execution!'
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logsList.length) {
        setDownloadLogs(prev => [...prev, logsList[logIndex]]);
        logIndex++;
      }
    }, 350);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          // Add remaining logs if any
          setDownloadLogs(prevLogs => {
            const missing = logsList.slice(prevLogs.length - 1);
            return [...prevLogs, ...missing];
          });
          // Move to guide after a brief delay
          setTimeout(() => {
            setDownloadStep('guide');
            // Trigger actual mock download download in browser
            triggerMockFileDownload();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [isOpen]);

  const triggerMockFileDownload = () => {
    try {
      const element = document.createElement("a");
      const file = new Blob([
        "NEXUS IDE Desktop Executable Installer Mock\n" +
        "Build: v2.0.0-Stable (Windows x64)\n" +
        "Checksum: 8f2bd2c08e50b9247d89052b610effca63d91ae04928d3f112cca6d9ea1d09e3\n" +
        "Thank you for downloading NEXUS IDE. Enjoy your local agentic quant workflow!\n" +
        "Read onboarding guide on the website: " + window.location.origin + "#how"
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "NEXUS_IDE_Setup_v2.0.0.exe";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('NEXUS_IDE_Setup_v2.0.0.exe download initiated automatically!');
    } catch (e) {
      console.warn("Mock download execution failed, proceeding smoothly.");
    }
  };

  const totalGuideSteps = 4;

  const nextGuideStep = () => {
    if (guideStep < totalGuideSteps) setGuideStep(prev => prev + 1);
  };

  const prevGuideStep = () => {
    if (guideStep > 1) setGuideStep(prev => prev - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-[#080B10] border border-[#1A2333] rounded-3xl max-w-2xl w-full relative shadow-2xl shadow-[#F0B429]/5 overflow-hidden my-8">
              
              {/* Close Button */}
              <button 
                onClick={onClose} 
                className="absolute top-5 right-5 text-[#4A5568] hover:text-[#F0B429] transition-colors z-10 p-2 rounded-full hover:bg-white/5"
              >
                <X size={18} />
              </button>

              {downloadStep === 'progress' ? (
                /* STEP 1: DOWNLOAD PROGRESS SCREEN */
                <div className="p-8 md:p-10 text-center flex flex-col justify-between min-h-[420px]">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#F0B429]/10 border border-[#F0B429]/20 flex items-center justify-center mx-auto mb-6">
                      <Download className="w-8 h-8 text-[#F0B429] animate-bounce" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight mb-2 text-white">
                      Streaming Desktop Package
                    </h3>
                    <p className="text-[#7A8BA0] text-sm max-w-md mx-auto mb-8 font-light">
                      Securing high-speed route from regional mirror. Compiling latest stable binary tags.
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#111820] h-2 rounded-full overflow-hidden border border-[#1A2333] mb-3">
                      <motion.div 
                        className="bg-gradient-to-r from-[#F0B429] to-[#FF9800] h-full rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                        transition={{ ease: "easeInOut" }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-[11px] font-mono text-[#4A5568] uppercase tracking-wider mb-8">
                      <span>x64 Windows Executable</span>
                      <span className="text-[#F0B429] font-bold">{Math.min(progress, 100)}% Complete</span>
                      <span>324.8 MB Total</span>
                    </div>
                  </div>

                  {/* Pseudo retro logs console */}
                  <div className="bg-black/80 border border-[#1A2333] rounded-xl p-4 font-mono text-left text-[10px] space-y-1.5 h-36 overflow-y-auto mb-4 scrollbar-thin">
                    <AnimatePresence>
                      {downloadLogs.map((log, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={
                            log.includes('[SUCCESS]') ? 'text-green-400 font-bold' :
                            log.includes('[VALIDATION]') ? 'text-[#F0B429]' :
                            log.includes('[DEBUG]') ? 'text-[#4A5568]' : 'text-[#7A8BA0]'
                          }
                        >
                          <span className="text-[#3A4A5C] select-none mr-2">❯</span>
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <p className="text-[10px] font-mono text-[#3A4A5C] uppercase tracking-widest">
                    SSL Pinning & End-to-End Cryptographic Checksum Active
                  </p>
                </div>
              ) : (
                /* STEP 2: INSTALLATION & ONBOARDING SLIDESHOW */
                <div className="flex flex-col min-h-[500px]">
                  
                  {/* Top Progress steps */}
                  <div className="bg-[#0A101A] border-b border-[#1A2333] px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F0B429]/10 border border-[#F0B429]/30 flex items-center justify-center text-xs font-mono font-bold text-[#F0B429]">
                        EXE
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">NEXUS IDE Desktop</div>
                        <div className="text-[10px] text-[#4A5568] font-mono">v2.0.0-STABLE · Windows x64</div>
                      </div>
                    </div>
                    
                    {/* Dots indicator */}
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map(s => (
                        <div 
                          key={s} 
                          className={`w-2 h-2 rounded-full transition-all ${
                            guideStep === s ? 'w-6 bg-[#F0B429]' : 'bg-[#1A2333]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Modal Onboarding Content Area */}
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      {guideStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-5"
                        >
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/15 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-wider uppercase rounded-full">
                            <ShieldCheck className="w-3.5 h-3.5" /> Download Succeeded
                          </div>
                          
                          <h4 className="text-2xl font-bold font-display text-white">
                            Step 1: Installation & Security Override
                          </h4>
                          
                          <p className="text-[#7A8BA0] text-sm leading-relaxed font-light">
                            The installer <span className="font-mono text-white">NEXUS_IDE_Setup_v2.0.0.exe</span> has been saved in your Downloads folder.
                          </p>

                          <div className="bg-[#0D1521] border border-[#1A2333] rounded-2xl p-5 space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="p-2 rounded-lg bg-[#FF4444]/15 text-[#FF4444] shrink-0 border border-[#FF4444]/20 mt-0.5">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Windows Protected Your PC Alert</div>
                                <p className="text-[#7A8BA0] text-xs leading-relaxed">
                                  Because this is a private beta build, your OS may flag it as an unsigned executable. Click <span className="text-[#F0B429] font-bold">"More Info"</span> inside the prompt, then click <span className="text-[#F0B429] font-bold">"Run Anyway"</span> to start the isolated sandbox installation safely.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-4 border-t border-[#1A2333] pt-4">
                              <div className="p-2 rounded-lg bg-[#F0B429]/15 text-[#F0B429] shrink-0 border border-[#F0B429]/20 mt-0.5">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-bold text-white uppercase tracking-wider mb-1">Installation Directory</div>
                                <p className="text-[#7A8BA0] text-xs leading-relaxed">
                                  Installs fully self-contained standard libraries at <span className="font-mono text-white/90">AppData\Local\Programs\NEXUS</span> without poluting system registries.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {guideStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-5"
                        >
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0B429]/15 border border-[#F0B429]/20 text-[#F0B429] text-[10px] font-bold tracking-wider uppercase rounded-full">
                            <Settings className="w-3.5 h-3.5" /> Privacy & Local Core Config
                          </div>

                          <h4 className="text-2xl font-bold font-display text-white">
                            Step 2: Connect your LLM API Core
                          </h4>

                          <p className="text-[#7A8BA0] text-sm leading-relaxed font-light">
                            NEXUS IDE process code locally to preserve absolute privacy of your intellectual property. No strategy logic ever leaves your desktop card.
                          </p>

                          <div className="bg-[#0D1521] border border-[#1A2333] rounded-2xl p-5 space-y-4 text-left">
                            <div className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-full bg-[#1A2333] border border-[#222E40] text-xs font-mono font-bold flex items-center justify-center text-[#F0B429] mt-0.5 shrink-0">1</div>
                              <p className="text-xs text-[#7A8BA0] leading-relaxed">
                                Launch the application and click on <span className="text-white font-bold">Settings (Ctrl+,)</span> at the bottom left rail.
                              </p>
                            </div>
                            <div className="flex items-start gap-3 border-t border-[#1A2333]/50 pt-3">
                              <div className="w-5 h-5 rounded-full bg-[#1A2333] border border-[#222E40] text-xs font-mono font-bold flex items-center justify-center text-[#F0B429] mt-0.5 shrink-0">2</div>
                              <p className="text-xs text-[#7A8BA0] leading-relaxed">
                                Navigate to the <span className="text-white font-bold">LLM Config</span> tab.
                              </p>
                            </div>
                            <div className="flex items-start gap-3 border-t border-[#1A2333]/50 pt-3">
                              <div className="w-5 h-5 rounded-full bg-[#1A2333] border border-[#222E40] text-xs font-mono font-bold flex items-center justify-center text-[#F0B429] mt-0.5 shrink-0">3</div>
                              <p className="text-xs text-[#7A8BA0] leading-relaxed">
                                Enter your personal <span className="text-[#F0B429] font-bold">Gemini API Key</span>. This key is used on demand to drive high-performance coding, historical scenario mapping, and walk-forward verification entirely securely.
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {guideStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0B429]/15 border border-[#F0B429]/20 text-[#F0B429] text-[10px] font-bold tracking-wider uppercase rounded-full">
                            <Terminal className="w-3.5 h-3.5" /> Interactive Sandbox Setup
                          </div>

                          <h4 className="text-2xl font-bold font-display text-white">
                            Step 3: Generating First Trading Agent
                          </h4>

                          <p className="text-[#7A8BA0] text-sm leading-relaxed font-light">
                            With your AI Core connected, you can draft strategies by simply writing natural English. This runs automated test routines before compiling executable files.
                          </p>

                          <div className="bg-black/80 border border-[#1A2333] rounded-2xl p-5 space-y-4 text-left font-mono">
                            <div className="text-xs text-[#4A5568]">❯ TRY IN CHAT PANEL:</div>
                            <div className="text-sm text-[#F0B429] font-semibold">
                              "Write a dual moving-average crossover system on ETH/USD. Trigger buy when 9-period EMA crosses above 21. Run full 8-gate stress test and dump to the local Evidence Ledger."
                            </div>
                            <div className="text-[11px] text-[#7A8BA0] border-t border-[#1A2333] pt-3 leading-relaxed">
                              Witness the active feedback log stream in the sidebar terminal as the engine builds the strategy logic, writes isolated testing suites, executes optimization algorithms, and generates live charts.
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {guideStep === 4 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-5"
                        >
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/15 border border-green-500/20 text-green-400 text-[10px] font-bold tracking-wider uppercase rounded-full">
                            <Flame className="w-3.5 h-3.5" /> Local Live Execution
                          </div>

                          <h4 className="text-2xl font-bold font-display text-white">
                            Step 4: Compiling, Trading & Deploying
                          </h4>

                          <p className="text-[#7A8BA0] text-sm leading-relaxed font-light">
                            NEXUS IDE exports highly formatted, ready-to-run indicators or systems for direct exchange connection or external platform integration.
                          </p>

                          <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="p-4 bg-[#0D1521] border border-[#1A2333] rounded-xl">
                              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Export formats</div>
                              <ul className="space-y-1 text-xs text-[#7A8BA0]">
                                <li>• Production C++ (Low Latency)</li>
                                <li>• High performance Rust scripts</li>
                                <li>• Pine Script (TradingView Indicator)</li>
                                <li>• Python Backtesting module</li>
                              </ul>
                            </div>
                            <div className="p-4 bg-[#0D1521] border border-[#1A2333] rounded-xl">
                              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">Broker Adapters</div>
                              <ul className="space-y-1 text-xs text-[#7A8BA0]">
                                <li>• Interactive Brokers API integration</li>
                                <li>• MetaTrader 4/5 integration</li>
                                <li>• Binance & OKX WS secure streams</li>
                                <li>• Tradovate Option Gateway</li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom Navigation Buttons */}
                    <div className="flex justify-between items-center mt-10 border-t border-[#1A2333] pt-6">
                      <button
                        onClick={prevGuideStep}
                        disabled={guideStep === 1}
                        className={`flex items-center gap-2 text-xs font-mono font-bold uppercase py-2 px-4 rounded-lg bg-black text-[#7A8BA0] border border-[#1A2333] select-none hover:border-white transition-all ${
                          guideStep === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" /> Previous
                      </button>

                      <div className="text-xs text-[#4A5568] font-mono select-none">
                        Page {guideStep} of {totalGuideSteps}
                      </div>

                      {guideStep < totalGuideSteps ? (
                        <button
                          onClick={nextGuideStep}
                          className="flex items-center gap-2 text-xs font-mono font-bold uppercase py-2 px-5 rounded-lg bg-[#F0B429] text-black hover:opacity-85 select-none transition-all"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={onClose}
                          className="flex items-center gap-2 text-xs font-mono font-bold uppercase py-2 px-5 rounded-lg bg-green-500 text-black hover:opacity-85 select-none transition-all"
                        >
                          Complete Onboarding ✓
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
