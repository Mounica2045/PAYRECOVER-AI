import React from 'react';
import { Sparkles, Clock, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';

export default function IntelligenceBanner({ onRefresh, isRefreshing }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-indigo-900/40 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
            <span>✦ AI Recovery Intelligence</span>
          </h4>
          <p className="text-xs text-indigo-200/90 font-medium mt-0.5">
            Your recovery data indicates several high-potential opportunities that may improve payment recovery.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[11px] font-mono text-indigo-300 font-medium flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Last analysis: Today, 10:42 AM</span>
        </span>

        <Button 
          variant="ai"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-xs py-1 px-3 shadow-xs"
        >
          <RefreshCw className={`w-3 h-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Analysis</span>
        </Button>
      </div>
    </div>
  );
}
