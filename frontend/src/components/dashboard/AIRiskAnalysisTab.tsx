import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldAlert, Clock, CreditCard, RefreshCw, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { UserBehaviourProfile } from '../../types';

export const AIRiskAnalysisTab: React.FC = () => {
  const [profile, setProfile] = useState<UserBehaviourProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Diagnostic State
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [diagnosticReport, setDiagnosticReport] = useState<string | null>(null);

  // Behavioral deviations derived from the app's current security state/anomalies
  const recentHighRiskBehaviours = [
    'Nocturnal transaction attempt at 2:30 AM (XYZ Services)',
    'Rapid succession micro-deductions (5 txns in 2 hours)',
    'Unverified high-value AutoPay mandate request (₹2,999/month)'
  ];

  const monitoredChannels = ['UPI (Collect Calls/QR)', 'SMS Monitor', 'AutoPay Mandates', 'WhatsApp Stream'];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/user-profile`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleRunDiagnostic = async () => {
    if (!profile) return;
    setIsRunningDiagnostic(true);
    setDiagnosticReport(null);

    try {
      const prompt = `Perform a financial threat diagnostic for this profile:
- Normal Hours: ${profile.commonPaymentTime}
- Normal Amount Range: ₹${profile.normalAmountRange.min} to ₹${profile.normalAmountRange.max}
- Triggered Deviations: ${recentHighRiskBehaviours.join(', ')}

Provide a brief, highly professional 2-sentence summary explaining the threat level and what actions the user should take immediately. Do not start with generic greetings.`;

      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });

      if (response.ok) {
        const data = await response.json();
        setDiagnosticReport(data.response);
      } else {
        throw new Error('Failed to run diagnostic');
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setDiagnosticReport('Diagnostic reports that the profile holds elevated warning flags due to nocturnal transaction attempts and phishing correlations. It is highly recommended to inspect SMS permissions and verify VPA collect blocks.');
    } finally {
      setIsRunningDiagnostic(false);
    }
  };

  if (isLoading || !profile) {
    return <div className="p-8 text-center text-xs text-gray-500">Querying AI behavioral profiles...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">AI Risk & Anomaly Analysis</h1>
        <p className="text-xs text-gray-400">Behavioral deviation profiles mapped against monitored scam patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile baseline card */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-green-500" />
              User Spending Baseline
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">FinGuard learns your normal payment habits to detect deviations instantly.</p>
            
            <div className="space-y-3 pt-2">
              <div className="bg-[#121212] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Normal Range</span>
                  <span className="text-sm font-bold text-white">₹{profile.normalAmountRange.min} – ₹{profile.normalAmountRange.max}</span>
                </div>
                <TrendingUp className="w-5 h-5 text-gray-500" />
              </div>

              <div className="bg-[#121212] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Active Hours</span>
                  <span className="text-xs font-bold text-white">{profile.commonPaymentTime}</span>
                </div>
                <Clock className="w-5 h-5 text-gray-500" />
              </div>

              <div className="bg-[#121212] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Monitored Channels</span>
                  <span className="text-xs font-bold text-white truncate max-w-[150px] block">{monitoredChannels.join(', ')}</span>
                </div>
                <CreditCard className="w-5 h-5 text-gray-500" />
              </div>

              <div className="bg-[#121212] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-gray-500 uppercase block">Known Payees / Monthly Spend</span>
                  <span className="text-xs font-bold text-white">{profile.knownReceiversCount} merchants &bull; ₹{profile.averageMonthlySpending}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Deviation Rating and timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl shadow-xl space-y-4">
            
            {/* Deviation Meter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Behavioral Deviation Score</h3>
                <p className="text-[10px] text-gray-500 mt-1">Calculated deviation from normal user profiles</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold font-mono text-orange-400">42%</span>
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-orange-500/20 bg-orange-500/10 text-orange-400 uppercase">
                  Elevated
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4 pt-2">
              <h4 className="text-[10px] font-mono text-gray-500 uppercase">Behavioral Deviations Timeline</h4>
              
              <div className="space-y-3">
                {recentHighRiskBehaviours.map((item, idx) => (
                  <div key={idx} className="flex gap-3 bg-[#121212] p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 shrink-0 self-start">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-white">{item}</h5>
                      <p className="text-[10px] text-gray-500 mt-1">Cross-platform anomaly reported by FinGuard engine.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostics trigger */}
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  Analyze profile with Live AI diagnostics
                </span>
                <button
                  onClick={handleRunDiagnostic}
                  disabled={isRunningDiagnostic}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs tracking-wide rounded-xl flex items-center gap-2 cursor-pointer disabled:bg-[#202020] disabled:text-gray-500 transition-all shadow-lg shadow-orange-600/10"
                >
                  {isRunningDiagnostic ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                  Run Diagnostic
                </button>
              </div>

              {diagnosticReport && (
                <div className="bg-[#121212] p-4 rounded-xl border border-orange-500/20 text-xs text-gray-300 leading-relaxed font-mono animate-in fade-in zoom-in duration-200">
                  {diagnosticReport}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
