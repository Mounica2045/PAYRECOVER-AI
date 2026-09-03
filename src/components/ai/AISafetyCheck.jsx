import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function AISafetyCheck({
  checks = [
    { label: "Bounded Actions", status: "Active", passed: true },
    { label: "Retry Limits", status: "Passed (1/3 attempts)", passed: true },
    { label: "Duplicate Detection", status: "Passed", passed: true },
    { label: "Merchant Approval", status: "Required", passed: true },
  ],
  className = ''
}) {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-b from-indigo-50/70 to-slate-50 border border-indigo-100/80 space-y-3 ${className}`}>
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-600" />
        <span className="text-xs font-bold text-slate-900">AI Safety Controls</span>
      </div>

      <div className="space-y-1.5 text-xs">
        {checks.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-1 border-b border-indigo-100/40 last:border-0">
            <span className="text-slate-600">{item.label}</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
