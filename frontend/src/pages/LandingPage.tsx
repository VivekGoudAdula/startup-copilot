import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { SolutionSection } from '../components/landing/SolutionSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CommunityCTA } from '../components/landing/CommunityCTA';
import { Footer } from '../components/landing/Footer';


export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-accent/30 overflow-x-hidden font-sans">
      <Navbar />

      <main>
        <HeroSection />

        <ProblemSection />

        <SolutionSection />


        <HowItWorks />

        <CommunityCTA />
      </main>

      <Footer />
    </div>
  );
};
