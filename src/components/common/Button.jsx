import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  icon,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  to,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-[#0F2B46] text-white px-8 py-4 text-base rounded-[2px] hover:opacity-90 active:scale-[0.99] border border-transparent shadow-sm',
    secondary:
      'text-[#1C4E80] hover:text-[#0F2B46] p-0 text-base font-medium hover:opacity-80 transition-opacity bg-transparent',
    white:
      'bg-white text-[#0F2B46] px-8 py-4 text-base rounded-[2px] hover:bg-[#F2F4F6] active:scale-[0.99] shadow-sm font-medium',
    outline:
      'border border-[#0F2B46] text-[#0F2B46] px-8 py-4 text-base rounded-[2px] hover:bg-[#0F2B46] hover:text-white',
    linkWhite:
      'text-white font-medium hover:text-[#F2F4F6] transition-colors p-0 text-base bg-transparent',
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} onClick={onClick} {...props}>
        <span>{children}</span>
        {icon && <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">{icon}</span>}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className="ml-2 inline-block">{icon}</span>}
    </button>
  );
}
