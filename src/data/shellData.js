// Shell & Navigation Mock Data

export const merchantProfile = {
  name: "Merchant",
  company: "Acme Corp.",
  initials: "M",
  email: "merchant@acmecorp.com",
  merchantId: "acc_live_99214A"
};

export const notificationsList = [
  { id: 1, title: "3 payment recoveries need approval", time: "5m ago", type: "warning", unread: true },
  { id: 2, title: "2 high-value payments failed", time: "18m ago", type: "danger", unread: true },
  { id: 3, title: "AI analysis completed for 14 payments", time: "1h ago", type: "info", unread: true },
  { id: 4, title: "HDFC gateway node recovered", time: "3h ago", type: "success", unread: false },
  { id: 5, title: "Weekly recovery summary report ready", time: "1d ago", type: "info", unread: false }
];

export const mockSearchResults = [
  { id: "TXN_1042", type: "Transaction", title: "TXN_1042 — ₹4,999", subtitle: "Rahul Sharma • Bank unavailable • Failed", status: "Ready" },
  { id: "TXN_1038", type: "Transaction", title: "TXN_1038 — ₹9,999", subtitle: "Priya Reddy • Card expired • Failed", status: "Action Needed" },
  { id: "TXN_1021", type: "Transaction", title: "TXN_1021 — ₹2,499", subtitle: "Arjun Kumar • Insufficient funds • Failed", status: "Pending" },
  { id: "rahul", type: "Customer", title: "Rahul Sharma", subtitle: "7 successful payments • ₹32,400 LTV", status: "High LTV" },
  { id: "priya", type: "Customer", title: "Priya Reddy", subtitle: "14 successful payments • ₹68,500 LTV", status: "High LTV" }
];
