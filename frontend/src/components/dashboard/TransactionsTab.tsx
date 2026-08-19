import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, ShieldCheck, HelpCircle, X, ShieldAlert, ArrowLeftRight, Check, Ban } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import { Transaction } from '../../types';

export const TransactionsTab: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [platformFilter, setPlatformFilter] = useState('ALL');
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    highRisk: 0,
    suspicious: 0,
    safe: 0
  });

  useEffect(() => {
    const fetchTxns = async () => {
      try {
        const data = await mockApiService.getRecentTransactions();
        setTransactions(data);
        setFilteredTransactions(data);
        
        // Calculate stats
        const highRiskCount = data.filter(t => t.status === 'HIGH RISK').length;
        const suspiciousCount = data.filter(t => t.status === 'SUSPICIOUS').length;
        const safeCount = data.filter(t => t.status === 'SAFE').length;
        
        setStats({
          total: data.length,
          highRisk: highRiskCount,
          suspicious: suspiciousCount,
          safe: safeCount
        });
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTxns();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = transactions;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.receiver.toLowerCase().includes(term) || 
        t.id.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'ALL') {
      result = result.filter(t => t.status === statusFilter);
    }

    if (platformFilter !== 'ALL') {
      result = result.filter(t => t.platform === platformFilter);
    }

    setFilteredTransactions(result);
  }, [searchTerm, statusFilter, platformFilter, transactions]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'HIGH RISK':
        return 'bg-red-500/10 border border-red-500/20 text-red-500';
      case 'SUSPICIOUS':
        return 'bg-orange-500/10 border border-orange-500/20 text-orange-400';
      default:
        return 'bg-green-500/10 border border-green-500/20 text-green-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HIGH RISK':
        return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'SUSPICIOUS':
        return <AlertTriangle className="w-3.5 h-3.5" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-gray-400">Querying transaction log stream...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">Transactions Monitoring</h1>
        <p className="text-xs text-gray-400">Behavioral anomaly inspection for live financial transfers</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Monitored Logs</span>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-red-400 uppercase">High Risk Anomaly</span>
          <p className="text-xl font-bold text-red-500">{stats.highRisk}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-orange-400 uppercase">Suspicious Patterns</span>
          <p className="text-xl font-bold text-orange-500">{stats.suspicious}</p>
        </div>
        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-green-400 uppercase">Verified Safe</span>
          <p className="text-xl font-bold text-green-500">{stats.safe}</p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#1A1A1A] p-3 rounded-xl border border-white/5 justify-between">
        {/* Search */}
        <div className="relative flex items-center bg-[#121212] border border-white/5 rounded-lg px-3 py-1.5 focus-within:border-red-500/50 flex-1">
          <Search className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search receiver or transaction ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full border-none focus:ring-0"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {/* Status filter */}
          <div className="relative flex items-center bg-[#121212] border border-white/5 rounded-lg px-2 py-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-gray-300 outline-none border-none cursor-pointer pr-4 focus:ring-0 py-0.5"
            >
              <option value="ALL" className="bg-[#121212]">All Risk Levels</option>
              <option value="HIGH RISK" className="bg-[#121212]">High Risk</option>
              <option value="SUSPICIOUS" className="bg-[#121212]">Suspicious</option>
              <option value="SAFE" className="bg-[#121212]">Safe</option>
            </select>
          </div>

          {/* Platform filter */}
          <div className="relative flex items-center bg-[#121212] border border-white/5 rounded-lg px-2 py-1 text-xs">
            <ArrowLeftRight className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-transparent text-gray-300 outline-none border-none cursor-pointer pr-4 focus:ring-0 py-0.5"
            >
              <option value="ALL" className="bg-[#121212]">All Platforms</option>
              <option value="UPI" className="bg-[#121212]">UPI</option>
              <option value="Card" className="bg-[#121212]">Card</option>
              <option value="P2P" className="bg-[#121212]">P2P</option>
              <option value="Merchant" className="bg-[#121212]">Merchant</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-[#161616] text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Receiver</th>
                <th className="px-6 py-4">Platform</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4 text-center">Risk Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 font-mono">
                    No transactions match the selected filter parameters.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr 
                    key={txn.id} 
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setSelectedTxn(txn)}
                  >
                    <td className="px-6 py-4 font-mono font-medium text-gray-400">{txn.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{txn.receiver}</div>
                      <div className="text-[10px] text-gray-500">{txn.date} &bull; {txn.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px] font-mono">
                        {txn.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <span className={`text-[10px] font-bold font-mono ${
                          txn.riskScore > 80 ? 'text-red-500' : txn.riskScore > 50 ? 'text-orange-400' : 'text-green-400'
                        }`}>
                          {txn.riskScore}%
                        </span>
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className={`h-full ${
                              txn.riskScore > 80 ? 'bg-red-500' : txn.riskScore > 50 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${txn.riskScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono inline-flex items-center gap-1 uppercase ${getStatusStyles(txn.status)}`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTxn(txn);
                        }}
                        className="text-[10px] font-mono font-bold text-red-500 hover:text-red-400 uppercase cursor-pointer"
                      >
                        Inspect Anomaly
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Anomaly Inspection Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/5 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#1A1A1A] border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-5 h-5 ${
                  selectedTxn.status === 'HIGH RISK' ? 'text-red-500' : selectedTxn.status === 'SUSPICIOUS' ? 'text-orange-400' : 'text-green-400'
                }`} />
                <h3 className="text-sm font-bold text-white tracking-wide">Behavioral Anomaly Inspection</h3>
              </div>
              <button 
                onClick={() => setSelectedTxn(null)}
                className="p-1 rounded bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto max-h-[calc(100vh-15rem)]">
              {/* Profile card */}
              <div className="grid grid-cols-2 gap-4 bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Receiver</span>
                  <p className="text-xs font-bold text-white">{selectedTxn.receiver}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Amount</span>
                  <p className="text-xs font-bold text-white">₹{selectedTxn.amount.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Transaction ID</span>
                  <p className="text-xs font-mono text-gray-400">{selectedTxn.id}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Time & Platform</span>
                  <p className="text-xs font-mono text-gray-400">{selectedTxn.date} {selectedTxn.time} &bull; {selectedTxn.platform}</p>
                </div>
              </div>

              {/* Risk Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">Anomaly Threat Score</span>
                  <span className={`font-bold font-mono ${
                    selectedTxn.riskScore > 80 ? 'text-red-500' : selectedTxn.riskScore > 50 ? 'text-orange-400' : 'text-green-400'
                  }`}>{selectedTxn.riskScore}/100</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                  <div 
                    className={`h-full rounded-full ${
                      selectedTxn.riskScore > 80 ? 'bg-red-500' : selectedTxn.riskScore > 50 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${selectedTxn.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Anomaly triggers */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Behavioral Trigger Logs</span>
                <div className="space-y-2">
                  {selectedTxn.reasons.map((reason, idx) => (
                    <div key={idx} className="flex gap-2.5 bg-white/5 border border-white/5 p-2.5 rounded-lg text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI explanation */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Plain-English AI Explanation</span>
                <p className="text-xs text-gray-400 leading-relaxed bg-[#1A1A1A] p-4 rounded-xl border border-white/5">
                  {selectedTxn.explanation}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#1A1A1A] border-t border-white/5 flex gap-2 justify-end">
              <button 
                onClick={() => setSelectedTxn(null)}
                className="px-4 py-2 rounded-xl border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white font-bold text-xs tracking-wide transition-all cursor-pointer"
              >
                Close
              </button>
              {selectedTxn.status !== 'SAFE' && (
                <>
                  <button 
                    onClick={() => {
                      alert('Transaction marked as verified safe. Anomaly logs adjusted.');
                      setSelectedTxn(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-green-600/10 hover:bg-green-600/20 text-green-500 font-bold text-xs tracking-wide flex items-center gap-1.5 border border-green-500/20 transition-all cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Verify Safe
                  </button>
                  <button 
                    onClick={() => {
                      alert('Account frozen. SMS Consent listener blocked transaction request.');
                      setSelectedTxn(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide flex items-center gap-1.5 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Freeze UPI
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
