import React from 'react';
import { Match, EmojiProfile, Message } from '../../types';
import { MessageSquare, Heart, UserMinus, Flame, Clock, Sparkles, ShieldCheck } from 'lucide-react';

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

  // Calculate average compatibility
  const avgCompatibility = matches.length > 0
    ? Math.round(matches.reduce((acc, m) => acc + m.compatibility, 0) / matches.length)
    : 0;

  if (matches.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 px-6 text-center bg-[#faf7f2] rounded-3xl border border-[#e5dcce] space-y-6 my-10 shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-50 border border-rose-200 flex items-center justify-center text-5xl shadow-sm">
          💔
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
            No Matches Yet.
          </h2>
          <p className="text-sm text-stone-600 max-w-sm mx-auto">
            You have not formed any matches yet. Head to Dating to start discovering emojis.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] text-xs text-stone-600 italic max-w-sm mx-auto">
          "Romance is not dead, but your swipe right frequency might need some quantitative easing."
        </div>

        <button
          onClick={onGoDating}
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-[#143d2b] text-white hover:bg-[#0f2e20] font-sans font-bold text-sm tracking-wide shadow-md transition-all"
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>Start Dating</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-in fade-in duration-150">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5dcce]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight flex items-center gap-3">
            <span>Your Matches</span>
            <span className="text-sm font-sans font-semibold px-3 py-1 rounded-full bg-[#143d2b] text-white">
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Confirmed romantic and conversational connections.
          </p>
        </div>

        <button
          onClick={onGoDating}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>Find More Matches</span>
        </button>
      </div>

      {/* Telemetry Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] shadow-sm">
          <div className="text-[11px] font-mono text-stone-500 uppercase">Mean Compatibility</div>
          <div className="text-2xl font-serif font-bold text-[#143d2b] mt-0.5">{avgCompatibility}%</div>
          <div className="text-[11px] text-stone-500 mt-1">Weighted semantic affinity</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] shadow-sm">
          <div className="text-[11px] font-mono text-stone-500 uppercase">Ledger Integrity</div>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-0.5 flex items-center gap-1.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>99.98%</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Zero cryptographic drift</div>
        </div>
        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white border border-[#e5dcce] shadow-sm">
          <div className="text-[11px] font-mono text-stone-500 uppercase">Transmission Status</div>
          <div className="text-2xl font-serif font-bold text-stone-800 mt-0.5">
            {Object.values(messages).flat().length} <span className="text-xs font-sans text-stone-500 font-normal">total packets</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">Active messaging channels</div>
        </div>
      </div>

      {/* Match Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {matches.map(match => {
          const profile = profileMap.get(match.emojiId);
          if (!profile) return null;

          const matchMsgs = messages[profile.id] || [];
          const lastMsg = matchMsgs[matchMsgs.length - 1];

          return (
            <div
              key={match.id}
              className="relative p-5 sm:p-6 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                      {profile.emoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center space-x-2">
                        <span>{profile.name}</span>
                        {match.relationshipHealth.chaos > 80 && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                            Chaotic
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-stone-600 italic truncate max-w-[200px]">
                        {profile.archetype}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-[11px]">
                        <span className="flex items-center space-x-1 text-rose-600 font-semibold">
                          <Heart className="w-3 h-3 fill-rose-500" />
                          <span>{match.compatibility}% compatible</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onUnmatch(profile.id)}
                    aria-label={`Revoke bond with ${profile.name}`}
                    title="Revoke Pair Bond"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                </div>

                {/* Latest message snippet or greeting */}
                <div className="mt-4 p-3.5 rounded-2xl bg-[#faf7f2] border border-[#ece4d8] text-xs">
                  <div className="flex items-center space-x-1.5 text-[10px] font-mono text-stone-500 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{lastMsg ? 'Latest packet' : 'Bond certified ' + match.matchedAt}</span>
                  </div>
                  <p className="text-stone-700 line-clamp-1 italic font-sans">
                    {lastMsg ? lastMsg.translatedText || lastMsg.text : profile.greeting}
                  </p>
                </div>
              </div>

              {/* Action Buttons & Diagnosis */}
              <div className="mt-5 pt-3 border-t border-[#f0eae1] flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-stone-600 truncate max-w-[190px]">
                  {match.relationshipHealth.diagnosis}
                </span>

                <button
                  onClick={() => onOpenChat(profile.id)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white text-xs font-semibold transition-all shadow-sm shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open Chat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
