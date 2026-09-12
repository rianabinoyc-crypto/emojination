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
  Heart 
} from 'lucide-react';

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
  onGoHome
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const mainTabs = [
    { id: 'landing', label: 'Home', icon: Home, badge: null },
    { id: 'dating', label: 'Dating', icon: Flame, badge: null },
    { id: 'chat', label: 'Chat', icon: MessageSquare, badge: unreadMessagesCount > 0 ? unreadMessagesCount : null },
    { id: 'health', label: 'Health', icon: Activity, badge: null },
    { id: 'profile', label: 'Profile', icon: User, badge: null },
  ];

  const drawerItems = [
    { id: 'matches', label: 'Matches', icon: Heart, badge: matchesCount > 0 ? matchesCount : null },
    { id: 'personalities', label: 'Personalities', icon: Brain },
    { id: 'tools', label: 'Emoji Tools', icon: Wrench },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'encyclopedia', label: 'Encyclopedia', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
        {mainTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'landing') onGoHome();
                else setActiveTab(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
                isActive ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold mt-0.5">{tab.label}</span>
              {tab.badge !== null && (
                <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-pink-500 text-white text-[8px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={() => setShowDrawer(true)}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl text-slate-400 hover:text-white`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">More</span>
        </button>
      </nav>

      {/* Slide-Up Drawer for Additional Ecosystem Features */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-end lg:hidden animate-in fade-in duration-150">
          <div className="bg-slate-900 border-t border-slate-700/80 rounded-t-3xl p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-extrabold text-white font-mono uppercase">
                Emoji Ecosystem Apps
              </span>
              <button
                onClick={() => setShowDrawer(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowDrawer(false);
                    }}
                    className={`flex items-center space-x-2.5 p-3 rounded-2xl border text-left transition-all ${
                      isActive
                        ? 'bg-purple-600/30 text-purple-300 border-purple-500/50'
                        : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-pink-400 flex-shrink-0" />
                    <span className="text-xs font-bold truncate">{item.label}</span>
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
