import React from 'react';

export default function Section({
  children,
  background = 'white',
  bordered = true,
  className = '',
  id,
}) {
  const bgStyles = {
    white: 'bg-white text-[#0F2B46]',
    navy: 'bg-[#0F2B46] text-white',
    grey: 'bg-[#F2F4F6] text-[#0F2B46]',
  };

  const borderStyle = bordered ? (background === 'navy' ? 'border-b border-[#1C4E80]' : 'border-light') : '';

  return (
    <section
      id={id}
      className={`section-padding ${bgStyles[background] || bgStyles.white} ${borderStyle} ${className}`}
    >
      {children}
    </section>
  );
}
