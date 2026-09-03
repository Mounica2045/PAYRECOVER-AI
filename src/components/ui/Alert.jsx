import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function Alert({
  type = 'info',
  title,
  children,
  onDismiss,
  className = ''
}) {
  const alertTypes = {
    success: {
      icon: CheckCircle2,
      container: "bg-emerald-50 border-emerald-200 text-emerald-900",
      iconColor: "text-emerald-600",
      titleColor: "text-emerald-900"
    },
    warning: {
      icon: AlertTriangle,
      container: "bg-amber-50 border-amber-200 text-amber-900",
      iconColor: "text-amber-600",
      titleColor: "text-amber-900"
    },
    error: {
      icon: AlertCircle,
      container: "bg-rose-50 border-rose-200 text-rose-900",
      iconColor: "text-rose-600",
      titleColor: "text-rose-900"
    },
    info: {
      icon: Info,
      container: "bg-indigo-50 border-indigo-200 text-indigo-900",
      iconColor: "text-indigo-600",
      titleColor: "text-indigo-900"
    }
  };

  const current = alertTypes[type] || alertTypes.info;
  const Icon = current.icon;

  return (
    <div className={`p-4 rounded-2xl border flex items-start gap-3 relative text-xs ${current.container} ${className}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
      
      <div className="flex-1">
        {title && <h4 className={`font-bold ${current.titleColor} text-xs mb-0.5`}>{title}</h4>}
        <div className="text-xs font-medium leading-relaxed">{children}</div>
      </div>

      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
