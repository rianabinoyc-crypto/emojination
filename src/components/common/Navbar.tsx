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
  ChevronDown
} from 'lucide-react';
import { UserProfile, NotificationItem } from '../../types';
import { NotificationPanel } from './NotificationPanel';

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
  onGoHome
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Primary prominent nav tabs
  const primaryNavItems = [
    { id: 'landing', label: 'Home', icon: Home, badge: null },
    { id: 'dating', label: 'Dating', icon: Flame, badge: null },
    { id: 'matches', label: 'Matches', icon: Heart, badge: matchesCount > 0 ? matchesCount : null },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null },
    { id: 'health', label: 'Health', icon: Activity, badge: null },
    { id: 'personalities', label: 'Personalities', icon: Brain, badge: null },
    { id: 'tools', label: 'Tools', icon: Wrench, badge: null },
    { id: 'achievements', label: 'Achievements', icon: Trophy, badge: null },
  ];

  // Secondary overflow tabs
  const secondaryNavItems = [
    { id: 'encyclopedia', label: 'Encyclopedia', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const isSecondaryActive = secondaryNavItems.some(item => item.id === activeTab);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'landing') onGoHome();
                  else setActiveTab(item.id);
                }}
                className={`relative flex items-center space-x-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                  isActive 
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30 shadow-sm shadow-pink-500/10' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-pink-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* More Dropdown for Secondary Tabs */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isSecondaryActive
                  ? 'bg-purple-950/40 border-purple-500/40 text-purple-200'
                  : 'text-slate-400 hover:text-white border-transparent hover:bg-slate-800/60'
              }`}
            >
              <span>More</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showMoreMenu && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl glass-panel-glow bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                {secondaryNavItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setShowMoreMenu(false);
                      }}
                      className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-purple-600/30 text-purple-300'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-purple-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right Utility Buttons */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
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
