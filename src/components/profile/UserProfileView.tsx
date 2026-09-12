import React, { useState } from 'react';
import { UserProfile, AnalyticsStats, GamificationState } from '../../types';
import { User, Edit3, Sparkles, Check, Heart, Trophy, Flame, Activity, ShieldCheck, Fingerprint } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150 text-stone-800">
      
      {/* Header & Subsystem Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5dcce]">
        <div>
          <div className="flex items-center space-x-3">
            <Fingerprint className="w-7 h-7 text-[#143d2b]" />
            <h1 className="text-3xl sm:text-4xl font-serif text-[#143d2b] tracking-tight">
              User Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Your emoji identity, personal preferences, and activity statistics.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-[#faf7f2] text-stone-700 text-xs font-bold border border-[#e5dcce] shadow-xs transition-all self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Credentials'}</span>
        </button>
      </div>

      {/* Main Profile Showcase Card / Passport */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#e5dcce] shadow-md relative overflow-hidden">
        
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#faf7f2] rounded-full -mr-20 -mt-20 pointer-events-none -z-0" />

        {isEditing ? (
          /* Edit Form */
          <form onSubmit={handleSave} className="space-y-4 relative z-10">
            <h3 className="text-base font-serif font-bold text-[#143d2b]">Re-calibrate Citizen Persona</h3>

            {/* Favorite Emoji Picker */}
            <div>
              <label className="text-xs font-mono text-stone-500 block mb-1">Select Official Avatar Specimen:</label>
              <div className="flex flex-wrap gap-2 p-3 rounded-2xl bg-[#faf7f2] border border-[#e5dcce]">
                {EMOJI_AVATAR_OPTIONS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setFavoriteEmoji(e)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      favoriteEmoji === e
                        ? 'bg-[#143d2b] text-white scale-110 shadow-md ring-2 ring-[#143d2b]'
                        : 'bg-white hover:bg-stone-100 border border-[#e5dcce]'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-stone-500 block mb-1">Citizen Call-Sign / Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#faf7f2] text-stone-900 rounded-xl px-3.5 py-2.5 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-stone-500 block mb-1">Personality Archetype:</label>
                <input
                  type="text"
                  value={archetype}
                  onChange={(e) => setArchetype(e.target.value)}
                  className="w-full bg-[#faf7f2] text-stone-900 rounded-xl px-3.5 py-2.5 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-stone-500 block mb-1">Manifesto Tagline:</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#faf7f2] text-stone-900 rounded-xl px-3.5 py-2.5 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-stone-500 block mb-1">Biographical Abstract:</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-[#faf7f2] text-stone-900 rounded-xl px-3.5 py-2.5 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 rounded-xl bg-white border border-[#e5dcce] text-stone-600 hover:bg-[#faf7f2] text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#143d2b] hover:bg-[#0f2e20] text-white text-xs font-bold shadow-sm flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Credentials</span>
              </button>
            </div>
          </form>
        ) : (
          /* View Profile */
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
            {/* Big Avatar */}
            <div className="relative group flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#faf7f2] border-2 border-[#143d2b]/30 flex items-center justify-center text-6xl sm:text-7xl shadow-inner transform group-hover:scale-105 transition-transform">
                {userProfile.favoriteEmoji}
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#143d2b] text-white tracking-widest whitespace-nowrap shadow-xs uppercase">
                {userProfile.archetype}
              </span>
            </div>

            {/* Profile Text */}
            <div className="flex-1 text-center sm:text-left space-y-2.5 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                    {userProfile.username}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#143d2b] font-medium font-mono">
                    {userProfile.tagline}
                  </p>
                </div>

                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-mono font-bold self-center sm:self-start shadow-xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                  <span>Level {gamification.level}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif italic max-w-xl">
                "{userProfile.bio}"
              </p>

              {/* XP Progress */}
              <div className="pt-2 max-w-md space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-stone-500">
                  <span>XP Progress</span>
                  <span className="text-[#143d2b] font-bold">
                    {gamification.currentXp.toLocaleString()} / {gamification.xpForNextLevel.toLocaleString()} XP
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#e5dcce] overflow-hidden">
                  <div className="h-full bg-[#143d2b] rounded-full transition-all duration-300" style={{ width: `${levelProgressPct}%` }} />
                </div>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 pt-2">
                {userProfile.interests.map((it, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-xl bg-[#faf7f2] text-stone-700 border border-[#e5dcce]"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Ecosystem Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        
        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center space-x-1 text-stone-500 text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Health Score</span>
          </div>
          <div className="text-2xl font-serif font-bold text-[#143d2b]">{healthScore}</div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">OPTIMAL</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center space-x-1 text-stone-500 text-xs font-mono">
            <Heart className="w-3.5 h-3.5 text-rose-600" />
            <span>Pair Bonds</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">{stats.matchesFormed}</div>
          <span className="text-[10px] text-stone-500 font-mono">{stats.profilesAccepted} Accepted</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center space-x-1 text-stone-500 text-xs font-mono">
            <span>💬</span>
            <span>Messages</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">{stats.messagesSent}</div>
          <span className="text-[10px] text-stone-500 font-mono">{stats.emojisSent} Glyphs Sent</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center space-x-1 text-stone-500 text-xs font-mono">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Streak</span>
          </div>
          <div className="text-2xl font-serif font-bold text-amber-700">{gamification.streakDays}d</div>
          <span className="text-[10px] text-stone-500 font-mono">Continuous Sync</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] text-center space-y-1 shadow-xs">
          <div className="flex items-center justify-center space-x-1 text-stone-500 text-xs font-mono">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Distinctions</span>
          </div>
          <div className="text-2xl font-serif font-bold text-stone-900">{achievementsCount} / {totalAchievements}</div>
          <span className="text-[10px] text-stone-500 font-mono">Vault Badges</span>
        </div>

      </div>

    </div>
  );
};
