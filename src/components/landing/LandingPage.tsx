import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Background floating ambient emojis
  const backgroundEmojis = [
    { emoji: '💘', x: '8%', y: '12%', delay: '0s', size: 'text-3xl' },
    { emoji: '💬', x: '90%', y: '15%', delay: '1.2s', size: 'text-4xl' },
    { emoji: '❤️', x: '12%', y: '82%', delay: '2.5s', size: 'text-3xl' },
    { emoji: '🧠', x: '86%', y: '80%', delay: '0.8s', size: 'text-3xl' },
    { emoji: '🎨', x: '6%', y: '48%', delay: '1.8s', size: 'text-2xl' },
    { emoji: '🏆', x: '92%', y: '46%', delay: '3.1s', size: 'text-3xl' },
    { emoji: '📖', x: '48%', y: '92%', delay: '2.1s', size: 'text-2xl' },
  ];

  const ecosystemFeatures = [
    {
      id: 'dating',
      emoji: '💘',
      title: 'Emoji Dating',
      description: 'Find your emoji soulmate.',
      accent: 'hover:border-pink-500/60 hover:shadow-pink-500/20 text-pink-400'
    },
    {
      id: 'chat',
      emoji: '💬',
      title: 'Emoji Chat',
      description: 'Turn conversations into emojis.',
      accent: 'hover:border-cyan-500/60 hover:shadow-cyan-500/20 text-cyan-400'
    },
    {
      id: 'health',
      emoji: '❤️',
      title: 'Emoji Health',
      description: 'Track your completely unnecessary emoji fitness.',
      accent: 'hover:border-rose-500/60 hover:shadow-rose-500/20 text-rose-400'
    },
    {
      id: 'personalities',
      emoji: '🧠',
      title: 'Emoji Personalities',
      description: 'Discover what kind of emoji you are.',
      accent: 'hover:border-purple-500/60 hover:shadow-purple-500/20 text-purple-400'
    },
    {
      id: 'encyclopedia',
      emoji: '📖',
      title: 'Emoji Encyclopedia',
      description: 'Learn everything there is to know about emojis.',
      accent: 'hover:border-indigo-500/60 hover:shadow-indigo-500/20 text-indigo-400'
    },
    {
      id: 'tools',
      emoji: '🎨',
      title: 'Emoji Tools',
      description: 'Transform, generate and manipulate emoji.',
      accent: 'hover:border-amber-500/60 hover:shadow-amber-500/20 text-amber-400'
    },
    {
      id: 'analytics',
      emoji: '📊',
      title: 'Emoji Analytics',
      description: 'Analyze your unnecessarily important emoji statistics.',
      accent: 'hover:border-teal-500/60 hover:shadow-teal-500/20 text-teal-400'
    },
    {
      id: 'achievements',
      emoji: '🏆',
      title: 'Achievements',
      description: 'Become an elite emoji user.',
      accent: 'hover:border-yellow-500/60 hover:shadow-yellow-500/20 text-yellow-400'
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 py-8 sm:py-14 overflow-hidden bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white">
      {/* Background futuristic glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-pink-600/15 via-purple-600/20 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating ambient background emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {backgroundEmojis.map((item, idx) => (
          <div
            key={idx}
            className={`absolute ${item.size} opacity-20 filter blur-[0.5px] animate-float`}
            style={{
              left: item.x,
              top: item.y,
              animationDelay: item.delay,
              animationDuration: `${6 + idx * 1.5}s`
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Main Center Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl w-full my-auto py-6 text-center">
        
        {/* Brand Header */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none">
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              EMOJINATION
            </span>
            <span className="text-2xl sm:text-4xl text-pink-500 ml-1 font-bold">™</span>
          </h1>

          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Everything Emoji. One Place.
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Explore, communicate, date, track, discover and interact through the world's most unnecessarily comprehensive emoji ecosystem.
          </p>
        </div>

        {/* The 8 Interactive Ecosystem Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mt-10 sm:mt-14 w-full max-w-5xl px-2">
          {ecosystemFeatures.map((feat) => {
            const isHovered = hoveredCard === feat.id;
            return (
              <div
                key={feat.id}
                onClick={() => onNavigate(feat.id)}
                onMouseEnter={() => setHoveredCard(feat.id)}
                onMouseLeave={() => setHoveredCard(null)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onNavigate(feat.id)}
                className={`group relative p-5 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col items-center text-center glass-panel border border-slate-800 ${
                  feat.accent
                } ${
                  isHovered ? 'scale-105 shadow-2xl bg-slate-900/90 -translate-y-1' : 'hover:border-slate-700'
                }`}
              >
                {/* Floating Tooltip */}
                <div
                  className={`absolute -top-3 px-3 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 border border-slate-700 text-white shadow-lg transition-all duration-200 pointer-events-none whitespace-nowrap ${
                    isHovered ? 'opacity-100 transform -translate-y-1' : 'opacity-0'
                  }`}
                >
                  Explore {feat.title} →
                </div>

                {/* Emoji Emblem */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-3xl sm:text-4xl mb-3.5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner">
                  <span className="filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
                    {feat.emoji}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black tracking-wide text-white group-hover:text-pink-300 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-400 mt-1.5 font-medium line-clamp-2 leading-relaxed">
                  {feat.description}
                </p>

                <div className="mt-4 flex items-center space-x-1.5 text-[11px] font-bold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <span>Enter</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Central "ENTER EMOJINATION" CTA */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={() => onNavigate('dating')}
            className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base tracking-wider uppercase text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/20"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 animate-spin text-white/90" style={{ animationDuration: '8s' }} />
              <span>ENTER EMOJINATION ECOSYSTEM</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

      </main>

      {/* Clean, Non-Promotional Footer */}
      <footer className="relative z-10 w-full max-w-5xl pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center sm:text-left">
        <p className="text-slate-500">
          EMOJINATION™ — Everything Emoji. One Place.
        </p>
        <p className="text-slate-600">
          All-In-One Interactive Emoji Universe
        </p>
      </footer>
    </div>
  );
};
