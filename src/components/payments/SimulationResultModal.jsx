import React from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function SimulationResultModal({
  isOpen,
  onClose,
  resultData
}) {
  if (!isOpen || !resultData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✓ Recovery Simulation Complete"
      subtitle="AI recovery opportunity accepted in sandbox mode."
      primaryAction={{
        label: "Done",
        variant: "primary",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-subtle">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Transaction:</span>
            <span className="font-mono font-bold text-slate-900">{resultData.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Simulated Action:</span>
            <span className="font-bold text-indigo-600">{resultData.action}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500 font-medium">Result State:</span>
            <Badge variant="emerald">Recovery Accepted (Simulated)</Badge>
          </div>
          <div className="py-2">
            <p className="text-[11px] font-bold text-slate-700">Estimated Outcome:</p>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Payment would be retried after the recommended cooldown period. <strong className="text-slate-900">No real payment was processed.</strong>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
