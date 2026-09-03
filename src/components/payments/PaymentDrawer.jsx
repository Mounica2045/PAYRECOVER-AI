import React from 'react';
import Drawer from '../ui/Drawer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import AIConfidence from '../ai/AIConfidence';
import AISafetyCheck from '../ai/AISafetyCheck';
import { Sparkles, User, AlertCircle, Calendar, CheckCircle2, Clock, Activity, ArrowRight } from 'lucide-react';
import { paymentFailureTooltips, actionMapping } from '../../data/paymentsData';

export default function PaymentDrawer({
  payment,
  isOpen,
  onClose,
  onSimulateRecovery,
  onNavigateToAgent
}) {
  if (!payment) return null;

  const failureDesc = paymentFailureTooltips[payment.failureReason] || "Payment execution failed.";
  const recAction = payment.recommendedAction !== '—' ? payment.recommendedAction : (actionMapping[payment.failureReason] || 'Delayed Retry');
  const stats = payment.customerStats || { previousPayments: 18, successfulPayments: 16, failedPayments: 2, customerSince: "Jan 2025" };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Details"
      subtitle={`${payment.id} • ${payment.formattedAmount}`}
      footer={
        <div className="flex items-center justify-between w-full">
          {onNavigateToAgent && payment.status === 'Failed' ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                onClose();
                onNavigateToAgent(payment.id);
              }}
              className="flex items-center gap-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              <span>View AI Recovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>

            {payment.status === 'Failed' && payment.recoveryStatus !== 'Recovered' && (
              <Button 
                variant="ai" 
                size="sm"
                onClick={() => onSimulateRecovery(payment)}
                className="flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-300" />
                <span>Simulate Recovery</span>
              </Button>
            )}
          </div>
        </div>
      }
    >
      {/* Customer Info Card */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Customer Profile</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">{payment.customer}</h4>
              <p className="text-xs text-slate-500">{payment.email}</p>
            </div>
            <span className="badge-emerald font-bold">Returning Customer</span>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-center">
            <div className="bg-white p-2 rounded-xl border border-slate-100">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Total</p>
              <p className="text-xs font-bold text-slate-800">{stats.previousPayments}</p>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-100">
              <p className="text-[9px] text-emerald-600 font-bold uppercase">Success</p>
              <p className="text-xs font-bold text-emerald-700">{stats.successfulPayments}</p>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-100">
              <p className="text-[9px] text-rose-600 font-bold uppercase">Failed</p>
              <p className="text-xs font-bold text-rose-700">{stats.failedPayments}</p>
            </div>
            <div className="bg-white p-2 rounded-xl border border-slate-100">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Member</p>
              <p className="text-[10px] font-bold text-slate-800">{stats.customerSince}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-indigo-600" />
          <span>Payment Information</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-white space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Transaction ID</span>
            <span className="font-mono font-bold text-slate-900">{payment.id}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Amount</span>
            <span className="font-black text-slate-900">{payment.formattedAmount} ({payment.currency})</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Payment Method</span>
            <span className="font-mono font-semibold text-slate-800">{payment.method}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Status</span>
            <span className={`font-bold ${payment.status === 'Successful' ? 'text-emerald-600' : payment.status === 'Failed' ? 'text-rose-600' : 'text-amber-600'}`}>
              {payment.status}
            </span>
          </div>
          {payment.status === 'Failed' && (
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Failure Reason</span>
              <span className="font-bold text-rose-600">{payment.failureReason}</span>
            </div>
          )}
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Timestamp</span>
            <span className="text-slate-700 font-medium">{payment.date}</span>
          </div>
        </div>
      </div>

      {/* Payment Timeline */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Activity className="w-4 h-4 text-indigo-600" />
          <span>Payment Timeline</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-4">
          {(payment.timeline || [
            { step: "Payment initiated", time: payment.date, status: "completed" },
            { step: "Payment attempt failed", time: payment.date, status: "failed" },
            { step: "AI analysis completed", time: payment.date, status: "ai" },
            { step: "Recovery recommendation generated", time: payment.date, status: "ready" }
          ]).map((event, idx, arr) => (
            <div key={idx} className="flex gap-3 relative">
              {idx !== arr.length - 1 && (
                <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-slate-200" />
              )}
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${event.status === 'failed' ? 'bg-rose-500 text-white' : event.status === 'ai' ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'}`}>
                {event.status === 'failed' ? '✕' : '✓'}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">{event.step}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recovery Analysis Section */}
      {payment.status === 'Failed' && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-4 shadow-lg shadow-indigo-900/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">✦ AI Recovery Analysis</span>
            </div>
            {payment.probability && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {payment.probability}% Recovery Rate
              </span>
            )}
          </div>

          <div>
            <h4 className="text-lg font-black text-white">{recAction}</h4>
            <p className="text-xs text-indigo-200/90 mt-1 leading-relaxed">
              {failureDesc} Temporary bank failures have a high recovery yield when retried after a short cooldown period.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10">
            <AIConfidence score={payment.probability || 89} />
          </div>
        </div>
      )}

      {/* AI Safety Check */}
      <AISafetyCheck />
    </Drawer>
  );
}
