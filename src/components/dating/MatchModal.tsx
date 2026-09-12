import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EmojiProfile, UserProfile } from '../../types';
import { MessageSquare, Flame, Sparkles, Heart } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface MatchModalProps {
  matchedProfile: EmojiProfile;
  userProfile: UserProfile;
  compatibilityScore: number;
  onStartChat: () => void;
  onKeepSwiping: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  matchedProfile,
  userProfile,
  compatibilityScore,
  onStartChat,
  onKeepSwiping
}) => {
  useEffect(() => {
    // Play celebratory match sound
    soundService.playMatch();

    // Trigger double confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#ec4899', '#a855f7', '#06b6d4', '#f43f5e', '#fbbf24']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 text-center glass-panel-glow bg-slate-900/95 border-2 border-pink-500/50 shadow-2xl shadow-pink-500/30 overflow-hidden transform animate-in zoom-in-95 duration-300">
        
        {/* Ambient Top Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-pink-500/25 rounded-full blur-[70px] pointer-events-none" />

        {/* Celebratory Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-mono uppercase tracking-widest mb-4 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Algorithmic Miracle</span>
        </div>

        {/* Big Heading */}
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-cyan-400 tracking-tight leading-none mb-1">
          IT'S A MATCH!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium mb-6">
          The $40M algorithm approves this relationship.
        </p>

        {/* Dual Floating Emoji Avatars */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 my-6">
          {/* User Emoji */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-800/90 border-2 border-purple-500/50 flex items-center justify-center text-5xl sm:text-6xl shadow-xl shadow-purple-500/20 transform -rotate-6 animate-float">
              {userProfile.favoriteEmoji}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-900 text-purple-200 border border-purple-700">
              YOU
            </span>
          </div>

          {/* Glowing Heart Pulse */}
          <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400 animate-heartbeat">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-400" />
          </div>

          {/* Matched Partner Emoji */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-800/90 border-2 border-pink-500/50 flex items-center justify-center text-5xl sm:text-6xl shadow-xl shadow-pink-500/20 transform rotate-6 animate-float" style={{ animationDelay: '1s' }}>
              {matchedProfile.emoji}
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-pink-900 text-pink-200 border border-pink-700 truncate max-w-[80px]">
              {matchedProfile.name}
            </span>
          </div>
        </div>

        {/* Compatibility Score */}
        <div className="my-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-pink-400">
            💕 {compatibilityScore}% COMPATIBILITY
          </div>
          <p className="text-xs text-slate-300 italic">
            "{matchedProfile.greeting}"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={onStartChat}
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>START CHATTING</span>
          </button>

          <button
            onClick={onKeepSwiping}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm tracking-wide transition-all border border-slate-700"
          >
            <span>KEEP SWIPING</span>
          </button>
        </div>

      </div>
    </div>
  );
};
