import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AISafetyCheck from '../ai/AISafetyCheck';
import { ShieldCheck, CheckCircle2, XCircle, Clock, Sparkles, ShieldAlert, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function ActionCenter({
  payment,
  strategy = 'Delayed Retry',
  safetyChecks = [],
  onApprove,
  onReject,
  onTryAnother,
  onManualReview
}) {
  if (!payment) return null;

  const allPassed = safetyChecks.length > 0 && safetyChecks.every(c => c.passed);
  const isBlocked = payment.status === 'Safety Blocked' || payment.safetyBlocked || !allPassed;
  const failedCheck = safetyChecks.find(c => !c.passed);

  return (
    <Card className="p-6 h-full flex flex-col justify-between space-y-6 shadow-md border border-slate-200/80">
      <div className="space-y-5">
        {/* Title & Status */}
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Recovery Action Center</span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">{strategy}</h3>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold text-slate-500">Action Status:</span>
            {isBlocked ? (
              <span className="badge-rose font-bold flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-rose-600" />
                Safety Blocked
              </span>
            ) : (
              <span className="badge-amber font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                Awaiting Approval
              </span>
            )}
          </div>
        </div>

        {/* Action Strategy Summary */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Selected Strategy:</span>
            <span className="font-bold text-indigo-700">{strategy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Estimated Recovery Value:</span>
            <span className="font-black text-slate-900">{payment.formattedAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">Recovery Probability:</span>
            <span className="font-extrabold text-indigo-600 font-mono">{payment.probability || 91}%</span>
          </div>
        </div>

        {/* Failed Safety Check Warning Banner (Requirement #20) */}
        {isBlocked ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Safety Check Failed</span>
            </div>
            <p className="text-rose-700 font-medium leading-relaxed">
              {failedCheck ? failedCheck.status : "Retry limit exceeded (3/3 max attempts reached)."} This payment cannot be automatically recovered.
            </p>
            <div className="p-2 rounded-xl bg-rose-100/80 border border-rose-200/80 font-bold text-rose-900 text-[11px]">
              Recommended: Manual Review
            </div>
          </div>
        ) : (
          /* Merchant Approval Required Notice (Requirement #17) */
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Merchant Approval Required</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Review the AI recommendation before executing the simulated recovery action.
            </p>
          </div>
        )}

        {/* Safety Checks List (Requirement #19) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Safety Guardrails</span>
            <span className={`font-extrabold text-xs font-mono ${allPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
              {safetyChecks.filter(c => c.passed).length}/{safetyChecks.length} Passed
            </span>
          </div>

          <AISafetyCheck 
            checks={safetyChecks.map(c => ({ label: c.name, status: c.status, passed: c.passed }))}
          />
        </div>
      </div>

      {/* Merchant Action Controls */}
      <div className="space-y-2 pt-4 border-t border-slate-100">
        {isBlocked ? (
          <Button 
            variant="secondary"
            size="lg"
            onClick={onManualReview}
            className="w-full flex items-center justify-center gap-2 border-rose-300 text-rose-700 bg-rose-50 hover:bg-rose-100 font-extrabold"
          >
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Manual Review Required</span>
          </Button>
        ) : (
          <Button 
            variant="ai"
            size="lg"
            disabled={!allPassed}
            onClick={onApprove}
            className="w-full flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Simulate</span>
          </Button>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="danger"
            size="sm"
            onClick={onReject}
            className="w-full"
          >
            Reject
          </Button>

          <Button 
            variant="secondary"
            size="sm"
            onClick={onTryAnother}
            className="w-full text-slate-700"
          >
            Try Another Strategy
          </Button>
        </div>
      </div>
    </Card>
  );
}
