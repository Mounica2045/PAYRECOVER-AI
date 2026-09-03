import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryAction,
  secondaryAction,
  maxWidth = 'max-w-md',
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`relative bg-white rounded-3xl w-full ${maxWidth} p-6 shadow-2xl border border-slate-200 z-10 animate-in fade-in zoom-in-95 duration-150`}>
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {title && (
          <div className="mb-4">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
          </div>
        )}

        <div className="my-3">
          {children}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            {secondaryAction && (
              <Button variant="secondary" onClick={secondaryAction.onClick}>
                {secondaryAction.label || 'Cancel'}
              </Button>
            )}
            {primaryAction && (
              <Button variant={primaryAction.variant || 'primary'} onClick={primaryAction.onClick}>
                {primaryAction.label || 'Confirm'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
