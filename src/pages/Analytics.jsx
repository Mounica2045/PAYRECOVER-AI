import React from 'react';
import { BarChart3, TrendingUp, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { analyticsData, chart30DaysData } from '../data/mockData';

export default function Analytics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Recovery Analytics</h1>
          <span className="badge-indigo">
            <BarChart3 className="w-3 h-3 text-brand-600" />
            Performance Insights
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-medium">Deep-dive breakdown into root causes, payment channel efficiency, and AI decision accuracy.</p>
      </div>

      {/* 4 Performance Metric Overview Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="fintech-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Recovery Channel</span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">UPI Instant Retries</h3>
          <p className="text-xs font-bold text-emerald-600 mt-1">52% Success Rate</p>
        </div>

        <div className="fintech-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Recovery Speed</span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">4.2 Hours</h3>
          <p className="text-xs font-bold text-emerald-600 mt-1">68% resolved &lt; 1hr</p>
        </div>

        <div className="fintech-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Top Failure Resolved</span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">Bank Downtime</h3>
          <p className="text-xs font-bold text-indigo-600 mt-1">₹18,450 Recovered</p>
        </div>

        <div className="fintech-card p-5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Accuracy</span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">94.1%</h3>
          <p className="text-xs font-bold text-emerald-600 mt-1">Zero false retries</p>
        </div>

      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Recovery by Failure Reason */}
        <div className="fintech-card p-6">
          <h3 className="text-base font-extrabold text-slate-900 mb-1">Recovery by Failure Reason</h3>
          <p className="text-xs text-slate-500 mb-4 font-medium">Recovered volume vs total failed amount per failure mode</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.recoveryByReason} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="reason" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Amount']}
                />
                <Bar dataKey="recovered" name="Recovered" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Recovery Rate Over Time */}
        <div className="fintech-card p-6">
          <h3 className="text-base font-extrabold text-slate-900 mb-1">Recovery Rate Trend</h3>
          <p className="text-xs text-slate-500 mb-4 font-medium">30-day moving average percentage recovery rate</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chart30DaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Recovered']}
                />
                <Line type="monotone" dataKey="recovered" stroke="#10B981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Revenue Recovered by Payment Method */}
        <div className="fintech-card p-6">
          <h3 className="text-base font-extrabold text-slate-900 mb-1">Revenue Recovered by Payment Method</h3>
          <p className="text-xs text-slate-500 mb-4 font-medium">Financial yield breakdown by instrument</p>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.recoveryByMethod} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="method" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#E2E8F0" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Recovered']}
                />
                <Bar dataKey="amount" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Widget 4: AI Recommendation Performance Table */}
        <div className="fintech-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">AI Strategy Performance</h3>
              <p className="text-xs text-slate-500 font-medium">Historical conversion success per AI action</p>
            </div>
            <Sparkles className="w-5 h-5 text-brand-600" />
          </div>

          <div className="space-y-4">
            {analyticsData.aiPerformance.map((item) => (
              <div key={item.action} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.action}</span>
                  <span className="font-extrabold text-emerald-600">{item.successRate}% Success</span>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-brand-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${item.successRate}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>{item.count} Actions Executed</span>
                  <span>Verified Accuracy</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
