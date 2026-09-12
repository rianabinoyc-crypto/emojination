import React, { useState } from 'react';
import { AchievementItem, DailyChallenge, GamificationState } from '../../types';
import { Trophy, Target, Flame, Sparkles, CheckCircle2, Lock, Award, Shield } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <Trophy className="w-7 h-7 text-yellow-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EMOJI ACHIEVEMENTS & GAMIFICATION
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ascend through the Unicode hierarchy and earn absurd digital status symbols.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded-xl bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs font-mono font-bold">
            🏆 {unlockedCount} / {achievements.length} Unlocked
          </div>
        </div>
      </div>

      {/* Global Emoji Level Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow bg-slate-900/90 border border-yellow-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Level Emblem */}
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950 border-2 border-yellow-500/50 flex flex-col items-center justify-center shadow-xl shadow-yellow-500/10">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono">
              {gamification.level}
            </span>
            <span className="text-[10px] font-mono uppercase text-yellow-400 font-bold">
              Level
            </span>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNICODE GRANDMASTER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              GLOBAL EMOJI LEVEL {gamification.level}
            </h2>
            
            {/* XP Bar */}
            <div className="space-y-1 w-full sm:w-72">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Progress</span>
                <span className="text-yellow-400 font-bold">
                  {gamification.currentXp.toLocaleString()} / {gamification.xpForNextLevel.toLocaleString()} XP
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-950 p-0.5 border border-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${levelProgressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Universal Streak Card */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2 text-center sm:text-left min-w-[220px]">
          <div className="flex items-center justify-center sm:justify-start space-x-2 text-rose-400">
            <Flame className="w-5 h-5 fill-rose-500" />
            <span className="text-xs font-mono uppercase font-bold">EMOJINATION STREAK</span>
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {gamification.streakDays} DAYS
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Contributing activities: {gamification.contributingActivities.slice(0, 2).join(', ')}.
          </p>
        </div>

      </div>

      {/* Daily Challenges Section */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4 bg-slate-900/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Target className="w-5 h-5 text-pink-400" />
            <h3 className="text-base font-extrabold text-white">DAILY EMOJI CHALLENGES</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Resets daily at 00:00 UTC</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {challenges.map((c) => {
            const pct = Math.min(100, Math.round((c.progress / Math.max(1, c.target)) * 100));
            return (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{c.emoji}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{c.title}</h4>
                        <span className="text-[10px] font-mono text-pink-400">+{c.xpReward} XP</span>
                      </div>
                    </div>

                    {c.completed && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">{c.description}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-800/80">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{c.progress} / {c.target}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.completed ? 'bg-emerald-400' : 'bg-pink-500'}`}
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
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="text-base font-extrabold text-white">UNIVERSAL ACHIEVEMENTS</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
            {['all', 'dating', 'chat', 'health', 'tools', 'mastery'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[11px] transition-all ${
                  filterCategory === cat
                    ? 'bg-yellow-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
                    ? 'bg-slate-900/90 border-yellow-500/40 shadow-lg shadow-yellow-500/5'
                    : 'bg-slate-950/60 border-slate-800 opacity-75'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border ${
                  isDone ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' : 'bg-slate-900 border-slate-800'
                }`}>
                  {isDone ? ach.emoji : <Lock className="w-5 h-5 text-slate-600" />}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{ach.title}</h4>
                    <span className="text-[10px] font-mono text-yellow-400 font-bold">+{ach.xpReward} XP</span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {ach.description}
                  </p>

                  <div className="pt-1.5 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>{ach.progress} / {ach.maxProgress}</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isDone ? 'bg-yellow-400' : 'bg-slate-700'}`}
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
