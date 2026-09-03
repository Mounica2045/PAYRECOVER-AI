import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { User, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export default function PaymentContext({ payment }) {
  if (!payment) return null;

  const stats = payment.customerStats || { successRate: '88.9%', previousPayments: 18, successfulPayments: 16 };

  return (
    <Card className="p-5 space-y-3 bg-slate-50/70 border border-slate-200/80">
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
        <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Payment Context</h4>
        <Badge variant="rose">Failed ({payment.failureReason})</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs font-medium">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer</span>
          <span className="font-extrabold text-slate-900">{payment.customer}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Transaction</span>
          <span className="font-mono font-bold text-indigo-600">{payment.id}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Amount</span>
          <span className="font-black text-slate-900 font-mono">{payment.formattedAmount}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Failure Reason</span>
          <span className="font-bold text-slate-800">{payment.failureReason}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Success Rate</span>
          <span className="font-bold text-emerald-600 font-mono">{stats.successRate}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Failed Attempts</span>
          <span className="font-bold text-slate-800 font-mono">{payment.attempts || 1}</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Time Since Failure</span>
          <span className="font-bold text-slate-700">{payment.date || '3 minutes'}</span>
        </div>
      </div>
    </Card>
  );
}
