import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import Eyebrow from '../components/common/Eyebrow';
import Button from '../components/common/Button';
import { truckCategories, truckList } from '../data/trucksData';

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inquiryTruck, setInquiryTruck] = useState(null);
  const navigate = useNavigate();

  const filteredTrucks =
    selectedCategory === 'all'
      ? truckList
      : truckList.filter((t) => t.category === selectedCategory);

  return (
    <div className="w-full pt-[72px]">
      {/* Catalog Hero Banner */}
      <section className="bg-[#0F2B46] text-white py-16 md:py-24 border-b border-[#1C4E80]">
        <Container>
          <div className="max-w-[760px]">
            <Eyebrow light={true}>HEAVY COMMERCIAL VEHICLE MARKETPLACE</Eyebrow>
            <h1 className="text-4xl md:text-[56px] font-medium leading-[1.1] mb-6">
              Volvo Road Train & Multi-Trailer Fleet Catalog
            </h1>
            <p className="text-[#F2F4F6] text-lg md:text-[20px] font-light leading-relaxed">
              Explore purpose-engineered Volvo prime movers homologated for high-capacity multi-trailer transport across India's industrial corridors.
            </p>
          </div>
        </Container>
      </section>

      {/* Filter and Catalog Grid */}
      <Section background="grey" bordered={false} className="!pt-12 !pb-24">
        <Container>
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 border-b border-[#E5E7EB] pb-6">
            {truckCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 text-sm font-medium rounded-[2px] transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0F2B46] text-white shadow-sm'
                    : 'bg-white text-[#0F2B46] border border-[#E5E7EB] hover:border-[#0F2B46]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTrucks.map((truck) => (
              <div
                key={truck.id}
                className="bg-white border border-[#E5E7EB] p-8 md:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-1 bg-[#F2F4F6] text-[#0F2B46] rounded-xs">
                      {truck.status}
                    </span>
                    <span className="text-sm font-medium text-[#1C4E80]">
                      {truck.gcw}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-medium text-[#0F2B46] mb-3">
                    {truck.name}
                  </h3>

                  <p className="text-[#6B7280] text-base mb-6 leading-relaxed">
                    {truck.tagline}
                  </p>

                  {/* Technical Specs Table */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#E5E7EB] mb-6 text-sm">
                    <div>
                      <span className="text-[#6B7280] block text-xs uppercase tracking-wider mb-1">Power Output</span>
                      <strong className="text-[#0F2B46] font-medium">{truck.power}</strong>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block text-xs uppercase tracking-wider mb-1">Axle Setup</span>
                      <strong className="text-[#0F2B46] font-medium">{truck.axles}</strong>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block text-xs uppercase tracking-wider mb-1">Transmission</span>
                      <strong className="text-[#0F2B46] font-medium">{truck.transmission}</strong>
                    </div>
                    <div>
                      <span className="text-[#6B7280] block text-xs uppercase tracking-wider mb-1">Payload Efficiency</span>
                      <strong className="text-[#0F2B46] font-medium">{truck.efficiency}</strong>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-wider text-[#6B7280] font-semibold mb-3">
                      Key Engineering Highlights
                    </h4>
                    <ul className="space-y-2">
                      {truck.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#0F2B46]">
                          <span className="text-[#1C4E80] mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E5E7EB]">
                  <Button
                    variant="primary"
                    className="flex-1 text-sm py-3"
                    onClick={() => {
                      navigate(`/assessment?model=${encodeURIComponent(truck.name)}`);
                    }}
                  >
                    Assess on Your Corridor →
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm py-3"
                    onClick={() => setInquiryTruck(truck)}
                  >
                    Specs & Brochure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Brochure / Spec inquiry modal */}
      {inquiryTruck && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setInquiryTruck(null)}
        >
          <div
            className="bg-white p-8 max-w-lg w-full rounded-[2px] shadow-2xl border border-[#0F2B46]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E5E7EB]">
              <h3 className="text-xl font-medium text-[#0F2B46]">
                Technical Datasheet: {inquiryTruck.name}
              </h3>
              <button
                onClick={() => setInquiryTruck(null)}
                className="text-xl text-[#6B7280] hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">
              Complete technical specification sheet, trailer coupling schematic, and axle load distribution diagram for Indian NHAI regulations.
            </p>
            <div className="p-4 bg-[#F2F4F6] rounded text-sm text-[#0F2B46] mb-6">
              <strong>Homologation:</strong> Full AIS compliance for multi-trailer commercial haulage on certified high-density freight corridors.
            </div>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                alert(`Datasheet for ${inquiryTruck.name} requested. Our team will dispatch the PDF specifications to your contact email.`);
                setInquiryTruck(null);
              }}
            >
              Download PDF Datasheet →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
