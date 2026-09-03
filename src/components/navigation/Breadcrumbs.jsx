import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
      <span className="flex items-center gap-1 hover:text-slate-600 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>PayRecover AI</span>
      </span>
      
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
          <span className={`
            ${idx === items.length - 1 ? 'font-bold text-slate-800' : 'hover:text-slate-600'}
          `}>
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}
