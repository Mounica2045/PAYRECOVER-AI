// Agent Workflow Execution & Task Orchestration Engine

import { initialAgentTasks, initialAgentActivity, agentMetrics } from '../data/agentData';
import { agentSafetyService } from './agentSafetyService';
import { auditService } from './auditService';

export const agentWorkflowService = {
  tasks: [...initialAgentTasks],
  activities: [...initialAgentActivity],

  getTasks() {
    return this.tasks;
  },

  getActivities() {
    return this.activities;
  },

  getMetrics() {
    return agentMetrics;
  },

  // Creates and runs a simulated workflow (Requirement #14 & #20)
  executeTask(taskTitle, recommendedStrategy = "Delayed Retry", targetAudience = "Temporary Bank Failures") {
    const newTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title: taskTitle,
      description: `Autonomous agent recovery workflow for ${targetAudience}.`,
      priority: "High",
      status: "Running Simulation",
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      completedAt: null,
      potentialRecovery: "₹2.24L",
      recommendedStrategy,
      input: `Customer segment: ${targetAudience}`,
      output: "Simulation complete. 135 customers targeted with 68% estimated recovery rate.",
      requiresApproval: true,
      isApproved: true
    };

    this.tasks.unshift(newTask);

    // Add activity stream event
    this.activities.unshift({
      id: `ACT_${Date.now()}`,
      timestamp: newTask.startedAt,
      status: "success",
      text: `✓ Agent task ${newTask.id} completed: ${taskTitle} (Potential recovery ₹2.24L).`
    });

    // Register Audit Center event in Phase 8 (Requirement #17 & #30)
    auditService.createAuditEvent({
      type: "Simulation Completed",
      transactionId: newTask.id,
      customer: targetAudience,
      amount: 224060,
      actor: "AI Agent",
      strategy: recommendedStrategy,
      status: "Simulated",
      description: `Agent executed autonomous workflow simulation for ${taskTitle}.`
    });

    return newTask;
  },

  // Merchant Approval Gate action (Requirement #15 & #16)
  approveTask(taskId, isApproved = true) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return null;

    task.isApproved = isApproved;
    task.status = isApproved ? "Completed" : "Paused";
    task.completedAt = isApproved ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

    // Register Audit Event (Requirement #17)
    auditService.createAuditEvent({
      type: isApproved ? "Merchant Approval Granted" : "Merchant Approval Rejected",
      transactionId: task.id,
      customer: "Merchant Portfolio",
      amount: 224060,
      actor: "Merchant",
      strategy: task.recommendedStrategy || "Delayed Retry",
      status: isApproved ? "Passed" : "Failed",
      description: `Merchant ${isApproved ? 'approved' : 'rejected'} agent action for task ${task.id}: ${task.title}.`
    });

    return task;
  }
};
