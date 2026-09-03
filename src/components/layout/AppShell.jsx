import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppShell({ currentPage, setCurrentPage, children, onSelectSearchResult, onSignOut }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Fixed Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area Offset for Desktop Sidebar */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        
        {/* Top Navbar */}
        <Navbar 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onSelectSearchResult={onSelectSearchResult}
          onSignOut={onSignOut}
        />

        {/* Scrollable Main Content Container */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
