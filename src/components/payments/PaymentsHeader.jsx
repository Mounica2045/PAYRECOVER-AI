import React from 'react';
import Button from '../ui/Button';
import { Download, RefreshCw } from 'lucide-react';
import PageHeader from '../layout/PageHeader';

export default function PaymentsHeader({ onExportCSV, onRefresh, isRefreshing }) {
  return (
    <PageHeader
      title="Payments"
      description="Monitor payment attempts and identify transactions that may be recoverable."
      actions={
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExportCSV}
            className="flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </Button>

          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onRefresh}
            isLoading={isRefreshing}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`w-4 h-4 text-slate-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      }
    />
  );
}
