import React, { useState } from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
  className = '',
  error = '',
  compact = false,
}) {
  const [isFocused, setIsFocused] = useState(false);

  const paddingClass = compact
    ? 'px-3.5 py-2.5 text-xs sm:text-[13.5px]'
    : 'px-4 py-3 text-sm sm:text-base';
  const labelClass = compact
    ? 'text-xs font-semibold text-[#0F2B46] mb-1.5 flex items-center justify-between'
    : 'text-sm font-semibold text-[#0F2B46] mb-2 flex items-center justify-between';

  const baseInputStyles = `w-full ${paddingClass} border outline-none bg-slate-50/60 hover:bg-white focus:bg-white text-[#0F2B46] rounded-lg transition-all duration-200 placeholder:text-slate-400 font-normal`;
  const stateStyles = error
    ? 'border-rose-400 ring-2 ring-rose-100 bg-rose-50/30'
    : isFocused
    ? 'border-[#0F2B46] ring-2 ring-[#0F2B46]/10 shadow-sm'
    : 'border-slate-200/90 hover:border-slate-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]';

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className={`${labelClass} select-none`}>
          <span>
            {label} {required && <span className="text-sky-600 font-bold">*</span>}
          </span>
        </label>
      )}

      {type === 'select' ? (
        <div className="relative">
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${baseInputStyles} ${stateStyles} appearance-none cursor-pointer pr-10`}
          >
            {options.map((opt, i) => (
              <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
                {typeof opt === 'string' ? opt : opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${baseInputStyles} ${stateStyles}`}
        />
      )}

      {error && <p className="text-[11px] text-rose-600 font-medium mt-1">{error}</p>}
    </div>
  );
}
