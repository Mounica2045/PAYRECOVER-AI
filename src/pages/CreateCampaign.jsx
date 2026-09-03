import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import CampaignBanner from '../components/campaigns/CampaignBanner';
import CampaignStepper from '../components/campaigns/CampaignStepper';
import AudienceSelector from '../components/campaigns/AudienceSelector';
import StrategySelector from '../components/campaigns/StrategySelector';
import MessageEditor from '../components/campaigns/MessageEditor';
import CampaignPreviewCard from '../components/campaigns/CampaignPreviewCard';
import CampaignSafety from '../components/campaigns/CampaignSafety';
import CampaignSimulationView from '../components/campaigns/CampaignSimulationView';

import { segmentPresets } from '../data/campaignData';
import { campaignService } from '../services/campaignService';

export default function CreateCampaign({ onCancel, onSaveSuccess }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Wizard Form State
  const [segmentId, setSegmentId] = useState('high-value');
  const [strategyId, setStrategyId] = useState('Delayed Retry');
  const [channels, setChannels] = useState(['Email', 'SMS']);
  const [message, setMessage] = useState({
    subject: 'Your payment of {{payment_amount}} could not be completed',
    body: 'Hi {{customer_name}},\n\nIt looks like your recent payment of {{payment_amount}} for transaction {{transaction_id}} could not be completed due to a temporary bank issue.\n\nYou can try again shortly without entering details again.\n\nThank you,\n{{merchant_name}} Support',
    tone: 'Friendly'
  });

  const activeSegment = segmentPresets.find(s => s.id === segmentId) || segmentPresets[0];

  const handleChannelToggle = (channel) => {
    setChannels(prev => prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]);
  };

  const handleSaveCampaign = (data) => {
    const created = campaignService.createCampaign({
      name: `${activeSegment.name} Recovery`,
      description: `AI-assisted recovery campaign targeting ${activeSegment.name}.`,
      audience: activeSegment.name,
      segmentId,
      strategy: strategyId,
      channels,
      customersCount: activeSegment.customersCount,
      totalValue: activeSegment.totalValue,
      message,
      status: 'Simulated'
    });

    if (onSaveSuccess) onSaveSuccess(created);
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Create Recovery Campaign"
        description="Design, configure safety guardrails, and simulate an AI-assisted payment recovery campaign."
        breadcrumbs={[
          { label: 'Recovery Campaigns', onClick: onCancel },
          { label: 'Create Campaign' }
        ]}
      />

      <div className="mb-6">
        <CampaignBanner />
      </div>

      <CampaignStepper 
        currentStep={currentStep} 
        onStepClick={(stepNum) => setCurrentStep(stepNum)}
      />

      {/* Step 1: Audience Selection */}
      {currentStep === 1 && (
        <AudienceSelector 
          selectedSegmentId={segmentId}
          onSelectSegment={setSegmentId}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {/* Step 2: Strategy Selection */}
      {currentStep === 2 && (
        <StrategySelector 
          selectedStrategyId={strategyId}
          onSelectStrategy={setStrategyId}
          totalPaymentValue={activeSegment.totalValue}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {/* Step 3: Message Editor */}
      {currentStep === 3 && (
        <MessageEditor 
          channels={channels}
          onChannelToggle={handleChannelToggle}
          message={message}
          onMessageChange={setMessage}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {/* Step 4: Preview */}
      {currentStep === 4 && (
        <CampaignPreviewCard 
          campaignData={{
            name: `${activeSegment.name} Recovery`,
            audience: activeSegment.name,
            strategy: strategyId,
            channels
          }}
          message={message}
          onNext={() => setCurrentStep(5)}
          onBack={() => setCurrentStep(3)}
        />
      )}

      {/* Step 5: Safety Check */}
      {currentStep === 5 && (
        <CampaignSafety 
          campaignData={{
            name: `${activeSegment.name} Recovery`,
            audience: activeSegment.name,
            strategy: strategyId,
            channels
          }}
          onNext={() => setCurrentStep(6)}
          onBack={() => setCurrentStep(4)}
        />
      )}

      {/* Step 6: Simulation Execution */}
      {currentStep === 6 && (
        <CampaignSimulationView 
          campaignData={{
            name: `${activeSegment.name} Recovery`,
            audience: activeSegment.name,
            segmentId,
            strategy: strategyId,
            channels,
            customersCount: activeSegment.customersCount,
            totalValue: activeSegment.totalValue,
            message
          }}
          onSave={handleSaveCampaign}
          onEdit={() => setCurrentStep(3)}
          onBackToCampaigns={onCancel}
        />
      )}
    </PageContainer>
  );
}
