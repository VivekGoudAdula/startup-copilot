import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { SolutionSection } from '../components/landing/SolutionSection';
import { RoadmapSection } from '../components/landing/RoadmapSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CommunityCTA } from '../components/landing/CommunityCTA';
import { Footer } from '../components/landing/Footer';
import { LoadingOverlay } from '../components/landing/LoadingOverlay';

export const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to trigger loading for demo purposes
  const handleStartBuilding = () => {
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Usually redirect or scroll to result here
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 overflow-x-hidden font-sans">
      {/* Cinematic Loading Experience */}
      <LoadingOverlay
        isVisible={isLoading}
        onComplete={handleLoadingComplete}
      />

      <Navbar />

      <main>
        {/* Pass trigger to Hero CTA if needed, or handle globally */}
        <div onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.innerText.includes('Get Started')) {
            handleStartBuilding();
          }
        }}>
          <HeroSection />
        </div>

        <ProblemSection />

        <SolutionSection />

        <RoadmapSection />

        <HowItWorks />

        <div onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.innerText.includes('Start Building Now')) {
            handleStartBuilding();
          }
        }}>
          <CommunityCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};
