import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { mockSearchResults } from '../../data/shellData';
import Badge from '../ui/Badge';

export default function GlobalSearch({ onSelectResult }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const filteredResults = query.trim() === '' ? [] : mockSearchResults.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
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

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search transactions, customers (e.g. TXN_1042, Rahul)..."
          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-8 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim() !== '' && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200/80 rounded-2xl shadow-dropdown p-2 z-50 animate-in fade-in duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Search Results ({filteredResults.length})
            </span>
            <span className="text-[10px] text-slate-400">Esc to close</span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">
              No matching transactions or customers found.
            </div>
          ) : (
            <div className="space-y-1 mt-1 max-h-64 overflow-y-auto">
              {filteredResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (onSelectResult) onSelectResult(item);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between transition-colors text-xs group"
                >
                  <div>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{item.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-normal">
                        {item.type}
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === 'Ready' ? 'emerald' : item.status === 'Action Needed' ? 'amber' : 'indigo'}>
                      {item.status}
                    </Badge>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
