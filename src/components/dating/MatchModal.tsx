import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { EmojiProfile, UserProfile } from '../../types';
import { MessageSquare, Sparkles, Heart } from 'lucide-react';
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
      colors: ['#143d2b', '#ec4899', '#f59e0b', '#06b6d4', '#10b981']
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 text-center bg-[#fdfbf7] border-2 border-[#143d2b] shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-300">
        
        {/* Editorial Match Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#143d2b]/10 text-[#143d2b] text-[11px] font-mono uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEW MATCH</span>
        </div>

        {/* Big Editorial Heading */}
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-none mb-1.5">
          It's a Certified Match.
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-sans mb-6">
          High-dimensional sentiment alignment verified under Unicode Standard Section 4.2.
        </p>

        {/* Dual Floating Emoji Avatars */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-6 my-6">
          {/* User Emoji */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#f5efe4] border-2 border-[#143d2b]/30 flex items-center justify-center text-5xl sm:text-6xl shadow-md transform -rotate-3 transition-transform">
              {userProfile.favoriteEmoji}
            </div>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#143d2b] text-white shadow-sm">
              YOU
            </span>
          </div>

          {/* Glowing Heart Pulse */}
          <div className="w-12 h-12 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center text-rose-600 animate-heartbeat shadow-sm">
            <Heart className="w-6 h-6 fill-rose-500 text-rose-600" />
          </div>

          {/* Matched Partner Emoji */}
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-pink-50 border-2 border-pink-300 flex items-center justify-center text-5xl sm:text-6xl shadow-md transform rotate-3 transition-transform">
              {matchedProfile.emoji}
            </div>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-600 text-white truncate max-w-[90px] shadow-sm">
              {matchedProfile.name}
            </span>
          </div>
        </div>

        {/* Compatibility Score Box */}
        <div className="my-6 p-4 rounded-2xl bg-[#f7f2ea] border border-[#e5dacf] space-y-1 text-center">
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#143d2b]">
            💕 {compatibilityScore}% Compatibility Index
          </div>
          <p className="text-xs text-stone-600 italic">
            "{matchedProfile.greeting}"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={onStartChat}
            className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#143d2b] text-white hover:bg-[#0f2e20] font-sans font-bold text-sm tracking-wide shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>START CHAT</span>
          </button>

          <button
            onClick={onKeepSwiping}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-stone-100 text-stone-700 font-sans font-semibold text-sm tracking-wide transition-all border border-[#dcd2c4] shadow-sm"
          >
            <span>Keep Swiping</span>
          </button>
        </div>

      </div>
    </div>
  );
};
