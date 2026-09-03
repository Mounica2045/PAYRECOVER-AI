import React, { useState } from 'react';
import Badge from '../ui/Badge';
import Tooltip from '../ui/Tooltip';
import Button from '../ui/Button';
import EmptyState from '../data-display/EmptyState';
import Skeleton from '../ui/Skeleton';
import { 
  ArrowUpDown, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw,
  Sparkles,
  Eye
} from 'lucide-react';
import { paymentFailureTooltips } from '../../data/paymentsData';

export default function PaymentTable({
  data = [],
  selectedIds = [],
  onToggleSelectAll,
  onToggleSelectRow,
  onSelectRow,
  onSimulateAction,
  onAddToReview,
  sortConfig,
  onSort,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  isLoading = false
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Successful':
        return <Badge variant="emerald" hasDot>✓ Successful</Badge>;
      case 'Failed':
        return <Badge variant="rose" hasDot>✕ Failed</Badge>;
      case 'Pending':
        return <Badge variant="amber" hasDot>● Pending</Badge>;
      case 'Refunded':
        return <Badge variant="slate" hasDot>↩ Refunded</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  const getRecoveryBadge = (recoveryStatus) => {
    switch (recoveryStatus) {
      case 'Ready':
        return <Badge variant="emerald">Ready</Badge>;
      case 'Action Needed':
        return <Badge variant="amber">Action Needed</Badge>;
      case 'Pending':
        return <Badge variant="amber">Pending</Badge>;
      case 'Recovered':
        return <Badge variant="emerald">Recovered (Simulated)</Badge>;
      case 'Rejected':
        return <Badge variant="rose">Rejected</Badge>;
      case 'Review':
        return <Badge variant="slate">Review</Badge>;
      default:
        return <Badge variant="slate">Not Eligible</Badge>;
    }
  };

  const allSelected = data.length > 0 && data.every(item => selectedIds.includes(item.id));

  return (
    <div className="fintech-card overflow-hidden flex flex-col justify-between">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 w-10">
                <input 
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-4">Customer</th>
              <th className="py-3.5 px-4">Transaction</th>
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => onSort && onSort('amount')}
              >
                <div className="flex items-center gap-1">
                  <span>Amount</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Method</th>
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => onSort && onSort('status')}
              >
                <div className="flex items-center gap-1">
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Failure Reason</th>
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => onSort && onSort('probability')}
              >
                <div className="flex items-center gap-1">
                  <span>AI Prob.</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Recovery Status</th>
              <th 
                className="py-3.5 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                onClick={() => onSort && onSort('rawDate')}
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx}>
                  <td colSpan={11} className="py-4 px-4">
                    <Skeleton height="h-6" width="w-full" />
                  </td>
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={11} className="py-12 text-center">
                  <EmptyState 
                    title="No payments found"
                    description="Try changing your search terms or resetting active filter selections."
                  />
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr 
                    key={item.id}
                    className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-indigo-50/30' : ''}`}
                  >
                    <td className="py-3.5 px-4">
                      <input 
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelectRow && onToggleSelectRow(item.id)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {item.initials}
                        </div>
                        <div>
                          <p 
                            onClick={() => onSelectRow(item)}
                            className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                          >
                            {item.customer}
                          </p>
                          <p className="text-[11px] text-slate-400">{item.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span 
                        onClick={() => onSelectRow(item)}
                        className="font-mono font-bold text-indigo-700 hover:underline cursor-pointer"
                      >
                        {item.id}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">{item.formattedAmount}</td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                        {item.method}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.failureReason === '—' ? (
                        <span className="text-slate-300">—</span>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-800 font-medium">
                          <span>{item.failureReason}</span>
                          {paymentFailureTooltips[item.failureReason] && (
                            <Tooltip text={paymentFailureTooltips[item.failureReason]} />
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {item.probability ? (
                        <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                          {item.probability}%
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {getRecoveryBadge(item.recoveryStatus)}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 font-medium text-[11px]">
                      {item.date}
                    </td>

                    <td className="py-3.5 px-4 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          aria-label="Row menu"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {activeMenuId === item.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-200/80 rounded-2xl shadow-dropdown p-1.5 z-50 animate-in fade-in duration-150">
                            <button
                              onClick={() => {
                                onSelectRow(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              View Details
                            </button>

                            {item.status === 'Failed' && item.recoveryStatus !== 'Recovered' && (
                              <button
                                onClick={() => {
                                  onSimulateAction(item);
                                  setActiveMenuId(null);
                                }}
                                className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                Simulate Recovery
                              </button>
                            )}

                            <button
                              onClick={() => {
                                onAddToReview(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              Add to Review
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
        <span>
          Showing {Math.min(1, totalItems)}–{Math.min(data.length, totalItems)} of {totalItems} payments
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4 mr-0.5" />
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`w-8 h-8 rounded-xl font-bold transition-colors ${pageNum === currentPage ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200 text-slate-700'}`}
              >
                {pageNum}
              </button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
