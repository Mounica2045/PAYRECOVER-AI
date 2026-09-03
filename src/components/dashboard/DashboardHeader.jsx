import React from 'react';
import { Calendar } from 'lucide-react';
import Select from '../ui/Select';

export default function DashboardHeader({ selectedPeriod, onPeriodChange }) {
  const periodOptions = [
    { label: 'Today', value: 'Today' },
    { label: 'Last 7 days', value: 'Last 7 days' },
    { label: 'Last 30 days', value: 'Last 30 days' },
    { label: 'Last 90 days', value: 'Last 90 days' },
    { label: 'This year', value: 'This year' },
    { label: 'Custom range', value: 'Custom range' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          Good morning, Merchant <span className="text-xl">👋</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Here's your payment recovery overview.</p>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-subtle text-xs font-semibold text-slate-700">
        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
        <Select 
          value={selectedPeriod}
          onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
          className="border-0 bg-transparent py-1 px-1 focus:ring-0 text-slate-800 font-bold"
        >
          {periodOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label} ▼</option>
          ))}
        </Select>
      </div>
    </div>
  );
}
