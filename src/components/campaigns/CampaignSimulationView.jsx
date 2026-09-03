import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Sparkles, Loader2, CheckCircle2 } from 'lucide-react';
import { campaignService } from '../../services/campaignService';

export default function CampaignSimulationView({
  campaignData,
  onSave,
  onEdit,
  onBackToCampaigns
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [simulationResult, setSimulationResult] = useState(null);

  const simulationSteps = [
    "Preparing audience...",
    "Running safety checks...",
    "Evaluating recovery probability...",
    "Estimating customer response...",
    "Calculating potential recovery...",
    "Generating campaign analytics..."
  ];

  const handleStartSimulation = () => {
    setIsRunning(true);
    setStepIndex(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= simulationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRunning(false);
            const res = campaignService.simulateCampaign(campaignData);
            setSimulationResult(res);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isRunning, campaignData]);

  // Initial simulation run on load
  useEffect(() => {
    if (!simulationResult && !isRunning && stepIndex === -1) {
      handleStartSimulation();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Campaign Simulation</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">This simulation estimates how the campaign could perform. No messages will actually be sent.</p>
      </div>

      {/* Progress Animation State (Requirement #33) */}
      {isRunning && (
        <Card className="p-8 text-center space-y-5 border border-indigo-100 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto">
            <Loader2 className="w-7 h-7 text-indigo-600 animate-spin" />
          </div>

          <div className="space-y-2 max-w-sm mx-auto text-xs text-left">
            {simulationSteps.map((text, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;
              return (
                <div key={idx} className={`flex items-center gap-2.5 font-medium ${idx <= stepIndex ? 'text-slate-900 opacity-100' : 'text-slate-400 opacity-40'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
                    {isDone ? '✓' : idx + 1}
                  </div>
                  <span>{isDone ? `✓ ${text}` : text}</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Simulation Result View (Requirements #34, #35, #36, #37, #38) */}
      {simulationResult && !isRunning && (
        <div className="space-y-6">
          {/* Header Banner (Requirement #34) */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-indigo-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">Simulation Status</span>
                <h4 className="text-xl font-black text-white">✓ Campaign Simulation Complete</h4>
              </div>
            </div>

            <Badge variant="emerald">Simulation Mode Active</Badge>
          </div>

          {/* Key Metrics Overview (Requirement #34) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Targeted Customers</span>
              <span className="text-xl font-black text-slate-900 font-mono">{simulationResult.eligibleCustomers}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Response Rate</span>
              <span className="text-xl font-black text-indigo-600 font-mono">{simulationResult.responseRate}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Recovery Rate</span>
              <span className="text-xl font-black text-emerald-600 font-mono">{simulationResult.recoveryRate}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Potential Recovery</span>
              <span className="text-xl font-black text-emerald-600 font-mono">{simulationResult.formattedPotentialRecovery}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Est. Unrecovered</span>
              <span className="text-xl font-black text-slate-500 font-mono">{simulationResult.formattedUnrecoveredValue}</span>
            </div>
          </div>

          {/* Customer Funnel Visualization & Recovery Value (Requirement #35) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Customer Funnel */}
            <Card className="p-5 lg:col-span-7 space-y-4 border border-slate-200/80">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulated Customer Conversion Funnel</h4>
              </div>

              <div className="space-y-3 pt-1">
                {simulationResult.funnel.map((fn, idx) => (
                  <div key={fn.step} className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-700">{fn.step}</span>
                      <span className="font-mono font-extrabold text-slate-900">{fn.count} customers</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/60">
                      <div 
                        className={`h-full rounded-full ${idx === simulationResult.funnel.length - 1 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                        style={{ width: `${Math.round((fn.count / simulationResult.eligibleCustomers) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recovery Value Breakdown */}
            <Card className="p-5 lg:col-span-5 space-y-4 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recovery Value Yield</h4>
              </div>

              <div className="space-y-3 font-medium text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-500">Original Failed Value:</span>
                  <span className="font-mono font-black text-slate-900">{simulationResult.formattedTotalPaymentValue}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 flex justify-between">
                  <span className="text-emerald-700 font-bold">Potential Recovery:</span>
                  <span className="font-mono font-black text-emerald-700">{simulationResult.formattedPotentialRecovery}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between">
                  <span className="text-slate-500">Remaining Unrecovered Value:</span>
                  <span className="font-mono font-bold text-slate-700">{simulationResult.formattedUnrecoveredValue}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100">
                All figures represent estimated simulation yields based on deterministic historical parameters.
              </div>
            </Card>
          </div>

          {/* Channel Comparison & Strategy Comparison Grid (Requirements #36, #37) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Channel Performance Comparison */}
            <Card className="p-5 space-y-3 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Channel Performance Comparison</h4>

              <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-4">Channel</th>
                      <th className="py-2.5 px-3 text-center">Estimated Reach</th>
                      <th className="py-2.5 px-4 text-right">Estimated Engagement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {simulationResult.channelComparison.map((ch) => (
                      <tr key={ch.channel} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-900">{ch.channel}</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-indigo-600">{ch.reach}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-black text-slate-900">{ch.engagement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* What If Strategy Comparison (Requirement #37) */}
            <Card className="p-5 space-y-3 border border-slate-200/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">What if you used another strategy?</h4>

              <div className="space-y-2">
                {simulationResult.strategyComparison.map((st) => (
                  <div 
                    key={st.strategy} 
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs ${st.recommended ? 'bg-indigo-50/80 border-indigo-200 font-bold' : 'bg-slate-50/50 border-slate-100'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">{st.strategy}</span>
                      {st.recommended && <Badge variant="indigo">AI Recommended</Badge>}
                    </div>
                    <span className="font-mono font-black text-slate-900">{st.formatted}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* AI Campaign Insight Banner (Requirement #38) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-2 shadow-lg border border-indigo-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">✦ AI Campaign Insight</span>
            </div>
            <p className="text-xs text-indigo-200 font-medium leading-relaxed">
              This campaign has strong recovery potential because most payment failures appear temporary and the selected audience has a strong historical payment success rate. Delayed Retry provides the best estimated recovery while maintaining relatively low customer impact.
            </p>
          </div>

          {/* Action Buttons (Requirement #39) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" onClick={onBackToCampaigns}>
              ← Back to Campaigns
            </Button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="secondary" onClick={onEdit} className="w-full sm:w-auto">
                Edit Campaign
              </Button>
              <Button variant="ai" size="lg" onClick={() => onSave(campaignData)} className="w-full sm:w-auto px-8 font-extrabold shadow-md">
                Save Campaign
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
