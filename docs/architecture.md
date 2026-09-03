# PayRecover AI — Technical System Architecture

## Architecture Workflow

```text
Merchant
   ↓
Dashboard
   ↓
AI Intelligence
   ↓
AI Recovery
   ↓
Strategy Engine
   ↓
Safety Engine
   ↓
Merchant Approval
   ↓
Simulation Engine
   ↓
Audit Engine
```

---

## Role of the AI Agent Orchestration Layer

The **AI Agent Orchestrator** serves as the central intelligent operating layer that unifies all sub-modules:

1. **Natural Language Command Processing**: Interprets merchant prompts and maps queries to specific intent handlers (*find_opportunities*, *analyze_failures*, *forecast_recovery*, *create_campaign*, *simulate_strategy*, *review_safety*).
2. **Autonomous Task Queue Management**: Maintains task states (`Queued → Analyzing → Waiting for Approval → Running Simulation → Completed`).
3. **Workflow Orchestration**: Connects telemetry observations to strategy recommendations, safety checks, merchant approval gates, simulation execution, and immutable audit event logging.
4. **Safety & Security Enforcement**: Evaluates 8/8 safety checks and enforces hard-stop rules preventing non-simulated financial mutations or real customer messaging.

---

## Component & Service Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
│   Dashboard  •  Payments  •  AI Agent  •  Intelligence  •  Simulator   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                            SERVICES LAYER                              │
│   agentService  •  intelligenceService  •  campaignService  •  audit   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SAFETY & SIMULATION GATE                        │
│   8/8 Safety Checks  •  Human Approval Checkpoint  •  Hard-Stop Rules   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     PERMANENT AUDIT EVENT STORE                        │
│   auditService (Local Storage Namespace: payrecover_audit_events)       │
└────────────────────────────────────────────────────────────────────────┘
```
