import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function OpportunityMap({ opportunities = [], onNavigateToAgent }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const quadrants = [
    { title: 'PRIORITIZE NOW', desc: 'High Value • High Probability', color: 'bg-emerald-50 border-emerald-200 text-emerald-900', scoreMin: 85 },
    { title: 'STRATEGIZE', desc: 'High Value • Low/Medium Prob', color: 'bg-amber-50 border-amber-200 text-amber-900', scoreMin: 70 },
    { title: 'AUTOMATE', desc: 'Low Value • High Probability', color: 'bg-indigo-50 border-indigo-200 text-indigo-900', scoreMin: 60 },
    { title: 'MONITOR', desc: 'Low Value • Low Probability', color: 'bg-slate-50 border-slate-200 text-slate-700', scoreMin: 0 }
  ];

  return (
    <Card className="p-6 space-y-4 border border-slate-200/80">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Revenue Recovery Priority Matrix</h3>
          <p className="text-xs text-slate-500 font-medium">Opportunity quadrant mapping (Value vs Recovery Probability)</p>
        </div>
        <span className="text-xs font-mono text-slate-400">Interactive Telemetry Matrix</span>
      </div>

      {/* 4 Quadrants Matrix Layout (Requirement #27) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quadrants.map((q) => {
          const matching = opportunities.filter(o => {
            if (q.title === 'PRIORITIZE NOW') return o.opportunityScore >= 85;
            if (q.title === 'STRATEGIZE') return o.opportunityScore >= 70 && o.opportunityScore < 85;
            if (q.title === 'AUTOMATE') return o.opportunityScore >= 60 && o.opportunityScore < 70;
            return o.opportunityScore < 60;
          });

          return (
            <div key={q.title} className={`p-4 rounded-2xl border ${q.color} space-y-3`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-xs uppercase tracking-wider">{q.title}</h4>
                  <p className="text-[10px] opacity-80 font-medium">{q.desc}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/60 font-mono text-xs font-bold">{matching.length} items</span>
              </div>

              {/* Point Items */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {matching.slice(0, 6).map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setSelectedItem(o)}
                    className="px-2.5 py-1 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-indigo-500 text-slate-900 font-mono text-[11px] font-bold transition-all"
                  >
                    {o.id} ({o.probability}%)
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Point Detail Modal */}
      {selectedItem && (
        <Modal
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          title={`Transaction Telemetry: ${selectedItem.id}`}
          subtitle={`${selectedItem.customer} • ${selectedItem.formattedAmount}`}
          primaryAction={{
            label: "Review with AI",
            variant: "ai",
            onClick: () => {
              const id = selectedItem.id;
              setSelectedItem(null);
              onNavigateToAgent && onNavigateToAgent(id);
            }
          }}
        >
          <div className="space-y-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Customer</span>
                <span className="font-bold text-slate-900">{selectedItem.customer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Amount</span>
                <span className="font-mono font-black text-slate-900">{selectedItem.formattedAmount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Recovery Probability</span>
                <span className="font-mono font-extrabold text-indigo-600">{selectedItem.probability}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Opportunity Score</span>
                <Badge variant="indigo" className="font-mono">{selectedItem.opportunityScore} / 100</Badge>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Recommended Strategy</span>
                <span className="font-bold text-indigo-600">{selectedItem.recommendedStrategy}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
