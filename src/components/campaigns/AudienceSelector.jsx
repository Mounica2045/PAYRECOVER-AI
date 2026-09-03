import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Users, Plus, Check, Filter } from 'lucide-react';
import { segmentPresets } from '../../data/campaignData';

export default function AudienceSelector({
  selectedSegmentId,
  onSelectSegment,
  onNext
}) {
  const [customFilters, setCustomFilters] = useState([
    { field: 'Amount', condition: 'Greater than', value: '₹1,000' },
    { field: 'Failure Reason', condition: 'Equals', value: 'Bank Unavailable' }
  ]);

  const activePreset = segmentPresets.find(s => s.id === selectedSegmentId) || segmentPresets[0];

  const handleAddFilter = () => {
    setCustomFilters(prev => [...prev, { field: 'Success Rate', condition: 'Greater than', value: '70%' }]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">Choose Your Audience</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Select the customers and payments that should be included in this recovery campaign.</p>
      </div>

      {/* Segment Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {segmentPresets.map((seg) => {
          const isSel = seg.id === selectedSegmentId;

          return (
            <div
              key={seg.id}
              onClick={() => onSelectSegment(seg.id)}
              className={`
                p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3
                ${isSel 
                  ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm' 
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-subtle'}
              `}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">{seg.name}</h4>
                  {isSel && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{seg.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-slate-500 font-mono">{seg.customersCount} customers</span>
                <span className="font-mono font-black text-slate-900">{seg.formattedTotalValue}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Segment Filter Builder (Requirement #13) */}
      {selectedSegmentId === 'custom' && (
        <Card className="p-5 space-y-4 border border-slate-200/80 bg-slate-50/50">
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>Custom Filter Rules</span>
            </h4>
            <Button variant="outline" size="sm" onClick={handleAddFilter} className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Add Filter</span>
            </Button>
          </div>

          <div className="space-y-2">
            {customFilters.map((f, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs">
                <span className="font-bold text-slate-800 self-center">{f.field}</span>
                <span className="text-slate-500 font-medium self-center">{f.condition}</span>
                <span className="font-mono font-extrabold text-indigo-600 text-right self-center">{f.value}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Audience Preview Card (Requirement #14) */}
      <Card className="p-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white space-y-4 shadow-lg border border-indigo-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">Audience Preview</span>
          </div>
          <Badge variant="indigo" className="bg-white/10 text-indigo-200 border-white/20">
            Estimated Criteria
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Matching Customers</span>
            <span className="text-xl font-black text-white font-mono">{activePreset.customersCount}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Total Payment Value</span>
            <span className="text-xl font-black text-white font-mono">{activePreset.formattedTotalValue}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Estimated Recoverable Value</span>
            <span className="text-xl font-black text-emerald-400 font-mono">₹{Math.round(activePreset.totalValue * 0.84).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-2">
        <Button variant="ai" size="lg" onClick={onNext} className="px-8 font-extrabold">
          Continue to Strategy →
        </Button>
      </div>
    </div>
  );
}
