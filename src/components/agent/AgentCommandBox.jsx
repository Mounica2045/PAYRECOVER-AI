import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Send, Sparkles, Search, Command, Zap } from 'lucide-react';
import { sampleSuggestedCommands } from '../../data/agentData';

export default function AgentCommandBox({ onSubmitCommand }) {
  const [commandText, setCommandText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commandText.trim()) return;
    onSubmitCommand(commandText);
    setCommandText('');
  };

  const handleSuggestionClick = (cmd) => {
    onSubmitCommand(cmd);
  };

  const quickCommands = [
    { label: "Find Opportunities", text: "Find high-value recovery opportunities" },
    { label: "Analyze Failures", text: "What caused today's payment failures?" },
    { label: "Forecast Recovery", text: "Forecast recovery for next 7 days" },
    { label: "Create Campaign", text: "Create a recovery campaign for temporary bank failures" },
    { label: "Run Strategy Simulation", text: "Compare delayed retry with immediate retry" },
    { label: "Review Safety", text: "Show safety guardrails status" }
  ];

  return (
    <Card className="p-5 space-y-4 border border-indigo-100 shadow-md bg-gradient-to-b from-white to-slate-50/50">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <span>Ask the Recovery Agent</span>
        </div>

        <div className="relative flex items-center">
          <input 
            type="text"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            placeholder="Ask the agent e.g. 'Find high-value recovery opportunities' or 'Analyze today's failures'..."
            className="w-full pl-4 pr-28 py-3.5 rounded-2xl border border-slate-300 text-xs font-medium bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 shadow-inner outline-none transition-all"
          />

          <Button 
            type="submit"
            variant="ai"
            size="sm"
            className="absolute right-2 font-extrabold px-4 shadow-sm"
          >
            <span>Ask Agent</span>
            <Send className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </form>

      {/* Quick Commands Buttons (Requirement #5) */}
      <div className="space-y-2 pt-1 border-t border-slate-200/60">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">Quick Commands</span>
        
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((qc) => (
            <button
              key={qc.label}
              onClick={() => handleSuggestionClick(qc.text)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-700 transition-all shadow-2xs flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-indigo-500" />
              <span>{qc.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
