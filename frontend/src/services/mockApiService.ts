import { 
  SecurityStatus, 
  DashboardSummary, 
  Transaction, 
  UPIActivity, 
  AutoPayItem, 
  ScamMessage, 
  ScamAlert,
  UserBehaviourProfile
} from '../types';
import { 
  mockSecurityStatus, 
  mockDashboardSummary, 
  mockRecentTransactions, 
  mockScamAlerts, 
  mockUPIActivities, 
  mockAutoPayItems, 
  mockScamMessages,
  mockUserBehaviourProfile
} from '../data/mockData';

// API base URL configuration (reads from environment variables or defaults to current origin /api)
const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * API Service Layer
 * 
 * Attempts to fetch live data from the Express backend.
 * Falls back to local mock data if the backend server is unreachable.
 */
export const mockApiService = {
  getSecurityStatus: async (): Promise<SecurityStatus> => {
    try {
      const res = await fetch(`${API_URL}/security-status`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockSecurityStatus:', e);
    }
    return Promise.resolve(mockSecurityStatus);
  },

  getDashboardSummary: async (): Promise<DashboardSummary> => {
    try {
      const res = await fetch(`${API_URL}/summary`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockDashboardSummary:', e);
    }
    return Promise.resolve(mockDashboardSummary);
  },

  getRecentTransactions: async (): Promise<Transaction[]> => {
    try {
      const res = await fetch(`${API_URL}/transactions`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockRecentTransactions:', e);
    }
    return Promise.resolve(mockRecentTransactions);
  },

  getScamAlerts: async (): Promise<ScamAlert[]> => {
    try {
      const res = await fetch(`${API_URL}/scam-alerts`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockScamAlerts:', e);
    }
    return Promise.resolve(mockScamAlerts);
  },

  getUPIActivities: async (): Promise<UPIActivity[]> => {
    try {
      const res = await fetch(`${API_URL}/upi-activities`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockUPIActivities:', e);
    }
    return Promise.resolve(mockUPIActivities);
  },

  getAutoPayItems: async (): Promise<AutoPayItem[]> => {
    try {
      const res = await fetch(`${API_URL}/autopay-items`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockAutoPayItems:', e);
    }
    return Promise.resolve(mockAutoPayItems);
  },

  getScamMessages: async (): Promise<ScamMessage[]> => {
    try {
      const res = await fetch(`${API_URL}/scam-messages`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockScamMessages:', e);
    }
    return Promise.resolve(mockScamMessages);
  },

  getUserBehaviourProfile: async (): Promise<UserBehaviourProfile> => {
    try {
      const res = await fetch(`${API_URL}/user-profile`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Backend offline, using fallback mockUserBehaviourProfile:', e);
    }
    return Promise.resolve(mockUserBehaviourProfile);
  }
};
