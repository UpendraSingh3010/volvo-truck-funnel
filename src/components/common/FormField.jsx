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

  const paddingClass = compact ? 'p-2.5 text-xs sm:text-sm' : 'p-3 sm:p-3.5 text-sm sm:text-base';
  const labelClass = compact ? 'text-xs font-semibold text-[#0F2B46] mb-1' : 'text-sm font-medium text-[#0F2B46] mb-1.5';

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className={`${labelClass} select-none`}>
          {label} {required && <span className="text-[#0F2B46]">*</span>}
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
            className={`w-full ${paddingClass} border outline-none bg-white text-[#0F2B46] appearance-none rounded-[2px] transition-colors cursor-pointer ${
              isFocused ? 'border-[#0F2B46] ring-1 ring-[#0F2B46]' : 'border-[#E5E7EB]'
            }`}
          >
            {options.map((opt, i) => (
              <option key={i} value={typeof opt === 'string' ? opt : opt.value}>
                {typeof opt === 'string' ? opt : opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6l4 4 4-4" />
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
          className={`w-full ${paddingClass} border outline-none bg-white text-[#0F2B46] rounded-[2px] transition-colors ${
            isFocused ? 'border-[#0F2B46] ring-1 ring-[#0F2B46]' : 'border-[#E5E7EB]'
          }`}
        />
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
