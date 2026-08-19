import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Smartphone, 
  Repeat, 
  MessageSquareWarning, 
  AlertOctagon, 
  BrainCircuit, 
  History, 
  Bot, 
  User, 
  Settings, 
  ShieldAlert,
  Layers
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isMobileNavOpen: boolean;
  onCloseMobileNav: () => void;
  highRiskCount: number;
}

interface NavItemConfig {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeVariant?: 'danger' | 'warning' | 'neutral';
  isCoreSection?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileNavOpen,
  onCloseMobileNav,
  highRiskCount,
}) => {
  const mainNavItems: NavItemConfig[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'upi', label: 'UPI Activity', icon: Smartphone },
    { id: 'autopay', label: 'AutoPay', icon: Repeat },
    { id: 'messages', label: 'Messages', icon: MessageSquareWarning },
    { 
      id: 'alerts', 
      label: 'Scam Alerts', 
      icon: AlertOctagon, 
      badge: highRiskCount > 0 ? highRiskCount : undefined, 
      badgeVariant: 'danger' 
    },
    { id: 'risk-analysis', label: 'AI Risk Analysis', icon: BrainCircuit },
    { id: 'history', label: 'Scam History', icon: History },
    { id: 'chatbot', label: 'AI Security Chatbot', icon: Bot },
  ];

  const secondaryNavItems: NavItemConfig[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleItemClick = (tabId: NavigationTab) => {
    onSelectTab(tabId);
    onCloseMobileNav();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileNavOpen && (
        <div
          id="mobile-nav-backdrop"
          onClick={onCloseMobileNav}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#0D0D0D] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-red-600/30 text-xs tracking-wider">
              FG
            </div>
            <div>
              <div className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                FinGuard <span className="text-red-500 text-xs font-mono">AI</span>
              </div>
              <div className="text-[10px] text-gray-500 tracking-wider uppercase font-medium">
                Scam Detection
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main monitoring category */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-red-500" />
              Monitoring
            </div>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive ? (
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      ) : (
                        <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          item.badgeVariant === 'danger'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Account & Configuration category */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
              Account
            </div>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-gray-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isActive ? (
                        <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      ) : (
                        <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Status Box */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-black/40 rounded-xl p-4 border border-white/5">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-mono">
              System Status
            </p>
            <p className="text-xs text-green-500 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Monitoring Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
