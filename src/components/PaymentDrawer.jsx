import React from 'react';
import { X, Sparkles, User, AlertCircle, ShieldCheck, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function PaymentDrawer({ payment, onClose, onApprove, onManualReview }) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction Details</span>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-slate-900 font-mono">{payment.id}</h3>
                  <span className={`
                    ${payment.status === 'Recovered' ? 'badge-emerald' : ''}
                    ${payment.status === 'Ready' ? 'badge-indigo' : ''}
                    ${payment.status === 'Action Needed' ? 'badge-amber' : ''}
                    ${payment.status === 'Pending' ? 'badge-slate' : ''}
                  `}>
                    {payment.status}
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)] space-y-6">
              
              {/* Amount Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Failed Transaction Amount</p>
                  <p className="text-2xl font-black tracking-tight">{payment.formattedAmount}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold px-2.5 py-1 bg-white/10 rounded-full text-indigo-200 border border-white/10">
                    {payment.method || 'NetBanking'}
                  </span>
                </div>
              </div>

              {/* Customer Profile Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <User className="w-4 h-4 text-brand-600" />
                  <span>Customer Profile</span>
                </div>
                
                <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{payment.customer}</h4>
                      <p className="text-xs text-slate-500">{payment.email || 'customer@example.com'}</p>
                    </div>
                    <span className="badge-emerald">Returning Customer</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-center">
                    <div className="bg-white p-2 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Successful</p>
                      <p className="text-xs font-bold text-slate-800">{payment.successfulPayments || 7} payments</p>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Avg Txn</p>
                      <p className="text-xs font-bold text-slate-800">{payment.avgTxn || '₹4,200'}</p>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Lifetime LTV</p>
                      <p className="text-xs font-bold text-slate-900">{payment.ltv || '₹32,400'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Failure Analysis */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Failure Analysis</span>
                </div>
                
                <div className="p-4 rounded-2xl border border-slate-200/80 bg-white space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Failure Reason:</span>
                    <span className="font-bold text-slate-900">{payment.failureReason}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Failure Severity:</span>
                    <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Medium</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Likely Temporary:</span>
                    <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Yes (94% confidence)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Previous Attempts:</span>
                    <span className="font-mono font-semibold text-slate-700">{payment.attempts || 1} of 3 max</span>
                  </div>
                </div>
              </div>

              {/* AI Recommendation Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-4 shadow-lg shadow-indigo-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-24 h-24" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider">✦ AI Recommendation</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {payment.probability}% Recovery Rate
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white">{payment.recommendedAction}</h4>
                  <p className="text-xs text-indigo-200/90 mt-1 leading-relaxed">
                    {payment.why || "Strong payment history combined with a temporary bank-side failure makes this transaction a high-confidence retry candidate."}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300">
                  <span>AI Diagnostic Confidence</span>
                  <span className="font-bold text-white">91%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-slate-200 bg-white space-y-2">
            <button
              onClick={() => onApprove(payment)}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Recovery ({payment.formattedAmount})</span>
            </button>
            
            <button
              onClick={() => onManualReview(payment)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Send for Manual Review
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
