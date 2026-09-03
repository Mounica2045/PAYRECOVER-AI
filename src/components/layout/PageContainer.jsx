import React from 'react';

export default function PageContainer({
  title,
  subtitle,
  actions,
  children,
  className = ''
}) {
  return (
    <div className={`space-y-8 animate-in fade-in duration-200 ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && (
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
}
