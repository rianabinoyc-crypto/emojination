import React, { useState } from 'react';
import { 
  Home, 
  Flame, 
  MessageSquare, 
  Activity, 
  User, 
  Menu, 
  X, 
  Brain, 
  Wrench, 
  Trophy, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Heart,
  Sparkles,
} from 'lucide-react';
import { soundService } from '../../services/soundService';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matchesCount: number;
  unreadMessagesCount: number;
  onGoHome: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  matchesCount,
  unreadMessagesCount,
  onGoHome,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const mainTabs = [
    { id: 'landing', label: 'Home', icon: Home, badge: null },
    { id: 'dating', label: 'Dating', icon: Flame, badge: null },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null },
    { id: 'health', label: 'Health', icon: Activity, badge: null },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
  ];

  const drawerApps = [
    { id: 'dating', label: 'Dating', emoji: '💘', route: 'dating' },
    { id: 'matches', label: 'Matches', emoji: '💕', route: 'matches' },
    { id: 'chat', label: 'Chat', emoji: '💬', route: 'chat' },
    { id: 'personalities', label: 'Personalities', emoji: '🧠', route: 'personalities' },
    { id: 'health', label: 'Health', emoji: '❤️', route: 'health' },
    { id: 'tools', label: 'Tools', emoji: '🎨', route: 'tools' },
    { id: 'encyclopedia', label: 'Encyclopedia', emoji: '📖', route: 'encyclopedia' },
    { id: 'analytics', label: 'Analytics', emoji: '📊', route: 'analytics' },
    { id: 'achievements', label: 'Achievements', emoji: '🏆', route: 'achievements' },
    { id: 'settings', label: 'Settings', emoji: '⚙️', route: 'settings' },
  ];

  return (
    <>
      {/* Bottom Floating Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#fdfbf7]/95 backdrop-blur-xl border-t border-[#e5dcce] px-2 py-1.5 flex items-center justify-around select-none shadow-lg">
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundService.playAccept();
                if (tab.id === 'landing') onGoHome();
                else setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
                isActive ? 'text-[#143d2b] font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
              {tab.badge !== null && (
                <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-[#143d2b] text-white text-[8px] font-mono font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Drawer Menu Trigger */}
        <button
          onClick={() => {
            soundService.playReaction();
            setShowDrawer(true);
          }}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-stone-500 hover:text-stone-800"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Menu</span>
        </button>
      </nav>

      {/* Slide-Up Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm flex flex-col justify-end lg:hidden animate-in fade-in duration-150">
          <div className="bg-[#fdfbf7] border-t border-[#e5dcce] rounded-t-3xl p-5 space-y-4 max-h-[80vh] overflow-y-auto select-none shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#e5dcce]">
              <div className="flex items-center space-x-2">
                <span className="text-base font-serif font-bold text-[#143d2b]">
                  Explore Features
                </span>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1.5 rounded-xl bg-white border border-[#e5dcce] text-stone-500 hover:text-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Clean Grid of Features */}
            <div className="grid grid-cols-2 gap-2.5">
              {drawerApps.map(app => {
                const isActive = activeTab === app.route;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      soundService.playAccept();
                      setActiveTab(app.route);
                      setShowDrawer(false);
                    }}
                    className={`flex items-center space-x-2.5 p-3 rounded-2xl border text-left transition-all shadow-xs ${
                      isActive
                        ? 'bg-[#143d2b] text-white border-[#143d2b]'
                        : 'bg-white text-stone-800 border-[#e5dcce] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{app.emoji}</span>
                    <span className="text-xs font-bold truncate block">{app.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
