import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { notificationsList } from '../../data/shellData';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case 'danger': return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
      default: return <Info className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors relative focus-visible:outline-2 focus-visible:outline-indigo-600"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">
          8
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200/80 rounded-2xl shadow-dropdown p-4 z-50 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Notifications</h4>
              <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                8 New
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {notificationsList.map((item) => (
              <div 
                key={item.id} 
                className={`p-2.5 rounded-xl border flex items-start gap-2.5 transition-colors text-xs ${item.unread ? 'bg-slate-50/90 border-slate-200/80' : 'bg-white border-slate-100'}`}
              >
                <div className="mt-0.5 shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 leading-tight">{item.title}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{item.time}</p>
                </div>
                {item.unread && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-center">
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
              <span>View all notifications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
