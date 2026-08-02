'use client';

import { LandingHeader } from './header';
import { LandingHero } from './hero';
import { LegacyFeatures } from './legacy-features';
import { QuoteBanner } from './quote-banner';
import { BentoFeatures } from './bento-features';
import { CtaSection } from './cta-section';
import { LandingFooter } from './footer';

export function ModernLandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1E2229] font-sans selection:bg-[#F07865] selection:text-white">
      <LandingHeader />
      <LandingHero />
      <LegacyFeatures />
      <QuoteBanner />
      <BentoFeatures />
      <CtaSection />
      <LandingFooter />
    </div>
  );
}
