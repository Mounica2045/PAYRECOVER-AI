import React, { useState } from 'react';
import { History, Search, ShieldCheck, Download, Filter } from 'lucide-react';

export default function AuditLog({ auditLogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.decision.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesResult = filterResult === 'All' || log.result.toLowerCase() === filterResult.toLowerCase();

    return matchesSearch && matchesResult;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Audit Log</h1>
            <span className="badge-indigo">
              <ShieldCheck className="w-3 h-3 text-brand-600" />
              Immutable Audit Trail
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Every automated AI diagnosis, confidence score, and human-in-the-loop approval is recorded and traceable.</p>
        </div>

        <button className="py-2.5 px-4 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 shadow-subtle transition-colors">
          <Download className="w-4 h-4 text-slate-400" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="fintech-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by transaction ID, customer, decision..."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={filterResult}
            onChange={(e) => setFilterResult(e.target.value)}
            className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">Result: All ▼</option>
            <option value="recovered">Recovered</option>
            <option value="pending">Pending</option>
            <option value="review">Review</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="fintech-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Transaction</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">AI Decision</th>
                <th className="py-3 px-4">Action Taken</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Approval Origin</th>
                <th className="py-3 px-4 text-right">Result State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    <span className="font-bold text-slate-800">{log.timestamp}</span>
                    <span className="text-[10px] text-slate-400 block">{log.date}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{log.txnId}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{log.customer}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-[11px] border border-indigo-100">
                      {log.decision}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{log.action}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-extrabold text-brand-600">{log.confidence}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {log.approver}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`
                      ${log.result === 'Recovered' ? 'badge-emerald' : ''}
                      ${log.result === 'Pending' ? 'badge-amber' : ''}
                      ${log.result === 'Review' ? 'badge-slate' : ''}
                    `}>
                      {log.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
