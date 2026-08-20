import React, { useState, useEffect } from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ScamAlert } from '../../types';

export const ScamAlertsTab: React.FC = () => {
  const [alerts, setAlerts] = useState<ScamAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/scam-alerts`);
        if (response.ok) {
          const data = await response.json();
          setAlerts(data);
        }
      } catch (err) {
        console.error('Error fetching alerts:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleResolveAlert = (id: string, actionName: string) => {
    alert(`Mitigation executed: "${actionName}" applied to alert ${id}.`);
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const getSeverity = (status: string) => {
    if (status === 'HIGH RISK') return 'High';
    if (status === 'SUSPICIOUS') return 'Medium';
    return 'Low';
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-500/10 border-red-500/20 text-red-500';
      case 'Medium':
        return 'bg-orange-500/10 border-orange-500/20 text-orange-400';
      default:
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">Scam Alerts Center</h1>
        <p className="text-xs text-gray-400">Review high-priority security warnings, threat detections, and recommended mitigations</p>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-xs text-gray-500">Loading active security alerts...</div>
      ) : (
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="bg-[#1A1A1A] border border-white/5 p-8 rounded-2xl text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-green-500 mx-auto animate-bounce" />
              <h3 className="text-sm font-bold text-white">All Clear! No Threats Found</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">FinGuard monitoring services report zero active scams or suspicious behaviors on your monitored accounts.</p>
            </div>
          ) : (
            alerts.map((alertItem) => {
              const severity = getSeverity(alertItem.status);
              const actions = [alertItem.recommendedAction, 'Dismiss Alert'];
              
              return (
                <div
                  key={alertItem.id}
                  className={`bg-[#1A1A1A] border rounded-2xl p-5 space-y-4 shadow-lg transition-all hover:border-white/10 ${
                    severity === 'High' ? 'border-red-500/10' : 'border-orange-500/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className={`p-2.5 rounded-xl shrink-0 ${
                        severity === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {severity === 'High' ? <AlertOctagon className="w-5 h-5 animate-pulse" /> : <AlertTriangle className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-white">{alertItem.alertType}</h3>
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getSeverityStyles(severity)}`}>
                            {severity} Severity
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 font-mono">{alertItem.date} &bull; {alertItem.time} &bull; ID: {alertItem.id}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed bg-[#121212] p-4 rounded-xl border border-white/5">
                    {alertItem.summary}
                  </p>

                  {/* Reasons list */}
                  {alertItem.reasons && alertItem.reasons.length > 0 && (
                    <div className="space-y-1.5 px-1">
                      <span className="text-[10px] font-mono font-semibold text-gray-500 uppercase">Detection Reasons:</span>
                      <ul className="list-disc list-inside space-y-1">
                        {alertItem.reasons.map((reason, idx) => (
                          <li key={idx} className="text-[11px] text-gray-400">{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-2 justify-end">
                    {actions.map((act, index) => (
                      <button
                        key={index}
                        onClick={() => handleResolveAlert(alertItem.id, act)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-wide cursor-pointer transition-all border ${
                          act !== 'Dismiss Alert'
                            ? 'bg-red-600 hover:bg-red-500 text-white border-red-600'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/5'
                        }`}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
