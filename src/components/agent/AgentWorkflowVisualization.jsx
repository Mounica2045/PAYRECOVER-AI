import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { CheckCircle2, Circle, ArrowRight, Activity } from 'lucide-react';

export default function AgentWorkflowVisualization() {
  const steps = [
    { name: "Observe", status: "Completed" },
    { name: "Analyze", status: "Completed" },
    { name: "Predict", status: "Completed" },
    { name: "Recommend", status: "Completed" },
    { name: "Safety Check", status: "Completed" },
    { name: "Approval", status: "Current" },
    { name: "Simulate", status: "Pending" },
    { name: "Audit", status: "Pending" },
    { name: "Result", status: "Pending" }
  ];

  return (
    <Card className="p-5 space-y-4 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Agent Autonomous Workflow Pipeline</h3>
        </div>
        <Badge variant="indigo">End-to-End Orchestration</Badge>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-center min-w-max gap-2 text-xs">
          {steps.map((st, idx) => {
            const isCompleted = st.status === 'Completed';
            const isCurrent = st.status === 'Current';
            return (
              <React.Fragment key={st.name}>
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                  isCompleted ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
                  isCurrent ? 'bg-indigo-600 border-indigo-700 text-white shadow-md animate-pulse' :
                  'bg-slate-50 border-slate-200/80 text-slate-400 opacity-60'
                }`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                    isCompleted ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-white text-indigo-600' : 'bg-slate-300 text-slate-500'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <span>{st.name}</span>
                </div>

                {idx < steps.length - 1 && (
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${idx < 5 ? 'text-emerald-500' : 'text-slate-300'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
