import React from 'react';

export default function Badge({ 
  children, 
  variant = 'slate', 
  hasDot = false,
  className = '',
  ...props 
}) {
  const variantStyles = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dot-emerald",
    amber: "bg-amber-50 text-amber-700 border-amber-200/80 dot-amber",
    warning: "bg-amber-50 text-amber-700 border-amber-200/80 dot-amber",
    rose: "bg-rose-50 text-rose-700 border-rose-200/80 dot-rose",
    danger: "bg-rose-50 text-rose-700 border-rose-200/80 dot-rose",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/80 dot-indigo",
    ai: "bg-indigo-50 text-indigo-700 border-indigo-200/80 dot-indigo",
    blue: "bg-blue-50 text-blue-700 border-blue-200/80 dot-blue",
    slate: "bg-slate-100 text-slate-700 border-slate-200/80 dot-slate",
  };

  const dotColors = {
    emerald: "bg-emerald-500",
    success: "bg-emerald-500",
    amber: "bg-amber-500",
    warning: "bg-amber-500",
    rose: "bg-rose-500",
    danger: "bg-rose-500",
    indigo: "bg-indigo-500",
    ai: "bg-indigo-500",
    blue: "bg-blue-500",
    slate: "bg-slate-400",
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantStyles[variant] || variantStyles.slate} ${className}`}
      {...props}
    >
      {hasDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant] || dotColors.slate}`} />
      )}
      <span>{children}</span>
    </span>
  );
}
