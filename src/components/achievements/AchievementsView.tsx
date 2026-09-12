import React, { useState } from 'react';
import { AchievementItem, DailyChallenge, GamificationState } from '../../types';
import { Trophy, Target, Flame, Sparkles, CheckCircle2, Lock, Award, Shield, Compass } from 'lucide-react';

interface AchievementsViewProps {
  achievements: AchievementItem[];
  challenges: DailyChallenge[];
  gamification: GamificationState;
  onClaimChallengeReward?: (challengeId: string) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  challenges,
  gamification,
  onClaimChallengeReward
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const levelProgressPercent = Math.min(100, Math.round((gamification.currentXp / Math.max(1, gamification.xpForNextLevel)) * 100));

  const filteredAchievements = achievements.filter(a => {
    if (filterCategory === 'all') return true;
    return a.category === filterCategory;
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-150 text-stone-800">
      
      {/* Header & Subsystem Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5dcce]">
        <div>
          <div className="flex items-center space-x-3">
            <Trophy className="w-7 h-7 text-amber-600" />
            <h1 className="text-3xl sm:text-4xl font-serif text-[#143d2b] tracking-tight">
              Emoji Achievements
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Track your accomplishments, daily missions, and unlockable distinctions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold shadow-sm">
            🏆 {unlockedCount} / {achievements.length} Unlocked
          </div>
        </div>
      </div>

      {/* Global Emoji Level Hero Prestige Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#143d2b] text-white border border-[#143d2b]/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Decorative corner seal */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left: Level Emblem */}
        <div className="flex items-center space-x-6 relative z-10">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#0d281c] border-2 border-amber-400/60 flex flex-col items-center justify-center shadow-lg">
            <span className="text-4xl sm:text-5xl font-serif font-black text-amber-300 font-mono">
              {gamification.level}
            </span>
            <span className="text-[10px] font-mono uppercase text-amber-200/80 font-bold tracking-widest mt-1">
              Level
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Level {gamification.level}
            </h2>
            
            {/* XP Bar */}
            <div className="space-y-1 w-full sm:w-80">
              <div className="flex justify-between text-xs font-mono text-emerald-100/80">
                <span>Mastery Progress</span>
                <span className="text-amber-300 font-bold">
                  {gamification.currentXp.toLocaleString()} / {gamification.xpForNextLevel.toLocaleString()} XP
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#0d281c] p-0.5 border border-emerald-800/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 shadow-sm"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Universal Streak Card */}
        <div className="bg-[#0d281c]/80 p-5 rounded-2xl border border-emerald-800/60 space-y-2 text-center sm:text-left min-w-[220px] relative z-10">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-amber-400">
            <Flame className="w-5 h-5 fill-amber-400" />
            <span className="text-xs font-mono uppercase font-bold tracking-wider">ECOSYSTEM STREAK</span>
          </div>
          <div className="text-3xl font-serif font-black text-white font-mono">
            {gamification.streakDays} DAYS
          </div>
          <p className="text-[11px] text-emerald-100/70 leading-tight">
            Active telemetry in: {gamification.contributingActivities.slice(0, 2).join(', ')}.
          </p>
        </div>

      </div>

      {/* Daily Challenges Section */}
      <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Target className="w-5 h-5 text-[#143d2b]" />
            <h3 className="text-base font-serif font-bold text-[#143d2b] tracking-wide">
              DAILY EMOJI MISSIONS & DISPATCHES
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500">Resets daily at 00:00 UTC</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {challenges.map((c) => {
            const pct = Math.min(100, Math.round((c.progress / Math.max(1, c.target)) * 100));
            return (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-3 flex flex-col justify-between hover:border-[#143d2b]/30 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl p-2 rounded-xl bg-white border border-[#e5dcce] shadow-xs">{c.emoji}</span>
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">{c.title}</h4>
                        <span className="text-[10px] font-mono text-amber-700 font-bold">+{c.xpReward} XP</span>
                      </div>
                    </div>

                    {c.completed && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-stone-600 mt-2 line-clamp-2 leading-relaxed">{c.description}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-[#e5dcce]/80">
                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>{c.progress} / {c.target} Completed</span>
                    <span className="font-bold text-stone-700">{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#e5dcce] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${c.completed ? 'bg-emerald-600' : 'bg-[#143d2b]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Universal Achievements Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-serif font-bold text-[#143d2b]">
              PERMANENT UNICODE DISTINCTIONS
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            {['all', 'dating', 'chat', 'health', 'tools', 'mastery'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-bold uppercase text-[11px] transition-all ${
                  filterCategory === cat
                    ? 'bg-[#143d2b] text-white shadow-sm'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-[#e5dcce] hover:bg-[#faf7f2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredAchievements.map((ach) => {
            const isDone = ach.unlocked;
            const pct = Math.min(100, Math.round((ach.progress / Math.max(1, ach.maxProgress)) * 100));

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isDone
                    ? 'bg-white border-amber-300 shadow-md shadow-amber-500/5 ring-1 ring-amber-300/50'
                    : 'bg-[#faf7f2] border-[#e5dcce] opacity-75'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                  isDone ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-xs' : 'bg-white border-[#e5dcce]'
                }`}>
                  {isDone ? ach.emoji : <Lock className="w-4 h-4 text-stone-400" />}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{ach.title}</h4>
                    <span className="text-[10px] font-mono text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                      +{ach.xpReward} XP
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="pt-1.5 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-stone-500">
                      <span>{ach.progress} / {ach.maxProgress}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#e5dcce] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${isDone ? 'bg-amber-500' : 'bg-stone-400'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
