import React, { useState } from 'react';
import { UserProfile, AnalyticsStats, GamificationState } from '../../types';
import { User, Edit3, Sparkles, Check, Heart, Trophy, Flame, Activity } from 'lucide-react';

const EMOJI_AVATAR_OPTIONS = ['😎', '🥰', '😂', '🥺', '😈', '🤓', '😴', '🤠', '🧐', '🥶', '🤪', '😇', '👽', '🤖', '💀', '🤑', '😤', '🥳', '😭', '😍', '🙃', '🤯', '🫠', '😏', '🤨', '🦄', '🥑', '👾', '🚀'];

interface UserProfileViewProps {
  userProfile: UserProfile;
  stats: AnalyticsStats;
  gamification: GamificationState;
  healthScore: number;
  achievementsCount: number;
  totalAchievements: number;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  userProfile,
  stats,
  gamification,
  healthScore,
  achievementsCount,
  totalAchievements,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userProfile.username);
  const [tagline, setTagline] = useState(userProfile.tagline);
  const [bio, setBio] = useState(userProfile.bio);
  const [favoriteEmoji, setFavoriteEmoji] = useState(userProfile.favoriteEmoji);
  const [archetype, setArchetype] = useState(userProfile.archetype);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      username,
      tagline,
      bio,
      favoriteEmoji,
      archetype
    });
    setIsEditing(false);
  };

  const levelProgressPct = Math.min(100, Math.round((gamification.currentXp / Math.max(1, gamification.xpForNextLevel)) * 100));

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-pink-500" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            YOUR EMOJINATION PROFILE
          </h1>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Main Profile Showcase Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow bg-slate-900/90 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

        {isEditing ? (
          /* Edit Form */
          <form onSubmit={handleSave} className="space-y-4 relative z-10">
            <h3 className="text-base font-extrabold text-white">Customize Your Persona</h3>

            {/* Favorite Emoji Picker */}
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Select Favorite Emoji Avatar:</label>
              <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                {EMOJI_AVATAR_OPTIONS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setFavoriteEmoji(e)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      favoriteEmoji === e
                        ? 'bg-pink-500/30 border-2 border-pink-500 scale-110 shadow-lg'
                        : 'hover:bg-slate-800'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm border border-slate-800 focus:border-pink-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Emoji Personality Archetype:</label>
                <input
                  type="text"
                  value={archetype}
                  onChange={(e) => setArchetype(e.target.value)}
                  className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm border border-slate-800 focus:border-pink-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Tagline:</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm border border-slate-800 focus:border-pink-500"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Bio:</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm border border-slate-800 focus:border-pink-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-xs font-extrabold shadow-md flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Persona</span>
              </button>
            </div>
          </form>
        ) : (
          /* View Profile */
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Big Avatar */}
            <div className="relative group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-800/90 border-2 border-pink-500/50 flex items-center justify-center text-6xl sm:text-7xl shadow-2xl shadow-pink-500/20 transform hover:scale-105 transition-transform">
                {userProfile.favoriteEmoji}
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-pink-900 text-pink-200 border border-pink-700 whitespace-nowrap">
                {userProfile.archetype.toUpperCase()}
              </span>
            </div>

            {/* Profile Text */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {userProfile.username}
                  </h2>
                  <p className="text-xs sm:text-sm text-pink-400 font-semibold">
                    {userProfile.tagline}
                  </p>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-xs font-mono font-bold self-center sm:self-start">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Level {gamification.level} Pioneer</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                {userProfile.bio}
              </p>

              {/* XP Progress */}
              <div className="pt-2 max-w-md space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>XP Progress</span>
                  <span className="text-yellow-400 font-bold">
                    {gamification.currentXp.toLocaleString()} / {gamification.xpForNextLevel.toLocaleString()} XP
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${levelProgressPct}%` }} />
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-2">
                {userProfile.interests.map((it, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-xl bg-slate-800/90 text-slate-200 border border-slate-700/80"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Ecosystem Metrics Grid (Health, Matches, Messages, Streaks, Achievements) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-rose-400 text-xs font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>Health Score</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{healthScore}</div>
          <span className="text-[10px] text-rose-300 font-bold">EXCELLENT</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-pink-400 text-xs font-mono">
            <Heart className="w-3.5 h-3.5" />
            <span>Matches</span>
          </div>
          <div className="text-2xl font-black text-pink-400 font-mono">{stats.matchesFormed}</div>
          <span className="text-[10px] text-slate-400 font-mono">{stats.profilesAccepted} Accepted</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-cyan-400 text-xs font-mono">
            <span>💬</span>
            <span>Messages</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.messagesSent}</div>
          <span className="text-[10px] text-cyan-300 font-mono">{stats.emojisSent} Emojis</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-amber-400 text-xs font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>Streak</span>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{gamification.streakDays}d</div>
          <span className="text-[10px] text-slate-400 font-mono">Daily Activity</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-yellow-400 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5" />
            <span>Trophies</span>
          </div>
          <div className="text-2xl font-black text-yellow-400 font-mono">{achievementsCount} / {totalAchievements}</div>
          <span className="text-[10px] text-slate-400 font-mono">Unlocked</span>
        </div>

      </div>

    </div>
  );
};
