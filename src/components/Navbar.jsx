import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Menu, ShieldAlert, Sparkles } from 'lucide-react';

export default function Navbar({ onMenuClick, onSearchChange, searchQuery }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-base">PayRecover</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search transactions, customers, failure reasons (e.g. TXN_1042)..."
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Simulation Mode Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/70 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span>Simulation Mode</span>
        </div>

        {/* Notifications Icon Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200/80 rounded-2xl shadow-dropdown p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">System Alerts</h4>
                <span className="badge-indigo">3 New</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                  <div>
                    <p className="font-semibold text-slate-800">TXN_1042 Recovery Simulated</p>
                    <p className="text-slate-500 text-[11px]">Delayed retry executed • ₹4,999 recovered</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5" />
                  <div>
                    <p className="font-semibold text-slate-800">High Risk Spike Detected</p>
                    <p className="text-slate-500 text-[11px]">HDFC NetBanking node maintenance</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* Merchant Avatar Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-brand-100">
              RZ
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-bold text-slate-900 leading-tight">Acme Store</p>
              <p className="text-[11px] text-slate-400 font-medium">Merchant ▼</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-dropdown p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="font-bold text-xs text-slate-900">Razorpay Merchant ID</p>
                <p className="text-[11px] text-slate-500 font-mono">acc_live_99214A</p>
              </div>
              <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50">
                Merchant Settings
              </button>
              <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50">
                API Keys & Webhooks
              </button>
              <div className="my-1 border-t border-slate-100" />
              <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
