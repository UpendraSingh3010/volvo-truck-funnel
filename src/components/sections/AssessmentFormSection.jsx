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
      if (!formData.fullName.trim()) {
        setValidationError('Please enter your full name.');
        return;
      }
      if (!formData.company.trim()) {
        setValidationError('Please enter your company or fleet name.');
        return;
      }
      if (!formData.role.trim()) {
        setValidationError('Please enter your role / designation.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setValidationError('Please enter a valid work email address.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.application) {
        setValidationError('Please select your primary industry application.');
        return;
      }
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

  const progressPercent = (currentStep / 3) * 100;

  return (
    <section
      id={id}
      className="relative w-full min-h-screen xl:h-screen xl:max-h-screen flex flex-col justify-center bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#EBF1F7] border-b border-[#E2E8F0] py-8 sm:py-10 lg:py-6 overflow-hidden select-none"
    >
      {/* Subtle ambient halo */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[350px] pointer-events-none blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.1) 0%, rgba(15,43,70,0.05) 50%, transparent 75%)',
        }}
      />

      <Container className="relative z-10 w-full my-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-14">
          {/* ─── Left Column: Business Diagnostic Narrative (Calibrated) ───── */}
          <div className="w-full lg:w-[46%] flex flex-col justify-center">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2B46]/5 border border-[#0F2B46]/10 text-[#0F2B46] text-[11px] font-semibold tracking-wider uppercase mb-2.5 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{offerData.eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[28px] xl:text-[32px] text-[#0F2B46] font-medium leading-[1.18] tracking-tight mb-2 sm:mb-2.5">
              {offerData.headline}
            </h2>

            <p className="text-[#556980] text-xs sm:text-[13px] xl:text-[13.5px] leading-relaxed mb-3 sm:mb-4 max-w-[480px]">
              {offerData.description}
            </p>

            <h3 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#0F2B46] mb-2 flex items-center gap-1.5">
              <span className="w-3 h-[1.5px] bg-sky-500 inline-block" />
              What you'll receive:
            </h3>

            {/* 2-Column Deliverable Micro-Cards (Saves vertical space) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5 max-w-[500px]">
              {offerData.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-white/80 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:bg-white hover:border-slate-300"
                >
                  <span className="w-4 h-4 rounded-full bg-sky-50 text-sky-600 border border-sky-200/80 flex items-center justify-center shrink-0 text-[10px] font-bold">
                    ✓
                  </span>
                  <span className="text-[11.5px] text-[#334155] font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Verification Credibility Badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F2B46]/5 border border-[#0F2B46]/10 text-xs text-[#0F2B46] max-w-[500px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-mono text-[10.5px] text-slate-600 truncate">
                Volvo Commercial Vehicle Solutions · Direct Engineering Consultation
              </span>
            </div>
          </div>

          {/* ─── Right Column: Multi-Step Diagnostic Form Card ──────────── */}
          <div className="w-full lg:w-[54%]">
            <div className="relative bg-white border border-[#DDE4ED] rounded-2xl shadow-[0_20px_50px_-15px_rgba(15,43,70,0.07),0_2px_4px_rgba(0,0,0,0.02)] p-5 sm:p-6 lg:p-7 overflow-hidden">
              {/* Top brand accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-[#1C4E80] to-[#0F2B46]" />

              {submitted ? (
                /* ── SUCCESS / SUBMITTED SCREEN ────────────────────────── */
                <div className="py-6 sm:py-8 flex flex-col items-center text-center">
                  <div className="relative mb-3.5">
                    <div className="absolute -inset-2 rounded-full bg-emerald-400/20 blur-md animate-pulse" />
                    <div className="relative w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>

                  <div className="inline-block px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-semibold tracking-wider uppercase mb-2">
                    REF: VT-ROADTRAIN-{Math.floor(1000 + Math.random() * 9000)}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-[#0F2B46] mb-1.5">
                    Assessment Request Received
                  </h3>

                  <p className="text-[#556980] text-xs sm:text-[13px] leading-relaxed max-w-md mb-4">
                    Thank you, <strong className="text-[#0F2B46]">{formData.fullName || 'Fleet Partner'}</strong>. A Volvo transport-solutions engineer will review your corridor parameters and dispatch your tailored assessment to <strong className="text-[#0F2B46]">{formData.email}</strong> within 1 business day.
                  </p>

                  <div className="w-full max-w-sm p-3 rounded-xl bg-slate-50 border border-slate-200/80 mb-4 text-left text-[11.5px] text-slate-600 flex flex-col gap-1">
                    <div className="font-semibold text-[#0F2B46] text-[10.5px] uppercase tracking-wider font-mono">Next Steps:</div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Route topography & payload audit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Fleet consolidation & fuel modeling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Consultation call with Volvo expert</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="text-xs py-2 px-5 rounded-lg hover:-translate-y-0.5 transition-transform"
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
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
                /* ── INTERACTIVE 3-STEP FORM ───────────────────────────── */
                <form className="flex flex-col" onSubmit={handleSubmit}>
                  {/* ── Compact Stepper Navigation with Track ───────────── */}
                  <div className="relative mb-5 sm:mb-6">
                    {/* Connecting progress track line (desktop/tablet) */}
                    <div className="absolute top-3.5 left-5 right-5 h-[2px] bg-slate-100 -translate-y-1/2 z-0 hidden sm:block">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 via-blue-600 to-[#0F2B46] transition-all duration-500 ease-out"
                        style={{
                          width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
                        }}
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
                            onClick={() => {
                              if (isPast) {
                                setValidationError('');
                                setCurrentStep(s.num);
                              }
                            }}
                            disabled={!isPast}
                            className={`flex items-center gap-2 text-left transition-all duration-200 group ${
                              isPast ? 'cursor-pointer' : 'cursor-default'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shrink-0 ${
                                isCurrent
                                  ? 'bg-[#0F2B46] text-white ring-4 ring-sky-400/20 shadow-sm scale-105'
                                  : isPast
                                  ? 'bg-emerald-500 text-white ring-2 ring-emerald-500/20 shadow-sm group-hover:bg-emerald-600'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}
                            >
                              {isPast ? (
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                s.num
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span
                                className={`font-semibold text-xs leading-tight transition-colors duration-200 ${
                                  isCurrent
                                    ? 'text-[#0F2B46]'
                                    : isPast
                                    ? 'text-slate-700 group-hover:text-[#0F2B46]'
                                    : 'text-slate-400'
                                }`}
                              >
                                {s.label}
                              </span>
                              <span
                                className={`hidden sm:inline text-[10px] font-mono leading-tight ${
                                  isCurrent ? 'text-sky-600 font-semibold' : 'text-slate-400'
                                }`}
                              >
                                {s.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── STEP 1: About you ──────────────────────────────── */}
                  {currentStep === 1 && (
                    <div key="step-1" className="step-slide-animate flex flex-col gap-3 sm:gap-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          placeholder="Fleet / organization"
                          compact={true}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                          label="Role / designation"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          required={true}
                          placeholder="e.g. VP Logistics"
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

                      {validationError && (
                        <div className="text-xs text-rose-600 font-medium py-1.5 px-3 bg-rose-50 border border-rose-200/80 rounded-lg flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{validationError}</span>
                        </div>
                      )}

                      <div className="pt-1.5">
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full py-3 px-6 rounded-lg bg-[#0F2B46] hover:bg-[#163E63] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                        >
                          <span>Next: Your operation</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: Your operation ─────────────────────────── */}
                  {currentStep === 2 && (
                    <div key="step-2" className="step-slide-animate flex flex-col gap-3 sm:gap-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                          label="Phone number"
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                          label="Main corridor or route"
                          name="corridor"
                          value={formData.corridor}
                          onChange={handleChange}
                          placeholder="e.g. JNPT - NCR"
                          compact={true}
                        />
                        <FormField
                          label="Approx. monthly volume"
                          name="monthlyVolume"
                          value={formData.monthlyVolume}
                          onChange={handleChange}
                          placeholder="e.g. 5,000 Tonnes"
                          compact={true}
                        />
                      </div>

                      <FormField
                        label="Current fleet size"
                        name="fleetSize"
                        value={formData.fleetSize}
                        onChange={handleChange}
                        placeholder="e.g. 25 Heavy Trucks"
                        compact={true}
                      />

                      {validationError && (
                        <div className="text-xs text-rose-600 font-medium py-1.5 px-3 bg-rose-50 border border-rose-200/80 rounded-lg flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <span>{validationError}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2.5 pt-1.5">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-1/3 py-3 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0F2B46] font-semibold text-xs sm:text-sm transition-all duration-200 border border-slate-200 cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-2/3 py-3 px-6 rounded-lg bg-[#0F2B46] hover:bg-[#163E63] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
                        >
                          <span>Next: Review & Submit</span>
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 3: Review & Submit ────────────────────────── */}
                  {currentStep === 3 && (
                    <div key="step-3" className="step-slide-animate flex flex-col gap-3">
                      {/* Compact Executive Verification Dossier */}
                      <div className="rounded-xl bg-slate-50/90 border border-slate-200 p-3 sm:p-3.5 flex flex-col gap-2.5 text-xs">
                        {/* Section 1: Contact Information */}
                        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-slate-200/70 shadow-sm">
                          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F2B46] font-semibold">
                                01 // Contact Profile
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="text-[11px] text-sky-600 hover:text-[#0F2B46] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>Edit</span>
                              <span>✎</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-slate-600">
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Name</span>
                              <span className="font-semibold text-[#0F2B46] text-xs truncate block">{formData.fullName || '—'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Company</span>
                              <span className="font-semibold text-[#0F2B46] text-xs truncate block">{formData.company || '—'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Role</span>
                              <span className="font-medium text-slate-800 text-[11px] truncate block">{formData.role || '—'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Work Email</span>
                              <span className="font-medium text-slate-800 text-[11px] truncate block">{formData.email || '—'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Operation Parameters */}
                        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-slate-200/70 shadow-sm">
                          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-100">
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F2B46] font-semibold">
                                02 // Route & Fleet
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="text-[11px] text-sky-600 hover:text-[#0F2B46] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>Edit</span>
                              <span>✎</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-slate-600">
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Phone</span>
                              <span className="font-medium text-slate-800 text-[11px]">{formData.phone || '—'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Application</span>
                              <span className="font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 inline-block text-[10.5px]">
                                {formData.application || '—'}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Corridor</span>
                              <span className="font-medium text-slate-800 text-[11px] truncate block">{formData.corridor || 'Not specified'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[9.5px] font-mono uppercase">Volume</span>
                              <span className="font-medium text-slate-800 text-[11px] truncate block">{formData.monthlyVolume || 'Not specified'}</span>
                            </div>
                            <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-slate-400 text-[9.5px] font-mono uppercase">Fleet Size:</span>
                              <span className="font-semibold text-[#0F2B46] text-xs">{formData.fleetSize || 'Not specified'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="w-1/3 py-3 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0F2B46] font-semibold text-xs sm:text-sm transition-all duration-200 border border-slate-200 cursor-pointer disabled:opacity-50"
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 py-3 px-5 rounded-lg bg-gradient-to-r from-[#0F2B46] via-[#143B60] to-[#0F2B46] hover:from-[#143B60] hover:to-[#1B4B7A] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 text-center font-mono">
                        <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </Container>
    </section>
  );
}

