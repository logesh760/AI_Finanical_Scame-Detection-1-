import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// Initialize GoogleGenAI client if API key is present
let ai = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log('Google GenAI client initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize GoogleGenAI client:', error);
  }
}


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data Store
const mockSecurityStatus = {
  status: 'Protected',
  riskLevel: 'LOW',
  overallRiskScore: 24,
  lastScanTime: 'Just now (Real-time monitoring active)',
  monitoredSourcesCount: 8,
};

const mockDashboardSummary = {
  totalTransactions: 128,
  suspiciousActivities: 4,
  highRiskAlerts: 2,
  activeAutoPay: 5,
  averageTransactionAmount: 1140,
  highestTransactionAmount: 15000,
  safeActivitiesCount: 122,
};

const mockUserBehaviourProfile = {
  normalAmountRange: { min: 100, max: 2000 },
  commonPaymentTime: '9:00 AM – 8:00 PM',
  knownReceiversCount: 24,
  averageDailyTransactions: 4,
  averageMonthlySpending: 18500,
};

const mockRecentTransactions = [
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

const mockScamAlerts = [
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

const mockUPIActivities = [
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

const mockAutoPayItems = [
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

const mockScamMessages = [
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

// API Endpoints
app.get('/api/security-status', (req, res) => {
  res.json(mockSecurityStatus);
});

app.get('/api/summary', (req, res) => {
  res.json(mockDashboardSummary);
});

app.get('/api/transactions', (req, res) => {
  res.json(mockRecentTransactions);
});

app.get('/api/scam-alerts', (req, res) => {
  res.json(mockScamAlerts);
});

app.get('/api/upi-activities', (req, res) => {
  res.json(mockUPIActivities);
});

app.get('/api/autopay-items', (req, res) => {
  res.json(mockAutoPayItems);
});

app.get('/api/scam-messages', (req, res) => {
  res.json(mockScamMessages);
});

app.get('/api/user-profile', (req, res) => {
  res.json(mockUserBehaviourProfile);
});

// AI Chatbot Support Endpoint
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Fallback if no API key is configured
  if (!process.env.GEMINI_API_KEY || !ai) {
    let mockResponse = "Hello! I am FinGuard's AI Assistant. Currently, the live Gemini API key is not configured in the backend environment. Please set GEMINI_API_KEY in your environment variables to enable live AI responses.\n\nBased on your query, here is some security advice: Always verify payment requests from unknown numbers, and never share OTPs or credit card details.";
    
    const query = message.toLowerCase();
    if (query.includes('xyz') || query.includes('risk') || query.includes('flagged')) {
      mockResponse = "The transaction to 'XYZ Services' for ₹4,999 is flagged as HIGH RISK because: \n1. It occurred at 2:30 AM (outside normal daytime window).\n2. The amount is 2.5x higher than your usual pattern.\n3. It correlates with an unverified WhatsApp prompt. \n\nWe recommend freezing this request until you confirm the seller's details.";
    } else if (query.includes('autopay') || query.includes('subscription')) {
      mockResponse = "The 'Unknown Cloud VIP Service' AutoPay mandate is highly suspicious because it is set for a recurring ₹2,999/month mandate with no prior history or merchant registry. You should immediately cancel this recurring mandate in your UPI app.";
    } else if (query.includes('tax') || query.includes('refund') || query.includes('sms')) {
      mockResponse = "The message from 'VM-ITDEPT-ALERT' claiming a ₹10,000 refund is a classic Advance-Fee Scam. The link asks for a ₹500 fee upfront. Tax departments never ask for upfront payment via UPI to process refunds. Do not click the link or send money.";
    }
    
    return res.json({ response: mockResponse, isMock: true });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are FinGuard AI, an expert financial security assistant. You help users analyze scams, phishing SMS, fake UPI collect requests, and unauthorized AutoPay subscriptions. Keep your responses highly professional, action-oriented, clear, and under 150 words. Do not make up information outside financial security."
      }
    });

    res.json({ response: response.text, isMock: false });
  } catch (error) {
    console.error('Error contacting Gemini API:', error);
    res.status(500).json({ error: 'Failed to communicate with AI model', details: error.message });
  }
});

// Default status route
app.get('/', (req, res) => {
  res.send('FinGuard AI Scam Detection Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
