import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import { ShieldAlert, ShieldCheck, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';

export default function SafetyEvents({ safetyEvents = [] }) {
  const [selectedSafetyEvent, setSelectedSafetyEvent] = useState(null);

  return (
    <Card className="p-5 space-y-4 border border-slate-200/80">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recent Safety Events</h3>
          <p className="text-xs text-slate-500 font-medium">Log of guardrail checks, blocked actions, and validation events</p>
        </div>
        <span className="font-mono text-xs font-bold text-slate-500">{safetyEvents.length} Recorded</span>
      </div>

      <div className="space-y-2.5">
        {safetyEvents.map((evt) => {
          const isBlocked = evt.status === 'Blocked';

          return (
            <div
              key={evt.id}
              onClick={() => setSelectedSafetyEvent(evt)}
              className={`
                p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs
                ${isBlocked 
                  ? 'bg-rose-50/50 border-rose-200/80 hover:bg-rose-50 hover:border-rose-300' 
                  : 'bg-slate-50/60 border-slate-100 hover:bg-slate-100/60'}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-xl border shrink-0 ${isBlocked ? 'bg-rose-100 border-rose-200 text-rose-600' : 'bg-emerald-100 border-emerald-200 text-emerald-600'}`}>
                  {isBlocked ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{evt.type}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{evt.reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-right">
                <div>
                  <p className="font-mono font-bold text-indigo-600">{evt.transactionId}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{evt.timestamp}</p>
                </div>
                <Badge variant={isBlocked ? 'rose' : 'emerald'}>
                  {evt.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Event Block Detail Modal (Requirement #24) */}
      {selectedSafetyEvent && (
        <Modal
          isOpen={Boolean(selectedSafetyEvent)}
          onClose={() => setSelectedSafetyEvent(null)}
          title={selectedSafetyEvent.status === 'Blocked' ? "Safety Check Failed" : "Safety Event Details"}
          subtitle={`${selectedSafetyEvent.transactionId} • ${selectedSafetyEvent.customer}`}
          primaryAction={{
            label: "Close Details",
            variant: "primary",
            onClick: () => setSelectedSafetyEvent(null)
          }}
        >
          <div className="space-y-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Transaction</span>
                <span className="font-mono font-bold text-slate-900">{selectedSafetyEvent.transactionId}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Reason</span>
                <span className="font-bold text-rose-600">{selectedSafetyEvent.reason}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Rule Triggered</span>
                <span className="font-bold text-slate-800">{selectedSafetyEvent.rule || 'Guardrail Check'}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Recommended Action</span>
                <span className="font-bold text-indigo-600">{selectedSafetyEvent.recommendedAction || 'Manual Review'}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Blocked Action</span>
                <span className="font-bold text-rose-600">{selectedSafetyEvent.blockedAction || 'Automatic Action'}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-500">Result</span>
                <Badge variant={selectedSafetyEvent.status === 'Blocked' ? 'rose' : 'emerald'}>
                  {selectedSafetyEvent.result || selectedSafetyEvent.status}
                </Badge>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-[11px] font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Autonomous guardrail enforced. Recovery simulation prevented according to safety policy.</span>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
