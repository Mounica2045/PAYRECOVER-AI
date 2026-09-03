import React from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { FileText, Sparkles, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DocumentationModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="PayRecover AI Merchant Documentation"
      subtitle="Complete developer guides, API specifications, and operational manuals"
    >
      <div className="space-y-4 text-xs font-medium">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">Merchant User Guide & Documentation</span>
          </div>
          <p className="text-xs text-indigo-200 leading-relaxed font-medium">
            Learn how to leverage AI Recovery Intelligence, automate 6-step recovery campaigns, and configure 8/8 safety guardrails for failed payments.
          </p>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-900">AI Telemetry & Recovery Diagnosis Guide</h5>
                <p className="text-[10px] text-slate-500">Decline code analysis, probability scoring, and retry strategies</p>
              </div>
            </div>
            <Badge variant="indigo">V2.4 Active</Badge>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <h5 className="font-bold text-slate-900">Autonomous Safety Gate & Guardrails Spec</h5>
                <p className="text-[10px] text-slate-500">8/8 Safety rules, 15-minute cooldown, and security hard-stop controls</p>
              </div>
            </div>
            <Badge variant="emerald">Verified</Badge>
          </div>
        </div>
      </div>
    </Modal>
  );
}
