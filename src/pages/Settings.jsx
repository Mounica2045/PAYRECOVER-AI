import React from 'react';
import { Settings as SettingsIcon, ShieldCheck, Sliders, Key, Webhook, BellRing } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings & Rules</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Manage Razorpay integration, retry guardrails, and automated recovery thresholds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Settings Sidebar */}
        <div className="fintech-card p-4 space-y-1">
          <button className="w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>AI Safety & Guardrails</span>
          </button>
          <button className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 hover:bg-slate-100 flex items-center gap-2">
            <Webhook className="w-4 h-4 text-slate-400" />
            <span>Razorpay Webhooks</span>
          </button>
          <button className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 hover:bg-slate-100 flex items-center gap-2">
            <Key className="w-4 h-4 text-slate-400" />
            <span>API Credentials</span>
          </button>
          <button className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 hover:bg-slate-100 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-slate-400" />
            <span>Notification Triggers</span>
          </button>
        </div>

        {/* Settings Detail Form */}
        <div className="lg:col-span-2 fintech-card p-6 space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 pb-3 border-b border-slate-100">
            Autonomous Safety Policy Configuration
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Maximum Automated Retries</span>
                <span className="font-mono font-bold text-brand-600">3 per transaction</span>
              </div>
              <p className="text-[11px] text-slate-500">Prevents repetitive card charges or customer bank fee penalties.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Human-in-the-Loop Threshold</span>
                <span className="font-mono font-bold text-brand-600">Transactions &gt; ₹5,000</span>
              </div>
              <p className="text-[11px] text-slate-500">Transactions above this limit require explicit merchant approval prior to execution.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900">Simulation Mode Toggle</span>
                <span className="badge-indigo font-bold">Active</span>
              </div>
              <p className="text-[11px] text-slate-500">Runs all AI recovery actions in safe sandbox mode with mock state execution.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
