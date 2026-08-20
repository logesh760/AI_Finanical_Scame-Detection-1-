import React, { useState, useEffect } from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  Smartphone, 
  MessageSquare, 
  DollarSign, 
  Activity, 
  CheckCircle2, 
  Calendar, 
  Info, 
  SlidersHorizontal,
  FileText
} from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import { ScamHistoryItem } from '../../types';

export const ScamHistoryTab: React.FC = () => {
  const [historyItems, setHistoryItems] = useState<ScamHistoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ScamHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await mockApiService.getScamHistory();
        setHistoryItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error('Error fetching scam history:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = historyItems;

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.type.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.resolution.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term)
      );
    }

    if (selectedPlatform !== 'All') {
      result = result.filter(item => item.platform === selectedPlatform);
    }

    if (selectedStatus !== 'All') {
      result = result.filter(item => item.status === selectedStatus);
    }

    setFilteredItems(result);
  }, [searchTerm, selectedPlatform, selectedStatus, historyItems]);

  const getStatusStyle = (status: ScamHistoryItem['status']) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-500/10 border-green-500/20 text-green-400';
      case 'BLOCKED':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'CANCELLED':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'PREVENTED':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'sms':
        return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'whatsapp':
        return <Smartphone className="w-4 h-4 text-green-400" />;
      case 'upi':
        return <Activity className="w-4 h-4 text-blue-400" />;
      case 'autopay':
        return <SlidersHorizontal className="w-4 h-4 text-amber-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  // Stats calculation
  const totalPreventedScams = historyItems.length;
  const totalSavedValue = historyItems.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <History className="w-5 h-5 text-red-500" />
            Scam Incident History
          </h1>
          <p className="text-xs text-gray-400">Archive of resolved security threats, blocked transfers, and cancelled mandates</p>
        </div>

        {/* Mini Summary Badge */}
        <div className="flex gap-4">
          <div className="bg-[#1A1A1A] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase block font-semibold">Total Prevented</span>
              <span className="text-sm font-bold text-white font-mono">{totalPreventedScams} Threats</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-gray-500 uppercase block font-semibold">Funds Protected</span>
              <span className="text-sm font-bold text-white font-mono">₹{totalSavedValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by threat type, description, or resolution action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#121212] border border-white/5 focus:border-red-500/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all"
          />
        </div>

        {/* Platform Filter */}
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-[#121212] border border-white/5 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none transition-all cursor-pointer font-mono"
          >
            <option value="All">All Inception Channels</option>
            <option value="SMS">SMS</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="UPI">UPI</option>
            <option value="AutoPay">AutoPay</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#121212] border border-white/5 focus:border-red-500/50 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none transition-all cursor-pointer font-mono"
          >
            <option value="All">All Statuses</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="BLOCKED">BLOCKED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="PREVENTED">PREVENTED</option>
          </select>
        </div>
      </div>

      {/* Main Archive Table / Accordion Grid */}
      {isLoading ? (
        <div className="p-8 text-center text-xs text-gray-500">Querying security records...</div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl text-center space-y-3">
          <ShieldCheck className="w-12 h-12 text-green-500 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Scam Incidents Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">No archived scam records match your current search queries or selected filters.</p>
        </div>
      ) : (
        <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#1F1F1F] text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Incident Date</th>
                  <th className="py-3.5 px-5">Threat Incident Type</th>
                  <th className="py-3.5 px-5">Source</th>
                  <th className="py-3.5 px-5">Amount Prevented</th>
                  <th className="py-3.5 px-5">Resolution Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredItems.map((item) => {
                  const isExpanded = expandedItemId === item.id;
                  
                  return (
                    <React.Fragment key={item.id}>
                      <tr 
                        className={`hover:bg-[#202020] transition-colors cursor-pointer ${
                          isExpanded ? 'bg-[#1D1D1D]' : ''
                        }`}
                        onClick={() => setExpandedItemId(isExpanded ? null : item.id)}
                      >
                        {/* Date */}
                        <td className="py-4 px-5 font-mono text-gray-400 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-600" />
                          {item.date}
                        </td>
                        
                        {/* Type */}
                        <td className="py-4 px-5 font-semibold text-white">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(item.platform)}
                            {item.type}
                          </div>
                        </td>

                        {/* Platform */}
                        <td className="py-4 px-5">
                          <span className="font-mono text-gray-400 bg-black/30 border border-white/5 px-2 py-0.5 rounded text-[10px]">
                            {item.platform}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-4 px-5 font-mono font-bold text-white">
                          {item.amount > 0 ? `₹${item.amount.toLocaleString()}` : '—'}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-5">
                          <span className={`text-[9px] font-mono font-semibold px-2 py-1 rounded border uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </td>

                        {/* Detail Link */}
                        <td className="py-4 px-5 text-right font-mono text-[10px] text-red-400 font-bold">
                          <button 
                            className="hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedItemId(isExpanded ? null : item.id);
                            }}
                          >
                            {isExpanded ? 'Hide Info ▲' : 'Inspect Details ▼'}
                          </button>
                        </td>
                      </tr>

                      {/* Detail Accordion Panel */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-[#141414] px-6 py-4 border-t border-b border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-200">
                              {/* Left detail Column */}
                              <div className="space-y-3">
                                <div>
                                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">Threat Description</h4>
                                  <p className="text-xs text-gray-300 leading-relaxed mt-1">{item.description}</p>
                                </div>
                                <div className="flex gap-4">
                                  <div>
                                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">Incident ID</h4>
                                    <span className="text-xs font-mono text-white mt-1 block">{item.id}</span>
                                  </div>
                                  <div>
                                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">Inception Stream</h4>
                                    <span className="text-xs font-mono text-white mt-1 block">{item.platform} monitor feed</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Resolution Column */}
                              <div className="space-y-3 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  <h4 className="text-xs font-bold text-white">NPCI & Banking Layer Resolution Action</h4>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed font-mono">{item.resolution}</p>
                                <div className="text-[10px] text-gray-500 flex items-center gap-1.5 pt-1">
                                  <Info className="w-3.5 h-3.5" />
                                  <span>Automated mitigation applied. Banking API report logged successfully.</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
