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
      message: '❌ DISMISSED — Non-viable emotional resonance detected.'
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
      message: '❤️ INITIATED — Quantum romantic handshake dispatched.'
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

  // Empty state when all profiles have been swiped
  if (!currentProfile) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 px-6 text-center bg-white rounded-3xl border-2 border-stone-200/90 shadow-xl space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-24 h-24 mx-auto rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center text-6xl shadow-sm">
          🏆
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-stone-400 uppercase tracking-widest">
            // POOL EXHAUSTED
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            You Have Judged Every Emoji.
          </h2>
          <p className="text-sm text-stone-600 font-serif italic max-w-md mx-auto">
            The algorithm rests satisfied that no unicode glyph has escaped your discerning romantic scrutiny.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#faf7f2] border border-stone-200 text-xs font-mono text-stone-500">
          STATUS: 100% SWIPE EQUILIBRIUM ACHIEVED
        </div>

        <button
          onClick={onResetDiscovery}
          className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-[#143d2b] text-white font-medium text-sm hover:bg-[#1b4332] shadow-md transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RELOAD ROMANCE POOL</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto px-4 py-6 flex flex-col items-center select-none">
      
      {/* Editorial Header */}
      <div className="w-full text-center mb-4">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Emoji <span className="italic font-normal text-stone-600">Dating</span>
        </h2>
        <p className="text-xs font-mono text-stone-400 mt-1">
          REMAINING CANDIDATES: {availableProfiles.length}
        </p>
      </div>

      {/* Swipe Feedback Toast */}
      {lastSwipeToast && (
        <div className={`fixed top-24 z-50 px-4 py-2 rounded-2xl font-mono text-xs shadow-lg animate-in slide-in-from-top duration-200 border ${
          lastSwipeToast.type === 'accept'
            ? 'bg-[#143d2b] text-white border-[#143d2b]'
            : 'bg-rose-50 text-rose-900 border-rose-200'
        }`}>
          {lastSwipeToast.message}
        </div>
      )}

      {/* The Swipe Cards Stack */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[590px] sm:h-[630px] flex items-center justify-center">
        {nextProfile && (
          <EmojiCard
            key={nextProfile.id}
            profile={nextProfile}
            userProfile={userProfile}
            isTopCard={false}
          />
        )}

        <EmojiCard
          key={currentProfile.id}
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

      {/* Tactile Controls */}
      <SwipeControls
        onReject={() => triggerSwipe('left')}
        onAccept={() => triggerSwipe('right')}
        disabled={isExiting !== null}
      />

    </div>
  );
};
