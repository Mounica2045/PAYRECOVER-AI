import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, User, Users, FileText, LogOut, ShieldCheck } from 'lucide-react';
import { authService } from '../../services/authService';
import AccountSettingsModal from './AccountSettingsModal';
import TeamPermissionsModal from './TeamPermissionsModal';
import DocumentationModal from './DocumentationModal';

export default function UserMenu({ onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(() => authService.getCurrentUser());

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'settings' | 'team' | 'doc' | null

  const menuRef = useRef(null);

  const reloadUser = () => {
    setUser(authService.getCurrentUser());
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
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

  const handleSignOutClick = () => {
    setIsOpen(false);
    authService.logout();
    if (onSignOut) onSignOut();
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-800 flex items-center justify-center text-white font-black text-xs shadow-xs ring-2 ring-indigo-100">
          {user.initials || 'M'}
        </div>
        <div className="hidden sm:block text-left text-xs">
          <p className="font-bold text-slate-900 leading-tight">{user.company || 'Acme Corp.'}</p>
          <p className="text-[11px] text-slate-400 font-medium">Merchant ▼</p>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-dropdown p-2 z-50 animate-in fade-in duration-150">
          <div className="px-3 py-2 border-b border-slate-100 mb-1">
            <p className="font-bold text-xs text-slate-900">{user.name}</p>
            <p className="text-[11px] text-slate-500 font-mono">{user.company}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{user.merchantId}</p>
          </div>

          <button 
            onClick={() => { setIsOpen(false); setActiveModal('settings'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>Account Settings</span>
          </button>
          
          <button 
            onClick={() => { setIsOpen(false); setActiveModal('team'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Team & Permissions</span>
          </button>

          <button 
            onClick={() => { setIsOpen(false); setActiveModal('doc'); }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Documentation</span>
          </button>

          <div className="my-1 border-t border-slate-100" />

          {/* Sign Out Button (Requirement #6) */}
          <button 
            onClick={handleSignOutClick}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-500" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Account Settings Modal */}
      <AccountSettingsModal 
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        onSaveSuccess={(updated) => {
          reloadUser();
        }}
      />

      {/* Team & Permissions Modal */}
      <TeamPermissionsModal 
        isOpen={activeModal === 'team'}
        onClose={() => setActiveModal(null)}
      />

      {/* Documentation Modal */}
      <DocumentationModal 
        isOpen={activeModal === 'doc'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
