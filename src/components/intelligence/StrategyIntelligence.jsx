import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Sparkles, SlidersHorizontal, ArrowRight, TrendingUp } from 'lucide-react';

export default function StrategyIntelligence({ strategyData, onNavigateToSimulator }) {
  const { performance } = strategyData;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-3">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Recovery Strategy Performance</h3>
        <p className="text-xs text-slate-500 font-medium">Comparative strategy efficiency analysis and usage trends</p>
      </div>

      {/* Strategy Performance Table (Requirement #21) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strategy Yield Matrix</h4>

        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Strategy</th>
                <th className="py-3 px-3 text-center">Recovery Probability</th>
                <th className="py-3 px-4 text-right">Potential Recovery</th>
                <th className="py-3 px-3 text-center">Customer Impact</th>
                <th className="py-3 px-4 text-right">Portfolio Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {performance.map((st) => (
                <tr key={st.strategy} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>{st.strategy}</span>
                    {st.strategy === 'Delayed Retry' && <Badge variant="indigo">Top Performer</Badge>}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold text-indigo-600">{st.recoveryProbability}%</td>
                  <td className="py-3 px-4 text-right font-mono font-black text-emerald-600">{st.formattedPotentialRecovery}</td>
                  <td className="py-3 px-3 text-center">
                    <Badge variant={st.customerImpact === 'Low' ? 'emerald' : st.customerImpact === 'Medium' ? 'amber' : 'rose'}>
                      {st.customerImpact}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-700">{st.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Strategy Insight Banner & Simulate Strategy Action (Requirements #23, #37) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-indigo-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">✦ AI Strategy Insight</span>
          </div>
          <p className="text-xs text-indigo-200 font-medium max-w-xl leading-relaxed">
            Delayed Retry currently shows the strongest estimated recovery performance for temporary bank failures in the demo dataset (+7% improvement trend).
          </p>
        </div>

        <Button 
          variant="ai"
          size="sm"
          onClick={() => onNavigateToSimulator && onNavigateToSimulator()}
          className="shrink-0 font-extrabold shadow-md"
        >
          <SlidersHorizontal className="w-4 h-4 mr-1.5" />
          <span>Simulate Strategy</span>
        </Button>
      </div>
    </div>
  );
}
