import React from 'react';

export default function CampaignStepper({ currentStep, onStepClick }) {
  const steps = [
    { num: 1, label: 'Audience' },
    { num: 2, label: 'Strategy' },
    { num: 3, label: 'Message' },
    { num: 4, label: 'Preview' },
    { num: 5, label: 'Safety' },
    { num: 6, label: 'Simulation' }
  ];

  return (
    <div className="w-full bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6">
      <div className="flex items-center justify-between overflow-x-auto max-w-full space-x-2">
        {steps.map((st, idx) => {
          const isDone = st.num < currentStep;
          const isCurrent = st.num === currentStep;

          return (
            <React.Fragment key={st.num}>
              <div 
                onClick={() => onStepClick && onStepClick(st.num)}
                className={`
                  flex items-center gap-2 cursor-pointer shrink-0 transition-all py-1 px-2.5 rounded-xl
                  ${isCurrent ? 'bg-indigo-50 text-indigo-700 font-extrabold border border-indigo-200' : isDone ? 'text-slate-900 font-bold hover:bg-slate-50' : 'text-slate-400 font-medium opacity-60'}
                `}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0
                  ${isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}
                `}>
                  {isDone ? '✓' : st.num}
                </div>
                <span className="text-xs">{st.label}</span>
              </div>

              {idx < steps.length - 1 && (
                <div className="h-0.5 w-6 bg-slate-200 shrink-0 hidden sm:block" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
