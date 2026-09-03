import React from 'react';

export default function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
  disabled = false,
  error = false,
  ...props
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`
        w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all outline-none resize-y
        ${error 
          ? 'border-rose-300 bg-rose-50/50 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
          : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 hover:border-slate-400'}
        ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}
        ${className}
      `}
      {...props}
    />
  );
}
