import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Tooltip from '../ui/Tooltip';
import { Cpu, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function AgentPerformance({ metrics }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* 1. Agent Performance Metrics (8 cols - Requirement #25) */}
      <Card className="p-5 lg:col-span-8 space-y-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Agent Performance Telemetry</h4>
          </div>
          <Badge variant="indigo">Demo Agent Metrics</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-center">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Tasks Completed</span>
            <span className="font-mono font-black text-slate-900 text-lg">{metrics.tasksCompleted}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Simulations Run</span>
            <span className="font-mono font-black text-emerald-600 text-lg">{metrics.successfulSimulations}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Safety Blocks</span>
            <span className="font-mono font-black text-indigo-600 text-lg">{metrics.safetyBlocks}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Approval Rate</span>
            <span className="font-mono font-black text-slate-900 text-lg">{metrics.approvalRate}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Task Time</span>
            <span className="font-mono font-black text-slate-900 text-lg">{metrics.avgTaskTime}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Simulation Agreement</span>
            <span className="font-mono font-black text-indigo-600 text-lg">{metrics.simulationAgreement}</span>
          </div>
        </div>
      </Card>

      {/* 2. Session Context Panel (4 cols - Requirement #23) */}
      <Card className="p-5 lg:col-span-4 space-y-3 border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Agent Session Context</h4>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="space-y-2 text-xs font-medium">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Current Focus</span>
            <span className="font-bold text-slate-900">Temporary Bank Failures</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Selected Strategy</span>
            <Badge variant="indigo">Delayed Retry</Badge>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-slate-500">Target Audience</span>
            <span className="font-bold text-slate-800">135 Customers</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Last Action</span>
            <span className="font-mono text-slate-700">Campaign Simulation</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 font-mono text-right pt-2 border-t border-slate-200/60">
          Last Updated: 10:48 AM
        </div>
      </Card>
    </div>
  );
}
