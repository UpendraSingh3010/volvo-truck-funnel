import React, { useState, useEffect } from 'react';
import Container from '../layout/Container';
import FormField from '../common/FormField';
import Button from '../common/Button';
import { offerData } from '../../data/landingContent';

const WIZARD_STEPS = [
  { num: 1, label: 'About you', desc: 'Contact details' },
  { num: 2, label: 'Your operation', desc: 'Corridor & fleet' },
  { num: 3, label: 'Review & Submit', desc: 'Verification' },
];

export default function AssessmentFormSection({ id = "assessment-section", initialApplication = "" }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState('');

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
    if (validationError) setValidationError('');
  };

  const handleNext = (e) => {
    e?.preventDefault();
    setValidationError('');

    if (currentStep === 1) {
      if (!formData.fullName.trim()) { setValidationError('Please enter your full name.'); return; }
      if (!formData.company.trim()) { setValidationError('Please enter your company or fleet name.'); return; }
      if (!formData.role.trim()) { setValidationError('Please enter your role / designation.'); return; }
      if (!formData.email.trim() || !formData.email.includes('@')) { setValidationError('Please enter a valid work email address.'); return; }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.application) { setValidationError('Please select your primary industry application.'); return; }
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setValidationError('');
    setCurrentStep((prev) => Math.max(1, prev - 1));
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
      className="relative w-full py-20 md:py-28 bg-white border-b border-[#E0E0E0] select-none"
    >
      <Container className="w-full">
        <div className="flex flex-col lg:flex-row items-start gap-10 xl:gap-16">

          {/* ─── Left Column: Narrative ─── */}
          <div className="w-full lg:w-[44%] flex flex-col justify-center lg:pt-2">

            {/* Flat eyebrow — no pill */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-[2px] bg-[#0F2B46]" />
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#1C4E80] font-semibold">
                {offerData.eyebrow}
              </p>
            </div>

            <h2 className="text-2xl md:text-[32px] text-[#0F2B46] font-medium leading-[1.2] tracking-tight mb-3">
              {offerData.headline}
            </h2>

            <p className="text-[#556980] text-sm md:text-[14px] leading-relaxed mb-6 max-w-[480px]">
              {offerData.description}
            </p>

            {/* What you'll receive label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-[1.5px] bg-[#38BDF8]/70" />
              <h3 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#0F2B46]">
                What you'll receive:
              </h3>
            </div>

            {/* Deliverable items — squared, no rounded-lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-w-[500px]">
              {offerData.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 bg-[#F5F5F5] border border-[#E0E0E0] hover:border-[#0F2B46]/20 hover:bg-white transition-colors duration-200"
                >
                  <span className="w-4 h-4 bg-[#0F2B46] text-white flex items-center justify-center shrink-0 text-[9px] font-bold">
                    ✓
                  </span>
                  <span className="text-[12px] text-[#334155] font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Credibility badge — flat */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#F5F5F5] border border-[#E0E0E0] max-w-[500px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-mono text-[10.5px] text-[#64748B]">
                Volvo Commercial Vehicle Solutions · Direct Engineering Consultation
              </span>
            </div>
          </div>

          {/* ─── Right Column: Form Card ─── */}
          <div className="w-full lg:w-[56%]">
            <div className="relative bg-white border border-[#DDE4ED] shadow-[0_4px_24px_rgba(15,43,70,0.07)] overflow-hidden">

              {/* Top brand accent line — solid navy, no gradient */}
              <div className="h-1 bg-[#0F2B46] w-full" />

              <div className="p-6 md:p-8">
                {submitted ? (
                  /* ── SUCCESS SCREEN ── */
                  <div className="py-8 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <div className="w-14 h-14 bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>

                    <div className="inline-block px-3 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-semibold tracking-wider uppercase mb-3">
                      REF: VT-ROADTRAIN-{Math.floor(1000 + Math.random() * 9000)}
                    </div>

                    <h3 className="text-lg font-semibold text-[#0F2B46] mb-2">
                      Assessment Request Received
                    </h3>

                    <p className="text-[#556980] text-[13px] leading-relaxed max-w-md mb-5">
                      Thank you, <strong className="text-[#0F2B46]">{formData.fullName || 'Fleet Partner'}</strong>. A Volvo transport-solutions engineer will review your corridor parameters and dispatch your tailored assessment to <strong className="text-[#0F2B46]">{formData.email}</strong> within 1 business day.
                    </p>

                    <div className="w-full max-w-sm p-3 bg-[#F5F5F5] border border-[#E0E0E0] mb-5 text-left text-[11.5px] text-[#64748B] flex flex-col gap-1.5">
                      <div className="font-semibold text-[#0F2B46] text-[10.5px] uppercase tracking-wider font-mono mb-0.5">Next Steps:</div>
                      {['Route topography & payload audit', 'Fleet consolidation & fuel modeling', 'Consultation call with Volvo expert'].map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="px-6 py-2.5 border border-[#0F2B46] text-[#0F2B46] text-xs font-semibold hover:bg-[#0F2B46] hover:text-white transition-colors duration-200 cursor-pointer"
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                        setFormData({ fullName: '', company: '', role: '', email: '', phone: '', application: '', corridor: '', monthlyVolume: '', fleetSize: '' });
                      }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  /* ── INTERACTIVE 3-STEP FORM ── */
                  <form className="flex flex-col" onSubmit={handleSubmit}>

                    {/* ── Step Indicator ── */}
                    <div className="relative mb-7">
                      {/* Progress track — solid navy, no gradient */}
                      <div className="absolute top-3.5 left-5 right-5 h-[1.5px] bg-[#E0E0E0] -translate-y-1/2 z-0 hidden sm:block">
                        <div
                          className="h-full bg-[#0F2B46] transition-all duration-500 ease-out"
                          style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                        />
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        {WIZARD_STEPS.map((s) => {
                          const isPast = currentStep > s.num;
                          const isCurrent = currentStep === s.num;
                          return (
                            <button
                              key={s.num}
                              type="button"
                              onClick={() => { if (isPast) { setValidationError(''); setCurrentStep(s.num); } }}
                              disabled={!isPast}
                              className={`flex items-center gap-2 text-left transition-all duration-200 ${isPast ? 'cursor-pointer' : 'cursor-default'}`}
                            >
                              <div
                                className={`w-7 h-7 flex items-center justify-center font-bold text-xs transition-all duration-300 shrink-0 ${
                                  isCurrent
                                    ? 'bg-[#0F2B46] text-white ring-4 ring-[#0F2B46]/15'
                                    : isPast
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-[#F5F5F5] text-[#94A3B8] border border-[#E0E0E0]'
                                }`}
                              >
                                {isPast ? (
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : s.num}
                              </div>
                              <div className="flex flex-col">
                                <span className={`font-semibold text-xs leading-tight ${isCurrent ? 'text-[#0F2B46]' : isPast ? 'text-[#64748B]' : 'text-[#94A3B8]'}`}>
                                  {s.label}
                                </span>
                                <span className={`hidden sm:inline text-[10px] font-mono leading-tight ${isCurrent ? 'text-[#1C4E80]' : 'text-[#94A3B8]'}`}>
                                  {s.desc}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── STEP 1: About you ── */}
                    {currentStep === 1 && (
                      <div key="step-1" className="step-slide-animate flex flex-col gap-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField label="Full name" name="fullName" value={formData.fullName} onChange={handleChange} required={true} placeholder="e.g. Rajesh Kumar" compact={true} />
                          <FormField label="Company" name="company" value={formData.company} onChange={handleChange} required={true} placeholder="Fleet / organization" compact={true} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField label="Role / designation" name="role" value={formData.role} onChange={handleChange} required={true} placeholder="e.g. VP Logistics" compact={true} />
                          <FormField label="Work email" name="email" type="email" value={formData.email} onChange={handleChange} required={true} placeholder="name@company.com" compact={true} />
                        </div>

                        {validationError && (
                          <div className="text-xs text-rose-600 font-medium py-1.5 px-3 bg-rose-50 border border-rose-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>{validationError}</span>
                          </div>
                        )}

                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="w-full py-3 px-6 bg-[#0F2B46] hover:bg-[#163E63] text-white font-semibold text-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                          >
                            <span>Next: Your operation</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 2: Your operation ── */}
                    {currentStep === 2 && (
                      <div key="step-2" className="step-slide-animate flex flex-col gap-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField label="Phone number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" compact={true} />
                          <FormField label="Primary application" name="application" type="select" value={formData.application} onChange={handleChange} required={true} options={applicationOptions} compact={true} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <FormField label="Main corridor or route" name="corridor" value={formData.corridor} onChange={handleChange} placeholder="e.g. JNPT - NCR" compact={true} />
                          <FormField label="Approx. monthly volume" name="monthlyVolume" value={formData.monthlyVolume} onChange={handleChange} placeholder="e.g. 5,000 Tonnes" compact={true} />
                        </div>
                        <FormField label="Current fleet size" name="fleetSize" value={formData.fleetSize} onChange={handleChange} placeholder="e.g. 25 Heavy Trucks" compact={true} />

                        {validationError && (
                          <div className="text-xs text-rose-600 font-medium py-1.5 px-3 bg-rose-50 border border-rose-200 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>{validationError}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="w-1/3 py-3 px-3 bg-[#F5F5F5] hover:bg-[#E8E8E8] text-[#0F2B46] font-semibold text-sm transition-colors duration-200 border border-[#E0E0E0] cursor-pointer"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={handleNext}
                            className="w-2/3 py-3 px-6 bg-[#0F2B46] hover:bg-[#163E63] text-white font-semibold text-sm transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                          >
                            <span>Next: Review & Submit</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ── STEP 3: Review & Submit ── */}
                    {currentStep === 3 && (
                      <div key="step-3" className="step-slide-animate flex flex-col gap-3">

                        {/* Review Summary */}
                        <div className="bg-[#F5F5F5] border border-[#E0E0E0] p-3.5 flex flex-col gap-2.5 text-xs">

                          {/* Section 1: Contact */}
                          <div className="bg-white border border-[#E0E0E0] p-3">
                            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#F0F0F0]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1C4E80]" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F2B46] font-semibold">
                                  01 // Contact Profile
                                </span>
                              </div>
                              <button type="button" onClick={() => setCurrentStep(1)} className="text-[11px] text-[#1C4E80] hover:text-[#0F2B46] font-medium cursor-pointer transition-colors flex items-center gap-1">
                                <span>Edit</span><span>✎</span>
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[#64748B]">
                              {[['Name', formData.fullName], ['Company', formData.company], ['Role', formData.role], ['Work Email', formData.email]].map(([label, val]) => (
                                <div key={label}>
                                  <span className="text-[#94A3B8] block text-[9.5px] font-mono uppercase">{label}</span>
                                  <span className="font-semibold text-[#0F2B46] text-xs truncate block">{val || '—'}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Section 2: Route & Fleet */}
                          <div className="bg-white border border-[#E0E0E0] p-3">
                            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#F0F0F0]">
                              <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F2B46] font-semibold">
                                  02 // Route & Fleet
                                </span>
                              </div>
                              <button type="button" onClick={() => setCurrentStep(2)} className="text-[11px] text-[#1C4E80] hover:text-[#0F2B46] font-medium cursor-pointer transition-colors flex items-center gap-1">
                                <span>Edit</span><span>✎</span>
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[#64748B]">
                              <div>
                                <span className="text-[#94A3B8] block text-[9.5px] font-mono uppercase">Phone</span>
                                <span className="font-medium text-[#334155] text-[11px]">{formData.phone || '—'}</span>
                              </div>
                              <div>
                                <span className="text-[#94A3B8] block text-[9.5px] font-mono uppercase">Application</span>
                                <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200/60 inline-block text-[10.5px]">
                                  {formData.application || '—'}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#94A3B8] block text-[9.5px] font-mono uppercase">Corridor</span>
                                <span className="font-medium text-[#334155] text-[11px] truncate block">{formData.corridor || 'Not specified'}</span>
                              </div>
                              <div>
                                <span className="text-[#94A3B8] block text-[9.5px] font-mono uppercase">Volume</span>
                                <span className="font-medium text-[#334155] text-[11px] truncate block">{formData.monthlyVolume || 'Not specified'}</span>
                              </div>
                              <div className="col-span-2 pt-1.5 border-t border-[#F0F0F0] flex items-center justify-between">
                                <span className="text-[#94A3B8] text-[9.5px] font-mono uppercase">Fleet Size:</span>
                                <span className="font-semibold text-[#0F2B46] text-xs">{formData.fleetSize || 'Not specified'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Submit buttons */}
                        <div className="flex items-center gap-2.5 pt-1">
                          <button
                            type="button"
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="w-1/3 py-3 px-3 bg-[#F5F5F5] hover:bg-[#E8E8E8] text-[#0F2B46] font-semibold text-sm transition-colors duration-200 border border-[#E0E0E0] cursor-pointer disabled:opacity-50"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-2/3 py-3 px-5 bg-[#0F2B46] hover:bg-[#163E63] text-white font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                <span>Processing...</span>
                              </>
                            ) : (
                              <span>Confirm & Submit Request →</span>
                            )}
                          </button>
                        </div>

                        {/* Security notice */}
                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#94A3B8] text-center font-mono">
                          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="truncate">{offerData.privacyNotice}</span>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
