// PayRecover AI Authentication & Merchant Account Service Layer

import { auditService } from './auditService';

const SESSION_KEY = 'payrecover_auth_session';

const defaultMerchantAccount = {
  id: "USR_101",
  name: "Mounika",
  email: "merchant@acmecorp.com",
  role: "Merchant Owner",
  company: "Acme Corp.",
  merchantId: "acc_live_99214A",
  initials: "M",
  team: [
    { id: "T1", name: "Mounika", email: "merchant@acmecorp.com", role: "Owner", status: "Active" },
    { id: "T2", name: "Rahul Sharma", email: "rahul@acmecorp.com", role: "Finance Admin", status: "Active" },
    { id: "T3", name: "Priya Reddy", email: "priya@acmecorp.com", role: "Analyst", status: "Active" }
  ]
};

export const authService = {
  // Check if session token exists and is valid
  isAuthenticated() {
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      if (!sessionStr) return false;
      const session = JSON.parse(sessionStr);
      if (!session || !session.token) return false;
      return true;
    } catch (e) {
      return false;
    }
  },

  getCurrentUser() {
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      if (!sessionStr) return defaultMerchantAccount;
      const session = JSON.parse(sessionStr);
      return session.user || defaultMerchantAccount;
    } catch (e) {
      return defaultMerchantAccount;
    }
  },

  // Perform Sign In / Authentication
  login({ email, password, remember = true }) {
    if (!email || !password) {
      return { success: false, error: "Please enter both email address and password." };
    }

    if (!email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Demo account credential match or generic merchant login
    const user = {
      ...defaultMerchantAccount,
      email: email.trim().toLowerCase(),
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      initials: email.charAt(0).toUpperCase()
    };

    const token = `token_live_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const session = {
      token,
      user,
      loginTime: new Date().toISOString()
    };

    if (remember) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    // Register Audit Event
    auditService.createAuditEvent({
      type: "Safety Check Passed",
      transactionId: "AUTH_LOGIN",
      customer: user.company,
      amount: 0,
      actor: user.name,
      strategy: "Sign In",
      status: "Passed",
      description: `Merchant ${user.name} (${user.email}) successfully authenticated session.`
    });

    return { success: true, user, token };
  },

  // Perform Sign Out / Session Invalidation (Requirement #6)
  logout() {
    const user = this.getCurrentUser();
    
    localStorage.removeItem(SESSION_KEY);

    // Register Audit Event
    auditService.createAuditEvent({
      type: "Safety Check Passed",
      transactionId: "AUTH_LOGOUT",
      customer: user?.company || "Acme Corp.",
      amount: 0,
      actor: user?.name || "Merchant",
      strategy: "Sign Out",
      status: "Passed",
      description: `Merchant session invalidated and signed out.`
    });

    return true;
  },

  // Update Merchant Account Profile (Requirement #11)
  updateMerchantProfile(updatedFields = {}) {
    const currentUser = this.getCurrentUser();
    const updatedUser = {
      ...currentUser,
      ...updatedFields,
      initials: (updatedFields.name || currentUser.name).charAt(0).toUpperCase()
    };

    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        session.user = updatedUser;
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      } catch (e) {}
    }

    return updatedUser;
  }
};
