import React, { useState } from 'react';
import { EmojiProfile } from '../../types';
import { CustomCreatorModal } from './CustomCreatorModal';
import { Search, Plus, Sparkles, Check, Brain, X } from 'lucide-react';

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
    { id: 'all', label: 'All Personas', icon: '✨' },
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-in fade-in duration-150">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5dcce]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight flex items-center gap-3">
            <span>Emoji Personalities</span>
            <Brain className="w-7 h-7 text-[#143d2b] inline" />
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Inspect 50+ multidimensional synthetic archetypes, modulate their presence in your active dating pool, or synthesize entirely bespoke entities.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setShowCreatorModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Forge New Persona</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search personas by archetype, name, or emoji glyph..."
            className="w-full bg-white text-stone-900 placeholder-stone-400 rounded-2xl pl-10 pr-4 py-3 text-xs border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] focus:ring-1 focus:ring-[#143d2b] shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#143d2b] text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-600 hover:bg-[#faf7f2] border border-[#e5dcce]'
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
              className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/40 hover:shadow-md transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Top bar with Category pill & custom tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#faf7f2] text-stone-700 font-semibold border border-[#e5dcce]">
                    {profile.category}
                  </span>

                  {profile.isCustom && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Bespoke Entity
                    </span>
                  )}
                </div>

                {/* Avatar and Main text */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-3xl shadow-xs group-hover:scale-105 transition-transform">
                    {profile.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-serif font-bold text-stone-900 truncate">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-[#143d2b] font-medium truncate font-sans">
                      {profile.archetype}
                    </p>
                    <p className="text-[11px] text-stone-600 line-clamp-2 mt-1">
                      {profile.personality}
                    </p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-1.5 mt-4 p-2.5 rounded-2xl bg-[#faf7f2] border border-[#ece4d8] text-[10px] font-mono text-center">
                  <div>
                    <span className="text-stone-500 block">Romance</span>
                    <span className="text-rose-700 font-bold">{profile.romance}%</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Humor</span>
                    <span className="text-amber-700 font-bold">{profile.humor}%</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Chaos</span>
                    <span className="text-purple-700 font-bold">{profile.chaos}%</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Toggle in Dating Pool */}
              <div className="mt-5 pt-3 border-t border-[#f0eae1] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProfile(profile)}
                  className="text-xs text-stone-600 hover:text-stone-900 font-medium underline-offset-2 hover:underline"
                >
                  View Dossier
                </button>

                <button
                  onClick={() => onToggleDatingPool(profile.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    inPool
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-rose-50 hover:text-rose-800 hover:border-rose-300'
                      : 'bg-white text-stone-700 border-[#e5dcce] hover:bg-[#143d2b] hover:text-white hover:border-[#143d2b]'
                  }`}
                >
                  {inPool ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>In Pool</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#fdfbf7] border-2 border-[#143d2b] shadow-2xl text-stone-900 space-y-4">
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-5 right-5 text-stone-500 hover:text-stone-900 p-1.5 rounded-full bg-white border border-[#e5dcce]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-3xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-5xl shadow-xs">
                {selectedProfile.emoji}
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">{selectedProfile.name}</h3>
                <p className="text-sm text-[#143d2b] font-semibold">{selectedProfile.archetype}</p>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#143d2b]/10 text-[#143d2b] uppercase font-bold">
                  {selectedProfile.category}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-white p-3.5 rounded-2xl border border-[#e5dcce]">
              "{selectedProfile.bio}"
            </p>

            {/* Trait Matrix */}
            <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] space-y-2 text-xs font-mono">
              <span className="text-stone-500 font-bold block text-[11px] uppercase">Synaptic Trait Spectrum</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span className="text-stone-600">Romance:</span>
                  <span className="text-rose-700 font-bold">{selectedProfile.romance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Humor:</span>
                  <span className="text-amber-700 font-bold">{selectedProfile.humor}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Chaos:</span>
                  <span className="text-purple-700 font-bold">{selectedProfile.chaos}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Intelligence:</span>
                  <span className="text-emerald-700 font-bold">{selectedProfile.intelligence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Social Energy:</span>
                  <span className="text-sky-700 font-bold">{selectedProfile.socialEnergy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Confidence:</span>
                  <span className="text-amber-800 font-bold">{selectedProfile.confidence}%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProfile(null)}
              className="w-full py-3 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-all shadow-xs"
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
