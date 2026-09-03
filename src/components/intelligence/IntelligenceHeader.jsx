import React from 'react';
import PageHeader from '../layout/PageHeader';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import { RefreshCw, Sparkles, Download, LineChart } from 'lucide-react';

export default function IntelligenceHeader({
  onRefresh,
  isRefreshing,
  onExportReport,
  onExportInsights
}) {
  return (
    <div className="space-y-4 mb-6">
      <PageHeader 
        title="AI Recovery Intelligence"
        description="Predict payment recovery opportunities, identify failure patterns, and prioritize revenue recovery."
        breadcrumbs={[{ label: 'AI Intelligence' }]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* Demo Predictive Analytics Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Demo Predictive Analytics</span>
              <Tooltip text="All forecasts and AI predictions represent estimated simulation metrics." />
            </div>

            {/* Export CSV Report */}
            <Button 
              variant="outline"
              size="sm"
              onClick={onExportReport}
              className="flex items-center gap-1.5 border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Report</span>
            </Button>

            {/* Refresh Analysis Button */}
            <Button 
              variant="ai"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 shadow-md"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Updating AI Intelligence...' : 'Refresh Analysis'}</span>
            </Button>
          </div>
        }
      />
    </div>
  );
}
