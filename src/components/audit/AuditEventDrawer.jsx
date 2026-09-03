import React from 'react';
import Drawer from '../ui/Drawer';
import Badge from '../ui/Badge';
import AISafetyCheck from '../ai/AISafetyCheck';
import AIConfidence from '../ai/AIConfidence';
import { Sparkles, User, AlertCircle, Activity, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function AuditEventDrawer({
  event,
  isOpen,
  onClose,
  transactionHistory = []
}) {
  if (!event) return null;

  const details = event.details || {};
  const prob = details.probability || 91;
  const conf = details.confidence || 91;
  const estVal = details.expectedRecovery ? `₹${details.expectedRecovery.toLocaleString('en-IN')}` : event.formattedAmount;

  const timelineEvents = transactionHistory.length > 0 ? transactionHistory : [
    { type: "Payment failed", timestamp: "10:42 AM", actor: "Gateway" },
    { type: "AI Recommendation", timestamp: "10:43 AM", actor: "AI Agent" },
    { type: "Safety Check Passed", timestamp: "10:43 AM", actor: "Safety Engine" },
    { type: "Merchant Approval", timestamp: "10:44 AM", actor: "Merchant" },
    { type: "Simulation Started", timestamp: "10:44 AM", actor: "Merchant" },
    { type: "Simulation Completed", timestamp: "10:44 AM", actor: "AI + Merchant" }
  ];

  const safetyGuardrailsList = [
    { label: "Duplicate action check", status: "Passed (Zero duplicate ID)", passed: true },
    { label: "Retry limit check", status: event.status === 'Blocked' ? 'Failed (Max retries reached)' : 'Passed (1/3 attempts)', passed: event.status !== 'Blocked' },
    { label: "Transaction eligibility", status: "Passed (Eligible merchant)", passed: true },
    { label: "Merchant approval requirement", status: "Required (Human sign-off)", passed: true },
    { label: "Simulation environment", status: "Active (Sandbox mode)", passed: true },
    { label: "Audit logging enabled", status: "Active (Immutable log)", passed: true }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Event Details"
      subtitle={`${event.id} • ${event.transactionId}`}
    >
      <div className="space-y-6 text-xs font-medium">
        {/* Main Event Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Event Type</span>
            <span className="font-bold text-slate-900">{event.type}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Event ID</span>
            <span className="font-mono font-bold text-slate-900">{event.id}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Transaction ID</span>
            <span className="font-mono font-bold text-indigo-600">{event.transactionId}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Customer</span>
            <span className="font-bold text-slate-900">{event.customer}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Amount</span>
            <span className="font-black text-slate-900 font-mono">{event.formattedAmount}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Strategy</span>
            <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">{event.strategy || '—'}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Actor</span>
            <span className="font-bold text-slate-800">{event.actor}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-500">Status</span>
            <Badge variant={event.status === 'Simulated' || event.status === 'Approved' ? 'emerald' : event.status === 'Blocked' ? 'rose' : 'indigo'}>
              {event.status}
            </Badge>
          </div>
        </div>

        {/* AI Decision Log Section (Requirement #33) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Decision Factors</span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-3 shadow-md">
            <div className="grid grid-cols-3 gap-2 text-center pb-2 border-b border-white/10">
              <div>
                <span className="text-[10px] text-indigo-300 font-bold uppercase block">Probability</span>
                <span className="font-mono font-black text-emerald-400 text-sm">{prob}%</span>
              </div>
              <div>
                <span className="text-[10px] text-indigo-300 font-bold uppercase block">Confidence</span>
                <span className="font-mono font-black text-white text-sm">{conf}%</span>
              </div>
              <div>
                <span className="text-[10px] text-indigo-300 font-bold uppercase block">Est. Recovery</span>
                <span className="font-mono font-black text-white text-sm">{estVal}</span>
              </div>
            </div>

            <p className="text-xs text-indigo-200 leading-relaxed font-medium">
              {event.description}
            </p>
          </div>
        </div>

        {/* Safety Guardrails Checklist (Requirement #18) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Safety Evaluation</span>
          </div>

          <AISafetyCheck checks={safetyGuardrailsList} />
        </div>

        {/* Transaction Timeline Story (Requirement #19) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Transaction Lifecycle Timeline</span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-4">
            {timelineEvents.map((evt, idx, arr) => (
              <div key={idx} className="flex gap-3 relative">
                {idx !== arr.length - 1 && (
                  <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-slate-200" />
                )}
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  ✓
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{evt.type}</span>
                    <span className="font-mono text-[10px] text-slate-400">{evt.timestamp}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Actor: {evt.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Non-real Payment Disclaimer (Requirement #35) */}
        <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-[11px] font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>No real payment was processed. Sandbox recovery simulation event.</span>
        </div>
      </div>
    </Drawer>
  );
}
