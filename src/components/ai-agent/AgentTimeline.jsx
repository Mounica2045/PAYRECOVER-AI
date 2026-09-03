import React from 'react';
import Card from '../ui/Card';
import { Activity, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function AgentTimeline({ payment, timeline = [] }) {
  if (!payment) return null;

  const defaultTimeline = [
    { time: "10:42 AM", step: "Payment failed", status: "completed", desc: payment.failureReason },
    { time: "10:43 AM", step: "AI analysis completed", status: "completed", desc: `Evaluated signals & ${payment.probability}% probability` },
    { time: "10:43 AM", step: "Recovery strategy selected", status: "completed", desc: payment.recommendedAction || "Delayed Retry" },
    { time: "10:44 AM", step: "Merchant approved simulation", status: timeline.length > 3 ? "completed" : "pending", desc: "Human-in-the-loop signoff" },
    { time: "10:44 AM", step: "Simulation completed", status: timeline.length > 4 ? "completed" : "pending", desc: "Sandbox execution verified" },
    { time: "10:44 AM", step: "Audit event recorded", status: timeline.length > 5 ? "completed" : "pending", desc: "Immutable audit log entry" }
  ];

  const events = timeline.length > 0 ? timeline : defaultTimeline;

  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Agent Activity Timeline</h3>
        </div>
        <span className="font-mono text-xs font-bold text-slate-500">{payment.id}</span>
      </div>

      <div className="space-y-4 relative pl-2">
        {events.map((evt, idx) => {
          const isDone = evt.status === 'completed' || evt.status === 'success';
          return (
            <div key={idx} className="flex gap-3 relative">
              {idx !== events.length - 1 && (
                <div className={`absolute left-2.5 top-6 bottom-0 w-0.5 ${isDone ? 'bg-indigo-300' : 'bg-slate-200'}`} />
              )}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 z-10 ${isDone ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-200 text-slate-400 font-medium'}`}>
                {isDone ? '✓' : idx + 1}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{evt.step}</span>
                  <span className="text-[10px] font-mono text-slate-400">{evt.time}</span>
                </div>
                {evt.desc && (
                  <p className="text-[11px] text-slate-500 font-medium">{evt.desc}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
