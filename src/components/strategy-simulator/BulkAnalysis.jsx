import React, { useState, useMemo } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AISafetyCheck from '../ai/AISafetyCheck';
import { Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, Layers, PlayCircle } from 'lucide-react';
import { formatCurrency } from '../../data/dashboardData';
import { strategySimulator } from '../../services/strategySimulator';

export default function BulkAnalysis({
  payments = [],
  onRunBulkSimulation
}) {
  const [selectedIds, setSelectedIds] = useState(() => payments.slice(0, 3).map(p => p.id));
  const [selectedStrategyId, setSelectedStrategyId] = useState('Delayed Retry');

  const selectedPayments = useMemo(() => {
    return payments.filter(p => selectedIds.includes(p.id));
  }, [payments, selectedIds]);

  const totalValue = selectedPayments.reduce((sum, p) => sum + p.amount, 0);

  const bulkStrategies = useMemo(() => {
    return strategySimulator.getBulkStrategies(selectedPayments);
  }, [selectedPayments]);

  const selectedStrategy = bulkStrategies.find(s => s.id === selectedStrategyId) || bulkStrategies[0];
  const bestAlternative = bulkStrategies.find(s => s.id !== selectedStrategyId && s.id !== 'Delayed Retry') || bulkStrategies[1];
  const diff = selectedStrategy ? selectedStrategy.estimatedRecovery - (bestAlternative ? bestAlternative.estimatedRecovery : 0) : 0;

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === payments.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(payments.map(p => p.id));
    }
  };

  const hasBlockedItem = selectedPayments.some(p => p.attempts >= 3);

  const bulkSafetyChecks = [
    { id: '1', label: 'All transactions are eligible', status: 'Passed (Eligible merchant account)', passed: true },
    { id: '2', label: 'No duplicate simulations', status: 'Passed (Zero duplicate ID)', passed: true },
    { id: '3', label: 'Retry limits checked', status: hasBlockedItem ? 'Warning (1 payment at retry limit)' : 'Passed (Within limit)', passed: !hasBlockedItem },
    { id: '4', label: 'Merchant approval required', status: 'Passed (Human sign-off active)', passed: true },
    { id: '5', label: 'Simulation mode enabled', status: 'Passed (Sandbox environment)', passed: true }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Payment Selection Queue */}
      <Card className="p-5 space-y-4 border border-slate-200/80">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Select Failed Payments</h3>
            <p className="text-xs text-slate-500 font-medium">Select multiple failed payments to analyze aggregated recovery outcomes</p>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={selectedIds.length === payments.length && payments.length > 0}
              onChange={handleSelectAll}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700">Select All ({payments.length})</span>
          </div>
        </div>

        {/* Selected Summary Bar */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between text-xs">
          <div>
            <span className="font-extrabold text-slate-900">Selected Payments: </span>
            <span className="font-bold text-indigo-700 font-mono">{selectedPayments.length}</span>
          </div>
          <div>
            <span className="font-extrabold text-slate-900">Total Group Value: </span>
            <span className="font-mono font-black text-indigo-900 text-sm">{formatCurrency(totalValue)}</span>
          </div>
        </div>

        {/* Checkbox List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto pr-1">
          {payments.map((p) => {
            const isChecked = selectedIds.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                className={`
                  p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3
                  ${isChecked 
                    ? 'bg-indigo-50/80 border-indigo-500 font-bold' 
                    : 'bg-white border-slate-200/80 hover:bg-slate-50'}
                `}
              >
                <input 
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSelect(p.id)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900">{p.customer}</span>
                    <span className="font-mono text-indigo-600 font-bold">{p.id}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>{p.formattedAmount}</span>
                    <span>{p.failureReason}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 2. Bulk AI Recommendation Banner (Requirement #32) */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-3 shadow-lg border border-indigo-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">✦ Bulk AI Recommendation</span>
          </div>
          <Badge variant="indigo">Optimal Strategy</Badge>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xl font-black text-white">Delayed Retry</h4>
            <p className="text-xs text-indigo-200 font-medium mt-0.5">
              Highest expected recovery across the selected payment group.
            </p>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-right">
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">Estimated Additional Recovery</span>
            <span className="text-lg font-black text-emerald-300 font-mono">+{formatCurrency(diff)}</span>
          </div>
        </div>
      </div>

      {/* 3. Aggregated Strategy Comparison Table (Requirement #31) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Aggregated Strategy Results</h3>

        <div className="overflow-x-auto border border-slate-200/80 rounded-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Strategy</th>
                <th className="py-3 px-3 text-center">Avg Probability</th>
                <th className="py-3 px-3 text-center">Expected Recovery</th>
                <th className="py-3 px-3 text-center">Risk Profile</th>
                <th className="py-3 px-4 text-right">AI Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {bulkStrategies.map((st) => {
                const isSel = st.id === selectedStrategyId;

                return (
                  <tr
                    key={st.id}
                    onClick={() => setSelectedStrategyId(st.id)}
                    className={`cursor-pointer transition-colors ${isSel ? 'bg-indigo-50/80 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'}`}
                  >
                    <td className="py-3 px-4 flex items-center gap-2">
                      {isSel && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                      <span>{st.name}</span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-extrabold text-indigo-600">{st.probability}%</td>
                    <td className="py-3 px-3 text-center font-mono font-black text-slate-900">{st.formattedEstimatedRecovery}</td>
                    <td className="py-3 px-3 text-center">
                      <Badge variant={st.riskLevel === 'Low' ? 'emerald' : 'amber'}>{st.riskLevel}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-black text-indigo-700">{st.aiScore}/100</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 4. Bulk Safety Guardrails (Requirement #33) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bulk Safety Checks</h4>
          {hasBlockedItem && (
            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              ⚠ 1 transaction requires manual review
            </span>
          )}
        </div>

        <AISafetyCheck checks={bulkSafetyChecks} />

        <div className="pt-2">
          <Button
            variant="ai"
            size="lg"
            disabled={selectedPayments.length === 0}
            onClick={() => onRunBulkSimulation && onRunBulkSimulation(selectedPayments, selectedStrategy)}
            className="w-full flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Simulate Bulk Recovery Strategy</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
