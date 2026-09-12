import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Command,
  ArrowRight,
  Sparkles,
import { soundService } from '../../services/soundService';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
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

  // Global shortcut: Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      app.brandName.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.technicalSubtext.toLowerCase().includes(q) ||
      app.pillarId.toLowerCase().includes(q)
    );
  });

  const QUICK_COMMANDS = [
    {
      id: 'cmd-dating',
      title: 'Open Emoji Dating',
      emoji: '💘',
      route: 'dating',
    },
    {
      id: 'cmd-chat',
      title: 'Open Simulated Chat',
      emoji: '💬',
      route: 'chat',
    },
    {
      id: 'cmd-health',
      title: 'Open Health & Fitness',
      emoji: '❤️',
      route: 'health',
    },
    {
      id: 'cmd-tools',
      title: 'Open Emoji Tools',
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-150 select-none">
      
      {/* Spotlight Dialog Modal: Warm Paper Aesthetic */}
      <div className="relative w-full max-w-2xl bg-white border border-stone-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-stone-800">
        
        {/* Search Header Input */}
        <div className="flex items-center px-5 py-4 border-b border-stone-100 bg-[#faf7f2]/70">
          <Search className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps, tools, features..."
            className="w-full bg-transparent text-sm sm:text-base font-serif text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-900 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[10px] font-mono text-stone-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-4">
          
          {/* Applications Section */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
              Applications ({filteredApps.length})
            </div>
            <div className="space-y-1 mt-1">
              {filteredApps.map((app) => {
                return (
                  <button
                    key={app.id}
                    onClick={() => handleSelectRoute(app.route)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-all text-left group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {app.emoji}
                      </span>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors font-serif">
                            {app.title}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-1">
                          {app.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Commands */}
          {!query && (
            <div className="pt-2 border-t border-stone-100">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold">
                Quick Shortcuts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelectRoute(cmd.route)}
                    className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-[#faf7f2] hover:bg-stone-100 border border-stone-200/60 text-left transition-all text-xs"
                  >
                    <span>{cmd.emoji}</span>
                    <span className="font-medium text-stone-700 truncate">{cmd.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Note */}
        <div className="px-5 py-3 border-t border-stone-100 bg-[#faf7f2] flex items-center justify-between text-[11px] text-stone-500 font-mono">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-600">Emoji-Nation</span>
          </div>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
