import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AILoadingState({
  message = "Analyzing payment failure signals & telemetry..."
}) {
  return (
    <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4 border border-indigo-500/20 shadow-xl">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mx-auto text-indigo-300 animate-pulse">
        <Sparkles className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-extrabold text-sm text-white">Evaluating Recovery Model</h4>
        <p className="text-xs text-indigo-200/80 mt-1 font-medium">{message}</p>
      </div>
      <div className="w-32 bg-slate-800 rounded-full h-1.5 mx-auto overflow-hidden">
        <div className="bg-indigo-500 h-full rounded-full animate-pulse w-3/4" />
      </div>
    </div>
  );
}
