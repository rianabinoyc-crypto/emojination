import React from 'react';
import { Match, EmojiProfile, Message } from '../../types';
import { MessageSquare, Heart, UserMinus, Sparkles, Flame, Clock } from 'lucide-react';

interface MatchesViewProps {
  matches: Match[];
  profiles: EmojiProfile[];
  messages: Record<string, Message[]>;
  onOpenChat: (emojiId: string) => void;
  onUnmatch: (emojiId: string) => void;
  onGoDating: () => void;
}

export const MatchesView: React.FC<MatchesViewProps> = ({
  matches,
  profiles,
  messages,
  onOpenChat,
  onUnmatch,
  onGoDating
}) => {
  const profileMap = new Map<string, EmojiProfile>(profiles.map(p => [p.id, p]));

  if (matches.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-6 text-center glass-panel rounded-3xl border border-slate-800 space-y-6 my-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-5xl">
          💔
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            NO MATCHES YET.
          </h2>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Either your standards are too high, or the emojis are.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 italic">
          "Romance is not dead, but your swipe right frequency might need some quantitative easing."
        </div>

        <button
          onClick={onGoDating}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Flame className="w-4 h-4" />
          <span>ENTER DATING CORNER</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              YOUR MATCHES
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold font-mono">
              {matches.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Algorithmic bonds certified under Unicode Standard Section 4.2.
          </p>
        </div>

        <button
          onClick={onGoDating}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all self-start sm:self-auto"
        >
          <Flame className="w-3.5 h-3.5 text-pink-400" />
          <span>Keep Swiping</span>
        </button>
      </div>

      {/* Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map(match => {
          const profile = profileMap.get(match.emojiId);
          if (!profile) return null;

          const matchMsgs = messages[profile.id] || [];
          const lastMsg = matchMsgs[matchMsgs.length - 1];

          return (
            <div
              key={match.id}
              className="relative p-5 rounded-3xl glass-panel border border-slate-800 hover:border-slate-700/80 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top bar */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                      {profile.emoji}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white flex items-center space-x-1.5">
                        <span>{profile.name}</span>
                        {match.relationshipHealth.chaos > 80 && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Gremlin
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 italic truncate max-w-[170px]">
                        {profile.archetype}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-400">
                        <span className="flex items-center space-x-1 text-pink-400 font-bold">
                          <Heart className="w-3 h-3 fill-pink-400" />
                          <span>{match.compatibility}% compatible</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onUnmatch(profile.id)}
                    aria-label={`Unmatch with ${profile.name}`}
                    title="Unmatch"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800/80 transition-colors"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>

                {/* Latest message snippet or greeting */}
                <div className="mt-3.5 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center space-x-1 text-[10px] text-slate-400 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{lastMsg ? 'Latest message' : 'Matched ' + match.matchedAt}</span>
                  </div>
                  <p className="text-slate-300 line-clamp-1 italic">
                    {lastMsg ? lastMsg.translatedText || lastMsg.text : profile.greeting}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 truncate max-w-[180px]">
                  {match.relationshipHealth.diagnosis}
                </span>

                <button
                  onClick={() => onOpenChat(profile.id)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 hover:text-white border border-pink-500/40 text-xs font-bold transition-all shadow-sm group-hover:bg-pink-600"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
