import React from 'react';
import Tooltip from '../ui/Tooltip';

export default function AIConfidence({
  score = 91,
  showLabel = true,
  className = ''
}) {
  const isHigh = score >= 85;
  const isMedium = score >= 60 && score < 85;

  const barColor = isHigh ? 'bg-emerald-500' : isMedium ? 'bg-brand-500' : 'bg-amber-500';
  const textColor = isHigh ? 'text-emerald-600' : isMedium ? 'text-brand-600' : 'text-amber-600';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <span className="text-slate-500 font-medium">Model Confidence</span>
            <Tooltip text="AI-estimated likelihood based on historical payment patterns and gateway telemetry." />
          </div>
          <span className={`font-extrabold ${textColor}`}>{score}%</span>
        </div>
      )}

      <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
