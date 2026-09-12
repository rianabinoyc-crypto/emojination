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
  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  // Primary Navigation Items
  const navItems = [
    { id: 'landing', label: 'Home', icon: Home, badge: null },
    { id: 'dating', label: 'Dating', icon: Flame, badge: null },
    { id: 'matches', label: 'Matches', icon: Heart, badge: matchesCount > 0 ? matchesCount : null },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null },
    { id: 'personalities', label: 'Personalities', icon: Brain, badge: null },
    { id: 'health', label: 'Health', icon: Activity, badge: null },
    { id: 'tools', label: 'Tools', icon: Wrench, badge: null },
    { id: 'encyclopedia', label: 'Encyclopedia', icon: BookOpen, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'achievements', label: 'Achievements', icon: Trophy, badge: null },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fdfbf7]/90 border-b border-stone-200/80 backdrop-blur-md select-none text-stone-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Home Trigger */}
        <div className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0" onClick={onGoHome}>
          <div className="w-9 h-9 rounded-xl bg-[#143d2b] flex items-center justify-center text-lg text-white shadow-sm group-hover:rotate-6 transition-transform">
            ✨
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900">
              EMOJINATION
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundService.playAccept();
                  if (item.id === 'landing') onGoHome();
                  else setActiveTab(item.id);
                }}
                className={`relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#143d2b] text-white shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Buttons & Spotlight Command Palette */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          
          {/* Spotlight Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label="Open Command Hub"
            title="Command Palette (Cmd+K)"
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-700 border border-stone-200/80 hover:border-stone-300 text-xs font-medium shadow-sm transition-all"
          >
            <Command className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden xl:inline">Hub</span>
            <kbd className="px-1 py-0.2 bg-stone-100 rounded text-[9px] font-mono text-stone-500 border border-stone-200">
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
                ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                : 'bg-stone-100 text-stone-400 border-stone-200 hover:bg-stone-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Open notifications"
              className="relative p-2 rounded-xl bg-white text-stone-700 border border-stone-200/80 hover:border-stone-300 hover:bg-stone-50 shadow-sm transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
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
            title="Citizen Profile"
            className={`flex items-center space-x-1.5 pl-2 pr-2.5 py-1.5 rounded-xl border transition-all ${
              activeTab === 'profile'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white border-stone-200/80 hover:border-stone-300 text-stone-700 shadow-sm'
            }`}
          >
            <span className="text-lg leading-none">{userProfile.favoriteEmoji}</span>
            <span className="text-xs font-medium max-w-[80px] truncate hidden sm:inline">
              {userProfile.username}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
