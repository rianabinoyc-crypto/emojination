import React, { useState, useEffect, useRef } from 'react';
import { EmojiProfile, Message, Match, ChatMode } from '../../types';
import { ConversationList } from './ConversationList';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { RelationshipHealth } from './RelationshipHealth';
import { Heart, Activity, ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';

interface ChatLayoutProps {
  matches: Match[];
  profiles: EmojiProfile[];
  messages: Record<string, Message[]>;
  activeEmojiId: string | null;
  onSelectConversation: (emojiId: string) => void;
  onSendMessage: (text: string, mode: ChatMode) => void;
  onToggleReaction: (messageId: string, emoji: string) => void;
  typingEmojiId: string | null;
  onGoDating: () => void;
  defaultChatMode: ChatMode;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  matches,
  profiles,
  messages,
  activeEmojiId,
  onSelectConversation,
  onSendMessage,
  onToggleReaction,
  typingEmojiId,
  onGoDating,
  defaultChatMode
}) => {
  const [showHealth, setShowHealth] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const profileMap = new Map<string, EmojiProfile>(profiles.map(p => [p.id, p]));
  const activeProfile = activeEmojiId ? profileMap.get(activeEmojiId) : null;
  const activeMatch = matches.find(m => m.emojiId === activeEmojiId);
  const activeMessages = activeEmojiId ? (messages[activeEmojiId] || []) : [];

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, typingEmojiId]);

  const handleSelectConv = (id: string) => {
    onSelectConversation(id);
    setMobileShowChat(true);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem-4rem)] md:h-[calc(100vh-4rem)] p-2 sm:p-4 flex">
      <div className="w-full h-full rounded-3xl bg-white border border-[#e5dcce] flex overflow-hidden shadow-sm relative">
        
        {/* Left Sidebar: Conversations */}
        <div className={`w-full md:w-auto h-full ${mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
          <ConversationList
            matches={matches}
            profiles={profiles}
            messages={messages}
            activeEmojiId={activeEmojiId}
            onSelectConversation={handleSelectConv}
            typingEmojiId={typingEmojiId}
          />
        </div>

        {/* Right Active Chat Pane */}
        <main className={`flex-1 flex flex-col h-full bg-[#fcfbf9] relative ${!mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
          {activeProfile && activeMatch ? (
            <>
              {/* Chat Header */}
              <div className="p-3.5 sm:p-4 border-b border-[#e5dcce] bg-white/95 backdrop-blur-md flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileShowChat(false)}
                    className="md:hidden p-1.5 rounded-xl hover:bg-stone-100 text-stone-500"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Partner Avatar & Presence */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-2xl shadow-sm">
                      {activeProfile.emoji}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  <div>
                    <h3 className="text-base font-serif font-bold text-stone-900 flex items-center space-x-2">
                      <span>{activeProfile.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono font-bold border border-rose-200">
                        {activeMatch.compatibility}% Match
                      </span>
                    </h3>
                    <p className="text-[11px] text-stone-500 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      <span>Online • {activeProfile.archetype}</span>
                    </p>
                  </div>
                </div>

                {/* Health Matrix Drawer Trigger */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowHealth(!showHealth)}
                    className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      showHealth
                        ? 'bg-[#143d2b] text-white border-[#143d2b]'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-[#e5dcce]'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    <span className="hidden sm:inline">Health Matrix</span>
                  </button>
                </div>
              </div>

              {/* Relationship Health Overlay / Dropdown */}
              {showHealth && (
                <div className="p-4 border-b border-[#e5dcce] bg-[#faf7f2] animate-in slide-in-from-top-2 duration-150">
                  <RelationshipHealth
                    health={activeMatch.relationshipHealth}
                    partnerName={activeProfile.name}
                    partnerEmoji={activeProfile.emoji}
                  />
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2 bg-[#fcfbf9]">
                {activeMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-3xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-4xl animate-bounce shadow-sm">
                      🦗
                    </div>
                    <h4 className="text-lg font-serif font-bold text-stone-900">
                      It's quiet in the neural buffer.
                    </h4>
                    <p className="text-xs text-stone-600 max-w-xs">
                      Transmit something emotionally unnecessary. Words auto-transcribe into Unicode sentiment streams!
                    </p>
                    <div className="p-3 rounded-2xl bg-white border border-[#e5dcce] text-xs text-stone-700 shadow-sm">
                      💡 Tip: Try saying <span className="font-mono text-[#143d2b] font-semibold">"I love coding and coffee"</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Algorithmic Match Timestamp banner */}
                    <div className="flex items-center justify-center my-4">
                      <div className="px-4 py-1 rounded-full bg-white border border-[#e5dcce] text-[10px] font-mono text-stone-500 flex items-center space-x-1.5 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#143d2b]" />
                        <span>Certified on {activeMatch.matchedAt} • E2E Encrypted Emoji Synapse</span>
                      </div>
                    </div>

                    {activeMessages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        message={msg}
                        partnerEmoji={activeProfile.emoji}
                        onToggleReaction={onToggleReaction}
                      />
                    ))}

                    {/* Simulated Typing Indicator */}
                    {typingEmojiId === activeProfile.id && (
                      <div className="flex items-center space-x-2 my-2 animate-in fade-in duration-150">
                        <div className="w-7 h-7 rounded-full bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-sm shadow-sm">
                          {activeProfile.emoji}
                        </div>
                        <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-white border border-[#e5dcce] flex items-center space-x-1.5 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-[#143d2b] animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                          <span className="text-xs text-stone-500 ml-1.5 italic font-mono">is encoding...</span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Message Input Bar */}
              <MessageInput
                onSendMessage={onSendMessage}
                disabled={typingEmojiId === activeProfile.id}
                defaultMode={defaultChatMode}
              />
            </>
          ) : (
            /* No conversation selected state */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-5xl shadow-sm">
                💬
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-stone-900">
                  Emoji Messaging Center
                </h3>
                <p className="text-xs text-stone-600 max-w-sm">
                  Select a partner bond from the left ledger to communicate in high-dimensional emoji semantics.
                </p>
              </div>

              {matches.length === 0 && (
                <button
                  onClick={onGoDating}
                  className="mt-2 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#143d2b] text-white hover:bg-[#0f2e20] font-sans font-bold text-xs tracking-wide shadow-md transition-all"
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>FIND MATCHES FIRST</span>
                </button>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
