import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  label,
  options = [],
  error,
  disabled = false,
  className = '',
  id,
  children,
  ...props
}) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={`
            w-full appearance-none bg-slate-50 border rounded-xl pl-3.5 pr-9 py-2 text-xs font-semibold text-slate-800
            transition-all duration-150 focus:outline-none focus:bg-white cursor-pointer
            ${error 
              ? 'border-rose-400 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500' 
              : 'border-slate-200/80 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600'}
            ${disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200' : ''}
            ${className}
          `}
          {...props}
        >
          {children ? children : options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>

        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {error && (
        <p className="text-[11px] font-semibold text-rose-600">{error}</p>
      )}
    </div>
  );
}
