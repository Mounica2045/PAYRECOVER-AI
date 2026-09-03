import React from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Bot, 
  Sliders, 
  BarChart3, 
  History, 
  Settings, 
  HelpCircle,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: '127' },
    { id: 'ai-agent', label: 'AI Recovery Agent', icon: Bot, highlight: true },
    { id: 'simulator', label: 'Strategy Simulator', icon: Sliders },
    { id: 'analytics', label: 'Recovery Analytics', icon: BarChart3 },
    { id: 'audit-log', label: 'Audit Log', icon: History },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Documentation', icon: HelpCircle },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Shell */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200/80
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/20 text-white font-bold text-lg">
                <Sparkles className="w-5 h-5 text-indigo-100 fill-indigo-100/30 animate-pulse-subtle" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 tracking-tight text-lg">PayRecover</span>
                  <span className="text-xs font-bold px-1.5 py-0.2 bg-brand-50 text-brand-600 border border-brand-200/60 rounded">AI</span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Payment Recovery OS</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation */}
          <div className="p-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Navigation</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150
                    ${isActive 
                      ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10' 
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="my-2 border-t border-slate-100 mx-4" />

          {/* Secondary Navigation */}
          <div className="p-4 space-y-1">
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Account & Support</p>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150
                    ${isActive 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Safety Panel Widget in Sidebar */}
        <div className="p-4 m-3 bg-gradient-to-b from-indigo-50/70 to-slate-50 border border-indigo-100/80 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-bold text-slate-900">AI Safety Controls</span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-600">
            <div className="flex items-center justify-between">
              <span>Bounded Actions</span>
              <span className="text-emerald-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Retry Limits</span>
              <span className="text-emerald-600 font-semibold">Passed</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Merchant Approval</span>
              <span className="text-brand-600 font-semibold">Required</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
