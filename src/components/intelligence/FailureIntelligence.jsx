import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { Sparkles, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function FailureIntelligence({ failureData }) {
  const { categories, trend, patterns } = failureData;
  const [selectedReason, setSelectedReason] = useState(null);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-3">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Payment Failure Intelligence</h3>
        <p className="text-xs text-slate-500 font-medium">Root cause decomposition and detected telemetry failure patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Major Failure Categories Breakdown (6 cols - Requirement #13) */}
        <Card className="p-5 lg:col-span-6 space-y-4 border border-slate-200/80">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Failure Reason Distribution</h4>
            <span className="text-[11px] text-slate-400 font-medium">Click reason for detail</span>
          </div>

          <div className="space-y-3 pt-1">
            {categories.map((cat) => (
              <div 
                key={cat.name} 
                onClick={() => setSelectedReason(cat)}
                className="space-y-1 cursor-pointer group p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-extrabold text-slate-900">{cat.percentage}%</span>
                    <span className="font-mono text-slate-400 text-[11px]">({cat.formattedValue})</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-200/60">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* 2. Failure Rate Trend by Day of Week (6 cols - Requirement #14) */}
        <Card className="p-5 lg:col-span-6 space-y-4 border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Failure Rate Trend</h4>
              <span className="font-mono text-xs font-bold text-rose-600">Friday Peak: 9.1%</span>
            </div>

            <div className="h-44 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, 'Failure Rate']}
                  />
                  <Bar dataKey="rate" fill="#6366F1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insight Callout (Requirement #14) */}
          <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-950 text-xs font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>✦ Friday shows the highest failure rate (9.1%) in the current demo dataset due to weekend clearing house latency.</span>
          </div>
        </Card>
      </div>

      {/* 3. Detected Failure Patterns (Requirement #16) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Detected Telemetry Failure Patterns</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {patterns.map((pat) => (
            <Card key={pat.id} className="p-4 space-y-3 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between">
                <h5 className="font-extrabold text-xs text-slate-900">{pat.title}</h5>
                <Badge variant="indigo" className="font-mono">{pat.confidence}% Conf</Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">{pat.description}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
                <span className="text-slate-500">Suggested Action:</span>
                <span className="font-bold text-indigo-600">{pat.action}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Failure Reason Detail Modal (Requirement #15) */}
      {selectedReason && (
        <Modal
          isOpen={Boolean(selectedReason)}
          onClose={() => setSelectedReason(null)}
          title={`Failure Intelligence: ${selectedReason.name}`}
          subtitle="Detailed root cause performance metrics"
          primaryAction={{
            label: "Close Details",
            variant: "primary",
            onClick: () => setSelectedReason(null)
          }}
        >
          <div className="space-y-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Share of Total Failures</span>
                <span className="font-mono font-bold text-indigo-600">{selectedReason.percentage}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Failed Volume</span>
                <span className="font-mono font-black text-slate-900">{selectedReason.formattedValue}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Average Recovery Probability</span>
                <span className="font-mono font-extrabold text-emerald-600">82%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Recommended Strategy</span>
                <span className="font-bold text-indigo-600">Delayed Retry</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              Temporary bank failures are caused by gateway timeouts or bank server maintenance. AI recommends a 15-minute delayed retry for optimal recovery yield.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
