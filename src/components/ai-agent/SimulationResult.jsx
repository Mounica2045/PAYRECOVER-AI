import React from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function SimulationResult({
  isOpen,
  onClose,
  result
}) {
  if (!isOpen || !result) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✓ Recovery Simulation Complete"
      subtitle="AI recovery strategy executed in sandbox environment."
      primaryAction={{
        label: "Done",
        variant: "primary",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-subtle">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 font-medium">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Transaction</span>
            <span className="font-mono font-bold text-slate-900">{result.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Strategy</span>
            <span className="font-bold text-indigo-600">{result.strategy}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Simulation Result</span>
            <Badge variant="emerald">Eligible for retry</Badge>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Estimated Recovery</span>
            <span className="font-black text-slate-900 font-mono">{result.formattedAmount || `₹${result.amount}`}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 text-[11px] font-medium flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Recovery simulation completed successfully. No real payment was processed.</span>
        </div>
      </div>
    </Modal>
  );
}
