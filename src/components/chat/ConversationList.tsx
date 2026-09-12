import React, { useState } from 'react';
import { EmojiProfile, Message, Match } from '../../types';
import { Search, Heart, MessageSquare } from 'lucide-react';

interface ConversationListProps {
  matches: Match[];
  profiles: EmojiProfile[];
  messages: Record<string, Message[]>;
  activeEmojiId: string | null;
  onSelectConversation: (emojiId: string) => void;
  typingEmojiId: string | null;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  matches,
  profiles,
  messages,
  activeEmojiId,
  onSelectConversation,
  typingEmojiId
}) => {
  const [search, setSearch] = useState('');
  const profileMap = new Map<string, EmojiProfile>(profiles.map(p => [p.id, p]));

  const filteredMatches = matches.filter(m => {
    const profile = profileMap.get(m.emojiId);
    if (!profile) return false;
    return profile.name.toLowerCase().includes(search.toLowerCase()) ||
           profile.archetype.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside className="w-full md:w-80 lg:w-96 flex flex-col h-full border-r border-slate-800/80 bg-slate-950/60 flex-shrink-0">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <h2 className="font-extrabold text-sm text-white tracking-wide">
              CONVERSATIONS
            </h2>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {matches.length} matches
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emoji soulmates..."
            className="w-full bg-slate-900 text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 text-xs border border-slate-800 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
        {filteredMatches.length === 0 ? (
          <div className="p-6 text-center text-slate-400">
            <span className="text-3xl block mb-2">🦗</span>
            <p className="text-xs font-semibold">No conversations found</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Swipe right on emojis in Dating Corner to start chatting!
            </p>
          </div>
        ) : (
          filteredMatches.map(match => {
            const profile = profileMap.get(match.emojiId);
            if (!profile) return null;

            const conversation = messages[profile.id] || [];
            const lastMsg = conversation[conversation.length - 1];
            const isActive = activeEmojiId === profile.id;
            const isTyping = typingEmojiId === profile.id;

            return (
              <div
                key={match.id}
                onClick={() => onSelectConversation(profile.id)}
                className={`p-3.5 flex items-center space-x-3 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-slate-800/90 border-l-4 border-pink-500'
                    : 'hover:bg-slate-900/60 border-l-4 border-transparent'
                }`}
              >
                {/* Avatar with Online Presence Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-sm">
                    {profile.emoji}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-sm" />
                </div>

                {/* Profile info & latest message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white truncate">
                      {profile.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap ml-1 font-mono">
                      {lastMsg ? lastMsg.timestamp : match.matchedAt}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-[11px] text-slate-400 truncate pr-2">
                      {isTyping ? (
                        <span className="text-cyan-400 font-semibold italic animate-pulse">
                          {profile.emoji} is typing...
                        </span>
                      ) : lastMsg ? (
                        lastMsg.translatedText || lastMsg.text
                      ) : (
                        <span className="text-slate-500 italic">Say hello!</span>
                      )}
                    </p>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <span className="text-[10px] font-bold text-pink-400 flex items-center space-x-0.5">
                        <Heart className="w-2.5 h-2.5 fill-pink-400" />
                        <span>{match.compatibility}%</span>
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </aside>
  );
};
