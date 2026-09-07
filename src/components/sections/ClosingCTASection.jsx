import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../layout/Container';
import Button from '../common/Button';
import closingBg from '../../assets/images/trucks-hero-2.avif';

export default function ClosingCTASection({ onTalkExpert }) {
  const navigate = useNavigate();

  const handleTalkExpert = () => {
    if (onTalkExpert) {
      onTalkExpert();
    } else {
      navigate('/assessment');
    }
  };

  return (
    <section className="relative w-full min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-between bg-[#0F2B46] overflow-hidden select-none">
      {/* Full-bleed background image of Road Train disappearing down the corridor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={closingBg}
          alt="Volvo Road Train disappearing down the highway corridor"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft cinematic dark overlay so image is clear while text remains crisp */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B46]/90 via-black/40 to-black/40" />
      </div>

      {/* Spacer top */}
      <div className="w-full h-12 md:h-16" />

      {/* Center Content: Headline, Sub-line, Buttons */}
      <Container className="relative z-10 text-center flex flex-col items-center my-auto px-4">
        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] text-white font-medium leading-[1.18] tracking-tight mb-4 sm:mb-6 max-w-[840px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Some journeys are measured in kilometres. This one is measured in what it saves.
        </h2>

        {/* Sub-line */}
        <p className="text-[#F2F4F6] text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-[620px] font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
          Talk to a Volvo transport-solutions expert about bringing Road Train to your operation.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            variant="white"
            onClick={handleTalkExpert}
            className="py-3.5 px-8 text-sm sm:text-base shadow-lg"
          >
            Talk to an expert →
          </Button>

          <Button
            variant="linkWhite"
            onClick={() => {
              alert("Volvo Trucks Dealer Network: 200+ authorized service and dealership touchpoints across major freight corridors in India.");
            }}
            className="text-sm sm:text-base drop-shadow-md hover:underline cursor-pointer"
          >
            Find your nearest Volvo dealer
          </Button>
        </div>
      </Container>

      {/* Footer: Volvo wordmark · Volvo Trucks. Driving Progress. */}
      <div className="relative z-10 w-full border-t border-white/15 bg-black/40 backdrop-blur-md py-4 sm:py-5">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="font-bold text-xl sm:text-2xl tracking-[0.1em] text-white">
              VOLVO
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs sm:text-[13px] uppercase tracking-widest text-[#F2F4F6]/90 font-medium">
              Volvo Trucks. Driving Progress.
            </span>
          </div>

          <div className="text-[11px] sm:text-xs text-white/50">
            © {new Date().getFullYear()} Volvo Trucks India. All rights reserved.
          </div>
        </Container>
      </div>
    </section>
  );
}
