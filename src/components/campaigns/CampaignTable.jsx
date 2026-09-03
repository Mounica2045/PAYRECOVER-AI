import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Eye, Mail, MessageSquare, PhoneCall, Smartphone } from 'lucide-react';

export default function CampaignTable({
  campaigns = [],
  onSelectCampaign
}) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge variant="emerald">Simulated Active</Badge>;
      case 'Simulated':
        return <Badge variant="indigo">Simulated</Badge>;
      case 'Ready':
        return <Badge variant="emerald">Ready</Badge>;
      case 'Draft':
        return <Badge variant="slate">Draft</Badge>;
      case 'Paused':
        return <Badge variant="amber">Paused</Badge>;
      case 'Completed':
        return <Badge variant="indigo">Completed</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  const renderChannelBadges = (channels = []) => {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {channels.map((ch) => (
          <span key={ch} className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] font-bold text-slate-700">
            {ch}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-0 overflow-hidden border border-slate-200/80 shadow-xs">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Campaigns</h3>
          <p className="text-xs text-slate-500 font-medium">Configured AI payment recovery campaigns</p>
        </div>
        <span className="font-mono text-xs font-bold text-slate-500">{campaigns.length} Total Campaigns</span>
      </div>

      {campaigns.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-400">
          No recovery campaigns found matching your filter criteria.
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Campaign</th>
                  <th className="py-3 px-4">Audience</th>
                  <th className="py-3 px-4">Strategy</th>
                  <th className="py-3 px-4">Channels</th>
                  <th className="py-3 px-4 text-center">Customers</th>
                  <th className="py-3 px-4 text-right">Potential Recovery</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {campaigns.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onSelectCampaign(c)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">
                      <div>
                        <span>{c.name}</span>
                        <span className="block text-[10px] font-mono text-slate-400 font-normal">{c.id}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      {c.audience}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 text-[11px]">
                        {c.strategy}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {renderChannelBadges(c.channels)}
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">
                      {c.customersCount}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-black text-slate-900">
                      {c.formattedPotentialRecovery}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(c.status)}
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-500 font-mono text-[11px]">
                      {c.createdAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden divide-y divide-slate-100">
            {campaigns.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCampaign(c)}
                className="p-4 space-y-2 cursor-pointer hover:bg-slate-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">{c.name}</span>
                  {getStatusBadge(c.status)}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Audience: <strong className="text-slate-800">{c.audience}</strong></span>
                  <span className="font-mono font-black text-slate-900">{c.formattedPotentialRecovery}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                  <span className="font-bold text-indigo-600">{c.strategy}</span>
                  <span className="text-slate-400 font-mono">{c.customersCount} customers</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
