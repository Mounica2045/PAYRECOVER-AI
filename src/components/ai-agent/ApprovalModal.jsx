import React from 'react';
import Modal from '../ui/Modal';
import Alert from '../ui/Alert';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function ApprovalModal({
  isOpen,
  onClose,
  onConfirm,
  payment,
  strategy = 'Delayed Retry',
  probability = 91,
  confidence = 91
}) {
  if (!isOpen || !payment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Approve Recovery Action"
      subtitle="Review the AI recommendation before executing the simulated recovery action."
      primaryAction={{
        label: "Approve & Simulate",
        variant: "ai",
        onClick: () => onConfirm(payment)
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 font-medium">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Transaction:</span>
            <span className="font-mono font-bold text-slate-900">{payment.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Customer:</span>
            <span className="font-bold text-slate-900">{payment.customer}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Amount:</span>
            <span className="font-black text-slate-900">{payment.formattedAmount}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">AI Recommendation:</span>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{strategy}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Recovery Probability:</span>
            <span className="font-bold text-indigo-600 font-mono">{probability}%</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Model Confidence:</span>
            <span className="font-bold text-slate-900 font-mono">{confidence}%</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Safety Checks:</span>
            <span className="font-bold text-emerald-600 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ✓ Passed (6/6)
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 text-violet-900 text-[11px] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-600 shrink-0" />
          <span>This is a simulation. No real payment will be processed.</span>
        </div>
      </div>
    </Modal>
  );
}
