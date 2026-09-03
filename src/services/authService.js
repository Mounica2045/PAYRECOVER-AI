// PayRecover AI Authentication & Merchant Account Service Layer

import { auditService } from './auditService';

const SESSION_KEY = 'payrecover_auth_session';

const knownAccounts = {
  "merchant@acmecorp.com": {
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
  },
  "apex@merchants.com": {
    id: "USR_202",
    name: "Vikram Mehta",
    email: "apex@merchants.com",
    role: "Merchant Owner",
    company: "Apex Retail India",
    merchantId: "acc_live_88412B",
    initials: "V",
    team: [
      { id: "T1", name: "Vikram Mehta", email: "apex@merchants.com", role: "Owner", status: "Active" },
      { id: "T2", name: "Neha Gupta", email: "neha@merchants.com", role: "Finance Admin", status: "Active" }
    ]
  }
};

const defaultMerchantAccount = knownAccounts["merchant@acmecorp.com"];

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

  // Authenticate Session via Verified Email OTP (Requirements #7, #9, #10, #11)
  authenticateWithEmail(email = '') {
    const cleanEmail = email.trim().toLowerCase();
    let user;

    if (knownAccounts[cleanEmail]) {
      user = knownAccounts[cleanEmail];
    } else {
      // New Merchant Account Onboarding Flow (Requirement #10)
      const username = cleanEmail.split('@')[0];
      const domain = cleanEmail.split('@')[1] ? cleanEmail.split('@')[1].split('.')[0] : 'merchant';
      const formattedCompany = domain.charAt(0).toUpperCase() + domain.slice(1) + ' Payments';
      const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
      
      user = {
        id: `USR_${Math.floor(1000 + Math.random() * 9000)}`,
        name: formattedName,
        email: cleanEmail,
        role: "Merchant Owner",
        company: formattedCompany,
        merchantId: `acc_live_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        initials: formattedName.charAt(0).toUpperCase(),
        team: [
          { id: "T1", name: formattedName, email: cleanEmail, role: "Owner", status: "Active" }
        ]
      };
    }

    const token = `token_live_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const session = {
      token,
      user,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    // Register Audit Event
    auditService.createAuditEvent({
      type: "Safety Check Passed",
      transactionId: "AUTH_EMAIL_OTP",
      customer: user.company,
      amount: 0,
      actor: user.name,
      strategy: "Passwordless Email OTP",
      status: "Passed",
      description: `Merchant ${user.name} (${user.email}) successfully authenticated via Email OTP.`
    });

    return { success: true, user, token };
  },

  // Perform Sign Out / Session Invalidation (Requirement #14)
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

  // Update Merchant Account Profile (Requirement #15)
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
