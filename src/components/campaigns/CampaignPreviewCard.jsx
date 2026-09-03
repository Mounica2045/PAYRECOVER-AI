import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Mail, Smartphone, ShieldCheck } from 'lucide-react';

export default function CampaignPreviewCard({
  campaignData,
  message,
  onNext,
  onBack
}) {
  const sampleCustomer = {
    name: "Rahul Sharma",
    amount: "₹4,999",
    txnId: "TXN_1042",
    merchant: "Acme Corp.",
    time: "15 minutes"
  };

  const renderSampleText = (template = '') => {
    return template
      .replace(/{{customer_name}}/g, sampleCustomer.name)
      .replace(/{{payment_amount}}/g, sampleCustomer.amount)
      .replace(/{{transaction_id}}/g, sampleCustomer.txnId)
      .replace(/{{merchant_name}}/g, sampleCustomer.merchant)
      .replace(/{{retry_time}}/g, sampleCustomer.time);
  };

  const formattedSubject = renderSampleText(message?.subject || 'Your payment of {{payment_amount}} could not be completed');
  const formattedBody = renderSampleText(message?.body || 'Hi {{customer_name}},\n\nYour payment of {{payment_amount}} could not be completed.');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Campaign Preview</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Review campaign parameters and simulated customer message previews.</p>
      </div>

      {/* Campaign Summary Card (Requirement #26) */}
      <Card className="p-5 space-y-3 border border-slate-200/80 bg-slate-50/50">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign Parameters Summary</h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-medium">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Campaign Name</span>
            <span className="font-extrabold text-slate-900">{campaignData.name || 'High-Value Recovery'}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Audience</span>
            <span className="font-bold text-slate-900">{campaignData.audience || '142 customers'}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Strategy</span>
            <Badge variant="indigo">{campaignData.strategy || 'Delayed Retry'}</Badge>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Channels</span>
            <span className="font-bold text-slate-800">{(campaignData.channels || ['Email', 'SMS']).join(' + ')}</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Payment Value</span>
            <span className="font-mono font-bold text-slate-900">₹3,48,500</span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Estimated Recovery</span>
            <span className="font-mono font-black text-emerald-600">₹2,51,756</span>
          </div>
        </div>
      </Card>

      {/* Customer Message Previews (Requirement #27) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Preview */}
        <Card className="p-5 space-y-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Mail className="w-4 h-4 text-indigo-600" />
            <h4 className="font-extrabold text-xs text-slate-900">Email Message Preview</h4>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 text-xs font-mono border border-slate-800">
            <div className="border-b border-slate-800 pb-2 space-y-1">
              <p><span className="text-slate-500">From:</span> Merchant Support &lt;support@acme.com&gt;</p>
              <p><span className="text-slate-500">To:</span> rahul.sharma@example.com</p>
              <p><span className="text-slate-500">Subject:</span> <strong className="text-indigo-300">{formattedSubject}</strong></p>
            </div>

            <div className="whitespace-pre-line leading-relaxed text-slate-200 font-sans text-xs">
              {formattedBody}
            </div>
          </div>
        </Card>

        {/* SMS Preview */}
        <Card className="p-5 space-y-3 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Smartphone className="w-4 h-4 text-indigo-600" />
            <h4 className="font-extrabold text-xs text-slate-900">SMS / Push Preview</h4>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 text-slate-900 space-y-2 text-xs border border-slate-200 max-w-sm mx-auto shadow-inner">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold border-b border-slate-200 pb-1">
              <span>Merchant Support</span>
              <span>Just now</span>
            </div>
            <p className="whitespace-pre-line text-xs text-slate-800 font-medium leading-relaxed">
              {formattedBody}
            </p>
          </div>
        </Card>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button variant="ai" size="lg" onClick={onNext} className="px-8 font-extrabold">
          Run Safety Check →
        </Button>
      </div>
    </div>
  );
}
