import React, { useEffect } from 'react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Bot, 
  Cpu,
  SlidersHorizontal, 
  BarChart3, 
  FileText, 
  Send,
  LineChart,
  Settings, 
  HelpCircle, 
  Sparkles, 
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  PlayCircle,
  Palette
} from 'lucide-react';
import Tooltip from '../ui/Tooltip';

export default function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  isOpen, 
  setIsOpen,
  isCollapsed,
  setIsCollapsed
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'payments', label: 'Payments', icon: CreditCard, badge: '127' },
    { id: 'agent', label: 'AI Agent Center', icon: Cpu, highlight: true },
    { id: 'ai-agent', label: 'AI Recovery Diagnosis', icon: Bot },
    { id: 'simulator', label: 'Strategy Simulator', icon: SlidersHorizontal },
    { id: 'campaigns', label: 'Recovery Campaigns', icon: Send },
    { id: 'intelligence', label: 'AI Intelligence', icon: LineChart },
    { id: 'analytics', label: 'Recovery Analytics', icon: BarChart3 },
    { id: 'audit', label: 'Audit Log', icon: FileText },
    { id: 'showcase', label: 'Design Showcase', icon: Palette },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Documentation', icon: HelpCircle },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    if (setIsOpen) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200/80
        flex flex-col justify-between transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="overflow-y-auto overflow-x-hidden flex-1 scrollbar-none">
          
          {/* Brand Header */}
          <div className={`h-16 px-4 flex items-center justify-between border-b border-slate-100 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-lg shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-100 fill-indigo-100/30 animate-pulse-subtle" />
              </div>
              {!isCollapsed && (
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-slate-900 tracking-tight text-base">PayRecover</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-indigo-50 text-indigo-600 border border-indigo-200/60 rounded">AI</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Payment Recovery OS</p>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation List */}
          <div className="p-3 space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Navigation</p>
            )}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              const buttonContent = (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-label={item.label}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center py-3' : 'justify-between px-3 py-2.5'} rounded-xl font-medium text-xs transition-all duration-150
                    focus-visible:outline-2 focus-visible:outline-indigo-600
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  
                  {!isCollapsed && item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? 'bg-indigo-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {item.badge}
                    </span>
                  )}
                  
                  {!isCollapsed && item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  )}
                </button>
              );

              return isCollapsed ? (
                <Tooltip key={item.id} text={item.label} position="right">
                  {buttonContent}
                </Tooltip>
              ) : (
                buttonContent
              );
            })}
          </div>

          <div className="my-2 border-t border-slate-100 mx-3" />

          {/* Secondary Nav */}
          <div className="p-3 space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Support</p>
            )}
            
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              const buttonContent = (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-label={item.label}
                  className={`
                    w-full flex items-center ${isCollapsed ? 'justify-center py-3' : 'gap-3 px-3 py-2.5'} rounded-xl font-medium text-xs transition-all duration-150
                    focus-visible:outline-2 focus-visible:outline-indigo-600
                    ${isActive 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              );

              return isCollapsed ? (
                <Tooltip key={item.id} text={item.label} position="right">
                  {buttonContent}
                </Tooltip>
              ) : (
                buttonContent
              );
            })}
          </div>

          {/* AI Safety Status & Simulation Mode Card (Visible in Expanded Sidebar) */}
          {!isCollapsed && (
            <div className="p-3 space-y-3">
              {/* AI Safety Panel */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100/80 text-[11px] space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>AI Safety Controls</span>
                </div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between"><span>Bounded Actions</span><span className="text-emerald-600 font-bold">✓ Active</span></div>
                  <div className="flex justify-between"><span>Retry Limits</span><span className="text-emerald-600 font-bold">✓ 3 Max</span></div>
                  <div className="flex justify-between"><span>Duplicate Detection</span><span className="text-emerald-600 font-bold">✓ Active</span></div>
                  <div className="flex justify-between"><span>Merchant Approval</span><span className="text-indigo-600 font-bold">✓ Required</span></div>
                </div>
              </div>

              {/* Simulation Mode Card */}
              <div className="p-3 rounded-2xl bg-slate-900 text-white text-[11px] space-y-1 shadow-sm">
                <div className="flex items-center gap-1.5 font-bold text-indigo-300">
                  <PlayCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Simulation Mode</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">All recovery actions are simulated. No real payments processed.</p>
              </div>
            </div>
          )}

        </div>

        {/* Collapse / Expand Desktop Toggle */}
        <div className="p-3 border-t border-slate-100 hidden lg:block">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xs font-semibold gap-2"
          >
            {isCollapsed ? (
              <>
                <ChevronRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>

      </aside>
    </>
  );
}
