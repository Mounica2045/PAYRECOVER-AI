import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Sparkles, ArrowRight, Download, ShieldCheck, AlertCircle, TrendingUp } from 'lucide-react';

export default function AIRecommendations({
  insightsData,
  onNavigateToAgent,
  onNavigateToCampaigns,
  onNavigateToSimulator,
  onExportInsights
}) {
  const { recommendations, feed } = insightsData;

  const handleActionClick = (route) => {
    if (route === 'ai-agent' && onNavigateToAgent) onNavigateToAgent();
    else if (route === 'campaigns' && onNavigateToCampaigns) onNavigateToCampaigns();
    else if (route === 'simulator' && onNavigateToSimulator) onNavigateToSimulator();
  };

  return (
    <div className="space-y-6">
      {/* 1. AI Recommended Priority Actions (Requirement #28) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">✦ AI Priority Recommendations</h3>
          </div>
          <Button variant="outline" size="sm" onClick={onExportInsights} className="text-xs">
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Insights</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="p-4 space-y-3 border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono font-bold text-xs text-indigo-600">
                  <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-[11px]">{rec.num}</span>
                  <span>Priority Action</span>
                </div>
                <h4 className="font-extrabold text-xs text-slate-900">{rec.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{rec.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Potential Impact</span>
                  <span className="font-mono font-black text-emerald-600 text-xs">{rec.potentialRecovery}</span>
                </div>

                <Button 
                  variant="ai"
                  size="sm"
                  onClick={() => handleActionClick(rec.actionRoute)}
                  className="text-[11px] py-1 px-3"
                >
                  <span>{rec.actionText}</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. AI Insight Feed Cards (Requirement #29) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Intelligence Feed</h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {feed.map((ins) => (
            <div 
              key={ins.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={ins.severity === 'positive' ? 'emerald' : ins.severity === 'warning' ? 'amber' : 'indigo'}>
                    ✦ {ins.category}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400">High Conf (88%)</span>
                </div>

                <h5 className="font-extrabold text-xs text-slate-900">{ins.title}</h5>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{ins.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleActionClick(ins.route)}
                  className="w-full text-xs text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  <span>{ins.buttonText} →</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Explanation Box (Requirement #32) */}
      <Card className="p-4 bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
        <h5 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Why these AI predictions?</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600 font-medium">
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" /><span>Recent failure telemetry</span></div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" /><span>Historical recovery behavior</span></div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" /><span>Decline code distribution</span></div>
          <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" /><span>Selected recovery strategy</span></div>
        </div>
      </Card>
    </div>
  );
}
