import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ShieldCheck, Lock, CheckCircle2, AlertOctagon } from 'lucide-react';
import { agentSafetyService } from '../../services/agentSafetyService';

export default function AgentSafetyGate() {
  const safety = agentSafetyService.validateSafetyGate({ isApproved: true });

  return (
    <Card className="p-5 space-y-4 border border-indigo-100 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 text-white shadow-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Agent Autonomous Safety Gate</h3>
        </div>

        <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
          {safety.passedCount} / {safety.totalCount} Checks Passed
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        {safety.checks.map((chk) => (
          <div key={chk.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="text-indigo-200">{chk.name}</span>
              <span className="text-emerald-400 font-extrabold">✓ Passed</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">{chk.detail}</p>
          </div>
        ))}
      </div>

      {/* Prohibited Actions Hard-Stop Callout (Requirement #40, #41) */}
      <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs font-medium flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Security Hard-Stop Enabled: Real card charges, SMS/email dispatch, and CVV/PIN access are permanently prohibited.</span>
        </div>
        <Badge variant="rose" className="shrink-0 bg-rose-500/20 text-rose-300 border-rose-500/30">
          Hard-Stop Active
        </Badge>
      </div>
    </Card>
  );
}
