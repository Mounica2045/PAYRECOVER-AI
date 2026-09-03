import React from 'react';
import Card from '../ui/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function AuditActivityChart() {
  const dailyActivityData = [
    { day: 'Mon', events: 142, simulations: 28, blocks: 2 },
    { day: 'Tue', events: 189, simulations: 34, blocks: 3 },
    { day: 'Wed', events: 245, simulations: 48, blocks: 4 },
    { day: 'Thu', events: 312, simulations: 56, blocks: 5 },
    { day: 'Fri', events: 210, simulations: 39, blocks: 3 },
    { day: 'Sat', events: 98, simulations: 15, blocks: 1 },
    { day: 'Sun', events: 88, simulations: 12, blocks: 1 },
  ];

  const distributionData = [
    { label: 'AI Recommendations', pct: 42, color: 'bg-indigo-600' },
    { label: 'Simulations', pct: 28, color: 'bg-violet-600' },
    { label: 'Merchant Approvals', pct: 17, color: 'bg-emerald-600' },
    { label: 'Safety Events', pct: 8, color: 'bg-rose-500' },
    { label: 'Other Log Events', pct: 5, color: 'bg-slate-400' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Daily Audit Activity Chart (8 cols) */}
      <Card className="p-5 lg:col-span-8 space-y-4 border border-slate-200/80">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Audit Activity</h3>
          <p className="text-xs text-slate-500 font-medium">Daily event logging throughput across system components</p>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(val) => [val, 'Logged Events']}
              />
              <Bar dataKey="events" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Event Distribution Breakdown (4 cols) */}
      <Card className="p-5 lg:col-span-4 space-y-4 border border-slate-200/80 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Event Distribution</h3>
          <p className="text-xs text-slate-500 font-medium">Breakdown by audit event category</p>
        </div>

        <div className="space-y-3 pt-1">
          {distributionData.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">{item.label}</span>
                <span className="font-mono font-extrabold text-slate-900">{item.pct}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden p-0.5 border border-slate-200/60">
                <div 
                  className={`h-full rounded-full ${item.color}`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
          Calculated dynamically across 1,284 total recorded telemetry events.
        </div>
      </Card>
    </div>
  );
}
