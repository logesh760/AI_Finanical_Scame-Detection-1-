export type RiskLevel = 'SAFE' | 'SUSPICIOUS' | 'HIGH RISK';

export type InputPlatform = 
  | 'SMS'
  | 'WhatsApp'
  | 'Telegram'
  | 'Instagram'
  | 'Other Social Media'
  | 'UPI'
  | 'Transactions'
  | 'AutoPay';

export interface RiskFactor {
  name: string;
  scoreImpact: number;
  description: string;
}

export interface Transaction {
  id: string;
  date: string;
  time: string;
  receiver: string;
  receiverStatus: 'Known' | 'New' | 'Suspicious Merchant' | 'Unverified';
  amount: number;
  type: 'Debit' | 'Credit' | 'P2P' | 'Merchant' | 'Subscription' | 'Repeated Micro';
  platform: 'Bank Transfer' | 'Card' | 'Net Banking' | 'UPI';
  riskScore: number;
  status: RiskLevel;
  reasons: string[];
  explanation: string;
}

export interface UPIActivity {
  id: string;
  upiId: string;
  receiver: string;
  receiverStatus: 'Known' | 'New' | 'Flagged VPA' | 'Unverified';
  amount: number;
  date: string;
  time: string;
  type: 'Payment Request' | 'Direct Transfer' | 'Collect Call' | 'QR Payment';
  riskScore: number;
  status: RiskLevel;
  reasons: string[];
}

export interface AutoPayItem {
  id: string;
  serviceName: string;
  category: string;
  amount: number;
  frequency: 'monthly' | 'quarterly' | 'yearly' | 'weekly';
  previousAmount?: number;
  creationDate: string;
  receiverStatus: 'Verified Merchant' | 'New Recurring' | 'Unknown Service';
  riskScore: number;
  status: RiskLevel;
  reasons: string[];
  explanation?: string;
}

export interface ScamMessage {
  id: string;
  platform: 'SMS' | 'WhatsApp' | 'Telegram' | 'Instagram' | 'Social Media';
  sender: string;
  timestamp: string;
  content: string;
  financialRequestType: 'Refund Claim' | 'Investment Scheme' | 'Lottery / Gift' | 'UPI Request' | 'KYC Suspension';
  claimedAmount?: number;
  requestedPayment?: number;
  riskScore: number;
  status: RiskLevel;
  reasons: string[];
  isCorrelatedWithTransaction?: boolean;
  correlatedTxId?: string;
}

export interface ScamAlert {
  id: string;
  alertType: 'HIGH RISK TRANSACTION' | 'SUSPICIOUS REPEATED DEDUCTION' | 'UNAUTHORIZED AUTOPAY' | 'CROSS-PLATFORM PHISHING' | 'FLAGGED UPI VPA';
  amount: number;
  receiver: string;
  platform: InputPlatform;
  riskScore: number;
  date: string;
  time: string;
  status: RiskLevel;
  summary: string;
  reasons: string[];
  recommendedAction: string;
}

export interface ScamHistoryItem {
  id: string;
  date: string;
  type: string;
  description: string;
  resolution: string;
  status: 'RESOLVED' | 'BLOCKED' | 'CANCELLED' | 'PREVENTED';
  amount: number;
  platform: string;
}

export interface SecurityStatus {
  status: 'Protected' | 'Attention Required' | 'High Risk Detected';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  overallRiskScore: number; // e.g. 24/100
  lastScanTime: string;
  monitoredSourcesCount: number;
}

export interface DashboardSummary {
  totalTransactions: number;
  suspiciousActivities: number;
  highRiskAlerts: number;
  activeAutoPay: number;
  averageTransactionAmount: number;
  highestTransactionAmount: number;
  safeActivitiesCount: number;
}

export interface UserBehaviourProfile {
  normalAmountRange: { min: number; max: number };
  commonPaymentTime: string;
  knownReceiversCount: number;
  averageDailyTransactions: number;
  averageMonthlySpending: number;
}

export type NavigationTab = 
  | 'dashboard'
  | 'transactions'
  | 'upi'
  | 'autopay'
  | 'messages'
  | 'alerts'
  | 'risk-analysis'
  | 'history'
  | 'chatbot'
  | 'profile'
  | 'settings';
