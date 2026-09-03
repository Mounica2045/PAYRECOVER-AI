import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function ErrorState({
  title = "Unable to load recovery insights",
  description = "We couldn't load your recovery telemetry data right now. Please check your connection and try again.",
  onRetry
}) {
  return (
    <div className="p-8 text-center max-w-sm mx-auto space-y-3">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center mx-auto shadow-subtle">
        <AlertCircle className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-extrabold text-slate-900 text-sm">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <div className="pt-2">
          <Button variant="danger" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
