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
    <aside className="w-full md:w-80 lg:w-96 flex flex-col h-full border-r border-[#e5dcce] bg-[#fdfbf7] flex-shrink-0">
      
      {/* Header & Search */}
      <div className="p-4 border-b border-[#e5dcce] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-[#143d2b]" />
            <h2 className="font-serif font-bold text-base text-stone-900 tracking-tight">
              Conversations
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#143d2b]/10 text-[#143d2b] font-semibold">
            {matches.length} active
          </span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emoji transmissions..."
            className="w-full bg-white text-stone-900 placeholder-stone-400 rounded-xl pl-9 pr-3 py-2 text-xs border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] focus:ring-1 focus:ring-[#143d2b]"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#f0eae1]">
        {filteredMatches.length === 0 ? (
          <div className="p-6 text-center text-stone-500">
            <span className="text-3xl block mb-2">🦗</span>
            <p className="text-xs font-semibold text-stone-800">No transmissions found</p>
            <p className="text-[11px] text-stone-500 mt-1">
              Swipe right on emojis in Dating Corner to establish a connection!
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
                    ? 'bg-[#f4efe6] border-l-4 border-[#143d2b]'
                    : 'hover:bg-white/60 border-l-4 border-transparent'
                }`}
              >
                {/* Avatar with Online Presence Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-2xl shadow-sm">
                    {profile.emoji}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                </div>

                {/* Profile info & latest message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-serif font-bold text-stone-900 truncate">
                      {profile.name}
                    </h3>
                    <span className="text-[10px] text-stone-400 whitespace-nowrap ml-1 font-mono">
                      {lastMsg ? lastMsg.timestamp : match.matchedAt}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-[11px] text-stone-600 truncate pr-2">
                      {isTyping ? (
                        <span className="text-[#143d2b] font-semibold italic animate-pulse">
                          {profile.emoji} is typing...
                        </span>
                      ) : lastMsg ? (
                        lastMsg.translatedText || lastMsg.text
                      ) : (
                        <span className="text-stone-400 italic">Say hello!</span>
                      )}
                    </p>

                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <span className="text-[10px] font-semibold text-rose-600 flex items-center space-x-0.5">
                        <Heart className="w-2.5 h-2.5 fill-rose-500" />
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
