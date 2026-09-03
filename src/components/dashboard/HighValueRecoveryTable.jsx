import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { ArrowRight } from 'lucide-react';
import { highValueOpportunitiesData, formatCurrency } from '../../data/dashboardData';

export default function HighValueRecoveryTable({ onNavigateToPayments, onSelectRow }) {
  const getAvatarBg = (index) => {
    const bgs = [
      'bg-indigo-600 text-white',
      'bg-blue-600 text-white',
      'bg-emerald-600 text-white',
      'bg-purple-600 text-white',
      'bg-amber-600 text-white',
    ];
    return bgs[index % bgs.length];
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">High-Value Recovery Opportunities</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Top high-value failed transactions prioritized by AI recovery probability</p>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onNavigateToPayments}
          className="flex items-center gap-1.5"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Transaction</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Failure Reason</th>
              <th className="py-3 px-4">AI Recovery Prob.</th>
              <th className="py-3 px-4">Recommended Action</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {highValueOpportunitiesData.map((item, idx) => (
              <tr 
                key={item.id} 
                onClick={() => (onSelectRow ? onSelectRow(item) : onNavigateToPayments())}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${getAvatarBg(idx)} shadow-xs`}>
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.customer}</p>
                      <p className="text-[11px] text-slate-400">{item.email}</p>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                <td className="py-3.5 px-4 font-black text-slate-900">{item.formattedAmount}</td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{item.failureReason}</td>

                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-14 bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.probability >= 85 ? 'bg-emerald-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${item.probability}%` }}
                      />
                    </div>
                    <span className="font-extrabold text-slate-900">{item.probability}%</span>
                  </div>
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[11px] border border-indigo-100/80">
                    {item.recommendedAction}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <Badge variant={item.status === 'Ready' ? 'emerald' : item.status === 'Action Needed' ? 'amber' : item.status === 'Pending' ? 'amber' : 'slate'} hasDot>
                    {item.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
