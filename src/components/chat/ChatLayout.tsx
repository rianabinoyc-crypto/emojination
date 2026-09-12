import React, { useState, useEffect, useRef } from 'react';
import { EmojiProfile, Message, Match, ChatMode } from '../../types';
import { ConversationList } from './ConversationList';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { RelationshipHealth } from './RelationshipHealth';
import { Heart, Activity, ArrowLeft, MoreVertical, Sparkles, MessageSquare } from 'lucide-react';

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
      <div className="w-full h-full rounded-3xl glass-panel border border-slate-800 flex overflow-hidden shadow-2xl relative">
        
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
        <main className={`flex-1 flex flex-col h-full bg-slate-950/40 relative ${!mobileShowChat ? 'hidden md:flex' : 'flex'}`}>
          {activeProfile && activeMatch ? (
            <>
              {/* Chat Header */}
              <div className="p-3.5 sm:p-4 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md flex items-center justify-between z-10">
                <div className="flex items-center space-x-3">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileShowChat(false)}
                    className="md:hidden p-1.5 rounded-xl hover:bg-slate-800 text-slate-400"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Partner Avatar & Presence */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">
                      {activeProfile.emoji}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center space-x-1.5">
                      <span>{activeProfile.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono font-bold">
                        {activeMatch.compatibility}% Match
                      </span>
                    </h3>
                    <p className="text-[11px] text-emerald-400 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      <span>Online • {activeProfile.archetype}</span>
                    </p>
                  </div>
                </div>

                {/* Health Matrix Drawer Trigger */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowHealth(!showHealth)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      showHealth
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                        : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-pink-400" />
                    <span className="hidden sm:inline">Health Matrix</span>
                  </button>
                </div>
              </div>

              {/* Relationship Health Overlay / Dropdown */}
              {showHealth && (
                <div className="p-4 border-b border-slate-800/80 bg-slate-900/90 animate-in slide-in-from-top-2 duration-150">
                  <RelationshipHealth
                    health={activeMatch.relationshipHealth}
                    partnerName={activeProfile.name}
                    partnerEmoji={activeProfile.emoji}
                  />
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
                {activeMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-4xl animate-bounce">
                      🦗
                    </div>
                    <h4 className="text-base font-bold text-slate-200">
                      It's quiet here.
                    </h4>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Say something emotionally unnecessary. The text will auto-convert into emojis!
                    </p>
                    <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-pink-300">
                      💡 Tip: Try saying <span className="font-mono text-white">"I love coding and gaming"</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Algorithmic Match Timestamp banner */}
                    <div className="flex items-center justify-center my-4">
                      <div className="px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
                        <Sparkles className="w-3 h-3 text-pink-400" />
                        <span>Matched on {activeMatch.matchedAt} • End-to-End Encrypted Emojis</span>
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
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm">
                          {activeProfile.emoji}
                        </div>
                        <div className="px-4 py-2.5 rounded-2xl rounded-bl-sm bg-slate-900/90 border border-slate-800 flex items-center space-x-1.5 shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                          <span className="text-xs text-slate-400 ml-1.5 italic font-mono">is typing...</span>
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
              <div className="w-20 h-20 rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-5xl">
                💬
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">
                  EMOJI MESSAGING CENTER
                </h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Select a match from the left sidebar to start communicating in the universal language of emojis.
                </p>
              </div>

              {matches.length === 0 && (
                <button
                  onClick={onGoDating}
                  className="mt-2 inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Heart className="w-4 h-4" />
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
