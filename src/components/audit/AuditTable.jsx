import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  PlayCircle, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CircleDot, 
  RefreshCw,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';

export default function AuditTable({
  events = [],
  onSelectEvent,
  sortConfig,
  onSort,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange
}) {
  const getEventIcon = (type) => {
    switch (type) {
      case 'AI Recommendation':
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      case 'Merchant Approval':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'Merchant Rejection':
        return <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 'Simulation Started':
        return <PlayCircle className="w-3.5 h-3.5 text-violet-600 shrink-0" />;
      case 'Simulation Completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'Safety Check Passed':
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
      case 'Safety Check Failed':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />;
      case 'Manual Review':
        return <CircleDot className="w-3.5 h-3.5 text-amber-600 shrink-0" />;
      case 'Strategy Changed':
        return <RefreshCw className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Recommended':
        return <Badge variant="indigo">Recommended</Badge>;
      case 'Approved':
        return <Badge variant="emerald">Approved</Badge>;
      case 'Rejected':
        return <Badge variant="rose">Rejected</Badge>;
      case 'Simulated':
        return <Badge variant="emerald">Simulated</Badge>;
      case 'Blocked':
        return <Badge variant="rose">Blocked</Badge>;
      case 'Passed':
        return <Badge variant="emerald">Passed</Badge>;
      case 'Failed':
        return <Badge variant="rose">Failed</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  return (
    <Card className="p-0 overflow-hidden border border-slate-200/80 shadow-xs">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Audit Events Log</h3>
          <p className="text-xs text-slate-500 font-medium">Immutable timeline of AI telemetry, merchant approvals, and safety guardrails</p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-slate-500 font-bold">{totalItems} Total Recorded Events</span>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400">
          No audit events found matching your filter criteria.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Event</th>
                  <th className="py-3 px-4">Transaction</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Strategy</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {events.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onSelectEvent(item)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {item.timestamp}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        {getEventIcon(item.type)}
                        <span>{item.type}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-indigo-600">
                      {item.transactionId}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.customer}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                      {item.formattedAmount}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/80 text-[10px]">
                        {item.actor}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {item.strategy || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View (Requirement #42) */}
          <div className="md:hidden divide-y divide-slate-100">
            {events.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectEvent(item)}
                className="p-4 space-y-2 cursor-pointer hover:bg-slate-50"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    {getEventIcon(item.type)}
                    <span>{item.type}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{item.timestamp}</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <p className="font-extrabold text-slate-900">{item.customer}</p>
                    <p className="font-mono text-[11px] text-indigo-600 font-bold">{item.transactionId}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-black text-slate-900">{item.formattedAmount}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{item.strategy}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-500">Actor: <strong className="text-slate-800">{item.actor}</strong></span>
                  {getStatusBadge(item.status)}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls (Requirement #31) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900 font-bold">{Math.min(totalItems, (currentPage - 1) * 10 + 1)}–{Math.min(totalItems, currentPage * 10)}</strong> of <strong className="text-slate-900 font-bold">{totalItems}</strong> events
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center gap-1 text-slate-600"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </Button>

              <div className="flex items-center gap-1 px-2 font-mono font-bold text-slate-700">
                Page {currentPage} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center gap-1 text-slate-600"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
