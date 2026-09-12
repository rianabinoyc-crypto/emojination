import React, { useRef, useEffect } from 'react';

const SUPPORTED_REACTIONS = ['❤️', '😂', '😭', '😡', '😮', '🔥', '👍', '👎', '💀', '🥰'];

interface ReactionPickerProps {
  onSelectReaction: (emoji: string) => void;
  onClose: () => void;
}

export const ReactionPicker: React.FC<ReactionPickerProps> = ({
  onSelectReaction,
  onClose
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="flex items-center space-x-1 p-1.5 rounded-2xl bg-white border border-[#e5dcce] shadow-xl z-30 animate-in fade-in zoom-in-95 duration-100"
    >
      {SUPPORTED_REACTIONS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => {
            onSelectReaction(emoji);
            onClose();
          }}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-lg hover:scale-125 hover:bg-[#faf7f2] active:scale-95 transition-all"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};
