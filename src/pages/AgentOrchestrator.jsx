import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import AgentHeader from '../components/agent/AgentHeader';
import AgentCommandBox from '../components/agent/AgentCommandBox';
import AgentChatStream from '../components/agent/AgentChatStream';
import AgentWorkflowVisualization from '../components/agent/AgentWorkflowVisualization';
import AgentTaskQueue from '../components/agent/AgentTaskQueue';
import AgentSafetyGate from '../components/agent/AgentSafetyGate';
import AgentActivityFeed from '../components/agent/AgentActivityFeed';
import AgentPerformance from '../components/agent/AgentPerformance';

import { agentCommandService } from '../services/agentCommandService';
import { agentWorkflowService } from '../services/agentWorkflowService';

export default function AgentOrchestrator({ 
  onNavigateToPage,
  onNavigateToAgent, 
  onNavigateToSimulator, 
  onNavigateToCampaigns, 
  onNavigateToAudit 
}) {
  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: "✦ Hello! I am your PayRecover AI Agent. Ask me anything about payment failures, recovery strategies, or campaign simulations.",
      confidence: 1.0
    }
  ]);

  const [tasks, setTasks] = useState(() => agentWorkflowService.getTasks());
  const [activities, setActivities] = useState(() => agentWorkflowService.getActivities());
  const [metrics] = useState(() => agentWorkflowService.getMetrics());

  const handleCommandSubmit = (commandText) => {
    // Add User Message
    const userMsg = { sender: "user", text: commandText };

    // Interpret Command
    const res = agentCommandService.interpretCommand(commandText);
    const agentMsg = {
      sender: "agent",
      text: res.responseMessage,
      confidence: res.confidence,
      actionRoute: res.actionRoute,
      actionButtonText: res.actionButtonText,
      dataPayload: res.dataPayload,
      isProhibited: res.isProhibited
    };

    setMessages(prev => [...prev, userMsg, agentMsg]);

    // If valid intent, execute simulated workflow task
    if (res.intent !== 'empty' && res.intent !== 'prohibited' && res.intent !== 'unknown') {
      agentWorkflowService.executeTask(commandText);
      setTasks([...agentWorkflowService.getTasks()]);
      setActivities([...agentWorkflowService.getActivities()]);
    }
  };

  const handleApproveTask = (taskId, isApproved) => {
    agentWorkflowService.approveTask(taskId, isApproved);
    setTasks([...agentWorkflowService.getTasks()]);
    setActivities([...agentWorkflowService.getActivities()]);
  };

  const handleNavigateToRoute = (route) => {
    if (route === 'ai-agent' && onNavigateToAgent) onNavigateToAgent();
    else if (route === 'simulator' && onNavigateToSimulator) onNavigateToSimulator();
    else if (route === 'campaigns' && onNavigateToCampaigns) onNavigateToCampaigns();
    else if (route === 'audit' && onNavigateToAudit) onNavigateToAudit();
    else if (route === 'intelligence' && onNavigateToPage) onNavigateToPage('intelligence');
  };

  return (
    <PageContainer>
      {/* 1. Header with Online & Simulation Mode Badges */}
      <AgentHeader />

      {/* 2. Command Box (Natural Language Input & Quick Commands) */}
      <div className="mb-6">
        <AgentCommandBox onSubmitCommand={handleCommandSubmit} />
      </div>

      {/* 3. Conversation Stream */}
      {messages.length > 1 && (
        <div className="mb-6">
          <AgentChatStream 
            messages={messages} 
            onNavigateToRoute={handleNavigateToRoute}
          />
        </div>
      )}

      {/* 4. Autonomous Agent Workflow Visualization */}
      <div className="mb-6">
        <AgentWorkflowVisualization />
      </div>

      {/* 5. Active Agent Tasks Queue & Merchant Approval Gate */}
      <div className="mb-8">
        <AgentTaskQueue 
          tasks={tasks}
          onApproveTask={handleApproveTask}
          onExecuteTask={(taskTitle) => handleCommandSubmit(taskTitle)}
        />
      </div>

      {/* 6. Autonomous Safety Gate (8/8 Checks & Security Hard-Stop) */}
      <div className="mb-8">
        <AgentSafetyGate />
      </div>

      {/* 7. Live Activity Feed & Performance Telemetry */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-12 space-y-6">
          <AgentActivityFeed activities={activities} />
          <AgentPerformance metrics={metrics} />
        </div>
      </div>
    </PageContainer>
  );
}
