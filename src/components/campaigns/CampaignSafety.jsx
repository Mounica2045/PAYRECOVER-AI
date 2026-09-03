import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import AISafetyCheck from '../ai/AISafetyCheck';
import { ShieldCheck, Sparkles, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';

export default function CampaignSafety({
  campaignData,
  onNext,
  onBack
}) {
  const safetyChecks = [
    { label: 'Audience eligibility validation', status: 'Passed (All accounts verified)', passed: true },
    { label: 'Duplicate customer cooldown check', status: 'Passed (7 duplicate customers excluded)', passed: true },
    { label: 'Retry frequency guardrail', status: 'Passed (Within 3 max limit)', passed: true },
    { label: 'Message content safety check', status: 'Passed (No prohibited claims)', passed: true },
    { label: 'Sensitive data masking check', status: 'Passed (Zero card/CVV data)', passed: true },
    { label: 'Strategy compatibility check', status: 'Passed (Optimal for failure reason)', passed: true },
    { label: 'Merchant approval signoff', status: 'Required (Human signoff verified)', passed: true },
    { label: 'Simulation mode protection', status: 'Active (Sandbox environment)', passed: true }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Campaign Safety Check</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Validation of autonomous risk boundaries and duplicate customer rules.</p>
      </div>

      {/* Safety Status Banner (Requirement #29) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-emerald-900">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">Safety Status</span>
            <h4 className="text-xl font-black text-white">✓ 8 / 8 Checks Passed — Ready for Simulation</h4>
          </div>
        </div>

        <Badge variant="emerald" className="self-start sm:self-center">
          ✓ Verified Active
        </Badge>
      </div>

      {/* Duplicate Customer Check Box (Requirement #30) */}
      <Card className="p-5 space-y-3 border border-slate-200/80 bg-slate-50/50">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Duplicate Customer Exclusion Rule</h4>
          <span className="text-[11px] text-slate-500 font-medium">15-minute campaign cooldown</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-1">
            <span className="text-[10px] font-bold uppercase block text-amber-700">Duplicate Customers Excluded</span>
            <span className="text-lg font-black font-mono">7 customers</span>
            <p className="text-[11px] text-amber-800 font-medium">Excluded because they received another recovery campaign within the 15-minute window.</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 space-y-1">
            <span className="text-[10px] font-bold uppercase block text-emerald-700">Eligible Customers Remaining</span>
            <span className="text-lg font-black font-mono">135 customers</span>
            <p className="text-[11px] text-emerald-800 font-medium">Campaign performance & expected recovery calculated exclusively for eligible audience.</p>
          </div>
        </div>
      </Card>

      {/* Detailed Guardrails Checklist */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Safety Guardrail Checks</h4>
        <AISafetyCheck checks={safetyChecks} />
      </Card>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button variant="ai" size="lg" onClick={onNext} className="px-8 font-extrabold">
          Proceed to Simulation →
        </Button>
      </div>
    </div>
  );
}
