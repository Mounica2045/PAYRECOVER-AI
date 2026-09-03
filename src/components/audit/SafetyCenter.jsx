import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { ShieldCheck, Lock, ShieldAlert, CheckCircle2, Sliders, EyeOff } from 'lucide-react';

export default function SafetyCenter({ controls = [], rules = [] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Safety Center</h2>
          <p className="text-xs text-slate-500 font-medium">Autonomous safety controls, risk boundaries, and guardrail configuration</p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold font-mono">
          ✓ All Controls Active
        </span>
      </div>

      {/* Safety Score Card (Requirement #22) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-3 shadow-lg border border-indigo-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-widest">Autonomous Safety Rating</span>
            <h3 className="text-2xl font-black text-white">AI Safety Score</h3>
            <p className="text-xs text-indigo-200 font-medium">All configured safety controls are currently active and functioning normally.</p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl border border-white/15 shrink-0 text-center">
            <div>
              <span className="text-3xl font-black text-emerald-400 font-mono">98</span>
              <span className="text-xs text-indigo-200"> / 100</span>
              <span className="block text-[10px] font-extrabold text-emerald-300 uppercase tracking-wider mt-0.5">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Safety Control Cards (Requirement #21) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Safety Controls</h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {controls.map((ctrl) => (
            <Card key={ctrl.id} className="p-4 flex flex-col justify-between space-y-3 border border-slate-200/80 shadow-xs hover:border-slate-300">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-slate-900">{ctrl.name}</h4>
                  <Badge variant="emerald" className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Active</span>
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{ctrl.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span>Rule setting:</span>
                <span className="font-mono font-bold text-slate-900">{ctrl.ruleValue}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Configured Safety Rules Table (Requirement #25) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Configured Safety Rules</h4>
          <span className="text-[11px] font-mono text-slate-500 font-medium">Demo configuration values</span>
        </div>

        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-4">Safety Rule Name</th>
                <th className="py-2.5 px-4 text-right">Configured Rule Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rules.map((r, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-900">{r.rule}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-indigo-600">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
