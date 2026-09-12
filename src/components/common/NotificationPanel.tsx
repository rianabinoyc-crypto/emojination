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
      className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl glass-panel-glow bg-slate-900/95 border border-slate-700/80 shadow-2xl p-4 z-50 text-slate-200 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-pink-400" />
          <h3 className="font-bold text-sm text-white">Notifications</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
            {notifications.length}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              title="Clear all"
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 my-2">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <span className="text-3xl block mb-2">✨</span>
            <p className="text-xs">No notifications right now.</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Your emoji relationship universe is calm.
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
              className={`py-2.5 px-2 rounded-xl flex items-start space-x-3 cursor-pointer transition-colors ${
                item.read ? 'hover:bg-slate-800/40 opacity-70' : 'bg-slate-800/60 hover:bg-slate-800 border-l-2 border-pink-500'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{item.avatarEmoji || '🔔'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">{item.message}</p>
              </div>
              {!item.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(item.id);
                  }}
                  title="Mark read"
                  className="text-pink-400 hover:text-pink-300 p-1"
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
