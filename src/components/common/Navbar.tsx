import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Flame, 
  BarChart3, 
  BookOpen, 
  Settings, 
  Bell, 
  Volume2, 
  VolumeX,
  Sparkles,
  Activity,
  Brain,
  Wrench,
  Trophy,
  Home,
  ChevronDown,
  Command,
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../../types';
import { NotificationPanel } from './NotificationPanel';
import { soundService } from '../../services/soundService';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matchesCount: number;
  unreadMessagesCount: number;
  userProfile: UserProfile;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onClearNotifications: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoHome: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
  unreadMessagesCount,
  userProfile,
  notifications,
  onMarkNotificationRead,
  onClearNotifications,
  soundEnabled,
  onToggleSound,
  onGoHome,
  onOpenCommandPalette,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // 3 Primary Ecosystem Pillars Navigation
  const pillarGroups = [
    {
      pillar: 'CONNECT',
      badge: '💘',
      color: 'hover:text-pink-300',
      items: [
        { id: 'dating', label: 'Dating', icon: Flame, badge: null },
        { id: 'matches', label: 'Matches', icon: Heart, badge: matchesCount > 0 ? matchesCount : null },
        { id: 'personalities', label: 'Personas', icon: Brain, badge: null },
      ]
    },
    {
      pillar: 'EXPRESS',
      badge: '💬',
      color: 'hover:text-cyan-300',
      items: [
        { id: 'chat', label: 'Chat', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null },
        { id: 'tools', label: 'Tools', icon: Wrench, badge: null },
        { id: 'encyclopedia', label: 'Codex', icon: BookOpen, badge: null },
      ]
    },
    {
      pillar: 'TRACK',
      badge: '❤️',
      color: 'hover:text-emerald-300',
      items: [
        { id: 'health', label: 'Health', icon: Activity, badge: null },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
        { id: 'achievements', label: 'Quests', icon: Trophy, badge: null },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Home Trigger */}
        <div className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0" onClick={onGoHome}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-cyan-400 p-[1.5px] shadow-lg shadow-pink-500/20 group-hover:shadow-pink-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center text-lg">
              ✨
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                EMOJINATION
              </span>
              <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                TM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Everything Emoji. One Place.
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links Grouped by Pillars */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          
          {/* Home Link */}
          <button
            onClick={onGoHome}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'landing'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Universe</span>
          </button>

          <span className="text-slate-800 font-mono">|</span>

          {/* 3 Pillar Groups */}
          {pillarGroups.map((group) => (
            <div
              key={group.pillar}
              className="flex items-center space-x-0.5 bg-slate-900/70 p-0.5 rounded-xl border border-slate-800/80"
            >
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-500">
                {group.pillar}
              </span>
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundService.playAccept();
                      setActiveTab(item.id);
                    }}
                    className={`relative flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-slate-800 text-pink-300 border border-pink-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge !== null && (
                      <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-pink-500 text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

        </nav>

        {/* Right Utility Buttons & Spotlight Command Palette */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Spotlight Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open Command Hub"
            title="Command Palette (Cmd+K)"
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-xs font-medium transition-all"
          >
            <Command className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden xl:inline">Hub</span>
            <kbd className="px-1 py-0.2 bg-slate-950 rounded text-[9px] font-mono text-slate-400 border border-slate-800">
              ⌘K
            </kbd>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
            title={soundEnabled ? 'Sound ON' : 'Sound OFF'}
            className={`p-2 rounded-xl text-xs transition-all border ${
              soundEnabled
                ? 'bg-slate-800/80 text-cyan-400 border-cyan-500/30 hover:bg-slate-700'
                : 'bg-slate-900/60 text-slate-500 border-slate-800 hover:bg-slate-800'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Open notifications"
              className="relative p-2 rounded-xl bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:text-white hover:bg-slate-700 transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <NotificationPanel
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onMarkAsRead={onMarkNotificationRead}
                onClearAll={onClearNotifications}
                onNavigate={(tab) => {
                  setActiveTab(tab);
                  setShowNotifications(false);
                }}
              />
            )}
          </div>

          {/* User Profile Pill */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center space-x-1.5 pl-2 pr-2.5 py-1.5 rounded-xl border transition-all ${
              activeTab === 'profile'
                ? 'bg-purple-950/40 border-purple-500/40 text-purple-200'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <span className="text-lg leading-none">{userProfile.favoriteEmoji}</span>
            <span className="text-xs font-semibold max-w-[80px] truncate hidden sm:inline">
              {userProfile.username}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
