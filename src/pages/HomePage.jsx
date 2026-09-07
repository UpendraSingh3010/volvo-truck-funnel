import React, { useState, useRef } from 'react';
import HeroSection from '../components/sections/HeroSection';
import TheIdeaSection from '../components/sections/TheIdeaSection';
import TheProofSection from '../components/sections/TheProofSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import WhoItsForSection from '../components/sections/WhoItsForSection';
import SustainabilitySection from '../components/sections/SustainabilitySection';
import AssessmentFormSection from '../components/sections/AssessmentFormSection';
import ClosingCTASection from '../components/sections/ClosingCTASection';

export default function HomePage() {
  const [selectedApp, setSelectedApp] = useState('Logistics');

  // Map card IDs to form dropdown values
  const appMapping = {
    logistics: 'Logistics',
    mining: 'Mining',
    cement: 'Cement',
    ports: 'Ports',
  };

  const handleApplicationSelect = (card) => {
    if (card && appMapping[card.id]) {
      setSelectedApp(appMapping[card.id]);
    }
  };

  const scrollToAssessment = (card) => {
    if (card && appMapping[card.id]) {
      setSelectedApp(appMapping[card.id]);
    }
    const el = document.getElementById('assessment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <HeroSection onExploreAssessment={() => scrollToAssessment()} />
      <TheIdeaSection />
      <TheProofSection />
      <HowItWorksSection />
      <WhoItsForSection
        onSelectApplication={handleApplicationSelect}
        onCtaClick={scrollToAssessment}
      />
      <SustainabilitySection />
      <AssessmentFormSection id="assessment-section" initialApplication={selectedApp} />
      <ClosingCTASection onTalkExpert={() => scrollToAssessment()} />
    </div>
  );
}
