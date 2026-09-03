import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { Loader2 } from 'lucide-react';

export default function SimulationProgress({ isOpen, onComplete }) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "Loading payment context",
    "Evaluating strategy",
    "Running safety checks",
    "Estimating recovery",
    "Generating simulation result"
  ];

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete && onComplete();
          }, 350);
          return prev;
        }
        return prev + 1;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="Running Strategy Simulation..."
      subtitle="AI strategy engine sandbox execution pipeline."
    >
      <div className="py-6 space-y-5 text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-subtle">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>

        <div className="space-y-2.5 text-xs text-left max-w-sm mx-auto">
          {steps.map((text, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-2.5 font-medium transition-opacity ${idx <= stepIndex ? 'opacity-100 text-slate-900' : 'opacity-30 text-slate-400'}`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${isDone ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-400'}`}>
                  {isDone ? '✓' : idx + 1}
                </div>
                <span>{isDone ? `✓ ${text}` : text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
