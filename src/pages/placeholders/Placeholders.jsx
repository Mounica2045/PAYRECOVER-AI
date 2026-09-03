import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { 
  LayoutDashboard, 
  CreditCard, 
  Bot, 
  SlidersHorizontal, 
  BarChart3, 
  FileText, 
  Settings as SettingsIcon, 
  HelpCircle,
  Clock
} from 'lucide-react';

export function DashboardPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard" 
        description="Good morning, Merchant 👋 Here's your payment recovery overview."
        actions={<Button variant="outline" size="sm">Last 30 days ▼</Button>}
      />
      <Card className="p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <LayoutDashboard className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Dashboard Coming in Phase 4</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          The full KPI metrics cards, 30-day revenue recovery area chart, failure donut breakdown, AI insight card, and high-value opportunities table will be assembled in Phase 4.
        </p>
      </Card>
    </PageContainer>
  );
}

export function PaymentsPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="Payments" 
        description="Monitor, diagnose, and recover failed merchant transactions in real-time."
        breadcrumbs={[{ label: 'Payments' }]}
      />
      <Card className="p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <CreditCard className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Payment Management Coming Soon</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Filter transactions by failure reason, risk level, or status, and view deep customer LTV telemetry in the slide-over payment detail drawer.
        </p>
      </Card>
    </PageContainer>
  );
}

export function AIAgentPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="AI Recovery Agent" 
        description="Intelligent, explainable recovery decisions for failed payments."
        breadcrumbs={[{ label: 'AI Recovery Agent' }]}
      />
      <Card className="p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <Bot className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">AI Recovery Workflow Coming Soon</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Visual 8-stage recovery pipeline, agent status metrics, and interactive decision workbench with safety checklist verification.
        </p>
      </Card>
    </PageContainer>
  );
}

export function SimulatorPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="Strategy Simulator" 
        description="Simulate expected revenue outcomes and customer friction before deploying automated retry policies."
        breadcrumbs={[{ label: 'Strategy Simulator' }]}
      />
      <Card className="p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <SlidersHorizontal className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Recovery Strategy Simulation Coming Soon</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Compare Conservative, Balanced, and Aggressive strategies and analyze expected recovery vs. customer risk.
        </p>
      </Card>
    </PageContainer>
  );
}

export function AnalyticsPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="Recovery Analytics" 
        description="Deep-dive breakdown into root causes, payment channel efficiency, and AI decision accuracy."
        breadcrumbs={[{ label: 'Recovery Analytics' }]}
      />
      <Card className="p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <BarChart3 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Recovery Analytics Coming Soon</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Comprehensive failure reason bar charts, moving average recovery rate trend line charts, and AI model precision stats.
        </p>
      </Card>
    </PageContainer>
  );
}

export function AuditPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="AI Audit Log" 
        description="Every automated AI diagnosis, confidence score, and human-in-the-loop approval is recorded and traceable."
        breadcrumbs={[{ label: 'Audit Log' }]}
      />
      <Card className="p-12 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">AI Decision History Coming Soon</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Filterable timestamped log table recording every decision, confidence score, approval origin, and execution result.
        </p>
      </Card>
    </PageContainer>
  );
}

export function SettingsPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="Settings & Safety Controls" 
        description="Manage Razorpay webhooks, API credentials, and automated retry safety guardrails."
        breadcrumbs={[{ label: 'Settings' }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Account Settings" subtitle="Merchant organization settings">
          <p className="text-xs text-slate-500 mb-3">Manage merchant profile, webhook endpoints, and API keys.</p>
          <Button variant="secondary" size="sm">Configure Account</Button>
        </Card>
        <Card title="AI Safety Controls" subtitle="Autonomous bounded guardrails">
          <p className="text-xs text-slate-500 mb-3">Configure retry limits (3 max), human approval thresholds, and simulation mode.</p>
          <Button variant="outline" size="sm">Edit Guardrails</Button>
        </Card>
      </div>
    </PageContainer>
  );
}

export function HelpPlaceholder() {
  return (
    <PageContainer>
      <PageHeader 
        title="Help & Documentation" 
        description="Learn how PayRecover AI detects payment failures and maximizes recovered revenue."
        breadcrumbs={[{ label: 'Help' }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Product Documentation" subtitle="Guides & API references">
          <p className="text-xs text-slate-500 mb-3">Read how PayRecover AI uses machine learning to schedule delayed retries and payment updates.</p>
          <Button variant="primary" size="sm">View Documentation</Button>
        </Card>
        <Card title="Contact Merchant Support" subtitle="Buildathon project assistance">
          <p className="text-xs text-slate-500 mb-3">Get help with Razorpay integration or webhook telemetry debugging.</p>
          <Button variant="secondary" size="sm">Contact Support</Button>
        </Card>
      </div>
    </PageContainer>
  );
}
