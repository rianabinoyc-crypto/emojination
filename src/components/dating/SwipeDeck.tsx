import React, { useState } from 'react';
import { EmojiProfile, UserProfile } from '../../types';
import { EmojiCard } from './EmojiCard';
import { SwipeControls } from './SwipeControls';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { soundService } from '../../services/soundService';
import { RotateCcw, Sparkles } from 'lucide-react';

interface SwipeDeckProps {
  availableProfiles: EmojiProfile[];
  userProfile: UserProfile;
  onAccept: (profile: EmojiProfile) => void;
  onReject: (profile: EmojiProfile) => void;
  onResetDiscovery: () => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  availableProfiles,
  userProfile,
  onAccept,
  onReject,
  onResetDiscovery
}) => {
  const [lastSwipeToast, setLastSwipeToast] = useState<{
    type: 'accept' | 'reject';
    emoji: string;
    message: string;
  } | null>(null);

  const currentProfile = availableProfiles[0];
  const nextProfile = availableProfiles[1];

  const handleSwipeLeft = () => {
    if (!currentProfile) return;
    soundService.playReject();
    soundService.playSwipe('left');
    setLastSwipeToast({
      type: 'reject',
      emoji: currentProfile.emoji,
      message: '❌ REJECTED — Your emojis were not emotionally compatible.'
    });
    setTimeout(() => setLastSwipeToast(null), 3000);
    onReject(currentProfile);
  };

  const handleSwipeRight = () => {
    if (!currentProfile) return;
    soundService.playAccept();
    soundService.playSwipe('right');
    setLastSwipeToast({
      type: 'accept',
      emoji: currentProfile.emoji,
      message: '❤️ ACCEPTED — An emoji connection has been initiated.'
    });
    setTimeout(() => setLastSwipeToast(null), 3000);
    onAccept(currentProfile);
  };

  const {
    offset,
    rotation,
    isDragging,
    isExiting,
    swipeIntent,
    triggerSwipe,
    dragProps
  } = useSwipeGesture({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight
  });

  // Empty state when all 25+ profiles have been swiped
  if (!currentProfile) {
    return (
      <div className="w-full max-w-md mx-auto py-16 px-6 text-center glass-panel rounded-3xl border border-slate-800 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-6xl animate-bounce">
          🎉
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            YOU HAVE JUDGED EVERY EMOJI.
          </h2>
          <p className="text-sm text-slate-400">
            You may now reconsider your decisions or inspect your matches.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 italic">
          "The algorithm rests, satisfied that no unicode character escaped your discerning gaze."
        </div>

        <button
          onClick={onResetDiscovery}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET DISCOVERY</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-2 sm:py-6">
      
      {/* Toast Feedback for last swipe */}
      <div className="h-9 mb-2 flex items-center justify-center">
        {lastSwipeToast && (
          <div className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150 ${
            lastSwipeToast.type === 'accept'
              ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 shadow-emerald-500/10'
              : 'bg-rose-950/90 text-rose-300 border border-rose-500/40 shadow-rose-500/10'
          }`}>
            <span>{lastSwipeToast.emoji}</span>
            <span>{lastSwipeToast.message}</span>
          </div>
        )}
      </div>

      {/* Card Deck Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[580px] sm:h-[620px] flex items-center justify-center">
        {/* Next Card underneath for physical deck illusion */}
        {nextProfile && (
          <div className="absolute inset-0 flex items-center justify-center">
            <EmojiCard profile={nextProfile} userProfile={userProfile} isTopCard={false} />
          </div>
        )}

        {/* Current Active Top Card */}
        <div className="absolute inset-0 flex items-center justify-center">
          <EmojiCard
            profile={currentProfile}
            userProfile={userProfile}
            isTopCard={true}
            offset={offset}
            rotation={rotation}
            swipeIntent={swipeIntent}
            dragProps={dragProps}
            isExiting={isExiting}
          />
        </div>
      </div>

      {/* Action Controls & Keyboard Hints */}
      <SwipeControls
        onReject={() => triggerSwipe('left')}
        onAccept={() => triggerSwipe('right')}
        disabled={isExiting !== null}
      />

      {/* Remaining counter badge */}
      <div className="mt-3 text-[11px] font-mono text-slate-500 flex items-center space-x-1.5">
        <Sparkles className="w-3 h-3 text-pink-500" />
        <span>{availableProfiles.length} Emojis Remaining in Pool</span>
      </div>

    </div>
  );
};
