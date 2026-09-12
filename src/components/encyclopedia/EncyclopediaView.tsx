import React, { useState } from 'react';
import { EmojiProfile } from '../../types';
import { Search, BookOpen, Heart, Sparkles, Zap, ShieldCheck, Bookmark, Compass } from 'lucide-react';

interface EncyclopediaViewProps {
  profiles: EmojiProfile[];
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({ profiles }) => {
  const [search, setSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<EmojiProfile | null>(null);
  const [filter, setFilter] = useState<'all' | 'chaos' | 'romance' | 'humor' | 'confidence'>('all');

  const filtered = profiles.filter((p) => {
    const matchQuery =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.archetype.toLowerCase().includes(search.toLowerCase()) ||
      p.emoji.includes(search) ||
      p.bio.toLowerCase().includes(search.toLowerCase());

    if (!matchQuery) return false;

    if (filter === 'chaos') return p.chaos > 70;
    if (filter === 'romance') return p.romance > 75;
    if (filter === 'humor') return p.humor > 80;
    if (filter === 'confidence') return p.confidence > 85;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150 text-stone-800">
      
      {/* Header & Subsystem Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5dcce]">
        <div>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-7 h-7 text-[#143d2b]" />
            <h1 className="text-3xl sm:text-4xl font-serif text-[#143d2b] tracking-tight">
              Emoji Encyclopedia
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Rigorous taxonomy, relational compatibility, and anatomical bios of Unicode specimens.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white text-[#143d2b] border border-[#e5dcce] shadow-xs font-bold">
            📖 {profiles.length} Specimens Catalogued
          </span>
        </div>
      </div>

      {/* Search Bar & Filter Chips */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search specimen by name, archetype, or keyword..."
            className="w-full bg-white text-stone-800 placeholder-stone-400 rounded-2xl pl-10 pr-4 py-3 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] focus:ring-1 focus:ring-[#143d2b] shadow-xs"
          />
        </div>

        {/* Filter chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Specimens' },
            { id: 'chaos', label: '🔥 High Chaos' },
            { id: 'romance', label: '💖 Romantics' },
            { id: 'humor', label: '😂 Comedians' },
            { id: 'confidence', label: '👑 Confident' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === tab.id
                  ? 'bg-[#143d2b] text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-[#e5dcce] hover:bg-[#faf7f2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((profile) => (
          <div
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
            className="p-5 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/60 hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start space-x-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-3xl group-hover:scale-105 transition-transform shadow-inner">
                  {profile.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-stone-900 truncate">
                      {profile.name}
                    </h3>
                    <span className="text-[10px] font-mono text-stone-400">ID #{profile.id.slice(0, 4)}</span>
                  </div>
                  <p className="text-xs text-[#143d2b] font-medium truncate">
                    {profile.archetype}
                  </p>
                  <p className="text-[11px] text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                    {profile.personality}
                  </p>
                </div>
              </div>

              {/* Trait meters */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono bg-[#faf7f2] p-3 rounded-2xl border border-[#e5dcce]/80">
                <div className="flex justify-between">
                  <span className="text-stone-500">Romance:</span>
                  <span className="text-rose-700 font-bold">{profile.romance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Humor:</span>
                  <span className="text-amber-700 font-bold">{profile.humor}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Chaos:</span>
                  <span className="text-purple-700 font-bold">{profile.chaos}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Confidence:</span>
                  <span className="text-emerald-700 font-bold">{profile.confidence}%</span>
                </div>
              </div>
            </div>

            {/* Compatibility advisory preview */}
            <div className="mt-3 pt-3 border-t border-[#e5dcce] text-[11px] text-stone-600">
              <span className="font-mono uppercase text-[10px] text-stone-400 tracking-wider block mb-0.5">COMPATIBILITY ADVISORY:</span>
              <p className="truncate text-stone-800 font-serif italic">
                "{profile.compatibilityNotes}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Drawer for Selected Emoji */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#fdfbf7] border border-[#e5dcce] shadow-2xl text-stone-800 space-y-5">
            
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-xl bg-white border border-[#e5dcce] hover:bg-[#faf7f2] transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-3xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-5xl shadow-inner">
                {selectedProfile.emoji}
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  SPECIMEN REF: #{selectedProfile.id}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#143d2b] mt-0.5">{selectedProfile.name}</h3>
                <p className="text-xs text-stone-600 font-mono tracking-wide">{selectedProfile.archetype}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce]">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic">
                "{selectedProfile.bio}"
              </p>
            </div>

            {/* Interests */}
            <div>
              <span className="text-[10px] font-bold text-stone-500 uppercase font-mono tracking-wider block mb-1.5">
                Observed Behavioral Affinities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProfile.interests.map((it, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-white text-stone-700 border border-[#e5dcce]">
                    {it}
                  </span>
                ))}
              </div>
            </div>

            {/* Trait Matrix */}
            <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] space-y-2.5">
              <span className="text-[10px] font-bold text-stone-500 font-mono uppercase tracking-wider block">
                QUANTIFIED ATTRIBUTE MATRIX
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-stone-600">Confidence</span>
                    <span className="font-mono font-bold text-emerald-800">{selectedProfile.confidence}%</span>
                  </div>
                  <div className="h-1.5 bg-[#e5dcce] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${selectedProfile.confidence}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-stone-600">Chaos Index</span>
                    <span className="font-mono font-bold text-purple-800">{selectedProfile.chaos}%</span>
                  </div>
                  <div className="h-1.5 bg-[#e5dcce] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: `${selectedProfile.chaos}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-stone-600">Romance</span>
                    <span className="font-mono font-bold text-rose-800">{selectedProfile.romance}%</span>
                  </div>
                  <div className="h-1.5 bg-[#e5dcce] rounded-full overflow-hidden">
                    <div className="h-full bg-rose-600 rounded-full" style={{ width: `${selectedProfile.romance}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-stone-600">Humor</span>
                    <span className="font-mono font-bold text-amber-800">{selectedProfile.humor}%</span>
                  </div>
                  <div className="h-1.5 bg-[#e5dcce] rounded-full overflow-hidden">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: `${selectedProfile.humor}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Compatibility advisory */}
            <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] text-xs space-y-1">
              <span className="font-mono uppercase text-[10px] text-stone-500 font-bold block">Consortium Compatibility Advisory:</span>
              <p className="text-stone-700 leading-relaxed font-serif">
                {selectedProfile.compatibilityNotes}
              </p>
            </div>

            <button
              onClick={() => setSelectedProfile(null)}
              className="w-full py-3 rounded-2xl bg-[#143d2b] hover:bg-[#0f2e20] text-white font-bold text-xs shadow-sm transition-all tracking-wide uppercase font-mono"
            >
              Close Specimen Dossier
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
