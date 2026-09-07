import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import AppCard from '../common/AppCard';
import Button from '../common/Button';
import { applicationsData } from '../../data/landingContent';

export default function WhoItsForSection({ onSelectApplication, onCtaClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Minimalist stroke icons for each industry
  const appIcons = [
    // Long-haul logistics & 3PL (High-speed multi-trailer route)
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="5" width="14" height="11" rx="1" />
      <path d="M16 9h4l2 3v4h-6V9z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>,

    // Mining & minerals (Heavy excavation & overburden bucket)
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M3 7l9 4 9-4" />
      <path d="M12 11v10" />
    </svg>,

    // Cement & steel (Industrial bulk beams & structure)
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="3" y="11" width="18" height="6" rx="1" />
      <path d="M6 19h12" />
    </svg>,

    // Ports & industrial logistics (Port container crane & maritime terminal)
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20h16" />
      <path d="M12 4v12" />
      <path d="M8 8l4-4 4 4" />
      <rect x="6" y="14" width="12" height="6" rx="1" />
    </svg>,
  ];

  const handleCardSelect = (index, card) => {
    setSelectedIndex(index);
    onSelectApplication?.(card);
  };

  const handleCtaAction = () => {
    const activeCard = applicationsData.cards[selectedIndex];
    if (onCtaClick) {
      onCtaClick(activeCard);
    } else {
      navigate(`/assessment?app=${activeCard.id}`);
    }
  };

  const currentSelection = applicationsData.cards[selectedIndex];

  return (
    <section className="w-full min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-center bg-[#F2F4F6] border-b border-[#E5E7EB] py-12 md:py-0 overflow-hidden select-none">
      <Container className="w-full">
        {/* Section Headline & Intro */}
        <div className="max-w-[700px] mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-3 sm:mb-4">
            {applicationsData.headline}
          </h2>
          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed">
            {applicationsData.intro}
          </p>
        </div>

        {/* 4 Application Selector Cards in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8 md:mb-10">
          {applicationsData.cards.map((card, i) => (
            <AppCard
              key={card.id}
              title={card.title}
              desc={card.desc}
              icon={appIcons[i]}
              isHovered={hoveredCard === i}
              isSelected={selectedIndex === i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              onSelect={() => handleCardSelect(i, card)}
            />
          ))}
        </div>

        {/* Action Button */}
        <div>
          <Button
            variant="primary"
            onClick={handleCtaAction}
            className="text-sm sm:text-base py-3.5 px-8"
          >
            {applicationsData.ctaText}
          </Button>
        </div>
      </Container>
    </section>
  );
}
