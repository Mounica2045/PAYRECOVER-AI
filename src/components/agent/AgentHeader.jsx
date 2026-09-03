import React from 'react';
import PageHeader from '../layout/PageHeader';
import Badge from '../ui/Badge';
import { Bot, ShieldCheck, Sparkles } from 'lucide-react';

export default function AgentHeader() {
  return (
    <div className="mb-6">
      <PageHeader 
        title="AI Recovery Agent"
        description="An intelligent recovery agent that analyzes payment failures, recommends actions, and orchestrates safe recovery workflows."
        breadcrumbs={[{ label: 'AI Agent' }]}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="emerald" className="flex items-center gap-1.5 py-1 px-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Agent Online</span>
            </Badge>

            <Badge variant="indigo" className="py-1 px-3 shadow-xs">
              Simulation Mode
            </Badge>
          </div>
        }
      />
    </div>
  );
}
