import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function RecoveryForecast({ forecast }) {
  const { next7Days, chartData } = forecast;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Recovery Forecast Chart (8 cols - Requirement #7) */}
      <Card className="p-5 lg:col-span-8 space-y-4 border border-slate-200/80">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recovery Forecast</h3>
            <p className="text-xs text-slate-500 font-medium">Historical baseline vs predicted AI recovery trajectory</p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Historical</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Predicted</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-400" /> Potential</span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                formatter={(val) => [`₹${val}L`, 'Value']}
              />
              <Area type="monotone" dataKey="historical" stroke="#6366F1" fill="#6366F1" fillOpacity={0.1} strokeWidth={2.5} />
              <Area type="monotone" dataKey="predicted" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2.5} />
              <Area type="monotone" dataKey="potential" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.05} strokeWidth={2} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* 2. Forecast Summary & Revenue at Risk Breakdown (4 cols - Requirements #8, #9) */}
      <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
        {/* Next 7 Days Forecast Summary */}
        <Card className="p-5 space-y-3 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-md border border-indigo-800">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">Next 7 Days Forecast</span>
            <Badge variant="indigo" className="bg-white/10 text-indigo-200 border-white/20">Demo Prediction</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div>
              <span className="text-[10px] text-indigo-300 font-bold uppercase block">Predicted Failed</span>
              <span className="text-lg font-black text-white font-mono">{next7Days.predictedFailedValue}</span>
            </div>

            <div>
              <span className="text-[10px] text-indigo-300 font-bold uppercase block">Potential Recoverable</span>
              <span className="text-lg font-black text-emerald-400 font-mono">{next7Days.potentialRecoverableValue}</span>
            </div>

            <div>
              <span className="text-[10px] text-indigo-300 font-bold uppercase block">Est. Recovery Rate</span>
              <span className="text-sm font-black text-white font-mono">{next7Days.estimatedRecoveryRate}</span>
            </div>

            <div>
              <span className="text-[10px] text-indigo-300 font-bold uppercase block">Confidence</span>
              <span className="text-sm font-black text-indigo-300 font-mono">{next7Days.confidence}% (High)</span>
            </div>
          </div>
        </Card>

        {/* Revenue at Risk Card & Visual Progress (Requirement #9) */}
        <Card className="p-5 space-y-3 border border-slate-200/80">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue at Risk</h4>
            <span className="font-mono font-black text-slate-900 text-sm">₹18.4L Total</span>
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between">
              <span className="text-emerald-700 font-bold">Potentially Recoverable:</span>
              <span className="font-mono font-black text-emerald-700">₹12.7L (69%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Currently Unrecoverable:</span>
              <span className="font-mono font-bold text-slate-700">₹5.7L (31%)</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200/80 flex">
              <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: '69%' }} />
              <div className="bg-slate-400 h-full rounded-r-full" style={{ width: '31%' }} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
