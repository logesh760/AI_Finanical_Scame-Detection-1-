import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Search, Check, Ban, RefreshCw, Smartphone, QrCode, UserCheck } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';

interface UPIActivity {
  id: string;
  upiId: string;
  receiver: string;
  receiverStatus: string;
  amount: number;
  date: string;
  time: string;
  type: string;
  riskScore: number;
  status: string;
  reasons: string[];
}

export const UPIActivityTab: React.FC = () => {
  const [activities, setActivities] = useState<UPIActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Custom UPI Scanner state
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    upiId: string;
    riskScore: number;
    status: 'HIGH RISK' | 'SUSPICIOUS' | 'SAFE';
    verdict: string;
    details: string[];
  } | null>(null);

  useEffect(() => {
    const fetchUPI = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/upi-activities`);
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        }
      } catch (err) {
        console.error('Error fetching UPI activities:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUPI();
  }, []);

  const handleScanVPA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    // Simulate VPA check database scan
    setTimeout(() => {
      const vpa = scanInput.trim().toLowerCase();
      let resultScore = 12;
      let resultStatus: 'HIGH RISK' | 'SUSPICIOUS' | 'SAFE' = 'SAFE';
      let verdict = 'Verified Safe VPA';
      let details = ['VPA registry holds verified merchant credentials.', 'No reported community flags in the last 90 days.'];

      if (vpa.includes('prize') || vpa.includes('claim') || vpa.includes('lottery') || vpa.includes('win')) {
        resultScore = 94;
        resultStatus = 'HIGH RISK';
        verdict = 'Malicious Lottery/Prize Claim VPA';
        details = [
          'Multiple community flags reporting lottery advance-fee fraud.',
          'VPA is not registered with any verified payment gateway.',
          'Active collect call pattern targeting night hours.'
        ];
      } else if (vpa.includes('xyz') || vpa.includes('xyzservices')) {
        resultScore = 86;
        resultStatus = 'HIGH RISK';
        verdict = 'Unverified Midnight Merchant';
        details = [
          'VPA lacks merchant safety certification.',
          'Correlated with unverified links distributed via chat feeds.',
          'Flagged by FinGuard automated timing analyzer.'
        ];
      } else if (vpa.includes('crypto') || vpa.includes('double') || vpa.includes('investment')) {
        resultScore = 78;
        resultStatus = 'SUSPICIOUS';
        verdict = 'High-Yield Investment Fraud (HYIP) Indicator';
        details = [
          'Reported as part of high-pressure social engineering schemes.',
          'VPA name matches known fraudulent peer exchange profiles.'
        ];
      }

      setScanResult({
        upiId: scanInput,
        riskScore: resultScore,
        status: resultStatus,
        verdict,
        details
      });
      setIsScanning(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    if (status === 'HIGH RISK') return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (status === 'SUSPICIOUS') return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    return 'text-green-400 bg-green-500/10 border-green-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">UPI Activity & VPA Scanner</h1>
        <p className="text-xs text-gray-400">Scan virtual payment addresses, incoming collect requests, and QR codes for fraud indicators</p>
      </div>

      {/* Grid: Monitored VPA stats + Interactive Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Statistics Grid */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase">Monitored VPAs</span>
              <p className="text-xl font-bold text-white mt-1">24</p>
            </div>
            <Smartphone className="w-8 h-8 text-gray-500" />
          </div>
          
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase">Collect Risks</span>
              <p className="text-xl font-bold text-red-500 mt-1">02</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500/50" />
          </div>

          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-green-400 uppercase">Block List Registry</span>
              <p className="text-xl font-bold text-green-500 mt-1">15 VPAs</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-green-500/50" />
          </div>
        </div>

        {/* Live VPA Checker Scanner Tool */}
        <div className="lg:col-span-2 bg-[#1A1A1A] border border-white/5 rounded-xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-red-500" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Community VPA Risk Scanner</h2>
          </div>
          <p className="text-xs text-gray-400">Check if a UPI ID (Virtual Payment Address) is registered under community warning registries or flags.</p>
          
          <form onSubmit={handleScanVPA} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. reward-claim@upi, fast-money@okaxis"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              className="flex-1 bg-[#121212] border border-white/5 focus:border-red-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 outline-none"
            />
            <button
              type="submit"
              disabled={isScanning || !scanInput.trim()}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wide rounded-xl flex items-center gap-2 cursor-pointer disabled:bg-[#202020] disabled:text-gray-500 transition-all"
            >
              {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Scan VPA'}
            </button>
          </form>

          {/* Scanner Result Card */}
          {scanResult && (
            <div className={`p-4 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-200 ${
              scanResult.status === 'HIGH RISK' ? 'bg-red-950/10 border-red-500/20' : 
              scanResult.status === 'SUSPICIOUS' ? 'bg-orange-950/10 border-orange-500/20' : 
              'bg-green-950/10 border-green-500/20'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white font-mono">{scanResult.upiId}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                      scanResult.status === 'HIGH RISK' ? 'text-red-500 border-red-500/20 bg-red-500/10' :
                      scanResult.status === 'SUSPICIOUS' ? 'text-orange-400 border-orange-500/20 bg-orange-500/10' :
                      'text-green-400 border-green-500/20 bg-green-500/10'
                    }`}>
                      {scanResult.verdict}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {scanResult.details.map((detail, i) => (
                      <p key={i} className="text-xs text-gray-400 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          scanResult.status === 'HIGH RISK' ? 'bg-red-500' :
                          scanResult.status === 'SUSPICIOUS' ? 'bg-orange-500' : 'bg-green-500'
                        }`} />
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-gray-500 font-mono block">Threat Score</span>
                  <span className={`text-xl font-bold font-mono ${
                    scanResult.status === 'HIGH RISK' ? 'text-red-500' :
                    scanResult.status === 'SUSPICIOUS' ? 'text-orange-400' : 'text-green-400'
                  }`}>{scanResult.riskScore}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Collect Calls Feed */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 bg-[#161616] border-b border-white/5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Incoming Collect Requests</h3>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center text-xs text-gray-500">Loading UPI requests...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-[#161616] text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Virtual Payment Address (VPA)</th>
                  <th className="px-6 py-4">Sender Description</th>
                  <th className="px-6 py-4">Request Type</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-center">Threat Score</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4 font-mono font-medium text-gray-400">{act.upiId}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{act.receiver}</div>
                      <div className="text-[10px] text-gray-500">{act.date} &bull; {act.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 text-[10px] font-mono">
                        {act.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-white">₹{act.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-bold font-mono ${getStatusColor(act.status)}`}>
                        {act.riskScore}% &bull; {act.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => alert(`Collect request verified and authorized.`)}
                          className="px-2.5 py-1 rounded bg-green-600/10 hover:bg-green-600/20 text-green-500 border border-green-500/20 transition-all font-mono text-[10px] font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => alert(`VPA ${act.upiId} blocked. Mandate cancel prompt dispatched.`)}
                          className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white transition-all font-mono text-[10px] font-bold cursor-pointer"
                        >
                          Block VPA
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
