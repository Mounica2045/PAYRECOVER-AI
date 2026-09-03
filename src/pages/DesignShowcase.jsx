import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import Drawer from '../components/ui/Drawer';
import Alert from '../components/ui/Alert';
import Skeleton from '../components/ui/Skeleton';
import Tooltip from '../components/ui/Tooltip';

import StatCard from '../components/data-display/StatCard';
import DataTable from '../components/data-display/DataTable';
import EmptyState from '../components/data-display/EmptyState';
import ErrorState from '../components/data-display/ErrorState';

import AIInsightCard from '../components/ai/AIInsightCard';
import AIRecommendation from '../components/ai/AIRecommendation';
import AIConfidence from '../components/ai/AIConfidence';
import AISafetyCheck from '../components/ai/AISafetyCheck';
import AILoadingState from '../components/ai/AILoadingState';

import { 
  Sparkles, 
  IndianRupee, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function DesignShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sampleColumns = [
    { header: 'Transaction', key: 'id', render: (val) => <span className="font-mono font-bold text-slate-900">{val}</span> },
    { header: 'Customer', key: 'customer', render: (val) => <span className="font-bold text-slate-900">{val}</span> },
    { header: 'Amount', key: 'amount', render: (val) => <span className="font-black text-slate-900">{val}</span> },
    { header: 'Status', key: 'status', render: (val) => <Badge variant={val === 'Recovered' ? 'emerald' : val === 'Pending' ? 'amber' : 'rose'}>{val}</Badge> },
  ];

  const sampleData = [
    { id: 'TXN_1042', customer: 'Rahul Sharma', amount: '₹4,999', status: 'Ready' },
    { id: 'TXN_1038', customer: 'Priya Reddy', amount: '₹9,999', status: 'Pending' },
    { id: 'TXN_1021', customer: 'Arjun Kumar', amount: '₹2,499', status: 'Recovered' },
  ];

  return (
    <PageContainer
      title="Design System Showcase"
      subtitle="Comprehensive component library and visual tokens for PayRecover AI."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>Demo Modal</Button>
          <Button variant="primary" size="sm" onClick={() => setIsDrawerOpen(true)}>Demo Drawer</Button>
        </div>
      }
    >
      <div className="space-y-12">
        
        {/* Section 1: Typography System */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            1. Typography System (Inter Font Hierarchy)
          </h2>
          <div className="fintech-card p-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Display Heading</span>
              <p className="text-3xl font-black text-slate-900 tracking-tight">₹1,24,500 Revenue at Risk</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Page Title (H1)</span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Recovery Agent</h1>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Section Heading (H2)</span>
              <h2 className="text-lg font-bold text-slate-900">Payment Failure Analysis</h2>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Card Title (H3)</span>
              <h3 className="text-base font-extrabold text-slate-900">Recovery Opportunities</h3>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Body Text</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                PayRecover AI helps merchants identify failed payments, understand failure root causes, prioritize revenue at risk, and simulate AI recovery workflows.
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Supporting / Metadata Text (Small & Caption)</span>
              <p className="text-[11px] text-slate-400 font-medium">Last updated: 2 minutes ago • Verified by Razorpay Buildathon AI Engine</p>
            </div>
          </div>
        </section>

        {/* Section 2: Color System Tokens */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            2. Color Palette & Design Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-indigo-600 text-white font-bold text-xs space-y-1 shadow-sm">
              <p>Primary Indigo</p>
              <p className="text-[10px] opacity-80">#4F46E5</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-600 text-white font-bold text-xs space-y-1 shadow-sm">
              <p>Secondary Blue</p>
              <p className="text-[10px] opacity-80">#2563EB</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs space-y-1 shadow-sm">
              <p>Success Green</p>
              <p className="text-[10px] opacity-80">#10B981</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-500 text-white font-bold text-xs space-y-1 shadow-sm">
              <p>Warning Amber</p>
              <p className="text-[10px] opacity-80">#F59E0B</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-600 text-white font-bold text-xs space-y-1 shadow-sm">
              <p>Danger Red</p>
              <p className="text-[10px] opacity-80">#EF4444</p>
            </div>
          </div>
        </section>

        {/* Section 3: Button System */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            3. Button System (Variants & States)
          </h2>
          <div className="fintech-card p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Approve Recovery</Button>
              <Button variant="secondary">Manual Review</Button>
              <Button variant="outline">View Details</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="danger">Reject Strategy</Button>
              <Button variant="ai">✦ Analyze with AI</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
              <Button variant="primary" isLoading>Loading State</Button>
              <Button variant="primary" disabled>Disabled State</Button>
              <Button variant="secondary" size="sm">Small Size</Button>
              <Button variant="secondary" size="lg">Large Size</Button>
            </div>
          </div>
        </section>

        {/* Section 4: Input & Form System */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            4. Input & Form System
          </h2>
          <div className="fintech-card p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input isSearch label="Search Input" placeholder="Search transactions, customers..." />
            <Input label="Standard Text Input" placeholder="e.g. TXN_1042" helperText="Enter exact transaction reference ID" />
            <Select label="Filter Select">
              <option>Failure Reason: All</option>
              <option>Bank Unavailable</option>
              <option>Card Expired</option>
            </Select>
            <Input label="Error State Input" placeholder="Enter amount" error="Amount must be greater than ₹0" />
            <Input label="Disabled Input" value="Read-only System Value" disabled />
          </div>
        </section>

        {/* Section 5: Badges & Risk Indicators */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            5. Badges & Risk Indicators
          </h2>
          <div className="fintech-card p-6 flex flex-wrap items-center gap-3">
            <Badge variant="emerald" hasDot>Ready</Badge>
            <Badge variant="amber" hasDot>Pending</Badge>
            <Badge variant="emerald" hasDot>Recovered</Badge>
            <Badge variant="rose" hasDot>Failed</Badge>
            <Badge variant="amber" hasDot>Action Needed</Badge>
            <Badge variant="slate" hasDot>Review</Badge>
            <Badge variant="rose">High Risk</Badge>
            <Badge variant="amber">Medium Risk</Badge>
            <Badge variant="emerald">Low Risk</Badge>
            <Badge variant="indigo">✦ AI Probability 91%</Badge>
          </div>
        </section>

        {/* Section 6: KPI Stat Cards */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            6. KPI Stat Cards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard 
              title="Revenue at Risk" 
              value="₹1,24,500" 
              change="↑ 12.4%" 
              changeType="negative" 
              description="vs previous period"
              icon={AlertTriangle}
              tooltipText="Estimated value of eligible failed payments that may still be recoverable."
            />
            <StatCard 
              title="Recovered Revenue" 
              value="₹48,750" 
              change="↑ 18.7%" 
              changeType="positive" 
              description="vs previous period"
              icon={IndianRupee}
            />
            <StatCard 
              title="Recovery Rate" 
              value="39.2%" 
              change="↑ 6.8%" 
              changeType="positive" 
              description="vs previous period"
              icon={CheckCircle2}
            />
            <StatCard 
              title="Failed Payments" 
              value="127" 
              change="↓ 8.3%" 
              changeType="positive" 
              description="vs previous period"
              icon={AlertTriangle}
            />
          </div>
        </section>

        {/* Section 7: Card Variants */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            7. Card Component Variants
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card title="Default Card" subtitle="Clean white surface card">
              <p className="text-xs text-slate-600">Standard card used for data displays and panels.</p>
            </Card>
            <Card variant="ai" title="AI Card" subtitle="Autonomous Engine">
              <p className="text-xs text-indigo-200">Dark gradient styling reserved for AI components.</p>
            </Card>
            <Card variant="warning" title="Warning Card" subtitle="Action Needed">
              <p className="text-xs text-amber-900">Used for pending reviews or attention items.</p>
            </Card>
          </div>
        </section>

        {/* Section 8: AI Components & Confidence Bar */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            8. AI Visual Language & Confidence Indicator
          </h2>
          <div className="space-y-5">
            <AIInsightCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AIRecommendation />
              <AISafetyCheck />
            </div>
            <div className="fintech-card p-6 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Confidence Bar Component</h4>
              <AIConfidence score={91} />
              <AIConfidence score={68} />
            </div>
          </div>
        </section>

        {/* Section 9: Data Table System */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            9. Reusable Data Table Component
          </h2>
          <DataTable columns={sampleColumns} data={sampleData} />
        </section>

        {/* Section 10: Alerts & Tooltips */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            10. Alerts & Tooltips
          </h2>
          <div className="space-y-3">
            <Alert type="success" title="Success Alert">Recovery simulated successfully. ₹4,999 recovered.</Alert>
            <Alert type="warning" title="Warning Alert">Merchant approval is required before running batch retries.</Alert>
            <Alert type="error" title="Error Alert">Unable to analyze this payment transaction.</Alert>
            <Alert type="info" title="Information Alert">AI recommendation is based on historical payment patterns.</Alert>
          </div>
        </section>

        {/* Section 11: Loading & Empty & Error States */}
        <section className="space-y-4">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-2">
            11. Polished Loading, Empty & Error States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="fintech-card p-6 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Skeleton Loader</span>
              <Skeleton height="h-6" width="w-3/4" />
              <Skeleton height="h-4" width="w-full" />
              <Skeleton height="h-4" width="w-1/2" />
            </div>
            <div className="fintech-card p-2">
              <EmptyState />
            </div>
            <div className="fintech-card p-2">
              <ErrorState onRetry={() => {}} />
            </div>
          </div>
        </section>

      </div>

      {/* Demo Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Approve Recovery?"
        subtitle="You are about to simulate a recovery action for transaction TXN_1042."
        primaryAction={{ label: 'Approve Recovery', onClick: () => setIsModalOpen(false) }}
        secondaryAction={{ label: 'Cancel', onClick: () => setIsModalOpen(false) }}
      >
        <p className="text-xs text-slate-600">Amount: <strong>₹4,999</strong> • Recommended Action: <strong>Delayed Retry</strong></p>
      </Modal>

      {/* Demo Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Transaction Details"
        subtitle="TXN_1042 • ₹4,999"
      >
        <div className="space-y-4 text-xs">
          <Alert type="info" title="AI Diagnosis">Temporary bank-side failure detected across HDFC gateway cluster.</Alert>
          <AIRecommendation />
          <AISafetyCheck />
        </div>
      </Drawer>
    </PageContainer>
  );
}
