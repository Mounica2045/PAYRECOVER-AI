import React from 'react';
import Card from '../ui/Card';
import { Activity, Sparkles, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ActivityStream({ activities = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'ai':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'danger':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <Card className="p-5 shadow-xs border border-slate-200/80">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">AI Activity</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Live Agent Stream</span>
      </div>

      <div className="space-y-2.5">
        {activities.map((act) => (
          <div key={act.id} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-start justify-between gap-3 text-xs hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs mt-0.5 shrink-0">
                {getIcon(act.type)}
              </div>
              <p className="font-bold text-slate-800 leading-snug">{act.title}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0 mt-0.5">{act.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
