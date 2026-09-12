import React, { useState } from 'react';
import { Message } from '../../types';
import { ReactionPicker } from './ReactionPicker';
import { Smile, Check, CheckCheck, ChevronDown, ChevronUp, Sparkles, BarChart2 } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  partnerEmoji: string;
  onToggleReaction: (messageId: string, emoji: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  partnerEmoji,
  onToggleReaction
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);

  const isUser = message.sender === 'user';
  const hasMetadata = !!message.translationMetadata;
  const reactionsList = Object.entries(message.reactions || {}).filter(([_, count]) => count > 0);

  return (
    <div className={`relative flex flex-col ${isUser ? 'items-end' : 'items-start'} my-2.5 group select-text`}>
      <div className={`flex items-end space-x-2 max-w-[88%] sm:max-w-[75%] ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
        
        {/* Avatar icon */}
        <div className="w-8 h-8 rounded-full bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-base flex-shrink-0 mb-1 shadow-sm">
          {isUser ? '👤' : partnerEmoji}
        </div>

        {/* Message Card Container */}
        <div className="relative">
          <div
            className={`p-3.5 sm:p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
              isUser
                ? 'bg-[#143d2b] text-white rounded-br-sm border border-[#0f2e20]'
                : 'bg-white text-stone-900 rounded-bl-sm border border-[#e5dcce]'
            }`}
          >
            {/* Translated Emoji Text or Main Text */}
            <div className="text-base sm:text-lg tracking-wide font-normal break-words font-sans">
              {message.translatedText || message.text}
            </div>

            {/* If translated, display original text preview in small subtitle */}
            {message.translatedText && message.translatedText !== message.text && (
              <div className={`mt-1.5 pt-1.5 border-t text-[11px] italic ${isUser ? 'border-white/20 text-white/80' : 'border-[#f0eae1] text-stone-500'}`}>
                "{message.text}"
              </div>
            )}

            {/* Bottom bar of bubble: timestamp, read receipt, metadata toggle */}
            <div className={`mt-2 flex items-center space-x-2 text-[10px] font-mono ${isUser ? 'text-emerald-200/80 justify-end' : 'text-stone-400 justify-start'}`}>
              <span>{message.timestamp}</span>

              {/* Read receipt status */}
              {isUser && (
                <span>
                  {message.status === 'read' ? (
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-300 inline" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-emerald-200 inline" />
                  )}
                </span>
              )}

              {/* Translation Metadata Toggle */}
              {hasMetadata && (
                <button
                  onClick={() => setShowMetadata(!showMetadata)}
                  className="flex items-center space-x-0.5 hover:underline font-semibold ml-1 cursor-pointer"
                >
                  <BarChart2 className="w-3 h-3" />
                  <span>{showMetadata ? 'Hide telemetry' : 'Unicode stats'}</span>
                  {showMetadata ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                </button>
              )}
            </div>
          </div>

          {/* Expandable Translation Metadata Drawer */}
          {showMetadata && message.translationMetadata && (
            <div className="mt-2 p-3 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] text-[11px] text-stone-700 space-y-1.5 shadow-md animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between text-[#143d2b] font-bold border-b border-[#e5dcce] pb-1">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-[#143d2b]" />
                  <span>SYNAPSE SENTIMENT ANALYSIS</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#143d2b]/10 text-[#143d2b]">
                  {message.mode.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1 pt-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">Sentiment:</span>
                  <span className="text-emerald-700 font-bold">
                    {message.translationMetadata.sentiment.label} ({message.translationMetadata.sentiment.score}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Emoji Density:</span>
                  <span className="text-[#143d2b] font-bold">
                    {message.translationMetadata.emojiDensity}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Confidence:</span>
                  <span className="text-purple-700 font-bold">
                    {message.translationMetadata.confidence}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Reaction badges underneath bubble */}
          {reactionsList.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mt-1 px-1">
              {reactionsList.map(([emoji, count]) => {
                const userReacted = message.userReactions?.includes(emoji);
                return (
                  <button
                    key={emoji}
                    onClick={() => onToggleReaction(message.id, emoji)}
                    className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs transition-all shadow-xs ${
                      userReacted
                        ? 'bg-rose-100 border border-rose-300 text-rose-800 font-semibold'
                        : 'bg-white border border-[#e5dcce] text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{emoji}</span>
                    <span className="font-mono text-[10px] font-bold">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hover trigger for reaction picker */}
        <div className="relative self-center opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            aria-label="Add reaction"
            title="React with emoji"
            className="p-1.5 rounded-full bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-800 border border-[#e5dcce] transition-all shadow-sm"
          >
            <Smile className="w-4 h-4" />
          </button>

          {showReactionPicker && (
            <div className={`absolute bottom-full mb-2 ${isUser ? 'right-0' : 'left-0'}`}>
              <ReactionPicker
                onSelectReaction={(emoji) => onToggleReaction(message.id, emoji)}
                onClose={() => setShowReactionPicker(false)}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
