import React from 'react';
import { Search } from 'lucide-react';

export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  isSearch = false,
  disabled = false,
  className = '',
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative">
        {(isSearch || Icon) && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {isSearch ? <Search className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
          </div>
        )}

        <input
          id={inputId}
          type={type}
          disabled={disabled}
          className={`
            w-full bg-slate-50 border rounded-xl py-2 text-xs font-medium text-slate-900 placeholder-slate-400
            transition-all duration-150 focus:outline-none focus:bg-white
            ${(isSearch || Icon) ? 'pl-10 pr-4' : 'px-3.5'}
            ${error 
              ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500' 
              : 'border-slate-200/80 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600'}
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : ''}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-[11px] font-semibold text-rose-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      )}
    </div>
  );
}
