import React, { useState } from 'react';
import { EmojiProfile, PersonalityCategory } from '../../types';
import { CustomCreatorModal } from './CustomCreatorModal';
import { Search, Plus, Sparkles, Check, Heart, Brain, Zap, Filter, Flame } from 'lucide-react';

interface PersonalitiesViewProps {
  allPersonalities: EmojiProfile[];
  datingPoolIds: Set<string>;
  onToggleDatingPool: (id: string) => void;
  onSaveCustomPersonality: (profile: EmojiProfile) => void;
  onGoDating: () => void;
}

export const PersonalitiesView: React.FC<PersonalitiesViewProps> = ({
  allPersonalities,
  datingPoolIds,
  onToggleDatingPool,
  onSaveCustomPersonality,
  onGoDating
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<EmojiProfile | null>(null);

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'All Personalities', icon: '✨' },
    { id: 'romantic', label: 'Romantic', icon: '❤️' },
    { id: 'funny', label: 'Funny', icon: '😂' },
    { id: 'intelligent', label: 'Intelligent', icon: '🧠' },
    { id: 'chaotic', label: 'Chaotic', icon: '😈' },
    { id: 'social', label: 'Social', icon: '🎉' },
    { id: 'calm', label: 'Calm', icon: '😌' },
    { id: 'strange', label: 'Strange', icon: '👽' }
  ];

  const filtered = allPersonalities.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.archetype.toLowerCase().includes(search.toLowerCase()) ||
      p.personality.toLowerCase().includes(search.toLowerCase()) ||
      p.emoji.includes(search);

    if (!matchSearch) return false;
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <Brain className="w-7 h-7 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EMOJI PERSONALITY LAB
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse 50+ unique unicode personalities, toggle them in your dating pool, or forge your own.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCreatorModal(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE CUSTOM PERSONALITY</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 50+ emoji personalities by name, archetype, or emoji..."
            className="w-full bg-slate-900 text-slate-200 placeholder-slate-500 rounded-2xl pl-10 pr-4 py-3 text-xs border border-slate-800 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Personality Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((profile) => {
          const inPool = datingPoolIds.has(profile.id);

          return (
            <div
              key={profile.id}
              className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top bar with Category pill & custom tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-purple-300 font-bold border border-slate-700">
                    {profile.category}
                  </span>

                  {profile.isCustom && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                      Custom Created
                    </span>
                  )}
                </div>

                {/* Avatar and Main text */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                    {profile.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-extrabold text-white truncate">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-purple-400 font-medium truncate">
                      {profile.archetype}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {profile.personality}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-1.5 mt-4 p-2 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-[10px] font-mono text-center">
                  <div>
                    <span className="text-slate-500 block">Romance</span>
                    <span className="text-rose-400 font-bold">{profile.romance}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Humor</span>
                    <span className="text-amber-400 font-bold">{profile.humor}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Chaos</span>
                    <span className="text-purple-400 font-bold">{profile.chaos}%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Toggle in Dating Pool */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProfile(profile)}
                  className="text-xs text-slate-400 hover:text-white font-medium"
                >
                  View Details
                </button>

                <button
                  onClick={() => onToggleDatingPool(profile.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    inPool
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-purple-600 hover:text-white hover:border-purple-500'
                  }`}
                >
                  {inPool ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>In Dating Pool</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Pool</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Detail Dossier Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 glass-panel-glow bg-slate-900 border border-purple-500/40 shadow-2xl text-slate-200 space-y-4">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/80"
            >
              ✕
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-5xl">
                {selectedProfile.emoji}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{selectedProfile.name}</h3>
                <p className="text-sm text-purple-400 font-semibold">{selectedProfile.archetype}</p>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                  {selectedProfile.category}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "{selectedProfile.bio}"
            </p>

            {/* Trait Matrix */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
              <span className="text-slate-400 font-bold block">PERSONALITY SPECTRUM</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Romance:</span>
                  <span className="text-rose-400 font-bold">{selectedProfile.romance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Humor:</span>
                  <span className="text-amber-400 font-bold">{selectedProfile.humor}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Chaos:</span>
                  <span className="text-purple-400 font-bold">{selectedProfile.chaos}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Intelligence:</span>
                  <span className="text-cyan-400 font-bold">{selectedProfile.intelligence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Social Energy:</span>
                  <span className="text-pink-400 font-bold">{selectedProfile.socialEnergy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-yellow-400 font-bold">{selectedProfile.confidence}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProfile(null)}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

      {/* Custom Creator Modal */}
      {showCreatorModal && (
        <CustomCreatorModal
          onClose={() => setShowCreatorModal(false)}
          onSave={onSaveCustomPersonality}
        />
      )}

    </div>
  );
};
