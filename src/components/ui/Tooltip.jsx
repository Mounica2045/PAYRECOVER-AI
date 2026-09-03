import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function Tooltip({ text, children, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />}

      {isVisible && (
        <div className={`absolute z-50 px-3 py-2 bg-slate-900 text-white text-[11px] font-medium rounded-xl shadow-xl whitespace-normal max-w-xs animate-tooltip ${positionStyles[position]}`}>
          {text}
        </div>
      )}
    </div>
  );
}
