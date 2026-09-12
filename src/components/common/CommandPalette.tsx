import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Command,
  ArrowRight,
  Flame,
  Heart,
  MessageSquare,
  Activity,
  Brain,
  Wrench,
  BookOpen,
  BarChart3,
  Trophy,
  User,
  Settings,
  Sparkles,
} from 'lucide-react';
import { ALL_ECOSYSTEM_APPS, getPillarByRoute } from '../../data/ecosystemHierarchy';
import { soundService } from '../../services/soundService';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onQuickAction?: (actionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onQuickAction,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global shortcut: Cmd+K / Ctrl+K / Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          soundService.playReaction();
          // Parent handles opening if triggered globally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredApps = ALL_ECOSYSTEM_APPS.filter(app => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      app.title.toLowerCase().includes(q) ||
      app.shortTitle.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.technicalSubtext.toLowerCase().includes(q) ||
      app.pillarId.toLowerCase().includes(q)
    );
  });

  const QUICK_COMMANDS = [
    {
      id: 'cmd-dating',
      title: 'Run Reciprocal Match Algorithm',
      pillar: 'CONNECT',
      emoji: '💘',
      route: 'dating',
    },
    {
      id: 'cmd-chat',
      title: 'Initiate Simulated AI Conversation',
      pillar: 'EXPRESS',
      emoji: '💬',
      route: 'chat',
    },
    {
      id: 'cmd-health',
      title: 'Log Fictional Hydration & Vitals',
      pillar: 'TRACK',
      emoji: '💧',
      route: 'health',
    },
    {
      id: 'cmd-tools',
      title: 'Launch Emoji Mixology & Decoder',
      pillar: 'EXPRESS',
      emoji: '🎨',
      route: 'tools',
    },
  ];

  const handleSelectRoute = (route: string) => {
    soundService.playAccept();
    onNavigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-150">
      
      {/* Spotlight Dialog Modal */}
      <div className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-slate-100">
        
        {/* Search Header Input */}
        <div className="flex items-center px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-pink-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Emojination (apps, pillars, tools, algorithms)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4">
          
          {/* Ecosystem Apps Section */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Ecosystem Applications ({filteredApps.length})
            </div>
            <div className="space-y-1 mt-1">
              {filteredApps.map((app) => {
                const pillar = getPillarByRoute(app.route);
                return (
                  <button
                    key={app.id}
                    onClick={() => handleSelectRoute(app.route)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {app.emoji}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-white group-hover:text-pink-300 transition-colors">
                            {app.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            [{app.number}]
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {app.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-slate-950 border ${pillar?.borderAccent || 'border-slate-700'} ${pillar?.textAccent || 'text-slate-400'}`}>
                        {app.pillarId}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Telemetry Commands */}
          {!query && (
            <div className="pt-2 border-t border-slate-800">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Instant Subsystem Shortcuts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelectRoute(cmd.route)}
                    className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 text-left transition-all text-xs"
                  >
                    <span>{cmd.emoji}</span>
                    <span className="font-semibold text-slate-300 truncate">{cmd.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>EMOJINATION™ OS v2.0 • Unified Architecture</span>
          </div>
          <span>CONNECT / EXPRESS / TRACK</span>
        </div>

      </div>
    </div>
  );
};
