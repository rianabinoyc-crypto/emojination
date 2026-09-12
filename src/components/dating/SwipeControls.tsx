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
      <div className="flex items-center justify-center space-x-4 sm:space-x-6">
        
        {/* Undo Button (Optional) */}
        {onUndo && (
          <button
            onClick={onUndo}
            disabled={!canUndo || disabled}
            aria-label="Undo last swipe"
            title="Undo previous swipe"
            className="w-11 h-11 rounded-full flex items-center justify-center glass-button text-amber-400 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        {/* REJECT (❌) Button */}
        <button
          onClick={onReject}
          disabled={disabled}
          aria-label="Reject emoji profile"
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-slate-900/90 border-2 border-rose-500/60 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/30 active:scale-90 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-rose-500/30"
        >
          <X className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </button>

        {/* SUPER LIKE (⭐) Button */}
        {onSuperLike && (
          <button
            onClick={onSuperLike}
            disabled={disabled}
            aria-label="Super like emoji profile"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-900/90 border-2 border-cyan-500/60 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-90 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
          >
            <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* ACCEPT (❤️) Button */}
        <button
          onClick={onAccept}
          disabled={disabled}
          aria-label="Accept emoji profile"
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-slate-900/90 border-2 border-pink-500/60 text-pink-500 hover:bg-pink-500 hover:text-white hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/30 active:scale-90 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-pink-500/30"
        >
          <Heart className="w-8 h-8 fill-transparent group-hover:fill-white group-hover:scale-110 transition-all" />
        </button>

      </div>

      {/* Accessible keyboard hints */}
      <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
        <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
          ← Reject
        </span>
        <span className="text-slate-600">•</span>
        <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
          → Accept
        </span>
      </div>
    </div>
  );
};
