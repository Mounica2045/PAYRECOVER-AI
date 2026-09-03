import React from 'react';
import Drawer from '../ui/Drawer';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Send, Users, Sparkles, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function CampaignDetailDrawer({
  campaign,
  isOpen,
  onClose,
  onRunSimulation
}) {
  if (!campaign) return null;

  const analytics = campaign.analytics || { targeted: 142, reached: 135, engaged: 108, recovered: 91, recoveredValue: 251756 };

  const timelineEvents = [
    { type: "Campaign created", timestamp: "10:12 AM" },
    { type: "Audience selected", timestamp: "10:13 AM" },
    { type: "AI strategy recommended", timestamp: "10:14 AM" },
    { type: "Message generated", timestamp: "10:15 AM" },
    { type: "Safety checks passed", timestamp: "10:16 AM" },
    { type: "Simulation completed", timestamp: "10:17 AM" }
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Campaign Overview"
      subtitle={`${campaign.id} • ${campaign.name}`}
    >
      <div className="space-y-6 text-xs font-medium">
        {/* Campaign Header & Action Buttons (Requirement #41) */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-3 shadow-md border border-indigo-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-indigo-300 font-bold">{campaign.id}</span>
            <Badge variant="emerald" className="bg-white/10 text-emerald-300 border-white/20">
              {campaign.status}
            </Badge>
          </div>

          <div>
            <h3 className="text-xl font-black text-white">{campaign.name}</h3>
            <p className="text-xs text-indigo-200 mt-0.5 font-medium">{campaign.description}</p>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <Button 
              variant="ai" 
              size="sm" 
              onClick={() => onRunSimulation && onRunSimulation(campaign)}
              className="w-full flex items-center justify-center gap-1.5 font-extrabold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Simulation</span>
            </Button>
          </div>
        </div>

        {/* Campaign Analytics Summary Cards (Requirement #42) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Targeted</span>
            <span className="font-mono font-black text-slate-900 text-sm">{campaign.customersCount}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Engaged</span>
            <span className="font-mono font-black text-indigo-600 text-sm">{analytics.engaged}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Potential Recovery</span>
            <span className="font-mono font-black text-emerald-600 text-sm">{campaign.formattedPotentialRecovery}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Recovery Rate</span>
            <span className="font-mono font-black text-slate-900 text-sm">{campaign.recoveryRate || '72.4%'}</span>
          </div>
        </div>

        {/* Campaign Parameters Details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Target Audience</span>
            <span className="font-bold text-slate-900">{campaign.audience}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Recovery Strategy</span>
            <Badge variant="indigo">{campaign.strategy}</Badge>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Channels</span>
            <span className="font-bold text-slate-800">{(campaign.channels || ['Email', 'SMS']).join(', ')}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-500">Created Date</span>
            <span className="font-mono text-slate-700">{campaign.createdAt}</span>
          </div>
        </div>

        {/* Campaign Lifecycle Timeline (Requirement #43) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Campaign Timeline</span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3">
            {timelineEvents.map((evt, idx, arr) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">✓</div>
                  <span className="font-bold text-slate-800">{evt.type}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400">{evt.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mandatory Non-real Communication Disclaimer */}
        <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-[11px] font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>Simulation Mode: All campaign metrics represent sandbox estimates. No customer communications dispatched.</span>
        </div>
      </div>
    </Drawer>
  );
}
