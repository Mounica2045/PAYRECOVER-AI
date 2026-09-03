import React from 'react';
import { Menu, Sparkles } from 'lucide-react';
import GlobalSearch from '../search/GlobalSearch';
import NotificationDropdown from '../notifications/NotificationDropdown';
import UserMenu from '../navigation/UserMenu';

export default function Navbar({ onMenuClick, onSelectSearchResult, onSignOut }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Left Mobile Menu Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-slate-900 tracking-tight text-base">PayRecover</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md hidden sm:block">
        <GlobalSearch onSelectResult={onSelectSearchResult} />
      </div>

      {/* Right Controls (Simulation Pill, Notifications, Merchant Menu) */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 border border-violet-200/70 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          <span>Simulation Mode</span>
        </div>

        <NotificationDropdown />

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        <UserMenu onSignOut={onSignOut} />
      </div>
    </header>
  );
}
