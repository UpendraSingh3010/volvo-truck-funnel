import React from 'react';

export default function Container({ children, className = '' }) {
  return (
    <div className={`volvo-container ${className}`}>
      {children}
    </div>
  );
}
