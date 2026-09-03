import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { AlertCircle } from 'lucide-react';

export default function RejectModal({
  isOpen,
  onClose,
  onConfirmReject,
  payment
}) {
  const [reason, setReason] = useState('Incorrect recommendation');

  if (!isOpen || !payment) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reject Recovery Recommendation"
      subtitle={`Why are you rejecting the recommendation for ${payment.id}?`}
      primaryAction={{
        label: "Reject",
        variant: "danger",
        onClick: () => onConfirmReject(payment, reason)
      }}
      secondaryAction={{
        label: "Cancel",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs">
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>The recovery action will not be simulated for this transaction.</span>
        </div>

        <p className="text-slate-600 font-bold uppercase tracking-wider text-[10px]">Select reason for rejection:</p>
        
        <div className="space-y-2">
          {[
            "Incorrect recommendation",
            "Customer issue",
            "Try another strategy",
            "Other"
          ].map((r) => (
            <label 
              key={r} 
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${reason === r ? 'bg-indigo-50/70 border-indigo-500 font-bold text-slate-900 ring-1 ring-indigo-500/20' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            >
              <input 
                type="radio" 
                name="rejectReason" 
                value={r}
                checked={reason === r}
                onChange={() => setReason(r)}
                className="text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </div>
    </Modal>
  );
}
