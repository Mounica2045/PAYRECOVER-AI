import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function CampaignBanner() {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border border-indigo-900/40 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <span>✦ Simulation Environment</span>
          </h4>
          <p className="text-xs text-indigo-200/90 font-medium mt-0.5">
            Campaigns are simulated only. No customer messages will actually be sent.
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full border border-white/15 text-[11px] font-mono text-indigo-200">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Sandbox Mode Active</span>
      </div>
    </div>
  );
}
