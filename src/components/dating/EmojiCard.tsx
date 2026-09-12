import React from 'react';
import { EmojiProfile, UserProfile } from '../../types';
import { calculateCompatibility } from '../../services/compatibilityEngine';
import { Sparkles, Zap, Heart, ShieldAlert } from 'lucide-react';

interface EmojiCardProps {
  profile: EmojiProfile;
  userProfile: UserProfile;
  isTopCard?: boolean;
  offset?: { x: number; y: number };
  rotation?: number;
  swipeIntent?: 'left' | 'right' | null;
  dragProps?: React.HTMLAttributes<HTMLDivElement>;
  isExiting?: 'left' | 'right' | null;
}

export const EmojiCard: React.FC<EmojiCardProps> = ({
  profile,
  userProfile,
  isTopCard = false,
  offset = { x: 0, y: 0 },
  rotation = 0,
  swipeIntent = null,
  dragProps = {},
  isExiting = null
}) => {
  const compatibility = calculateCompatibility(profile, userProfile);

  const style: React.CSSProperties = isTopCard
    ? {
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0px) rotate(${rotation}deg)`,
        transition: isExiting ? 'transform 0.25s ease-in, opacity 0.25s ease-in' : offset.x === 0 ? 'transform 0.2s ease-out' : 'none',
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none'
      }
    : {
        transform: 'scale(0.95) translateY(16px)',
        opacity: 0.6,
        pointerEvents: 'none'
      };

  return (
    <div
      {...(isTopCard ? dragProps : {})}
      style={style}
      className={`relative w-full max-w-sm sm:max-w-md h-[580px] sm:h-[620px] rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl glass-panel border border-slate-700/80 bg-slate-900/90 select-none ${
        isTopCard ? 'z-20 active:cursor-grabbing hover:border-slate-600' : 'z-10'
      }`}
    >
      {/* Background ambient gradient based on emoji traits */}
      <div 
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[90px] pointer-events-none opacity-40"
        style={{
          backgroundColor: profile.chaos > 70 ? '#ec4899' : profile.romance > 75 ? '#f43f5e' : '#06b6d4'
        }}
      />

      {/* Real-time Swipe Intent Glow Stamps */}
      {isTopCard && swipeIntent === 'right' && (
        <div className="absolute top-8 left-8 z-30 transform -rotate-12 border-4 border-emerald-400 bg-emerald-950/80 text-emerald-300 font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl shadow-xl shadow-emerald-500/30 animate-pulse tracking-wider">
          ❤️ ACCEPT
        </div>
      )}
      {isTopCard && swipeIntent === 'left' && (
        <div className="absolute top-8 right-8 z-30 transform rotate-12 border-4 border-rose-500 bg-rose-950/80 text-rose-300 font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl shadow-xl shadow-rose-500/30 animate-pulse tracking-wider">
          ❌ REJECT
        </div>
      )}

      {/* Top Header: Compatibility Pill & Archetype */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span className="truncate max-w-[140px]">{profile.archetype}</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-extrabold shadow-sm">
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          <span>{compatibility.score}% MATCH</span>
        </div>
      </div>

      {/* Main Avatar Section */}
      <div className="relative z-10 flex flex-col items-center justify-center my-2 text-center">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700 flex items-center justify-center text-7xl sm:text-8xl shadow-inner relative group">
          <span className="filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform">
            {profile.emoji}
          </span>
          {profile.chaos > 80 && (
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 shadow-md">
              <Zap className="w-3 h-3 fill-slate-950" />
              <span>CHAOTIC</span>
            </span>
          )}
        </div>

        <h3 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-white">
          {profile.name}
        </h3>

        <p className="text-xs sm:text-sm text-pink-400 font-medium italic mt-0.5">
          "{profile.personality}"
        </p>
      </div>

      {/* Bio & Interests */}
      <div className="relative z-10 space-y-3">
        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 text-center px-2">
          {profile.bio}
        </p>

        {/* Interests Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {profile.interests.slice(0, 4).map((interest, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-slate-800/90 text-slate-300 border border-slate-700/60"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Overengineered Statistical Spectrum */}
      <div className="relative z-10 bg-slate-950/60 rounded-2xl p-3 border border-slate-800/80 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>STATISTICAL TRAIT MATRIX</span>
          <span className="text-cyan-400 font-bold">{compatibility.verdict}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Confidence</span>
              <span className="text-slate-200">{profile.confidence}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${profile.confidence}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Chaos Index</span>
              <span className="text-pink-400 font-bold">{profile.chaos}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-pink-500 h-full rounded-full" style={{ width: `${profile.chaos}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Romance</span>
              <span className="text-slate-200">{profile.romance}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-rose-400 h-full rounded-full" style={{ width: `${profile.romance}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-slate-400 mb-0.5">
              <span>Humor</span>
              <span className="text-slate-200">{profile.humor}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${profile.humor}%` }} />
            </div>
          </div>
        </div>

        <div className="pt-1 flex items-center space-x-1.5 text-[10px] text-slate-400 italic">
          <ShieldAlert className="w-3 h-3 text-pink-400 flex-shrink-0" />
          <span className="truncate">{compatibility.summary}</span>
        </div>
      </div>

    </div>
  );
};
