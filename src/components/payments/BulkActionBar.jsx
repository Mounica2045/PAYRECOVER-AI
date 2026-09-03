import React from 'react';
import Button from '../ui/Button';
import { Sparkles, CheckSquare, X } from 'lucide-react';

export default function BulkActionBar({
  selectedCount,
  onSimulateBulk,
  onAddToReview,
  onClearSelection
}) {
  if (selectedCount === 0) return null;

  return (
    <div className="p-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-xl flex items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-150 border border-indigo-500/30">
      <div className="flex items-center gap-2 text-xs">
        <CheckSquare className="w-4 h-4 text-indigo-400" />
        <span className="font-bold text-white">{selectedCount} payments selected</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30 ml-2">
          Bulk Simulation Mode
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onAddToReview}
          className="bg-white/10 hover:bg-white/20 text-white border-0"
        >
          Add to Review
        </Button>

        <Button 
          variant="ai" 
          size="sm" 
          onClick={onSimulateBulk}
          className="flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
          <span>Simulate Bulk Recovery</span>
        </Button>

        <button 
          onClick={onClearSelection}
          className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors ml-1"
          aria-label="Clear selection"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
