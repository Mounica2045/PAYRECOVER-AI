import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Bot, User, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AgentChatStream({ messages = [], onNavigateToRoute }) {
  if (messages.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span>Agent Conversation Stream</span>
      </div>

      <div className="space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-2">
            {/* Merchant Prompt Message */}
            {msg.sender === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-xl p-3.5 rounded-2xl bg-indigo-900 text-white text-xs font-medium shadow-sm flex items-start gap-2.5">
                  <span>{msg.text}</span>
                  <User className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                </div>
              </div>
            )}

            {/* AI Agent Response Message */}
            {msg.sender === 'agent' && (
              <div className="flex justify-start">
                <Card className="max-w-2xl p-4 space-y-3 border border-indigo-100 shadow-md bg-white">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-indigo-900 border-b border-slate-100 pb-2">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    <span>✦ PayRecover AI Agent</span>
                    {msg.confidence && <Badge variant="indigo" className="ml-auto font-mono text-[10px]">Confidence {(msg.confidence * 100).toFixed(0)}%</Badge>}
                  </div>

                  <p className="text-xs text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                    {msg.text}
                  </p>

                  {/* Prohibited Warning */}
                  {msg.isProhibited && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Security Guardrail: Live financial mutations are strictly blocked in this simulation environment.</span>
                    </div>
                  )}

                  {/* Structured Payload Card */}
                  {msg.dataPayload && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-medium space-y-1 font-mono">
                      {msg.dataPayload.potentialRecovery && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Estimated Potential Recovery:</span>
                          <span className="font-bold text-emerald-600">{msg.dataPayload.potentialRecovery}</span>
                        </div>
                      )}
                      {msg.dataPayload.strategy && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Recommended Strategy:</span>
                          <span className="font-bold text-indigo-600">{msg.dataPayload.strategy}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.actionRoute && (
                    <div className="pt-2 flex items-center gap-2">
                      <Button 
                        variant="ai"
                        size="sm"
                        onClick={() => onNavigateToRoute && onNavigateToRoute(msg.actionRoute)}
                        className="text-xs font-extrabold"
                      >
                        <span>{msg.actionButtonText || "View Details"}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
