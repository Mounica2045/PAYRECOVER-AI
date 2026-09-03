// AI Agent Orchestration Dataset

export const initialAgentTasks = [
  {
    id: "TASK-101",
    title: "Analyze temporary bank failures",
    description: "Decompose decline codes for 412 recent issuer bank timeout transactions.",
    priority: "High",
    status: "Completed",
    startedAt: "10:42 AM",
    completedAt: "10:43 AM",
    potentialRecovery: "₹6.7L",
    recommendedStrategy: "Delayed Retry",
    input: "Issuer bank telemetry log stream (1,284 failures)",
    output: "412 temporary bank failures identified with 86% average recovery probability.",
    requiresApproval: false
  },
  {
    id: "TASK-102",
    title: "Identify high-value recovery opportunities",
    description: "Evaluate failed payments above ₹5,000 with >85% recovery probability.",
    priority: "Critical",
    status: "Waiting for Approval",
    startedAt: "10:45 AM",
    completedAt: null,
    potentialRecovery: "₹2.1L",
    recommendedStrategy: "Delayed Retry",
    input: "Portfolio payment failure dataset",
    output: "42 high-value opportunities detected.",
    requiresApproval: true
  },
  {
    id: "TASK-103",
    title: "Run card expiration campaign simulation",
    description: "Simulate messaging campaign for 95 customers with expired cards.",
    priority: "Medium",
    status: "Ready",
    startedAt: "10:47 AM",
    completedAt: null,
    potentialRecovery: "₹1.5L",
    recommendedStrategy: "Alternate Payment",
    input: "Customer segment preset: Expired Cards",
    output: "Simulated recovery rate: 74%",
    requiresApproval: true
  },
  {
    id: "TASK-104",
    title: "Enforce 15-min cooldown safety guardrail",
    description: "Filter out customers contacted within the 15-minute retry cooldown window.",
    priority: "High",
    status: "Completed",
    startedAt: "10:48 AM",
    completedAt: "10:48 AM",
    potentialRecovery: "₹0",
    recommendedStrategy: "Safety Rule",
    input: "Active campaign customer queue",
    output: "7 duplicate customers excluded. 135 customers remaining.",
    requiresApproval: false
  }
];

export const initialAgentActivity = [
  { id: "ACT_1", timestamp: "10:48 AM", status: "success", text: "✓ Campaign simulation complete for 135 target customers (Est. recovery ₹2.24L)." },
  { id: "ACT_2", timestamp: "10:47 AM", status: "success", text: "✓ Safety Gate 8/8 checks passed cleanly." },
  { id: "ACT_3", timestamp: "10:46 AM", status: "warning", text: "● Merchant approval granted for Task TASK-102." },
  { id: "ACT_4", timestamp: "10:45 AM", status: "indigo", text: "✦ 42 high-value recovery opportunities identified." },
  { id: "ACT_5", timestamp: "10:44 AM", status: "info", text: "● Agent telemetry scan complete across 1,284 transactions." }
];

export const agentMetrics = {
  tasksCompleted: 128,
  successfulSimulations: 116,
  safetyBlocks: 7,
  approvalRate: "89%",
  avgTaskTime: "4.2 sec",
  simulationAgreement: "84%"
};

export const sampleSuggestedCommands = [
  "Find high-value recovery opportunities",
  "Analyze today's payment failures",
  "What is my revenue at risk?",
  "Create a campaign for temporary bank failures",
  "Which strategy performs best?",
  "Simulate delayed retry strategy",
  "Show safety guardrails status",
  "Export recovery intelligence report"
];
