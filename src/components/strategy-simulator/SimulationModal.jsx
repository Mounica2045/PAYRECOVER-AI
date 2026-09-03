import React from 'react';
import Modal from '../ui/Modal';
import Alert from '../ui/Alert';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function SimulationModal({
  isOpen,
  onClose,
  onConfirm,
  payment,
  strategy
}) {
  if (!isOpen || !payment || !strategy) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulate Recovery Strategy"
      subtitle="Review strategy evaluation parameters before running sandbox simulation."
      primaryAction={{
        label: "Run Simulation",
        variant: "ai",
        onClick: () => onConfirm(payment, strategy)
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 font-medium">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Transaction</span>
            <span className="font-mono font-bold text-slate-900">{payment.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Amount</span>
            <span className="font-black text-slate-900">{payment.formattedAmount}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Strategy</span>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{strategy.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Recovery Probability</span>
            <span className="font-bold text-indigo-600 font-mono">{strategy.probability}%</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Expected Recovery</span>
            <span className="font-black text-slate-900 font-mono">{strategy.formattedEstimatedRecovery}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Risk</span>
            <span className="font-bold text-emerald-600 font-mono">{strategy.riskLevel}</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 text-violet-900 text-[11px] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600 shrink-0" />
          <span>This is a simulation only. No real payment will be processed.</span>
        </div>
      </div>
    </Modal>
  );
}
