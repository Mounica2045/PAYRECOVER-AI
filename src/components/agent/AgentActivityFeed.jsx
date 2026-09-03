import React from 'react';
import Card from '../ui/Card';
import { Activity, Clock } from 'lucide-react';

export default function AgentActivityFeed({ activities = [] }) {
  return (
    <Card className="p-5 space-y-3 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Live Agent Activity Stream</h4>
        </div>
        <span className="font-mono text-[10px] text-slate-400">Real-time telemetry</span>
      </div>

      <div className="space-y-2.5 text-xs">
        {activities.map((act) => (
          <div key={act.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
            <span className="font-medium text-slate-800">{act.text}</span>
            <span className="font-mono text-[10px] text-slate-400 shrink-0">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
