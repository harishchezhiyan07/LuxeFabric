import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/95 text-emerald-950',
    error: 'border-rose-200 bg-rose-50/95 text-rose-950',
    info: 'border-blue-200 bg-blue-50/95 text-blue-950'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md shadow-2xl">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md ${
          borders[toast.type || 'info']
        }`}
      >
        {icons[toast.type || 'info']}
        <div className="flex-1 pr-2">
          {toast.title && <h4 className="font-semibold text-sm">{toast.title}</h4>}
          <p className="text-xs sm:text-sm opacity-90 mt-0.5">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
