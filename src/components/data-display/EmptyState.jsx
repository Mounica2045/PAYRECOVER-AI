import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

export default function EmptyState({
  title = "No failed payments found",
  description = "Your payment recovery pipeline is currently healthy and all transactions are settled.",
  actionLabel = "Refresh Data",
  onAction,
  icon: Icon = CheckCircle2
}) {
  return (
    <div className="p-8 text-center max-w-sm mx-auto space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center mx-auto shadow-subtle">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-extrabold text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
      {onAction && (
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
