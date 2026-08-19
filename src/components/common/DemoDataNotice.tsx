import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';

interface DemoDataNoticeProps {
  compact?: boolean;
}

export const DemoDataNotice: React.FC<DemoDataNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div 
        id="demo-data-badge" 
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs font-medium"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[11px] font-mono">Simulated Data Mode</span>
      </div>
    );
  }

  return (
    <div
      id="demo-data-notice-banner"
      className="bg-[#1A1A1A] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-gray-300 shadow-lg shadow-black/20"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 shrink-0 mt-0.5 sm:mt-0">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 font-mono">
              Simulated Data Layer (v1.0.4)
            </span>
            <span className="text-xs text-gray-400 font-medium">
              Multi-Platform Financial Stream
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Data shown is simulated for demonstration and academic evaluation. Real-world deployment connects exclusively to authorized user feeds, SMS consent listeners, and NPCI/Banking APIs.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
        <span className="text-[10px] font-mono px-3 py-1 rounded-lg bg-black/40 text-gray-400 border border-white/5 flex items-center gap-1.5 uppercase tracking-wider">
          <Info className="w-3 h-3 text-gray-400" />
          Privacy: User-Provided Mode
        </span>
      </div>
    </div>
  );
};
