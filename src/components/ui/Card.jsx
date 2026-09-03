import React from 'react';

export default function Card({ 
  children, 
  title, 
  subtitle, 
  icon: Icon, 
  variant = 'default',
  footer,
  action,
  className = '',
  ...props 
}) {
  const variantStyles = {
    default: "bg-white border border-slate-200/80 shadow-subtle text-slate-900",
    metric: "bg-white border border-slate-200/80 shadow-subtle hover:border-slate-300 transition-all",
    ai: "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 text-white shadow-lg shadow-indigo-950/20",
    warning: "bg-amber-50/50 border border-amber-200/80 text-slate-900",
    success: "bg-emerald-50/50 border border-emerald-200/80 text-slate-900",
    danger: "bg-rose-50/50 border border-rose-200/80 text-slate-900",
  };

  return (
    <div 
      className={`rounded-2xl p-6 relative flex flex-col justify-between ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    >
      {/* Optional Card Header */}
      {(title || Icon || action) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            {title && (
              <h3 className={`text-base font-extrabold tracking-tight ${variant === 'ai' ? 'text-white' : 'text-slate-900'}`}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={`text-xs mt-0.5 font-medium ${variant === 'ai' ? 'text-indigo-200/80' : 'text-slate-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {Icon && (
              <div className={`p-2 rounded-xl ${variant === 'ai' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-100 text-slate-600'}`}>
                <Icon className="w-4 h-4" />
              </div>
            )}
            {action}
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div className="flex-1">
        {children}
      </div>

      {/* Optional Card Footer */}
      {footer && (
        <div className={`mt-4 pt-3 border-t text-xs ${variant === 'ai' ? 'border-white/10 text-indigo-200' : 'border-slate-100 text-slate-500'}`}>
          {footer}
        </div>
      )}
    </div>
  );
}
