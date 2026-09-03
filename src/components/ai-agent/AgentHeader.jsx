import React, { useState } from 'react';
import PageHeader from '../layout/PageHeader';
import Tooltip from '../ui/Tooltip';
import { Sparkles, ShieldCheck, PlayCircle, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

export default function AgentHeader() {
  const [showWorkflow, setShowWorkflow] = useState(false);

  const workflowSteps = [
    { label: "Failed Payment", desc: "Transaction decline payload received" },
    { label: "AI Analysis", desc: "Extract error codes & history" },
    { label: "Failure Diagnosis", desc: "Classify temporary vs permanent" },
    { label: "Customer Context", desc: "Analyze LTV & success rate" },
    { label: "Probability Score", desc: "ML probability calculation" },
    { label: "Strategy Selection", desc: "Optimal retry rule selection" },
    { label: "Explain Reasoning", desc: "Plain language rationale" },
    { label: "Safety Checks", desc: "Guardrail & limit check" },
    { label: "Merchant Approval", desc: "Human-in-the-loop signoff" },
    { label: "Simulated Action", desc: "Sandbox execution" },
    { label: "Audit Log", desc: "Immutable event recording" }
  ];

  return (
    <div className="space-y-4 mb-6">
      <PageHeader 
        title="AI Recovery Agent"
        description="AI-powered recovery recommendations for failed payments. Review, approve, and simulate recovery actions."
        breadcrumbs={[{ label: 'AI Recovery Agent' }]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {/* Agent Status */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Agent Status: ● Online</span>
            </div>

            {/* Simulation Mode */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/70 rounded-full text-xs font-bold shadow-xs">
              <PlayCircle className="w-3.5 h-3.5 text-violet-600" />
              <span>Simulation Mode</span>
            </div>

            {/* Agent Confidence */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Agent Confidence: 94%</span>
            </div>

            {/* Safety Status */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 border border-slate-200/80 rounded-full text-xs font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safety Status: ✓ All systems protected</span>
              <Tooltip text="Bounded actions, max 3 retry limits, and merchant approval required." />
            </div>

            {/* Toggle Visual Workflow Pipeline */}
            <button
              onClick={() => setShowWorkflow(!showWorkflow)}
              className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full text-xs font-bold shadow-xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Workflow Pipeline</span>
              {showWorkflow ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        }
      />

      {/* Visual Workflow Pipeline Box */}
      {showWorkflow && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white space-y-3 shadow-lg border border-indigo-900/40 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">AI Autonomous Recovery Pipeline</span>
            </div>
            <span className="text-[11px] font-mono text-indigo-300">Human-in-the-Loop Architecture</span>
          </div>

          {/* Workflow Steps Horizontal Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-1.5 text-center">
            {workflowSteps.map((st, idx) => (
              <div 
                key={idx} 
                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors space-y-1 relative group"
              >
                <div className="w-4 h-4 rounded-full bg-indigo-500/30 text-indigo-300 font-bold text-[9px] flex items-center justify-center mx-auto border border-indigo-400/40">
                  {idx + 1}
                </div>
                <p className="text-[10px] font-bold text-white leading-tight">{st.label}</p>
                <div className="absolute inset-x-0 -bottom-8 hidden group-hover:block z-20 p-2 bg-slate-900 text-[10px] text-indigo-200 rounded-lg border border-indigo-500/40 shadow-xl whitespace-nowrap">
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
