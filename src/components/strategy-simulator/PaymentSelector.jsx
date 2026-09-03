import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Badge from '../ui/Badge';
import { Search, User, CreditCard, Layers } from 'lucide-react';

export default function PaymentSelector({
  payments = [],
  selectedPaymentId,
  onSelectPayment,
  mode = 'single',
  onModeChange
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPayments = payments.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.customer.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.failureReason.toLowerCase().includes(q) ||
      p.amount.toString().includes(q)
    );
  });

  return (
    <Card className="p-5 space-y-4 border border-slate-200/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Select Payment</h3>
          <p className="text-xs text-slate-500 font-medium">Choose a failed payment transaction to analyze strategy outcomes</p>
        </div>

        {/* Multi-payment Mode Toggle (Requirement #29) */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-xs">
          <button
            onClick={() => onModeChange && onModeChange('single')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${mode === 'single' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Single Payment
          </button>
          <button
            onClick={() => onModeChange && onModeChange('bulk')}
            className={`px-3 py-1 rounded-lg font-bold transition-all ${mode === 'bulk' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Bulk Analysis
          </button>
        </div>
      </div>

      {mode === 'single' && (
        <div className="space-y-3">
          {/* Search Input */}
          <Input 
            isSearch
            placeholder="Search transaction or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Payments Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
            {filteredPayments.map((p) => {
              const isSelected = p.id === selectedPaymentId;
              return (
                <div
                  key={p.id}
                  onClick={() => onSelectPayment(p)}
                  className={`
                    p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5
                    ${isSelected 
                      ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
                      : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{p.customer}</span>
                    <span className="font-mono text-[11px] font-bold text-indigo-600">{p.id}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="font-black text-slate-900">{p.formattedAmount}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{p.failureReason}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
