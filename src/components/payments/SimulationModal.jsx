import React from 'react';
import Modal from '../ui/Modal';
import Alert from '../ui/Alert';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function SimulationModal({
  isOpen,
  onClose,
  onConfirm,
  payment
}) {
  if (!payment || !isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Simulate Payment Recovery"
      subtitle="Preview AI recovery workflow without processing real money."
      primaryAction={{
        label: "Confirm Simulation",
        variant: "ai",
        onClick: () => onConfirm(payment)
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Transaction ID</span>
            <span className="font-mono font-bold text-slate-900">{payment.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Customer</span>
            <span className="font-bold text-slate-900">{payment.customer}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Amount</span>
            <span className="font-black text-slate-900">{payment.formattedAmount}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Recommended Action</span>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              {payment.recommendedAction || 'Delayed Retry'}
            </span>
          </div>
        </div>

        <Alert type="warning" title="Simulation Safety Notice">
          This action is simulated. No real money will be charged, debited, or processed through bank gateways.
        </Alert>
      </div>
    </Modal>
  );
}
