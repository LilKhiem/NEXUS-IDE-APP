/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { ValidationEngine } from './components/ValidationEngine';
import { Features } from './components/Features';
import { NexusStack } from './components/NexusStack';
import { WorkflowDiagram } from './components/WorkflowDiagram';
import { ComparisonTable } from './components/ComparisonTable';
import { Pricing } from './components/Pricing';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { MockCheckout } from './components/MockCheckout';
import { Toaster } from 'sonner';

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

export default function App() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [checkoutState, setCheckoutState] = useState<{isOpen: boolean, planName: string, price: number, isYearly: boolean}>({
    isOpen: false,
    planName: 'Pro',
    price: 99,
    isYearly: false
  });

  const openCheckout = (planName: string, price: number, isYearly: boolean) => {
    setCheckoutState({ isOpen: true, planName, price, isYearly });
  };

  const handleOpenDownload = () => {
    setIsDownloadOpen(true);
  };

  return (
    <div className="bg-[#050709] min-h-screen text-[#E8EDF5]">
      <Toaster position="top-center" theme="dark" />
      <OnboardingModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
      <Navbar onOpenDownload={handleOpenDownload} />
      <Hero onOpenDownload={handleOpenDownload} onOpenCheckout={() => openCheckout('Pro', 99, false)} />
      <HowItWorks onOpenDownload={handleOpenDownload} />
      <WorkflowDiagram />
      <ValidationEngine />
      <Features />
      <NexusStack />
      <ComparisonTable />
      <Pricing onOpenDownload={handleOpenDownload} onOpenCheckout={openCheckout} />
      <FinalCTA onOpenDownload={handleOpenDownload} onOpenCheckout={() => openCheckout('Pro', 99, false)} />
      <Footer onOpenDownload={handleOpenDownload} />
      <MockCheckout 
        isOpen={checkoutState.isOpen} 
        onClose={() => setCheckoutState(prev => ({ ...prev, isOpen: false }))}
        planName={checkoutState.planName}
        price={checkoutState.price}
        isYearly={checkoutState.isYearly}
      />
    </div>
  );
}
