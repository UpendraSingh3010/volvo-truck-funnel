import React, { useState, useEffect } from 'react';
import Container from '../layout/Container';
import FormField from '../common/FormField';
import Button from '../common/Button';
import { offerData } from '../../data/landingContent';

export default function AssessmentFormSection({ id = "assessment-section", initialApplication = "" }) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    application: initialApplication || '',
    corridor: '',
    monthlyVolume: '',
    fleetSize: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initialApplication when selected from WhoItsForSection
  useEffect(() => {
    if (initialApplication) {
      setFormData((prev) => ({ ...prev, application: initialApplication }));
    }
  }, [initialApplication]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const applicationOptions = [
    { value: '', label: 'Select an application' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Mining', label: 'Mining' },
    { value: 'Cement', label: 'Cement' },
    { value: 'Steel', label: 'Steel' },
    { value: 'Ports', label: 'Ports' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <section
      id={id}
      className="w-full min-h-screen md:h-[100dvh] md:max-h-[100dvh] flex flex-col justify-center bg-[#F2F4F6] border-b border-[#E5E7EB] py-8 md:py-0 overflow-hidden select-none"
    >
      <Container className="w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Left Column: Business Diagnostic Narrative */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#6B7280] font-semibold mb-2">
              {offerData.eyebrow}
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] text-[#0F2B46] font-medium leading-[1.15] tracking-tight mb-3 sm:mb-4">
              {offerData.headline}
            </h2>

            <p className="text-[#6B7280] text-xs sm:text-sm md:text-[15px] leading-relaxed mb-5 sm:mb-6 max-w-[500px]">
              {offerData.description}
            </p>

            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0F2B46] mb-3">
              What you'll receive:
            </h3>

            <ul className="flex flex-col gap-2.5 text-[#4B5563] text-xs sm:text-sm max-w-[480px]">
              {offerData.deliverables.map((item, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="text-[#0F2B46] shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 8 7 12 13 4" />
                    </svg>
                  </span>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Diagnostic Form Card */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-5 sm:p-6 md:p-8 border border-[#E5E7EB] shadow-sm rounded-[2px]">
              {submitted ? (
                <div className="py-8 sm:py-12 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#0F2B46] text-white flex items-center justify-center mb-4 shadow-sm">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#0F2B46] mb-2">
                    Assessment Request Received
                  </h3>
                  <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed max-w-md mb-6">
                    Thank you, <strong className="text-[#0F2B46]">{formData.fullName || 'Fleet Partner'}</strong>. A Volvo transport-solutions engineer will review your route parameters and send your tailored productivity assessment to <strong className="text-[#0F2B46]">{formData.email}</strong>.
                  </p>
                  <Button
                    variant="outline"
                    className="text-xs sm:text-sm py-2 px-6"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        company: '',
                        role: '',
                        email: '',
                        phone: '',
                        application: '',
                        corridor: '',
                        monthlyVolume: '',
                        fleetSize: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-3 sm:gap-3.5" onSubmit={handleSubmit}>
                  {/* Row 1: Full name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      label="Full name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required={true}
                      placeholder="e.g. Rajesh Kumar"
                      compact={true}
                    />
                    <FormField
                      label="Company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required={true}
                      placeholder="Organization / fleet name"
                      compact={true}
                    />
                  </div>

                  {/* Row 2: Role & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      label="Role / designation"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required={true}
                      placeholder="e.g. VP Logistics, Fleet Owner"
                      compact={true}
                    />
                    <FormField
                      label="Work email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                      placeholder="name@company.com"
                      compact={true}
                    />
                  </div>

                  {/* Row 3: Phone & Primary application */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      label="Phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      compact={true}
                    />
                    <FormField
                      label="Primary application"
                      name="application"
                      type="select"
                      value={formData.application}
                      onChange={handleChange}
                      required={true}
                      options={applicationOptions}
                      compact={true}
                    />
                  </div>

                  {/* Row 4: Route & Monthly volume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField
                      label="Main corridor or route"
                      name="corridor"
                      value={formData.corridor}
                      onChange={handleChange}
                      placeholder="e.g. JNPT - NCR, Mumbai - Delhi"
                      compact={true}
                    />
                    <FormField
                      label="Approx. monthly volume moved"
                      name="monthlyVolume"
                      value={formData.monthlyVolume}
                      onChange={handleChange}
                      placeholder="e.g. 5,000 Tonnes"
                      compact={true}
                    />
                  </div>

                  {/* Row 5: Current fleet size */}
                  <FormField
                    label="Current fleet size"
                    name="fleetSize"
                    value={formData.fleetSize}
                    onChange={handleChange}
                    placeholder="e.g. 25 Heavy Multi-Axle Trucks"
                    compact={true}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full mt-1 py-3 text-sm font-medium"
                  >
                    {isSubmitting ? "Processing Assessment..." : "Request my assessment →"}
                  </Button>

                  {/* Privacy Notice */}
                  <p className="text-[11px] sm:text-xs text-[#6B7280] text-center mt-0.5">
                    {offerData.privacyNotice}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
