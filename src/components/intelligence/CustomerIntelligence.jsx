import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Users, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function CustomerIntelligence({ customerData, onNavigateToCampaigns }) {
  const { segments } = customerData;
  const [selectedSegment, setSelectedSegment] = useState(null);

  const scoreFactors = [
    { factor: "Payment History", weight: "35%", description: "Historical successful payment ratio (>80% ideal)" },
    { factor: "Recent Activity", weight: "25%", description: "Recency of last successful checkout" },
    { factor: "Failure Type", weight: "20%", description: "Telemetry decline code recoverability" },
    { factor: "Previous Recovery", weight: "10%", description: "Prior successful AI recovery engagement" },
    { factor: "Transaction Value", weight: "10%", description: "Normalized ticket size tier" }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-3">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Customer Recovery Intelligence</h3>
        <p className="text-xs text-slate-500 font-medium">Customer behavioral segmentation and recovery probability scoring</p>
      </div>

      {/* Customer Recovery Score Factors Card (Requirement #18) */}
      <Card className="p-5 space-y-3 border border-slate-200/80 bg-slate-50/50">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Customer Recovery Score Factors (0–100)</h4>
          <span className="text-[11px] font-mono text-slate-500 font-medium">User-facing scoring criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs font-medium">
          {scoreFactors.map((f) => (
            <div key={f.factor} className="p-3 rounded-xl bg-white border border-slate-200/80 space-y-1">
              <span className="font-bold text-slate-900 block">{f.factor}</span>
              <span className="font-mono text-[11px] font-extrabold text-indigo-600 block">Weight: {f.weight}</span>
              <span className="text-[10px] text-slate-500 block leading-tight">{f.description}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Recovery Segments Table (Requirement #19) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recovery Customer Segments</h4>

        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Segment Tier</th>
                <th className="py-3 px-3 text-center">Customers</th>
                <th className="py-3 px-3 text-right">Avg Payment</th>
                <th className="py-3 px-3 text-center">Recovery Prob</th>
                <th className="py-3 px-4 text-right">Potential Recovery</th>
                <th className="py-3 px-4">Recommended Action</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {segments.map((seg) => (
                <tr 
                  key={seg.id} 
                  onClick={() => setSelectedSegment(seg)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-slate-900">{seg.name}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">{seg.customersCount}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">{seg.formattedAvgPayment}</td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold text-indigo-600">{seg.recoveryProbability}%</td>
                  <td className="py-3 px-4 text-right font-mono font-black text-emerald-600">{seg.formattedPotentialRecovery}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[11px]">
                      {seg.recommendedAction}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button 
                      variant="ai"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToCampaigns && onNavigateToCampaigns(seg);
                      }}
                      className="text-[11px] py-1 px-2.5"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      <span>Create Campaign</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Segment Detail Modal (Requirement #20) */}
      {selectedSegment && (
        <Modal
          isOpen={Boolean(selectedSegment)}
          onClose={() => setSelectedSegment(null)}
          title={`Segment Details: ${selectedSegment.name}`}
          subtitle="Targeted recovery segment breakdown"
          primaryAction={{
            label: "Create Campaign",
            variant: "ai",
            onClick: () => {
              const seg = selectedSegment;
              setSelectedSegment(null);
              onNavigateToCampaigns && onNavigateToCampaigns(seg);
            }
          }}
          secondaryAction={{
            label: "Close",
            onClick: () => setSelectedSegment(null)
          }}
        >
          <div className="space-y-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Matching Customers</span>
                <span className="font-mono font-bold text-slate-900">{selectedSegment.customersCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Average Payment Size</span>
                <span className="font-mono font-bold text-slate-900">{selectedSegment.formattedAvgPayment}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Average Recovery Probability</span>
                <span className="font-mono font-extrabold text-indigo-600">{selectedSegment.recoveryProbability}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Potential Recovery</span>
                <span className="font-mono font-black text-emerald-600">{selectedSegment.formattedPotentialRecovery}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Recommended Strategy</span>
                <span className="font-bold text-indigo-600">{selectedSegment.recommendedAction}</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
