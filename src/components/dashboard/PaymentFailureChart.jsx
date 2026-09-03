import React from 'react';
import Card from '../ui/Card';
import { formatCurrency, formatNumber } from '../../data/dashboardData';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function PaymentFailureChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl text-xs space-y-1 border border-slate-800">
          <p className="font-extrabold text-white border-b border-slate-800 pb-1">{item.reason}</p>
          <div className="flex justify-between gap-4 text-slate-300 pt-0.5">
            <span>Number of Payments:</span>
            <span className="font-bold text-white">{formatNumber(item.paymentsCount)}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Revenue at Risk:</span>
            <span className="font-bold text-rose-400">{formatCurrency(item.atRiskAmount)}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalFailures = data.reduce((acc, curr) => acc + curr.paymentsCount, 0);

  return (
    <Card className="p-6 h-full flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Payment Failures</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Root cause breakdown across all failed transactions</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 my-2">
          {/* Donut Chart */}
          <div className="w-44 h-44 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-xl font-black text-slate-900 leading-none">{totalFailures}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Failures</span>
            </div>
          </div>

          {/* Clean Side Legend List */}
          <div className="flex-1 space-y-2.5 w-full">
            {data.map((item) => (
              <div key={item.reason} className="flex items-center justify-between text-xs group cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{item.reason}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900">{item.percentage}%</span>
                  <span className="text-[11px] text-slate-400 font-mono">({formatCurrency(item.atRiskAmount)})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
