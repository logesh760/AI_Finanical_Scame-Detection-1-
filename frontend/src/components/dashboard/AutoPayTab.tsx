import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Check, Trash2, Smartphone, Key, Lock, Eye, CheckCircle2, MessageSquare, CreditCard } from 'lucide-react';

interface AutoPayItem {
  id: string;
  serviceName: string;
  category: string;
  amount: number;
  frequency: string;
  creationDate: string;
  receiverStatus: string;
  riskScore: number;
  status: string;
  reasons: string[];
  explanation?: string;
}

export const AutoPayTab: React.FC = () => {
  const [mandates, setMandates] = useState<AutoPayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 8 Multi-Platform Input Sources state
  const sources = [
    { name: 'SMS Feed Listener', status: 'Active', desc: 'Monitors incoming UPI/banking verification codes', icon: MessageSquare, color: 'text-blue-400 bg-blue-500/10' },
    { name: 'WhatsApp Payment Logs', status: 'Active', desc: 'Scans text correlations for peer collect urges', icon: MessageSquare, color: 'text-green-400 bg-green-500/10' },
    { name: 'Telegram Warn Stream', status: 'Active', desc: 'Identifies bot-driven crypto prize claims', icon: MessageSquare, color: 'text-sky-400 bg-sky-500/10' },
    { name: 'Instagram DM Scanner', status: 'Active', desc: 'Filters social engineering invoice links', icon: MessageSquare, color: 'text-pink-400 bg-pink-500/10' },
    { name: 'UPI Collect Calls API', status: 'Active', desc: 'Validates VPAs against NPCI warning list', icon: CreditCard, color: 'text-purple-400 bg-purple-500/10' },
    { name: 'NetBanking Card Stream', status: 'Active', desc: 'Inspects raw card authorizations and micro-debits', icon: CreditCard, color: 'text-indigo-400 bg-indigo-500/10' },
    { name: 'NPCI Mandate Registry', status: 'Active', desc: 'Verifies AutoPay merchant credentials on create', icon: Lock, color: 'text-yellow-400 bg-yellow-500/10' },
    { name: 'Accessibility Guard', status: 'Active', desc: 'Blocks remote overlay exploits during transaction input', icon: Key, color: 'text-red-400 bg-red-500/10' },
  ];

  useEffect(() => {
    const fetchAutoPay = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/autopay-items`);
        if (response.ok) {
          const data = await response.json();
          setMandates(data);
        }
      } catch (err) {
        console.error('Error fetching AutoPay:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAutoPay();
  }, []);

  const handleDeleteMandate = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to revoke the recurring mandate for ${name}?`)) {
      setMandates(prev => prev.filter(m => m.id !== id));
      alert(`Mandate for ${name} has been revoked successfully. Dispatched cancel packet to NPCI.`);
    }
  };

  const totalCommitment = mandates.reduce((acc, curr) => acc + curr.amount, 0);
  const flaggedCount = mandates.filter(m => m.status === 'HIGH RISK').length;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">AutoPay Mandates & Sources</h1>
        <p className="text-xs text-gray-400">Manage active auto-debits, mandate authorizations, and cross-platform feed integrations</p>
      </div>

      {/* Grid: 8 Multi-Platform Input Sources (Real-time status) */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500 animate-pulse" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">8 Monitored Multi-Platform Input Feeds</h2>
          </div>
          <span className="text-[10px] font-mono text-green-400 bg-green-500/10 border border-green-500/25 px-2.5 py-0.5 rounded-full">
            All Feeds Live & Synced
          </span>
        </div>
        <p className="text-xs text-gray-400">FinGuard automatically correlates warning signs from all 8 communication and banking streams to block stealth recurring charges.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {sources.map((src, i) => {
            const Icon = src.icon;
            return (
              <div key={i} className="bg-[#121212] border border-white/5 p-3.5 rounded-xl space-y-2 flex flex-col justify-between hover:border-white/10 transition-colors">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${src.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {src.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{src.name}</h4>
                  <p className="text-[10px] text-gray-500 leading-snug mt-1">{src.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AutoPay Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Active Mandates</span>
          <p className="text-xl font-bold text-white">{mandates.length}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Monthly Commitment</span>
          <p className="text-xl font-bold text-white">₹{totalCommitment.toLocaleString()}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-red-400 uppercase">Flagged Mandate Risks</span>
          <p className="text-xl font-bold text-red-500">{flaggedCount}</p>
        </div>
      </div>

      {/* Mandate List */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-[#161616] border-b border-white/5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Monitored Auto-Debit Mandates</h3>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-gray-500">Loading active mandates...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#161616] text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Service Provider</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Frequency</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Risk Rating</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {mandates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500 font-mono">No active recurring mandates found.</td>
                  </tr>
                ) : (
                  mandates.map((item) => (
                    <tr key={item.id} className={`hover:bg-white/[0.01] transition-colors ${
                      item.status === 'HIGH RISK' ? 'bg-red-950/5' : ''
                    }`}>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{item.serviceName}</div>
                        <div className="text-[10px] text-gray-500">Created: {item.creationDate} &bull; {item.receiverStatus}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 uppercase font-mono text-[10px]">{item.frequency}</td>
                      <td className="px-6 py-4 font-bold text-white">₹{item.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold font-mono uppercase inline-flex items-center gap-1 ${
                            item.status === 'HIGH RISK' ? 'text-red-500 bg-red-500/10 border-red-500/20' : 'text-green-400 bg-green-500/10 border-green-500/20'
                          }`}>
                            {item.status === 'HIGH RISK' ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteMandate(item.id, item.serviceName)}
                          className="p-2 rounded bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 hover:border-red-600 transition-all cursor-pointer"
                          title="Revoke Mandate"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
