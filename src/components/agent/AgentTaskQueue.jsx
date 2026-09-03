import React, { useState } from 'react';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Layers, AlertTriangle, CheckCircle2, Clock, PlayCircle, ShieldAlert } from 'lucide-react';

export default function AgentTaskQueue({ tasks = [], onApproveTask, onExecuteTask }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const getPriorityBadge = (p) => {
    if (p === 'Critical') return <Badge variant="rose">Critical</Badge>;
    if (p === 'High') return <Badge variant="amber">High</Badge>;
    return <Badge variant="indigo">Medium</Badge>;
  };

  const getStatusBadge = (st) => {
    if (st === 'Completed') return <Badge variant="emerald">✓ Completed</Badge>;
    if (st === 'Waiting for Approval') return <Badge variant="amber" className="animate-pulse">⚠ Waiting Approval</Badge>;
    if (st === 'Running Simulation') return <Badge variant="indigo" className="animate-pulse font-bold">● Running Simulation</Badge>;
    return <Badge variant="slate">{st}</Badge>;
  };

  return (
    <Card className="p-5 space-y-4 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Active Agent Tasks Queue</h3>
          <p className="text-xs text-slate-500 font-medium">Prioritized autonomous task pipeline and approval gates</p>
        </div>
        <span className="font-mono text-xs font-bold text-slate-500">{tasks.length} Active Tasks</span>
      </div>

      <div className="space-y-3">
        {tasks.map((t) => (
          <div 
            key={t.id}
            onClick={() => setSelectedTask(t)}
            className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/80 cursor-pointer transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-indigo-600 font-extrabold">{t.id}</span>
                <span className="font-black text-slate-900">{t.title}</span>
                {getPriorityBadge(t.priority)}
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(t.status)}
                <span className="font-mono text-[10px] text-slate-400">{t.startedAt}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed">{t.description}</p>

            {/* Merchant Approval Gate Callout (Requirement #15 & #16) */}
            {t.status === 'Waiting for Approval' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs font-medium space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    <span>⚠ Merchant Approval Required</span>
                  </div>
                  <span className="font-mono font-black text-emerald-700">Est. Yield {t.potentialRecovery}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button 
                    variant="emerald"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApproveTask && onApproveTask(t.id, true);
                    }}
                    className="text-xs font-extrabold py-1 px-4 shadow-xs"
                  >
                    <span>Approve</span>
                  </Button>

                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApproveTask && onApproveTask(t.id, false);
                    }}
                    className="text-xs py-1 px-3 text-rose-600 border-rose-200 hover:bg-rose-50"
                  >
                    <span>Reject</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Task Detail Modal (Requirement #12) */}
      {selectedTask && (
        <Modal
          isOpen={Boolean(selectedTask)}
          onClose={() => setSelectedTask(null)}
          title={`Task Details: ${selectedTask.id}`}
          subtitle={selectedTask.title}
          primaryAction={{
            label: "Close",
            variant: "primary",
            onClick: () => setSelectedTask(null)
          }}
        >
          <div className="space-y-4 text-xs font-medium">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Task Status</span>
                {getStatusBadge(selectedTask.status)}
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Task Priority</span>
                {getPriorityBadge(selectedTask.priority)}
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Input Stream</span>
                <span className="font-mono text-slate-800">{selectedTask.input}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Potential Recovery</span>
                <span className="font-mono font-black text-emerald-600">{selectedTask.potentialRecovery}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Recommended Strategy</span>
                <span className="font-bold text-indigo-600">{selectedTask.recommendedStrategy}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Output Summary</span>
              <p className="text-slate-800 font-mono text-xs">{selectedTask.output}</p>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
