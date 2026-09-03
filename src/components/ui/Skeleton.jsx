import React from 'react';

export default function Skeleton({
  variant = 'text',
  width = 'w-full',
  height = 'h-4',
  className = ''
}) {
  const variantStyles = {
    text: "rounded-md",
    circular: "rounded-full",
    card: "rounded-2xl h-32",
    table: "rounded-xl h-10",
  };

  return (
    <div 
      className={`bg-slate-200/70 animate-pulse-subtle ${variantStyles[variant] || variantStyles.text} ${width} ${height} ${className}`}
    />
  );
}
