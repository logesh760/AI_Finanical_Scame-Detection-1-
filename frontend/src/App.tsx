/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  NavigationTab, 
  SecurityStatus, 
  DashboardSummary, 
  Transaction, 
  ScamAlert 
} from './types';
import { mockApiService } from './services/mockApiService';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardShell } from './components/dashboard/DashboardShell';
import { ChatbotTab } from './components/dashboard/ChatbotTab';
import { TransactionsTab } from './components/dashboard/TransactionsTab';
import { UPIActivityTab } from './components/dashboard/UPIActivityTab';
import { AutoPayTab } from './components/dashboard/AutoPayTab';
import { MessagesTab } from './components/dashboard/MessagesTab';
import { ScamAlertsTab } from './components/dashboard/ScamAlertsTab';
import { AIRiskAnalysisTab } from './components/dashboard/AIRiskAnalysisTab';
import { ScamHistoryTab } from './components/dashboard/ScamHistoryTab';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowLeftRight, 
  Smartphone, 
  Repeat, 
  MessageSquareWarning, 
  AlertOctagon, 
  BrainCircuit, 
  History, 
  Bot, 
  User, 
  Settings as SettingsIcon,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Loaded data state from service
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [scamAlerts, setScamAlerts] = useState<ScamAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [statusRes, summaryRes, txnsRes, alertsRes] = await Promise.all([
          mockApiService.getSecurityStatus(),
          mockApiService.getDashboardSummary(),
          mockApiService.getRecentTransactions(),
          mockApiService.getScamAlerts(),
        ]);

        setSecurityStatus(statusRes);
        setSummary(summaryRes);
        setRecentTransactions(txnsRes);
        setScamAlerts(alertsRes);
      } catch (err) {
        console.error('Error loading initial mock data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleToggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const handleCloseMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  // Quick helper for tabs pending implementation in subsequent steps
  const renderTabPlaceholder = (tab: NavigationTab) => {
    const tabMeta: Record<NavigationTab, { title: string; desc: string; icon: React.ComponentType<{ className?: string }>; step: string }> = {
      dashboard: { title: 'Dashboard', desc: 'Main Financial Security Overview', icon: Sparkles, step: 'STEP 1 (Current)' },
      transactions: { title: 'Transactions Monitoring', desc: 'Transaction ledger, behavioral anomaly detectors, and deep inspection modal', icon: ArrowLeftRight, step: 'STEP 5' },
      upi: { title: 'UPI Activity Analysis', desc: 'VPA requests, Collect calls, QR scanning fraud risk detection', icon: Smartphone, step: 'STEP 6' },
      autopay: { title: 'AutoPay Mandates', desc: 'Recurring subscription analysis, unexpected deductions, and sudden fee surge monitoring', icon: Repeat, step: 'STEP 7' },
      messages: { title: 'Communication Stream', desc: 'SMS, WhatsApp, Telegram, and Instagram simulated scam message classification', icon: MessageSquareWarning, step: 'STEP 8' },
      alerts: { title: 'Scam Alerts Center', desc: 'High-risk and suspicious alerts with detailed mitigation guidance', icon: AlertOctagon, step: 'STEP 11' },
      'risk-analysis': { title: 'AI Risk & Anomaly Analysis', desc: 'Cross-platform correlation timeline and behavioural deviation scoring', icon: BrainCircuit, step: 'STEP 9 & 10' },
      history: { title: 'Scam History', desc: 'Historical archive of detected fraudulent patterns and resolved flags', icon: History, step: 'STEP 13' },
      chatbot: { title: 'FinGuard AI Security Assistant', desc: 'Interactive AI chatbot for instant risk explanations and inquiry resolution', icon: Bot, step: 'STEP 12' },
      profile: { title: 'User Profile & Security', desc: 'Account credentials, baseline spending profiles, and recognized merchant registry', icon: User, step: 'STEP 14' },
      settings: { title: 'Settings & Privacy Controls', desc: 'Alert thresholds, notification routes, and data stream authorization parameters', icon: SettingsIcon, step: 'STEP 14' },
    };

    const current = tabMeta[tab] || { title: tab, desc: '', icon: Sparkles, step: '' };
    const Icon = current.icon;

    return (
      <div id={`tab-placeholder-${tab}`} className="space-y-6">
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-xl space-y-5 my-8">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mx-auto flex items-center justify-center">
            <Icon className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-gray-400 text-xs font-mono font-semibold border border-white/5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              Scheduled in Master Plan: {current.step}
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {current.title}
            </h2>
            <p className="text-sm text-gray-400">
              {current.desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300 text-left space-y-2 font-mono">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Step 1 Setup Status:
            </div>
            <p className="text-gray-400 leading-relaxed font-sans text-xs">
              Base project structure, responsive navigation, types, mock data service, and main dashboard shell are fully configured with the Elegant Dark theme.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            Return to Main Dashboard
          </button>
        </div>
      </div>
    );
  };

  if (isLoading || !securityStatus || !summary) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-gray-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
          <div className="text-xs text-gray-400 font-medium font-mono">
            Initializing FinGuard AI Scam Detection System...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 flex">
      {/* 1. Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileNavOpen={isMobileNavOpen}
        onCloseMobileNav={handleCloseMobileNav}
        highRiskCount={summary.highRiskAlerts}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 bg-[#121212]">
        {/* Header */}
        <Header
          securityStatus={securityStatus}
          isMobileNavOpen={isMobileNavOpen}
          onToggleMobileNav={handleToggleMobileNav}
          activeAlertsCount={summary.highRiskAlerts}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' ? (
            <DashboardShell
              securityStatus={securityStatus}
              summary={summary}
              recentTransactions={recentTransactions}
              scamAlerts={scamAlerts}
              onNavigate={setActiveTab}
            />
          ) : activeTab === 'chatbot' ? (
            <ChatbotTab />
          ) : activeTab === 'transactions' ? (
            <TransactionsTab />
          ) : activeTab === 'upi' ? (
            <UPIActivityTab />
          ) : activeTab === 'autopay' ? (
            <AutoPayTab />
          ) : activeTab === 'messages' ? (
            <MessagesTab />
          ) : activeTab === 'alerts' ? (
            <ScamAlertsTab />
          ) : activeTab === 'risk-analysis' ? (
            <AIRiskAnalysisTab />
          ) : activeTab === 'history' ? (
            <ScamHistoryTab />
          ) : (
            renderTabPlaceholder(activeTab)
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 px-6 py-4 text-center text-xs text-gray-500 bg-[#0D0D0D]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span className="text-gray-400">AI-Based Multi-Platform Financial Scam Detection &bull; Prototype V1.0</span>
            </div>
            <div className="text-[11px] text-gray-500">
              Ready for Spring Boot + FastAPI Backend Integration
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
