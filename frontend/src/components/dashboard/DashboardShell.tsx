import React from 'react';
import { 
  SecurityStatus, 
  DashboardSummary, 
  Transaction, 
  ScamAlert,
  InputPlatform,
  NavigationTab
} from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { DemoDataNotice } from '../common/DemoDataNotice';
import { EmptyState } from '../common/EmptyState';
import { 
  ArrowLeftRight, 
  Repeat, 
  Smartphone, 
  MessageSquare, 
  Send, 
  Instagram, 
  Share2, 
  CreditCard, 
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DashboardShellProps {
  securityStatus: SecurityStatus;
  summary: DashboardSummary;
  recentTransactions: Transaction[];
  scamAlerts: ScamAlert[];
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  securityStatus,
  summary,
  recentTransactions,
  scamAlerts,
  onNavigate,
}) => {
  const inputSources: { name: InputPlatform; count: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { name: 'SMS', count: '14 monitored', icon: MessageSquare },
    { name: 'WhatsApp', count: 'Simulated feed', icon: Send },
    { name: 'Telegram', count: 'Simulated feed', icon: Send },
    { name: 'Instagram', count: 'Simulated feed', icon: Instagram },
    { name: 'Other Social Media', count: 'Filtered scans', icon: Share2 },
    { name: 'UPI', count: 'Real-time VPAs', icon: Smartphone },
    { name: 'Transactions', count: 'Bank streams', icon: CreditCard },
    { name: 'AutoPay', count: '5 active mandates', icon: Repeat },
  ];

  return (
    <div id="dashboard-shell-container" className="space-y-6">
      {/* 1. Prototype Simulation Notice */}
      <DemoDataNotice />

      {/* 2. Top Summary Grid matching Elegant Dark Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Risk Score with Progress Bar */}
        <div 
          id="stat-card-overall-risk" 
          className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl shadow-lg shadow-black/40 flex flex-col justify-between"
        >
          <div>
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide font-medium">
              Overall Risk Score
            </p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white tracking-tight font-sans">
                {securityStatus.overallRiskScore}
              </span>
              <span className="text-gray-600 mb-1 font-mono text-sm">/ 100</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full transition-all duration-700" 
                style={{ width: `${securityStatus.overallRiskScore}%` }} 
              />
            </div>
            <p className="text-[10px] text-gray-500 mt-2 font-mono flex items-center justify-between">
              <span>Risk Level: <strong className="text-green-500">{securityStatus.riskLevel}</strong></span>
              <span>Baseline: Normal</span>
            </p>
          </div>
        </div>

        {/* Card 2: Suspicious Activities */}
        <div 
          id="stat-card-suspicious-activities" 
          className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl shadow-lg shadow-black/40 flex flex-col justify-between"
        >
          <div>
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide font-medium">
              Suspicious Activities
            </p>
            <p className="text-3xl font-bold text-orange-500 font-sans tracking-tight">
              0{summary.suspiciousActivities}
            </p>
          </div>
          <p className="text-[10px] text-gray-600 mt-3 italic font-mono">
            Last 30 days &bull; Demo Data
          </p>
        </div>

        {/* Card 3: High Risk Alerts */}
        <div 
          id="stat-card-high-risk-alerts" 
          className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl shadow-lg shadow-black/40 flex flex-col justify-between"
        >
          <div>
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide font-medium">
              High Risk Alerts
            </p>
            <p className="text-3xl font-bold text-red-500 font-sans tracking-tight">
              0{summary.highRiskAlerts}
            </p>
          </div>
          <p className="text-[10px] text-gray-600 mt-3 italic font-mono uppercase">
            Immediate Action Suggested
          </p>
        </div>

        {/* Card 4: Active AutoPay */}
        <div 
          id="stat-card-active-autopay" 
          className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl shadow-lg shadow-black/40 flex flex-col justify-between"
        >
          <div>
            <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide font-medium">
              Active AutoPay
            </p>
            <p className="text-3xl font-bold text-white font-sans tracking-tight">
              0{summary.activeAutoPay}
            </p>
          </div>
          <p className="text-[10px] text-gray-600 mt-3 italic font-mono">
            Monitoring recurring flows
          </p>
        </div>
      </div>

      {/* 3. Multi-Platform Input Sources Bar */}
      <div 
        id="multi-platform-sources-bar" 
        className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 shadow-lg shadow-black/30"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-300">
              8 Multi-Platform Input Sources Monitored
            </h2>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">
            Simulated in prototype &bull; Scans unified for scam correlation
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {inputSources.map((src) => {
            const Icon = src.icon;
            return (
              <div
                key={src.name}
                id={`source-${src.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors text-center flex flex-col items-center justify-center gap-1.5"
              >
                <div className="p-1.5 rounded-lg bg-white/5 text-gray-300">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px] font-semibold text-gray-200 truncate w-full">
                  {src.name}
                </div>
                <div className="text-[9px] text-gray-500 truncate w-full font-mono">
                  {src.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Lower Grid: Recent Financial Activity & Alerts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Transactions Table matching Elegant Dark */}
        <div 
          id="recent-transactions-card" 
          className="lg:col-span-2 bg-[#1A1A1A] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-xl"
        >
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wide text-white">
                Recent Financial Activity
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Evaluated against behavioural baseline (₹100 – ₹2,000)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-500 px-2.5 py-1 border border-white/10 rounded uppercase font-mono bg-black/30">
                Live Stream
              </span>
              <button
                onClick={() => onNavigate('transactions')}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                All <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="p-6">
              <EmptyState
                id="empty-recent-transactions"
                icon={ArrowLeftRight}
                title="No recent transactions"
                description="No financial activity recorded in the current monitoring cycle. Incoming payments and transfers will appear here in real time."
                actionText="Refresh Transactions"
                onAction={() => onNavigate('transactions')}
              />
            </div>
          ) : (
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 text-[11px] uppercase tracking-wider border-b border-white/5">
                    <th className="pb-3 px-2 font-semibold">Receiver</th>
                    <th className="pb-3 px-2 font-semibold">Amount</th>
                    <th className="pb-3 px-2 font-semibold">Type</th>
                    <th className="pb-3 px-2 font-semibold text-center">Risk</th>
                    <th className="pb-3 px-2 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-white/5">
                  {recentTransactions.map((tx) => (
                    <tr 
                      key={tx.id} 
                      id={`table-row-${tx.id}`}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3.5 px-2">
                        <div className="font-medium text-white">{tx.receiver}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{tx.date} &bull; {tx.time}</div>
                      </td>
                      <td className="py-3.5 px-2 font-bold text-white font-mono text-sm">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-2 text-gray-400 text-xs">
                        {tx.type} ({tx.platform})
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-bold">
                        <span className={
                          tx.riskScore > 60 
                            ? 'text-red-500' 
                            : tx.riskScore > 30 
                            ? 'text-orange-500' 
                            : 'text-gray-400'
                        }>
                          {tx.riskScore}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <RiskBadge 
                          id={`tx-risk-badge-${tx.id}`} 
                          status={tx.status} 
                          size="xs" 
                          showIcon={true} 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right 1 Col: Scam Alerts Box & AI Chatbot Support box */}
        <div className="flex flex-col gap-6">
          {/* Security Alert Card */}
          <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl flex flex-col p-5 shadow-xl">
            <h2 className="font-bold text-sm uppercase tracking-wide mb-4 flex items-center justify-between text-white">
              <span>Security Alerts</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                scamAlerts.length > 0
                  ? 'text-red-500 bg-red-500/10 border-red-500/20'
                  : 'text-gray-500 bg-white/5 border-white/10'
              }`}>
                {scamAlerts.length > 0 ? `NEW (${scamAlerts.length})` : '0 ACTIVE'}
              </span>
            </h2>

            {scamAlerts.length === 0 ? (
              <EmptyState
                id="empty-security-alerts"
                icon={ShieldCheck}
                title="No active security alerts"
                description="All evaluated payment requests and communication streams currently match safe behavioral baselines."
                compact
              />
            ) : (
              <div className="space-y-3">
                {scamAlerts.slice(0, 1).map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 relative overflow-hidden space-y-2.5"
                  >
                    <div className="absolute top-0 right-0 p-2 opacity-10 font-bold text-4xl text-red-500 select-none pointer-events-none">
                      !
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wide">
                        {alert.alertType}
                      </p>
                      <span className="text-[10px] text-gray-500 font-mono">{alert.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {alert.summary}
                    </p>
                    <div className="flex gap-2 items-center pt-1">
                      <div className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold font-mono">
                        SCORE: {alert.riskScore}
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">
                        REF: {alert.id.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onNavigate('alerts')}
              className="mt-4 w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium border border-white/5 transition-colors text-center"
            >
              View All Security Alerts
            </button>
          </div>

          {/* AI Chatbot Support Box matching Design HTML */}
          <div className="flex-1 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-white/5 rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-xl min-h-[220px]">
            <div>
              <h2 className="font-bold text-sm uppercase tracking-wide mb-1 text-white">
                AI Chatbot Support
              </h2>
              <p className="text-[10px] text-gray-500 mb-4 font-mono">
                FinGuard AI Assistant
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 text-xs text-gray-400 italic border border-white/5">
                  "Why is the XYZ Services transaction flagged as high risk?"
                </div>
                <div className="bg-red-900/20 border-l-2 border-red-500 rounded p-3 text-xs text-gray-300">
                  <b>AI:</b> Receiver is new, amount deviates by +340% from typical spending, and source was a simulated WhatsApp link.
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('chatbot')}
              className="mt-4 h-10 bg-black/40 rounded-full border border-white/5 flex items-center justify-between px-4 text-xs text-gray-500 hover:text-gray-300 italic transition-colors cursor-pointer w-full text-left"
            >
              <span>Ask AI about your security status...</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Footer Micro-bar matching Design HTML */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-600 pt-4 border-t border-white/5 gap-2">
        <div className="flex gap-4 uppercase tracking-widest font-mono">
          <span>Simulated Data Layer (v1.0.4)</span>
          <span>Privacy: User-Provided Mode</span>
        </div>
        <div className="flex gap-4 font-mono">
          <span className="text-green-600 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-green-500" /> Neural Engine: ACTIVE
          </span>
          <span className="text-gray-500">UPTIME: 102:44:11</span>
        </div>
      </div>
    </div>
  );
};
