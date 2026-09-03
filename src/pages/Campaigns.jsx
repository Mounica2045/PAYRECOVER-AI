import React, { useState, useEffect, useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import CampaignHeader from '../components/campaigns/CampaignHeader';
import CampaignBanner from '../components/campaigns/CampaignBanner';
import CampaignOverview from '../components/campaigns/CampaignOverview';
import CampaignFilters from '../components/campaigns/CampaignFilters';
import CampaignTable from '../components/campaigns/CampaignTable';
import CampaignDetailDrawer from '../components/campaigns/CampaignDetailDrawer';

import CreateCampaign from './CreateCampaign';
import { campaignService } from '../services/campaignService';

export default function Campaigns({ initialSelectedCampaignId }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'create'
  const [campaigns, setCampaigns] = useState(() => campaignService.getCampaigns());
  const [selectedDrawerCampaign, setSelectedDrawerCampaign] = useState(null);

  // Filter State
  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    strategy: 'All',
    channel: 'All',
    audience: 'All'
  });

  const reloadCampaigns = () => {
    setCampaigns(campaignService.getCampaigns());
  };

  useEffect(() => {
    reloadCampaigns();
  }, []);

  // Filtered Campaigns List
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((item) => {
      // Search Query
      if (filters.search.trim() !== '') {
        const q = filters.search.toLowerCase();
        const matches = 
          item.name.toLowerCase().includes(q) ||
          item.strategy.toLowerCase().includes(q) ||
          item.audience.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Status Filter
      if (filters.status !== 'All' && item.status !== filters.status) {
        return false;
      }

      // Strategy Filter
      if (filters.strategy !== 'All' && item.strategy !== filters.strategy) {
        return false;
      }

      // Channel Filter
      if (filters.channel !== 'All' && !item.channels.includes(filters.channel)) {
        return false;
      }

      // Audience Filter
      if (filters.audience !== 'All' && item.audience !== filters.audience) {
        return false;
      }

      return true;
    });
  }, [campaigns, filters]);

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      strategy: 'All',
      channel: 'All',
      audience: 'All'
    });
  };

  if (viewMode === 'create') {
    return (
      <CreateCampaign 
        onCancel={() => setViewMode('list')}
        onSaveSuccess={(newCampaign) => {
          reloadCampaigns();
          setViewMode('list');
        }}
      />
    );
  }

  return (
    <PageContainer>
      {/* 1. Header with Create Campaign Button */}
      <CampaignHeader onCreateClick={() => setViewMode('create')} />

      {/* 2. Top Simulation Environment Banner */}
      <div className="mb-6">
        <CampaignBanner />
      </div>

      {/* 3. Campaign Overview KPI StatCards */}
      <div className="mb-6">
        <CampaignOverview 
          activeCampaignsCount={campaigns.filter(c => c.status === 'Active' || c.status === 'Simulated').length}
          customersTargetedCount={campaigns.reduce((sum, c) => sum + c.customersCount, 0)}
          potentialRecoveryValue="₹8.4L"
          simulatedRecoveryRate="72.4%"
        />
      </div>

      {/* 4. Filter Toolbar */}
      <div className="mb-6">
        <CampaignFilters 
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* 5. Campaign List Table */}
      <div className="mb-8">
        <CampaignTable 
          campaigns={filteredCampaigns}
          onSelectCampaign={(c) => setSelectedDrawerCampaign(c)}
        />
      </div>

      {/* 6. Campaign Detail Drawer */}
      <CampaignDetailDrawer 
        campaign={selectedDrawerCampaign}
        isOpen={Boolean(selectedDrawerCampaign)}
        onClose={() => setSelectedDrawerCampaign(null)}
        onRunSimulation={(c) => {
          setSelectedDrawerCampaign(null);
          setViewMode('create');
        }}
      />
    </PageContainer>
  );
}
