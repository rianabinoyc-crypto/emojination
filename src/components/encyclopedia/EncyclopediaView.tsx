import React, { useState } from 'react';
import { EmojiProfile } from '../../types';
import { Search, BookOpen, Heart, Sparkles, Zap, ShieldCheck } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EMOJI ENCYCLOPEDIA
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete taxonomy and relational compatibility guide for Unicode species.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {profiles.length} Species Catalogued
          </span>
        </div>
      </div>

      {/* Search Bar & Filter Chips */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, archetype, or keyword..."
            className="w-full bg-slate-900 text-slate-200 placeholder-slate-500 rounded-2xl pl-10 pr-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Filter chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Species' },
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
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
            className="p-5 rounded-3xl glass-panel border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start space-x-3.5">
                <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
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

              {/* Trait meters */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/80">
                <div className="flex justify-between">
                  <span className="text-slate-400">Romance:</span>
                  <span className="text-rose-400 font-bold">{profile.romance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Humor:</span>
                  <span className="text-amber-400 font-bold">{profile.humor}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Chaos:</span>
                  <span className="text-pink-400 font-bold">{profile.chaos}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Confidence:</span>
                  <span className="text-cyan-400 font-bold">{profile.confidence}%</span>
                </div>
              </div>
            </div>

            {/* Compatibility advisory preview */}
            <div className="mt-3 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400">
              <span className="font-bold text-slate-300 block mb-0.5">Compatibility:</span>
              <p className="truncate text-purple-300 font-medium">
                {profile.compatibilityNotes}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Drawer for Selected Emoji */}
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
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                  Unicode ID: {selectedProfile.id}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "{selectedProfile.bio}"
            </p>

            {/* Interests */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase font-mono block mb-1.5">
                Core Interests
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedProfile.interests.map((it, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-slate-800 text-slate-200 border border-slate-700">
                    {it}
                  </span>
                ))}
              </div>
            </div>

            {/* Trait Matrix */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 font-mono block">
                STATISTICAL ATTRIBUTES
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Confidence</span>
                    <span className="font-bold text-cyan-400">{selectedProfile.confidence}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedProfile.confidence}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Chaos Index</span>
                    <span className="font-bold text-pink-400">{selectedProfile.chaos}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: `${selectedProfile.chaos}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Romance</span>
                    <span className="font-bold text-rose-400">{selectedProfile.romance}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: `${selectedProfile.romance}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Humor</span>
                    <span className="font-bold text-amber-400">{selectedProfile.humor}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedProfile.humor}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Compatibility advisory */}
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-1">
              <span className="font-bold text-purple-300 block">Dating Compatibility Advisory:</span>
              <p className="text-slate-300 leading-relaxed">
                {selectedProfile.compatibilityNotes}
              </p>
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

    </div>
  );
};
