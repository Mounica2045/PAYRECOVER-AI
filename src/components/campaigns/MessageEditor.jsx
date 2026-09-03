import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import { Sparkles, AlertTriangle, CheckCircle2, Copy, ShieldAlert } from 'lucide-react';
import { messageService } from '../../services/messageService';

export default function MessageEditor({
  channels = ['Email', 'SMS'],
  onChannelToggle,
  message,
  onMessageChange,
  onNext,
  onBack
}) {
  const [tone, setTone] = useState(message?.tone || 'Friendly');
  const [subject, setSubject] = useState(message?.subject || 'Your payment of {{payment_amount}} could not be completed');
  const [body, setBody] = useState(message?.body || 'Hi {{customer_name}},\n\nIt looks like your recent payment of {{payment_amount}} for transaction {{transaction_id}} could not be completed due to a temporary bank issue.\n\nYou can try again shortly without entering details again.\n\nThank you,\n{{merchant_name}} Support');

  const quality = messageService.calculateMessageQuality(subject, body);

  const variables = [
    '{{customer_name}}',
    '{{payment_amount}}',
    '{{transaction_id}}',
    '{{merchant_name}}',
    '{{retry_time}}'
  ];

  const handleGenerateAI = () => {
    const gen = messageService.generateMessage(tone);
    setSubject(gen.subject);
    setBody(gen.body);
    onMessageChange({ subject: gen.subject, body: gen.body, tone });
  };

  const handleInsertVariable = (varName) => {
    setBody(prev => `${prev} ${varName}`);
    onMessageChange({ subject, body: `${body} ${varName}`, tone });
  };

  const handleSubjectChange = (val) => {
    setSubject(val);
    onMessageChange({ subject: val, body, tone });
  };

  const handleBodyChange = (val) => {
    setBody(val);
    onMessageChange({ subject, body: val, tone });
  };

  const allChannels = ['Email', 'SMS', 'WhatsApp', 'In-App'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Recovery Message</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Create a helpful message for customers with failed payments.</p>
      </div>

      {/* Channel Selection (Requirement #19) */}
      <Card className="p-5 space-y-3 border border-slate-200/80">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Communication Channels</h4>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-800">
          {allChannels.map((ch) => {
            const isChecked = channels.includes(ch);
            return (
              <label key={ch} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onChannelToggle(ch)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{ch}</span>
              </label>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-400 font-medium pt-1">
          ✦ Simulation mode active. No customer messages will actually be dispatched across selected channels.
        </p>
      </Card>

      {/* AI Message Generator Toolbar (Requirement #20) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">AI Message Generator</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-indigo-200 font-medium">Tone:</span>
            <Select 
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-white/10 text-white border-white/20 py-1 text-xs font-bold"
            >
              <option value="Friendly" className="text-slate-900">Friendly</option>
              <option value="Professional" className="text-slate-900">Professional</option>
              <option value="Concise" className="text-slate-900">Concise</option>
              <option value="Helpful" className="text-slate-900">Helpful</option>
            </Select>
          </div>

          <Button 
            variant="ai"
            size="sm"
            onClick={handleGenerateAI}
            className="font-bold shadow-md"
          >
            ✦ Generate with AI
          </Button>
        </div>
      </div>

      {/* Sensitive Data / Misleading Claims Warning Banners (Requirements #24, #25) */}
      {quality.sensitive.hasSensitiveData && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>⚠ Sensitive information detected ({quality.sensitive.matches.join(', ')}). Remove sensitive information before continuing.</span>
        </div>
      )}

      {quality.claims.hasMisleadingClaims && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>⚠ Potentially misleading claim detected ("{quality.claims.claims.join(', ')}"). Use estimated or informational language instead.</span>
        </div>
      )}

      {/* Message Editor (Requirement #21) */}
      <Card className="p-5 space-y-4 border border-slate-200/80">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Subject Line</label>
          <Input 
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            placeholder="Enter message subject line..."
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Message Body</label>
          <Textarea 
            value={body}
            onChange={(e) => handleBodyChange(e.target.value)}
            rows={6}
            placeholder="Write recovery message..."
          />
        </div>

        {/* Message Variables Helper (Requirement #22) */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Variables (Click to insert)</span>
          <div className="flex flex-wrap gap-1.5">
            {variables.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => handleInsertVariable(v)}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-700 text-xs font-mono font-bold transition-colors"
              >
                + {v}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Message Quality Card (Requirement #23) */}
      <Card className="p-5 space-y-3 border border-slate-200/80 bg-slate-50/50">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">AI Message Quality</h4>
          <span className="font-mono font-black text-indigo-600 text-base">{quality.score} <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-medium">
          <div><span className="text-slate-500">Clarity:</span> <strong className="text-slate-900 block">{quality.clarity}</strong></div>
          <div><span className="text-slate-500">Tone:</span> <strong className="text-slate-900 block">{quality.tone}</strong></div>
          <div><span className="text-slate-500">Length:</span> <strong className="text-slate-900 block">{quality.length}</strong></div>
          <div><span className="text-slate-500">Personalization:</span> <strong className="text-slate-900 block">{quality.personalization}</strong></div>
          <div><span className="text-slate-500">Sensitive Data:</span> <strong className={quality.sensitive.hasSensitiveData ? 'text-rose-600 block' : 'text-emerald-600 block'}>{quality.sensitiveData}</strong></div>
          <div><span className="text-slate-500">Payment Claims:</span> <strong className={quality.claims.hasMisleadingClaims ? 'text-amber-600 block' : 'text-emerald-600 block'}>{quality.paymentClaims}</strong></div>
        </div>

        <p className="text-[10px] text-slate-400 font-medium">Demo AI Quality Score calculated via deterministic syntax and safety guardrail engine.</p>
      </Card>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button 
          variant="ai" 
          size="lg" 
          disabled={quality.sensitive.hasSensitiveData}
          onClick={onNext} 
          className="px-8 font-extrabold"
        >
          Continue to Preview →
        </Button>
      </div>
    </div>
  );
}
