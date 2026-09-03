import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import Tooltip from '../ui/Tooltip';

export default function StatCard({
  title,
  value,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  description,
  tooltipText,
  className = ''
}) {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';

  return (
    <Card variant="metric" className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</span>
          {tooltipText && <Tooltip text={tooltipText} />}
        </div>
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/60">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h2>
        
        {change && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <span className={`
              inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded text-xs
              ${isPositive ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' : ''}
              ${isNegative ? 'text-rose-700 bg-rose-50 border border-rose-200/60' : ''}
              ${!isPositive && !isNegative ? 'text-slate-600 bg-slate-100' : ''}
            `}>
              {isPositive && <TrendingUp className="w-3 h-3" />}
              {isNegative && <TrendingDown className="w-3 h-3" />}
              {change}
            </span>
            {description && (
              <span className="text-slate-400 text-[11px] font-medium">{description}</span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
