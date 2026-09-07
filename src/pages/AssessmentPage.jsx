import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Eyebrow from '../components/common/Eyebrow';
import AssessmentFormSection from '../components/sections/AssessmentFormSection';

export default function AssessmentPage() {
  const [searchParams] = useSearchParams();
  const preselectedModel = searchParams.get('model');
  const preselectedApp = searchParams.get('app');

  // Interactive Route Simulator State
  const [monthlyVolume, setMonthlyVolume] = useState(6000); // tonnes
  const [distance, setDistance] = useState(750); // km

  // Calculations based on 25T standard semi-trailer vs 60T Road Train payload
  const standardTruckTrips = Math.ceil(monthlyVolume / 28);
  const roadTrainTrips = Math.ceil(monthlyVolume / 62);
  const tripsSaved = standardTruckTrips - roadTrainTrips;
  const tripsSavedPercent = Math.round((tripsSaved / standardTruckTrips) * 100);
  const estimatedFuelSavedLitres = Math.round(tripsSaved * distance * 0.38);
  const estimatedCo2ReductionTonnes = Math.round(estimatedFuelSavedLitres * 2.68 / 1000);

  return (
    <div className="w-full pt-[72px]">
      {/* Page Header */}
      <section className="bg-[#0F2B46] text-white py-16 md:py-24 border-b border-[#1C4E80]">
        <Container>
          <div className="max-w-[800px]">
            <Eyebrow light={true}>OPERATIONAL MODELING ENGINE</Eyebrow>
            <h1 className="text-4xl md:text-[56px] font-medium leading-[1.1] mb-6">
              Productivity Assessment & Fleet Feasibility
            </h1>
            <p className="text-[#F2F4F6] text-lg md:text-[20px] font-light leading-relaxed">
              Model the commercial impact of Volvo Road Train for your corridor. Simulate trips consolidated, fuel efficiency gains, and carbon abatement.
            </p>
            {preselectedModel && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-sm">
                <span>Selected Vehicle:</span>
                <strong className="text-white">{preselectedModel}</strong>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Real-time Interactive Corridor Simulator */}
      <Section background="white" bordered={true} className="!py-16">
        <Container>
          <div className="max-w-[700px] mb-12">
            <h2 className="text-3xl font-medium text-[#0F2B46] mb-4">
              Corridor Impact Simulator
            </h2>
            <p className="text-[#6B7280] text-base leading-relaxed">
              Adjust the sliders below to estimate how many trips your fleet could eliminate each month by upgrading to a multi-trailer Road Train combination.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Sliders Column */}
            <div className="lg:col-span-6 bg-[#F2F4F6] p-8 rounded-[2px] border border-[#E5E7EB] flex flex-col gap-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-[#0F2B46]">
                    Monthly Freight Volume (Tonnes)
                  </label>
                  <span className="text-lg font-bold text-[#0F2B46]">
                    {monthlyVolume.toLocaleString()} T
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full accent-[#0F2B46] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#6B7280] mt-1">
                  <span>1,000 T</span>
                  <span>15,000 T</span>
                  <span>30,000 T</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-[#0F2B46]">
                    One-Way Corridor Distance (km)
                  </label>
                  <span className="text-lg font-bold text-[#0F2B46]">
                    {distance.toLocaleString()} km
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full accent-[#0F2B46] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#6B7280] mt-1">
                  <span>100 km</span>
                  <span>1,200 km</span>
                  <span>2,500 km</span>
                </div>
              </div>
            </div>

            {/* Live Metrics Column */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-6">
              <div className="bg-[#0F2B46] text-white p-6 rounded-[2px]">
                <div className="text-4xl md:text-5xl font-light mb-2">
                  {tripsSaved}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#F2F4F6]/80 font-medium">
                  Trips Saved Every Month
                </div>
                <div className="text-xs text-[#F2F4F6]/60 mt-2">
                  ~{tripsSavedPercent}% reduction in vehicle movements
                </div>
              </div>

              <div className="bg-white border border-[#0F2B46] p-6 rounded-[2px]">
                <div className="text-4xl md:text-5xl font-light text-[#0F2B46] mb-2">
                  {estimatedFuelSavedLitres.toLocaleString()} L
                </div>
                <div className="text-xs uppercase tracking-wider text-[#6B7280] font-medium">
                  Monthly Diesel Conserved
                </div>
                <div className="text-xs text-[#6B7280] mt-2">
                  Substantial operational OPEX savings
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] p-6 rounded-[2px] col-span-2 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-medium text-[#0F2B46]">
                    ~{estimatedCo2ReductionTonnes} Tonnes CO₂ / Month
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#6B7280] mt-1">
                    Direct Scope 1 & Scope 3 Decarbonisation
                  </div>
                </div>
                <div className="hidden sm:block text-3xl text-[#1C4E80]">
                  🌱
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Formal Assessment Inquiry Form */}
      <AssessmentFormSection initialApplication={preselectedApp || ''} />
    </div>
  );
}
