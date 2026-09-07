import React from 'react';
import Section from '../layout/Section';
import Container from '../layout/Container';
import StepItem from '../common/StepItem';
import { howItWorksData } from '../../data/landingContent';

import img1 from '../../assets/images/1.avif';
import img2 from '../../assets/images/2.avif';
import img3 from '../../assets/images/3.webp';
import img4 from '../../assets/images/4.webp';

export default function HowItWorksSection() {
  const stepImages = [img1, img2, img3, img4];

  return (
    <Section background="white" bordered={true} className="!py-20 md:!py-32">
      <Container>
        {/* Section Headline */}
        <div className="max-w-[700px] mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight">
            {howItWorksData.headline}
          </h2>
        </div>

        {/* 4 Alternating Engineering Steps */}
        <div className="flex flex-col gap-16 md:gap-28">
          {howItWorksData.steps.map((step, i) => (
            <StepItem
              key={step.num}
              num={step.num}
              title={step.title}
              desc={
                i === 3 ? (
                  <>
                    Volvo's driver-support systems work with a trained driver to protect the load, the driver and everyone else on the road. It's how{' '}
                    <strong className="text-[#0F2B46] font-medium">30 lakh+</strong> kilometres stay at{' '}
                    <strong className="text-[#0F2B46] font-medium">zero</strong> accidents.
                  </>
                ) : (
                  step.desc
                )
              }
              reverse={i % 2 === 1}
              imageSrc={stepImages[i]}
              imageAlt={`Volvo Road Train Engineering: ${step.title}`}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
