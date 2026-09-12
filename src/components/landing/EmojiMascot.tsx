import React, { forwardRef, useState } from 'react';
import { soundService } from '../../services/soundService';

export interface EmojiMood {
  emoji: string;
  label: string;
  color: string;
  glowColor: string;
}

export const FEATURE_MOODS: Record<string, EmojiMood> = {
  default: {
    emoji: '😎',
    label: 'Cosmic Curator',
    color: 'from-amber-400 to-pink-500',
    glowColor: 'rgba(236, 72, 153, 0.4)'
  },
  dating: {
    emoji: '😍',
    label: 'Love Struck',
    color: 'from-pink-400 to-rose-500',
    glowColor: 'rgba(244, 63, 94, 0.5)'
  },
  chat: {
    emoji: '😄',
    label: 'Conversationalist',
    color: 'from-cyan-400 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.5)'
  },
  health: {
    emoji: '💪',
    label: 'Vitals Optimized',
    color: 'from-rose-400 to-emerald-400',
    glowColor: 'rgba(244, 63, 94, 0.5)'
  },
  personalities: {
    emoji: '🤓',
    label: 'Personality Master',
    color: 'from-purple-400 to-indigo-500',
    glowColor: 'rgba(168, 85, 247, 0.5)'
  },
  encyclopedia: {
    emoji: '🤔',
    label: 'Unicode Scholar',
    color: 'from-indigo-400 to-sky-400',
    glowColor: 'rgba(99, 102, 241, 0.5)'
  },
  tools: {
    emoji: '🧑‍🎨',
    label: 'Mixologist & Creator',
    color: 'from-amber-400 to-orange-500',
    glowColor: 'rgba(245, 158, 11, 0.5)'
  },
  analytics: {
    emoji: '🧐',
    label: 'Data Scientist',
    color: 'from-teal-400 to-emerald-400',
    glowColor: 'rgba(20, 184, 166, 0.5)'
  },
  achievements: {
    emoji: '🏆',
    label: 'Grand Champion',
    color: 'from-yellow-400 to-amber-500',
    glowColor: 'rgba(234, 179, 8, 0.55)'
  }
};

interface EmojiMascotProps {
  activeFeatureId: string | null;
  proximity: number; // 0 to 1
  onClick?: () => void;
}

export const EmojiMascot = forwardRef<HTMLDivElement, EmojiMascotProps>(({
  activeFeatureId,
  proximity,
  onClick
}, ref) => {
  const [clicked, setClicked] = useState(false);

  const moodKey = activeFeatureId && FEATURE_MOODS[activeFeatureId] ? activeFeatureId : 'default';
  const mood = FEATURE_MOODS[moodKey];

  const handleClick = () => {
    soundService.playReaction();
    setClicked(true);
    setTimeout(() => setClicked(false), 650);
    onClick?.();
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4 sm:my-6 select-none">
      {/* Outer ambient glow ring */}
      <div
        className="absolute -inset-6 sm:-inset-10 rounded-full transition-all duration-700 pointer-events-none opacity-40 blur-2xl"
        style={{
          background: mood.glowColor,
          transform: `scale(${1 + proximity * 0.18})`,
        }}
      />

      {/* Glass Orb Halo Container */}
      <div
        ref={ref}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Living Emoji Mascot: ${mood.label} (${mood.emoji})`}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
        className="relative group cursor-pointer w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500/40"
        style={{
          willChange: 'transform',
        }}
      >
        {/* Subtle Frosted Glass Backdrop Dish */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/12 via-white/5 to-transparent backdrop-blur-md border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.4)] group-hover:border-white/30 transition-all duration-300" />

        {/* Orbiting Subtle Glow Ring */}
        <div className="absolute inset-1.5 rounded-full border border-pink-500/20 group-hover:border-pink-500/40 transition-colors duration-500 pointer-events-none animate-pulse-slow" />

        {/* Floating Living Mascot Character */}
        <div
          key={mood.emoji}
          className={`relative text-6xl sm:text-7xl md:text-8xl filter drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)] transition-transform duration-300 animate-emoji-pop ${
            clicked ? 'scale-125 rotate-12' : ''
          }`}
          style={{
            transformOrigin: 'center center',
          }}
        >
          {mood.emoji}
        </div>

        {/* Interactive Click Ripple Indicator */}
        {clicked && (
          <span className="absolute -top-3 sm:-top-4 text-sm sm:text-base font-black text-pink-300 animate-bounce pointer-events-none">
            ✨ Boop!
          </span>
        )}
      </div>

      {/* Living Mascot Mood Sub-Badge */}
      <div className="mt-3.5 flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
        </span>
        <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-slate-300">
          Status: <span className={`bg-gradient-to-r ${mood.color} bg-clip-text text-transparent font-bold`}>{mood.label}</span>
        </span>
      </div>
    </div>
  );
});

EmojiMascot.displayName = 'EmojiMascot';
