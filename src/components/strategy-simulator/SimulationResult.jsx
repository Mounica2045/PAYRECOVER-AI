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

  const { payment, strategy, simulatedOutcome } = result;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✓ Strategy Simulation Complete"
      subtitle="AI recovery strategy evaluated in sandbox environment."
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
            <span className="text-slate-500">Selected Strategy</span>
            <span className="font-bold text-indigo-600">{strategy.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Payment</span>
            <span className="font-mono font-bold text-slate-900">{payment.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Amount</span>
            <span className="font-black text-slate-900">{payment.formattedAmount}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Estimated Recovery</span>
            <span className="font-black text-slate-900 font-mono">{strategy.formattedEstimatedRecovery}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Recovery Probability</span>
            <span className="font-extrabold text-indigo-600 font-mono">{strategy.probability}%</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Risk</span>
            <span className="font-bold text-emerald-600 font-mono">{strategy.riskLevel}</span>
          </div>
        </div>

        {/* Simulated Outcome Box (Requirement #26) */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 space-y-1.5 text-xs text-indigo-950 font-medium">
          <h5 className="font-extrabold text-xs text-indigo-900 uppercase tracking-wider">Simulated Outcome</h5>
          <p className="leading-relaxed text-indigo-900">{simulatedOutcome}</p>
        </div>

        {/* Mandatory Non-real Payment Notice */}
        <div className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-emerald-900 text-[11px] font-medium flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>No real payment was processed. Recovery strategy simulation completed successfully.</span>
        </div>
      </div>
    </Modal>
  );
}
