import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Activity, 
  Lock
} from 'lucide-react';
import { SecurityStatus } from '../../types';
import { DemoDataNotice } from '../common/DemoDataNotice';

interface HeaderProps {
  securityStatus: SecurityStatus;
  isMobileNavOpen: boolean;
  onToggleMobileNav: () => void;
  activeAlertsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  securityStatus,
  isMobileNavOpen,
  onToggleMobileNav,
  activeAlertsCount,
}) => {
  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-30 bg-[#0D0D0D]/80 backdrop-blur-md border-b border-white/5 px-4 lg:px-8 py-3.5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Section: Mobile Toggle & Brand/Status on mobile */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-button"
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 rounded-lg bg-[#1A1A1A] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Title on desktop */}
          <div className="hidden sm:block">
            <h1 className="text-base font-semibold text-white tracking-tight">
              Financial Security Dashboard
            </h1>
          </div>

          <div className="sm:hidden">
            <DemoDataNotice compact />
          </div>
        </div>

        {/* Center: Search & Demo indicator */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search receiver, UPI ID, or transaction..."
              className="w-full bg-[#1A1A1A] border border-white/5 text-gray-200 text-xs rounded-lg pl-9 pr-4 py-2 placeholder:text-gray-600 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
          <DemoDataNotice compact />
        </div>

        {/* Right Section: Security Status, Alerts & User profile */}
        <div className="flex items-center gap-5">
          {/* Security Status text block matching Design HTML */}
          <div className="hidden sm:block text-right">
            <p className="text-[11px] text-gray-400 font-medium leading-none mb-1">
              Security Status
            </p>
            <p className="text-xs text-green-500 font-bold uppercase tracking-wider leading-none flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {securityStatus.status.toUpperCase()}
            </p>
          </div>

          <div className="relative">
            <button
              id="header-alerts-trigger"
              className="p-2 rounded-lg bg-[#1A1A1A] border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-colors relative"
              aria-label="View security alerts"
            >
              <Bell className="w-4 h-4" />
              {activeAlertsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-[#0D0D0D]">
                  {activeAlertsCount}
                </span>
              )}
            </button>
          </div>

          {/* User Profile Avatar matching Design HTML */}
          <div
            id="user-profile-pill"
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gray-800 border border-white/10 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              LM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
