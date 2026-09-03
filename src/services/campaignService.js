// Campaign Management & Simulation Service Store

import { initialCampaignsList, segmentPresets } from '../data/campaignData';
import { baseStrategyTemplates } from '../data/strategyData';
import { auditService } from './auditService';

const CAMPAIGNS_STORAGE_KEY = 'payrecover_campaigns';

export const campaignService = {
  // Returns list of campaigns (initial + local persisted)
  getCampaigns() {
    try {
      const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
      const localCampaigns = stored ? JSON.parse(stored) : [];
      const combined = [...localCampaigns, ...initialCampaignsList];
      return Array.from(new Map(combined.map(c => [c.id, c])).values());
    } catch (e) {
      console.warn("Unable to access localStorage for campaigns:", e);
      return initialCampaignsList;
    }
  },

  getCampaignById(id) {
    const campaigns = this.getCampaigns();
    return campaigns.find(c => c.id === id) || campaigns[0];
  },

  // Creates a new campaign and registers an audit log event
  createCampaign(payload) {
    if (!payload) return null;

    const id = payload.id || `CMP_${Date.now().toString().slice(-4)}`;
    const totalVal = payload.totalValue || 329500;
    const prob = payload.probability || 86;
    const potentialVal = Math.round(totalVal * (prob / 100));

    const newCampaign = {
      id,
      name: payload.name || 'Untitled Recovery Campaign',
      description: payload.description || 'AI-assisted recovery outreach.',
      audience: payload.audience || 'Custom Segment',
      segmentId: payload.segmentId || 'custom',
      strategy: payload.strategy || 'Delayed Retry',
      channels: payload.channels || ['Email', 'SMS'],
      customersCount: payload.customersCount || 135,
      totalValue: totalVal,
      potentialRecovery: potentialVal,
      formattedPotentialRecovery: `₹${(potentialVal / 100000).toFixed(1)}L`,
      status: payload.status || 'Simulated',
      createdAt: new Date().toISOString().split('T')[0],
      createdTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      recoveryRate: `${prob}.0%`,
      message: payload.message || {
        subject: 'Your payment could not be completed',
        body: 'Hi {{customer_name}},\n\nYour payment of {{payment_amount}} failed. We will retry in {{retry_time}}.',
        tone: 'Friendly'
      },
      analytics: {
        targeted: payload.customersCount || 135,
        reached: Math.round((payload.customersCount || 135) * 0.95),
        engaged: Math.round((payload.customersCount || 135) * 0.74),
        recovered: Math.round((payload.customersCount || 135) * 0.68),
        recoveredValue: potentialVal,
        formattedRecoveredValue: `₹${potentialVal.toLocaleString('en-IN')}`
      }
    };

    try {
      const stored = localStorage.getItem(CAMPAIGNS_STORAGE_KEY);
      const localCampaigns = stored ? JSON.parse(stored) : [];
      const updated = [newCampaign, ...localCampaigns];
      localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Unable to save campaign to localStorage:", e);
    }

    // Register Audit Event in Central Audit Store (Requirement #44)
    auditService.createAuditEvent({
      type: "Simulation Completed",
      transactionId: `CMP_${newCampaign.id}`,
      customer: `Campaign Group (${newCampaign.customersCount} customers)`,
      amount: newCampaign.totalValue,
      actor: "AI + Merchant",
      strategy: newCampaign.strategy,
      status: "Simulated",
      description: `Recovery Campaign '${newCampaign.name}' created and simulated for ${newCampaign.customersCount} customers. Estimated potential recovery: ${newCampaign.formattedPotentialRecovery}.`
    });

    return newCampaign;
  },

  // Simulates campaign performance metrics deterministically (Requirements #33, #34, #35)
  simulateCampaign(campaignOrPayload) {
    const totalVal = campaignOrPayload.totalValue || 329500;
    const count = campaignOrPayload.customersCount || 135;

    let prob = 86;
    if (campaignOrPayload.strategy === 'Delayed Retry') prob = 86;
    else if (campaignOrPayload.strategy === 'Immediate Retry') prob = 63;
    else if (campaignOrPayload.strategy === 'Alternate Payment') prob = 57;
    else if (campaignOrPayload.strategy === 'Manual Review') prob = 41;

    const estimatedRecoveryVal = Math.round(totalVal * (prob / 100));
    const unrecoveredVal = totalVal - estimatedRecoveryVal;

    return {
      campaign: campaignOrPayload,
      eligibleCustomers: count,
      totalPaymentValue: totalVal,
      formattedTotalPaymentValue: `₹${totalVal.toLocaleString('en-IN')}`,
      potentialRecovery: estimatedRecoveryVal,
      formattedPotentialRecovery: `₹${estimatedRecoveryVal.toLocaleString('en-IN')}`,
      unrecoveredValue: unrecoveredVal,
      formattedUnrecoveredValue: `₹${unrecoveredVal.toLocaleString('en-IN')}`,
      responseRate: '74%',
      recoveryRate: `${prob}%`,
      funnel: [
        { step: 'Eligible', count: count },
        { step: 'Reached', count: Math.round(count * 0.95) },
        { step: 'Engaged', count: Math.round(count * 0.74) },
        { step: 'Recovery Opportunity', count: Math.round(count * 0.64) },
        { step: 'Estimated Recovered', count: Math.round(count * (prob / 100)) }
      ],
      channelComparison: [
        { channel: 'Email', reach: '95%', engagement: '62%' },
        { channel: 'SMS', reach: '98%', engagement: '71%' },
        { channel: 'WhatsApp', reach: '91%', engagement: '76%' },
        { channel: 'In-App', reach: '85%', engagement: '54%' }
      ],
      strategyComparison: [
        { strategy: 'Delayed Retry', value: Math.round(totalVal * 0.86), formatted: `₹${Math.round(totalVal * 0.86).toLocaleString('en-IN')}`, recommended: true },
        { strategy: 'Immediate Retry', value: Math.round(totalVal * 0.63), formatted: `₹${Math.round(totalVal * 0.63).toLocaleString('en-IN')}` },
        { strategy: 'Alternate Payment', value: Math.round(totalVal * 0.57), formatted: `₹${Math.round(totalVal * 0.57).toLocaleString('en-IN')}` },
        { strategy: 'Manual Review', value: Math.round(totalVal * 0.41), formatted: `₹${Math.round(totalVal * 0.41).toLocaleString('en-IN')}` }
      ]
    };
  }
};
