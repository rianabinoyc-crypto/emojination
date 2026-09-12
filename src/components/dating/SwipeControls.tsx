import React from 'react';
import { X, Heart, Sparkles, RotateCcw } from 'lucide-react';

interface SwipeControlsProps {
  onReject: () => void;
  onAccept: () => void;
  onSuperLike?: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
  disabled?: boolean;
}

export const SwipeControls: React.FC<SwipeControlsProps> = ({
  onReject,
  onAccept,
  onSuperLike,
  onUndo,
  canUndo = false,
  disabled = false
}) => {
  return (
    <div className="flex flex-col items-center space-y-3 w-full max-w-sm mt-4 select-none">
      <div className="flex items-center justify-center space-x-5 sm:space-x-7">
        
        {/* Undo Button (Optional) */}
        {onUndo && (
          <button
            onClick={onUndo}
            disabled={!canUndo || disabled}
            aria-label="Undo last swipe"
            title="Undo previous swipe"
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-50 shadow-sm disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* REJECT (❌) Button */}
        <button
          onClick={onReject}
          disabled={disabled}
          aria-label="Reject emoji profile"
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-white border-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 hover:shadow-md active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-rose-200"
        >
          <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </button>

        {/* SUPER LIKE (⭐) Button */}
        {onSuperLike && (
          <button
            onClick={onSuperLike}
            disabled={disabled}
            aria-label="Super like emoji profile"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-50 border-2 border-sky-200 text-sky-700 hover:bg-sky-100 hover:shadow-md active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* ACCEPT (❤️) Button - Deep Green Statement */}
        <button
          onClick={onAccept}
          disabled={disabled}
          aria-label="Accept emoji profile"
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-[#143d2b] border-2 border-[#143d2b] text-white hover:bg-[#1b4332] hover:shadow-lg active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          <Heart className="w-8 h-8 fill-white group-hover:scale-110 transition-all" />
        </button>

      </div>

      {/* Accessible keyboard hints */}
      <div className="flex items-center space-x-3 text-[11px] font-mono text-stone-400">
        <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 shadow-2xs">
          ← Dismiss
        </span>
        <span className="text-stone-300">•</span>
        <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-600 shadow-2xs">
          → Match
        </span>
      </div>
    </div>
  );
};
