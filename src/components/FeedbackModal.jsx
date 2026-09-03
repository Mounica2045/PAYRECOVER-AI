import React from 'react';
import { CheckCircle2, Sparkles, X, ArrowRight } from 'lucide-react';

export default function FeedbackModal({ isOpen, onClose, txnId, amount, actionName, onNavigateToDashboard }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center z-10 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-500/10">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/70 rounded-full text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span>Simulation Mode</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Recovery Simulated Successfully</h3>
        
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          AI recovery workflow <span className="font-semibold text-slate-800">"{actionName || 'Delayed Retry'}"</span> was executed for transaction <span className="font-mono font-bold text-slate-900">{txnId || 'TXN_1042'}</span>.
        </p>

        <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Revenue Recovered</p>
            <p className="text-2xl font-black text-emerald-600">+{amount || '₹4,999'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Updated Status</p>
            <span className="badge-emerald mt-1 font-semibold">Recovered (Simulated)</span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => {
              onClose();
              if (onNavigateToDashboard) onNavigateToDashboard();
            }}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <span>View Updated Dashboard Metrics</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
