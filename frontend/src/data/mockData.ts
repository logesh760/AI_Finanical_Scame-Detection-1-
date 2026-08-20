import { 
  SecurityStatus, 
  DashboardSummary, 
  Transaction, 
  UPIActivity, 
  AutoPayItem, 
  ScamMessage, 
  ScamAlert, 
  UserBehaviourProfile,
  ScamHistoryItem
} from '../types';

export const mockSecurityStatus: SecurityStatus = {
  status: 'Protected',
  riskLevel: 'LOW',
  overallRiskScore: 24, // 24/100
  lastScanTime: 'Just now (Real-time monitoring active)',
  monitoredSourcesCount: 8,
};

export const mockDashboardSummary: DashboardSummary = {
  totalTransactions: 128,
  suspiciousActivities: 4,
  highRiskAlerts: 2,
  activeAutoPay: 5,
  averageTransactionAmount: 1140,
  highestTransactionAmount: 15000,
  safeActivitiesCount: 122,
};

export const mockUserBehaviourProfile: UserBehaviourProfile = {
  normalAmountRange: { min: 100, max: 2000 },
  commonPaymentTime: '9:00 AM – 8:00 PM',
  knownReceiversCount: 24,
  averageDailyTransactions: 4,
  averageMonthlySpending: 18500,
};

export const mockRecentTransactions: Transaction[] = [
  {
    id: 'TXN-89421',
    date: '18 Aug 2026',
    time: '02:30 AM',
    receiver: 'XYZ Services',
    receiverStatus: 'New',
    amount: 4999,
    type: 'Merchant',
    platform: 'UPI',
    riskScore: 91,
    status: 'HIGH RISK',
    reasons: [
      'New receiver without prior transaction history',
      'Unusual transaction time (2:30 AM outside active window)',
      'Amount is 2.5x higher than normal spending profile',
      'Correlated with unverified WhatsApp payment prompt'
    ],
    explanation: 'This transaction is different from your normal spending behaviour. You usually make payments between ₹100 and ₹2,000 during daytime hours (9 AM – 8 PM).'
  },
  {
    id: 'TXN-89420',
    date: '18 Aug 2026',
    time: '11:45 AM',
    receiver: 'ABC Store (Groceries)',
    receiverStatus: 'Known',
    amount: 850,
    type: 'Merchant',
    platform: 'UPI',
    riskScore: 12,
    status: 'SAFE',
    reasons: ['Frequent verified merchant', 'Normal daytime hours', 'Within standard spending band'],
    explanation: 'Standard verified grocery transaction consistent with your typical spending pattern.'
  },
  {
    id: 'TXN-89419',
    date: '18 Aug 2026',
    time: '10:15 AM',
    receiver: 'FastPay Gateway micro-charge',
    receiverStatus: 'Suspicious Merchant',
    amount: 30,
    type: 'Repeated Micro',
    platform: 'Card',
    riskScore: 58,
    status: 'SUSPICIOUS',
    reasons: ['Part of rapid succession micro-deductions (5 txns in 2 hours)', 'Unrecognized merchant gateway'],
    explanation: 'Detected multiple small deductions to the same merchant within a 2-hour window. Often used by card testing or stealth subscription scammers.'
  },
  {
    id: 'TXN-89418',
    date: '17 Aug 2026',
    time: '07:20 PM',
    receiver: 'Swiggy Food Delivery',
    receiverStatus: 'Known',
    amount: 420,
    type: 'Merchant',
    platform: 'UPI',
    riskScore: 8,
    status: 'SAFE',
    reasons: ['Trusted verified merchant', 'Typical evening transaction'],
    explanation: 'Normal food order payment within historical limits.'
  },
  {
    id: 'TXN-89417',
    date: '17 Aug 2026',
    time: '03:10 PM',
    receiver: 'Rohan Sharma (Friend)',
    receiverStatus: 'Known',
    amount: 1500,
    type: 'P2P',
    platform: 'UPI',
    riskScore: 15,
    status: 'SAFE',
    reasons: ['Existing frequent peer contact', 'Standard P2P transfer'],
    explanation: 'Peer transfer to existing contact in your address book.'
  }
];

export const mockScamAlerts: ScamAlert[] = [
  {
    id: 'ALT-1092',
    alertType: 'HIGH RISK TRANSACTION',
    amount: 4999,
    receiver: 'XYZ Services',
    platform: 'UPI',
    riskScore: 91,
    date: '18 Aug 2026',
    time: '02:30 AM',
    status: 'HIGH RISK',
    summary: 'New receiver detected with unusual midnight amount exceeding normal behaviour profile.',
    reasons: [
      'New receiver detected (no transaction history)',
      'Triggered outside normal user activity window (02:30 AM)',
      'Correlated with an urgent unverified WhatsApp investment request'
    ],
    recommendedAction: 'Freeze UPI payment request and verify receiver credentials before proceeding.'
  },
  {
    id: 'ALT-1091',
    alertType: 'SUSPICIOUS REPEATED DEDUCTION',
    amount: 90,
    receiver: 'Unknown Micro-Merchant',
    platform: 'Transactions',
    riskScore: 68,
    date: '18 Aug 2026',
    time: '10:00 AM – 12:00 PM',
    status: 'HIGH RISK',
    summary: '5 sequential small deductions (₹10, ₹20, ₹10, ₹30, ₹20) detected within 2 hours.',
    reasons: [
      'Rapid repeated micro-transaction pattern',
      'Unrecognized payment gateway',
      'Total accumulated value exceeds typical micro-test threshold'
    ],
    recommendedAction: 'Review card / bank token authorizations and block merchant ID.'
  },
  {
    id: 'ALT-1090',
    alertType: 'UNAUTHORIZED AUTOPAY',
    amount: 2999,
    receiver: 'Unknown Global Cloud Service',
    platform: 'AutoPay',
    riskScore: 78,
    date: '16 Aug 2026',
    time: '08:45 PM',
    status: 'HIGH RISK',
    summary: 'New monthly recurring mandate initiated with no prior history or recognized merchant verification.',
    reasons: [
      'High monthly mandate amount for new merchant',
      'Missing merchant verification badge in NPCI registry',
      'Recurring frequency marked as monthly auto-debit'
    ],
    recommendedAction: 'Cancel AutoPay mandate in your banking/UPI application immediately.'
  }
];

export const mockUPIActivities: UPIActivity[] = [
  {
    id: 'UPI-401',
    upiId: 'xyzservices.pay@okhdfcbank',
    receiver: 'XYZ Services',
    receiverStatus: 'New',
    amount: 5000,
    date: '18 Aug 2026',
    time: '02:28 AM',
    type: 'Payment Request',
    riskScore: 86,
    status: 'HIGH RISK',
    reasons: ['Incoming collect request from unknown VPA', 'Urgent message claim correlation', 'Midnight timing']
  },
  {
    id: 'UPI-402',
    upiId: 'freshmart@okaxis',
    receiver: 'FreshMart Supermarket',
    receiverStatus: 'Known',
    amount: 1120,
    date: '17 Aug 2026',
    time: '06:15 PM',
    type: 'QR Payment',
    riskScore: 10,
    status: 'SAFE',
    reasons: ['Verified physical QR', 'Consistent daytime grocery spend']
  },
  {
    id: 'UPI-403',
    upiId: 'instant-prize-claim@ybl',
    receiver: 'Reward Claim Dept',
    receiverStatus: 'Flagged VPA',
    amount: 499,
    date: '16 Aug 2026',
    time: '04:10 PM',
    type: 'Collect Call',
    riskScore: 92,
    status: 'HIGH RISK',
    reasons: ['VPA flagged by community scam database', 'Claim fee pattern for non-existent lottery']
  }
];

export const mockAutoPayItems: AutoPayItem[] = [
  {
    id: 'AP-01',
    serviceName: 'Netflix India',
    category: 'Entertainment Streaming',
    amount: 649,
    frequency: 'monthly',
    creationDate: '12 Jan 2025',
    receiverStatus: 'Verified Merchant',
    riskScore: 5,
    status: 'SAFE',
    reasons: ['Verified merchant mandate', 'Consistent monthly cycle', 'Established 18-month history']
  },
  {
    id: 'AP-02',
    serviceName: 'State Electricity Board',
    category: 'Utilities',
    amount: 1200,
    frequency: 'monthly',
    creationDate: '05 Mar 2024',
    receiverStatus: 'Verified Merchant',
    riskScore: 8,
    status: 'SAFE',
    reasons: ['Official utility provider', 'Stable historical bills between ₹1,000 and ₹1,400']
  },
  {
    id: 'AP-03',
    serviceName: 'Unknown Cloud VIP Service',
    category: 'Digital Service',
    amount: 2999,
    frequency: 'monthly',
    creationDate: '16 Aug 2026',
    receiverStatus: 'Unknown Service',
    riskScore: 78,
    status: 'HIGH RISK',
    reasons: ['New unverified recurring mandate', 'Sudden high monthly deduction', 'No previous history with provider'],
    explanation: 'This AutoPay mandate was created recently for an unverified merchant. The monthly fee (₹2,999) is significantly higher than your typical subscription commitments.'
  }
];

export const mockScamMessages: ScamMessage[] = [
  {
    id: 'MSG-01',
    platform: 'SMS',
    sender: 'VM-ITDEPT-ALERT',
    timestamp: '18 Aug 2026, 09:12 AM',
    content: 'Dear Customer, your Income Tax refund of Rs 10,000 is approved. Please pay Rs 500 processing verification fee to claim immediately: upi://pay?pa=itrefund500@upi',
    financialRequestType: 'Refund Claim',
    claimedAmount: 10000,
    requestedPayment: 500,
    riskScore: 94,
    status: 'HIGH RISK',
    reasons: [
      'Advance-fee fraud pattern (pay upfront to receive refund)',
      'Fake government agency sender header',
      'Direct embedded UPI payment link'
    ]
  },
  {
    id: 'MSG-02',
    platform: 'WhatsApp',
    sender: '+91 98451 00293',
    timestamp: '18 Aug 2026, 02:15 AM',
    content: 'Congratulations! Send ₹5,000 to receive your guaranteed 300% investment return within 2 hours on our automated crypto platform. Pay via UPI to xyzservices.pay@okhdfcbank',
    financialRequestType: 'Investment Scheme',
    claimedAmount: 20000,
    requestedPayment: 5000,
    riskScore: 96,
    status: 'HIGH RISK',
    reasons: [
      'Unrealistic guaranteed return scheme',
      'Direct correlation with 02:30 AM UPI collect request',
      'Urgency language with high-pressure timeline'
    ],
    isCorrelatedWithTransaction: true,
    correlatedTxId: 'TXN-89421'
  }
];

export const mockScamHistory: ScamHistoryItem[] = [
  {
    id: 'HIS-901',
    date: '12 Aug 2026',
    type: 'Phishing SMS Link',
    description: 'Electricity bill suspension scam message containing malicious link to clone payment gateway.',
    resolution: 'Sender number reported & VPA link blacklisted in NPCI registry.',
    status: 'RESOLVED',
    amount: 0,
    platform: 'SMS'
  },
  {
    id: 'HIS-902',
    date: '10 Aug 2026',
    type: 'UPI Collect Call',
    description: 'Incoming ₹15,000 collect request from fake rewards claim handler (reward-center@okpay).',
    resolution: 'Request rejected, VPA blocked in FinGuard database.',
    status: 'BLOCKED',
    amount: 15000,
    platform: 'UPI'
  },
  {
    id: 'HIS-903',
    date: '04 Aug 2026',
    type: 'AutoPay Mandate',
    description: 'Hidden recurring subscription mandate from unverified global streaming reseller.',
    resolution: 'Mandate cancelled at banking layer, recurring debit revoked.',
    status: 'CANCELLED',
    amount: 1999,
    platform: 'AutoPay'
  },
  {
    id: 'HIS-904',
    date: '28 Jul 2026',
    type: 'WhatsApp Investment Scam',
    description: 'High-pressure crypto lottery scheme message prompting P2P transfer to new merchant.',
    resolution: 'Chat reported and user warned; transfer halted by safety module.',
    status: 'PREVENTED',
    amount: 5000,
    platform: 'WhatsApp'
  }
];
