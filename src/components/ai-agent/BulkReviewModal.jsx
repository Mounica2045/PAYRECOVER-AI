import React from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function BulkReviewModal({
  isOpen,
  onClose,
  selectedOpportunities = []
}) {
  if (!isOpen) return null;

  const totalValue = selectedOpportunities.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Recovery Review"
      subtitle="Multi-payment batch queue review."
      primaryAction={{
        label: "Close Review",
        variant: "primary",
        onClick: onClose
      }}
    >
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
          <div className="flex justify-between py-1 border-b border-indigo-100">
            <span className="text-slate-600 font-medium">Selected Payments:</span>
            <span className="font-bold text-slate-900">{selectedOpportunities.length} payments selected</span>
          </div>
          <div className="flex justify-between py-1 border-b border-indigo-100">
            <span className="text-slate-600 font-medium">Total Value:</span>
            <span className="font-black text-indigo-700 text-sm font-mono">{formatCurrency(totalValue)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-600 font-medium">Execution Mode:</span>
            <Badge variant="indigo">Individual Validation Required</Badge>
          </div>
        </div>

        {/* Selected Items Scrollable Summary */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {selectedOpportunities.map((item) => (
            <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">{item.customer}</span>
                <span className="text-slate-400 font-mono ml-2">({item.id})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900">{item.formattedAmount}</span>
                <Badge variant={item.priority === 'HIGH' ? 'rose' : 'amber'}>{item.priority}</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 text-white text-[11px] font-medium flex items-center gap-2.5 shadow-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>All actions require individual safety validation and merchant approval. Bulk auto-execution is disabled.</span>
        </div>
      </div>
    </Modal>
  );
}
