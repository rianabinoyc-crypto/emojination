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
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-base flex-shrink-0 mb-1 shadow-sm">
          {isUser ? '👤' : partnerEmoji}
        </div>

        {/* Message Card Container */}
        <div className="relative">
          <div
            className={`p-3.5 sm:p-4 rounded-3xl text-sm leading-relaxed shadow-md ${
              isUser
                ? 'bg-gradient-to-tr from-pink-600 to-purple-600 text-white rounded-br-sm border border-pink-400/30'
                : 'bg-slate-900/90 text-slate-100 rounded-bl-sm border border-slate-800'
            }`}
          >
            {/* Translated Emoji Text or Main Text */}
            <div className="text-base sm:text-lg tracking-wide font-normal break-words">
              {message.translatedText || message.text}
            </div>

            {/* If translated, display original text preview in small subtitle */}
            {message.translatedText && message.translatedText !== message.text && (
              <div className="mt-1.5 pt-1.5 border-t border-white/10 text-[11px] opacity-80 italic">
                "{message.text}"
              </div>
            )}

            {/* Bottom bar of bubble: timestamp, read receipt, metadata toggle */}
            <div className={`mt-2 flex items-center space-x-2 text-[10px] ${isUser ? 'text-pink-200/80 justify-end' : 'text-slate-400 justify-start'}`}>
              <span>{message.timestamp}</span>

              {/* Read receipt status */}
              {isUser && (
                <span>
                  {message.status === 'read' ? (
                    <CheckCheck className="w-3.5 h-3.5 text-cyan-300 inline" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-pink-200 inline" />
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
                  <span>{showMetadata ? 'Hide stats' : 'Emoji stats'}</span>
                  {showMetadata ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
                </button>
              )}
            </div>
          </div>

          {/* Expandable Translation Metadata Drawer */}
          {showMetadata && message.translationMetadata && (
            <div className="mt-2 p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-300 space-y-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between text-pink-400 font-bold border-b border-slate-800 pb-1">
                <span className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>EMOJI TRANSLATION ANALYSIS</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/20">
                  {message.mode.toUpperCase()}
                </span>
              </div>

              <div className="space-y-1 pt-1 font-mono text-[10px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Sentiment:</span>
                  <span className="text-emerald-400 font-bold">
                    {message.translationMetadata.sentiment.label} ({message.translationMetadata.sentiment.score}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Emoji Density:</span>
                  <span className="text-cyan-400 font-bold">
                    {message.translationMetadata.emojiDensity}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Translation Confidence:</span>
                  <span className="text-purple-400 font-bold">
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
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs transition-all ${
                      userReacted
                        ? 'bg-pink-500/30 border border-pink-500 text-pink-200'
                        : 'bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:bg-slate-700'
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
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
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
