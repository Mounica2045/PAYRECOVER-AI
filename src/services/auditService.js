// Central Audit & Safety Service Store
// Persists local audit events in localStorage namespace 'payrecover_audit_events'

import { initialAuditEvents, initialSafetyEvents, mockSafetyControls, mockSafetyRules } from '../data/auditData';

const LOCAL_STORAGE_KEY = 'payrecover_audit_events';

export const auditService = {
  // Returns all audit events (initial + local persisted)
  getAuditEvents() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const localEvents = stored ? JSON.parse(stored) : [];
      
      // Combine local events first, then initial events without duplicates
      const combined = [...localEvents, ...initialAuditEvents];
      const unique = Array.from(new Map(combined.map(e => [e.id, e])).values());

      return unique.sort((a, b) => {
        if (a.date !== b.date) return a.date < b.date ? 1 : -1;
        return a.id < b.id ? 1 : -1;
      });
    } catch (e) {
      console.warn("Unable to access localStorage for audit events:", e);
      return initialAuditEvents;
    }
  },

  // Appends a new audit event generated from Phase 6 or Phase 7
  createAuditEvent(eventPayload) {
    if (!eventPayload) return null;

    const newEvent = {
      id: eventPayload.id || `EVT_${Date.now()}`,
      timestamp: eventPayload.timestamp || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: eventPayload.date || new Date().toISOString().split('T')[0],
      transactionId: eventPayload.transactionId || 'TXN_1042',
      customer: eventPayload.customer || 'Rahul Sharma',
      amount: eventPayload.amount || 4999,
      formattedAmount: eventPayload.formattedAmount || (eventPayload.amount ? `₹${eventPayload.amount.toLocaleString('en-IN')}` : '₹4,999'),
      type: eventPayload.type || 'Simulation Completed',
      actor: eventPayload.actor || 'AI + Merchant',
      strategy: eventPayload.strategy || 'Delayed Retry',
      status: eventPayload.status || 'Simulated',
      simulation: eventPayload.simulation !== undefined ? eventPayload.simulation : true,
      description: eventPayload.description || 'Action recorded in audit log.',
      details: eventPayload.details || {}
    };

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const localEvents = stored ? JSON.parse(stored) : [];
      const updated = [newEvent, ...localEvents];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Unable to save audit event to localStorage:", e);
    }

    return newEvent;
  },

  // Returns transaction audit timeline
  getAuditEventsByTransaction(transactionId) {
    const all = this.getAuditEvents();
    return all.filter(e => e.transactionId === transactionId);
  },

  // Returns safety events
  getSafetyEvents() {
    return initialSafetyEvents;
  },

  // Returns active safety controls
  getSafetyControls() {
    return mockSafetyControls;
  },

  // Returns safety rules
  getSafetyRules() {
    return mockSafetyRules;
  },

  // Exports currently filtered audit events to CSV file
  exportAuditEventsToCSV(events = []) {
    if (!events || events.length === 0) return;

    const headers = ["Event ID", "Timestamp", "Date", "Event Type", "Transaction ID", "Customer", "Amount", "Actor", "Strategy", "Status", "Simulation", "Description"];
    
    const rows = events.map(e => [
      e.id,
      e.timestamp,
      e.date,
      `"${e.type}"`,
      e.transactionId,
      `"${e.customer}"`,
      e.amount,
      `"${e.actor}"`,
      `"${e.strategy}"`,
      `"${e.status}"`,
      e.simulation ? "TRUE" : "FALSE",
      `"${e.description.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `PayRecover_Audit_Log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Clears local demo audit storage
  clearDemoAuditData() {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.warn("Unable to clear audit storage:", e);
    }
  }
};
