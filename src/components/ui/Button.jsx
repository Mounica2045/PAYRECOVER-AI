import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false, 
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) {
  // Base classes for consistent sizing, typography, radii, focus, transition
  const baseClasses = "inline-flex items-center justify-center font-bold transition-all duration-150 rounded-xl focus-visible:outline-2 focus-visible:outline-indigo-600 select-none active:scale-[0.98]";

  // Size variants
  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5 h-8",
    md: "px-4 py-2.5 text-xs gap-2 h-10",
    lg: "px-5 py-3 text-sm gap-2.5 h-12",
  };

  // Type variants
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-xs shadow-indigo-600/20 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none",
    secondary: "bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200/80 disabled:bg-slate-50 disabled:text-slate-300",
    outline: "bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 shadow-subtle disabled:bg-slate-50 disabled:text-slate-300",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 disabled:text-slate-300",
    danger: "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-xs shadow-rose-600/20 disabled:bg-slate-200 disabled:text-slate-400",
    ai: "bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 hover:from-indigo-950 hover:to-slate-900 text-white border border-indigo-500/30 shadow-md shadow-indigo-900/20 disabled:opacity-50",
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseClasses} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
      ) : variant === 'ai' ? (
        <Sparkles className="w-4 h-4 text-indigo-300 animate-pulse-subtle shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      
      <span>{children}</span>
    </button>
  );
}
