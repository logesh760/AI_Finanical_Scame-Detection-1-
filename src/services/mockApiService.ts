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

/**
 * Mock API Service Layer
 * 
 * Note for future architecture:
 * In future iterations, replace these mock calls with REST endpoints:
 * - Spring Boot API (port :8080) for transactions, AutoPay, UPI, and user profiles
 * - Python FastAPI (port :8000) for Machine Learning inference, scam classification, & correlation
 */

export const mockApiService = {
  getSecurityStatus: async (): Promise<SecurityStatus> => {
    return Promise.resolve(mockSecurityStatus);
  },

  getDashboardSummary: async (): Promise<DashboardSummary> => {
    return Promise.resolve(mockDashboardSummary);
  },

  getRecentTransactions: async (): Promise<Transaction[]> => {
    return Promise.resolve(mockRecentTransactions);
  },

  getScamAlerts: async (): Promise<ScamAlert[]> => {
    return Promise.resolve(mockScamAlerts);
  },

  getUPIActivities: async (): Promise<UPIActivity[]> => {
    return Promise.resolve(mockUPIActivities);
  },

  getAutoPayItems: async (): Promise<AutoPayItem[]> => {
    return Promise.resolve(mockAutoPayItems);
  },

  getScamMessages: async (): Promise<ScamMessage[]> => {
    return Promise.resolve(mockScamMessages);
  },

  getUserBehaviourProfile: async (): Promise<UserBehaviourProfile> => {
    return Promise.resolve(mockUserBehaviourProfile);
  }
};
