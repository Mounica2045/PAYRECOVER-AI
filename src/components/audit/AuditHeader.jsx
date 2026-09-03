import React from 'react';
import PageHeader from '../layout/PageHeader';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import { Download, PlayCircle, ShieldCheck, FileText } from 'lucide-react';

export default function AuditHeader({ onExportCSV }) {
  return (
    <div className="space-y-4 mb-6">
      <PageHeader 
        title="Audit & Safety Center"
        description="Track AI decisions, merchant approvals, simulations, and safety events across your recovery workflow."
        breadcrumbs={[{ label: 'Audit & Safety Center' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* Simulation Mode Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/80 rounded-full text-xs font-bold shadow-xs">
              <PlayCircle className="w-3.5 h-3.5 text-violet-600" />
              <span>Simulation Mode</span>
              <Tooltip text="No real payments will be processed. All event logs are sandbox simulated." />
            </div>

            {/* Export CSV Button */}
            <Button 
              variant="outline"
              size="sm"
              onClick={onExportCSV}
              className="flex items-center gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </Button>
          </div>
        }
      />
    </div>
  );
}
