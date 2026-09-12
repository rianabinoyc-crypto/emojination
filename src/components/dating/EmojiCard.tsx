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
        transform: 'scale(0.96) translateY(14px)',
        opacity: 0.7,
        pointerEvents: 'none'
      };

  return (
    <div
      {...(isTopCard ? dragProps : {})}
      style={style}
      className={`relative w-full max-w-sm sm:max-w-md h-[590px] sm:h-[630px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_20px_45px_-12px_rgba(20,61,43,0.12)] border-2 border-stone-200/90 bg-white select-none ${
        isTopCard ? 'z-20 active:cursor-grabbing hover:border-stone-400' : 'z-10'
      }`}
    >
      {/* Background delicate paper pastel glow based on emoji traits */}
      <div 
        className="absolute -top-16 -right-16 w-60 h-60 rounded-full blur-[80px] pointer-events-none opacity-45"
        style={{
          backgroundColor: profile.chaos > 70 ? '#fbcfe8' : profile.romance > 75 ? '#ffe4e6' : '#e0f2fe'
        }}
      />

      {/* Real-time Swipe Intent Stamps */}
      {isTopCard && swipeIntent === 'right' && (
        <div className="absolute top-8 left-8 z-30 transform -rotate-12 border-4 border-[#143d2b] bg-[#143d2b]/95 text-white font-serif font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl shadow-xl tracking-wider">
          ❤️ ACCEPT
        </div>
      )}
      {isTopCard && swipeIntent === 'left' && (
        <div className="absolute top-8 right-8 z-30 transform rotate-12 border-4 border-rose-600 bg-rose-600 text-white font-serif font-black text-2xl sm:text-3xl px-4 py-1.5 rounded-2xl shadow-xl tracking-wider">
          ❌ DISMISS
        </div>
      )}

      {/* Top Header: Brand Pill & Compatibility Score */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-[#faf7f2] border border-stone-200 text-xs font-mono text-stone-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-pink-400" />
          <span className="truncate max-w-[130px]">{profile.archetype}</span>
        </div>
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-900 text-xs font-mono font-bold shadow-2xs">
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>{compatibility.score}% MATCH</span>
        </div>
      </div>

      {/* Main Avatar Section: Warm Pedestal */}
      <div className="relative z-10 flex flex-col items-center justify-center my-1 text-center">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-b from-[#fdfbf7] to-[#f4eee5] border-2 border-stone-200/80 flex items-center justify-center text-7xl sm:text-8xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] relative group">
          <span className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)] transform hover:scale-110 transition-transform">
            {profile.emoji}
          </span>
          {profile.chaos > 80 && (
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-md bg-amber-400 text-stone-900 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1 shadow-sm">
              <Zap className="w-3 h-3 fill-stone-900" />
              <span>CHAOTIC</span>
            </span>
          )}
        </div>

        <h3 className="mt-3 text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
          {profile.name}
        </h3>

        <p className="text-xs text-stone-500 font-mono mt-0.5">
          {profile.archetype}
        </p>
      </div>

      {/* Bio & Greeting Speech Bubble */}
      <div className="relative z-10 p-3.5 rounded-2xl bg-[#faf7f2] border border-stone-200/80 text-xs text-stone-700 leading-relaxed font-serif italic text-center">
        &ldquo;{profile.greeting}&rdquo;
      </div>

      {/* Trait Gauges: Clean Editorial Lines */}
      <div className="relative z-10 space-y-2 py-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
          <span>Romance Factor</span>
          <span className="font-semibold text-stone-800">{profile.romance}%</span>
        </div>
        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-pink-500 rounded-full"
            style={{ width: `${profile.romance}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-1">
          <span>Humor Saturation</span>
          <span className="font-semibold text-stone-800">{profile.humor}%</span>
        </div>
        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full"
            style={{ width: `${profile.humor}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 pt-1">
          <span>Entropy / Chaos</span>
          <span className="font-semibold text-stone-800">{profile.chaos}%</span>
        </div>
        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#143d2b] rounded-full"
            style={{ width: `${profile.chaos}%` }}
          />
        </div>
      </div>

      {/* Interests Badges */}
      <div className="relative z-10 flex flex-wrap gap-1.5 justify-center pt-1 border-t border-stone-100">
        {profile.interests.slice(0, 3).map((interest, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-[10px] font-mono text-stone-600"
          >
            {interest}
          </span>
        ))}
      </div>

    </div>
  );
};
