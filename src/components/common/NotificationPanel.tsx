import React, { useEffect, useRef } from 'react';
import { X, CheckCheck, Trash2, Bell } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationPanelProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onNavigate: (tab: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onClose,
  onMarkAsRead,
  onClearAll,
  onNavigate
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#fdfbf7] border border-[#e5dcce] shadow-xl p-4 z-50 text-stone-800 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#e5dcce]">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-[#143d2b]" />
          <h3 className="font-serif font-bold text-sm text-[#143d2b]">System Dispatches</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white text-stone-600 border border-[#e5dcce] font-mono">
            {notifications.length}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              title="Clear all"
              className="p-1 rounded-lg hover:bg-stone-200 text-stone-400 hover:text-rose-600 text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-200 text-stone-400 hover:text-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto space-y-2 my-2 pr-0.5">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-stone-400">
            <span className="text-3xl block mb-2">📜</span>
            <p className="text-xs font-medium">No pending dispatches.</p>
            <p className="text-[11px] text-stone-400 mt-1 font-serif italic">
              All quiet on the notification wire.
            </p>
          </div>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              onClick={() => {
                onMarkAsRead(item.id);
                if (item.linkTo) onNavigate(item.linkTo);
              }}
              className={`py-2.5 px-3 rounded-xl flex items-start space-x-3 cursor-pointer transition-colors border ${
                item.read 
                  ? 'bg-[#faf7f2]/70 border-[#e5dcce] hover:bg-[#faf7f2] opacity-75' 
                  : 'bg-white border-[#e5dcce] border-l-4 border-l-[#143d2b] hover:bg-[#faf7f2] shadow-xs'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{item.avatarEmoji || '🔔'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 truncate">{item.title}</h4>
                  <span className="text-[10px] text-stone-400 font-mono whitespace-nowrap ml-2">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5 line-clamp-2 leading-relaxed">{item.message}</p>
              </div>
              {!item.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(item.id);
                  }}
                  title="Mark read"
                  className="text-[#143d2b] hover:text-[#0f2e20] p-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
