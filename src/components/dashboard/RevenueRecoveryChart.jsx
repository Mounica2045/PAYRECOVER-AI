import React, { useState } from 'react';
import Card from '../ui/Card';
import Select from '../ui/Select';
import { formatCurrency } from '../../data/dashboardData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

export default function RevenueRecoveryChart({ data }) {
  const [interval, setInterval] = useState('Daily');

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1.5 border border-slate-800">
          <p className="font-bold text-slate-300 border-b border-slate-800 pb-1">{label}</p>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke }} />
                {entry.name}:
              </span>
              <span className="font-extrabold text-white font-mono">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Revenue Recovery Timeline</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">30-day comparative volume of recovered revenue vs. estimated revenue at risk</p>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-indigo-600 inline-block shadow-xs" />
              <span className="text-slate-700">Recovered Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-md bg-rose-400/50 border border-rose-400 inline-block" />
              <span className="text-slate-500">Revenue at Risk</span>
            </div>
          </div>

          <Select 
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-28 text-xs py-1"
          >
            <option value="Daily">Daily ▼</option>
            <option value="Weekly">Weekly ▼</option>
          </Select>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="atRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FB7185" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} stroke="#E2E8F0" />
            <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} stroke="#E2E8F0" tickFormatter={(v) => `₹${v/1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="recovered" 
              name="Recovered Revenue" 
              stroke="#4F46E5" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#recoveredGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="atRisk" 
              name="Revenue at Risk" 
              stroke="#FB7185" 
              strokeWidth={2} 
              strokeDasharray="4 4" 
              fillOpacity={1} 
              fill="url(#atRiskGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
