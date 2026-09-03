import React from 'react';
import PageHeader from '../layout/PageHeader';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import { Plus, PlayCircle, Sparkles, Send } from 'lucide-react';

export default function CampaignHeader({ onCreateClick }) {
  return (
    <div className="space-y-4 mb-6">
      <PageHeader 
        title="Recovery Campaigns"
        description="Create, simulate and analyze AI-powered payment recovery campaigns."
        breadcrumbs={[{ label: 'Recovery Campaigns' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* Simulation Mode Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/80 rounded-full text-xs font-bold shadow-xs">
              <PlayCircle className="w-3.5 h-3.5 text-violet-600" />
              <span>Simulation Mode</span>
              <Tooltip text="No real messages or customer communications will be dispatched." />
            </div>

            {/* Create Campaign Button */}
            <Button 
              variant="ai"
              size="sm"
              onClick={onCreateClick}
              className="flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </Button>
          </div>
        }
      />
    </div>
  );
}
