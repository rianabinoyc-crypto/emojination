import React, { useState, useMemo, useEffect } from 'react';
import { EmojiProfile } from '../../types';
import { 
  Search, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Bookmark, 
  Compass, 
  X, 
  Copy, 
  Check 
} from 'lucide-react';
import { 
  LIVING_DICTIONARY_ENTRIES, 
  DICTIONARY_CATEGORIES, 
  DictionaryCategory, 
  LivingDictionaryEntry 
} from '../../data/livingDictionary';
import { soundService } from '../../services/soundService';

interface EncyclopediaViewProps {
  profiles: EmojiProfile[];
}

export const EncyclopediaView: React.FC<EncyclopediaViewProps> = ({ profiles }) => {
  // View mode: 'profiles' (specimens) or 'dictionary' (living dictionary)
  const [viewMode, setViewMode] = useState<'profiles' | 'dictionary'>('profiles');

  // Search & Filter state for profiles
  const [profileSearch, setProfileSearch] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<EmojiProfile | null>(null);
  const [profileFilter, setProfileFilter] = useState<'all' | 'chaos' | 'romance' | 'humor' | 'confidence'>('all');

  // Search & Filter state for living dictionary
  const [dictSearch, setDictSearch] = useState('');
  const [selectedDictCategory, setSelectedDictCategory] = useState<DictionaryCategory>('All');
  const [selectedDictEntry, setSelectedDictEntry] = useState<LivingDictionaryEntry | null>(null);
  const [copiedGlyph, setCopiedGlyph] = useState<string | null>(null);

  // Esc key listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProfile(null);
        setSelectedDictEntry(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered profiles
  const filteredProfiles = profiles.filter((p) => {
    const matchQuery =
      p.name.toLowerCase().includes(profileSearch.toLowerCase()) ||
      p.archetype.toLowerCase().includes(profileSearch.toLowerCase()) ||
      p.emoji.includes(profileSearch) ||
      p.bio.toLowerCase().includes(profileSearch.toLowerCase());

    if (!matchQuery) return false;

    if (profileFilter === 'chaos') return p.chaos > 70;
    if (profileFilter === 'romance') return p.romance > 75;
    if (profileFilter === 'humor') return p.humor > 80;
    if (profileFilter === 'confidence') return p.confidence > 85;
    return true;
  });

  // Category counts for living dictionary
  const dictCategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: LIVING_DICTIONARY_ENTRIES.length };
    LIVING_DICTIONARY_ENTRIES.forEach((entry) => {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered dictionary entries
  const filteredDictEntries = useMemo(() => {
    return LIVING_DICTIONARY_ENTRIES.filter((entry) => {
      const matchesCat = selectedDictCategory === 'All' || entry.category === selectedDictCategory;
      if (!matchesCat) return false;

      if (!dictSearch.trim()) return true;
      const q = dictSearch.toLowerCase().trim();
      return (
        entry.glyph.includes(q) ||
        entry.phonetic.toLowerCase().includes(q) ||
        entry.definition.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.context.toLowerCase().includes(q) ||
        entry.etymology.toLowerCase().includes(q) ||
        entry.example.toLowerCase().includes(q)
      );
    });
  }, [selectedDictCategory, dictSearch]);

  const handleCopyGlyph = (glyph: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(glyph);
    setCopiedGlyph(glyph);
    soundService.playMatch();
    setTimeout(() => setCopiedGlyph(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150 text-stone-800 select-none">
      
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
            Rigorous taxonomy, Unicode specimen dossiers, and the complete Living Dictionary.
          </p>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center p-1 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] shadow-xs">
          <button
            onClick={() => {
              soundService.playReaction();
              setViewMode('profiles');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              viewMode === 'profiles'
                ? 'bg-[#143d2b] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Archetypes ({profiles.length})
          </button>
          <button
            onClick={() => {
              soundService.playReaction();
              setViewMode('dictionary');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              viewMode === 'dictionary'
                ? 'bg-[#143d2b] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Living Dictionary ({LIVING_DICTIONARY_ENTRIES.length})
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: PROFILES & ARCHETYPES                                         */}
      {/* ========================================================================= */}
      {viewMode === 'profiles' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Search Bar & Filter Chips */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={profileSearch}
                onChange={(e) => setProfileSearch(e.target.value)}
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
                { id: 'confidence', label: '👑 Confident' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProfileFilter(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    profileFilter === tab.id
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
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => {
                  soundService.playReaction();
                  setSelectedProfile(profile);
                }}
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

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: THE LIVING DICTIONARY                                         */}
      {/* ========================================================================= */}
      {viewMode === 'dictionary' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Search Bar & Category Tabs */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={dictSearch}
                  onChange={(e) => setDictSearch(e.target.value)}
                  placeholder="Search 32 living definitions, phonetics, glyphs, or etymology..."
                  className="w-full bg-white text-stone-800 placeholder-stone-400 rounded-2xl pl-10 pr-9 py-3 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] focus:ring-1 focus:ring-[#143d2b] shadow-xs"
                />
                {dictSearch && (
                  <button
                    onClick={() => setDictSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="text-xs font-mono text-stone-500 shrink-0">
                Showing {filteredDictEntries.length} of {LIVING_DICTIONARY_ENTRIES.length} glyphs
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {DICTIONARY_CATEGORIES.map((cat) => {
                const isSelected = selectedDictCategory === cat;
                const count = dictCategoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      soundService.playReaction();
                      setSelectedDictCategory(cat);
                    }}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-[#143d2b] text-white border-[#143d2b] shadow-xs'
                        : 'bg-white text-stone-600 hover:text-stone-900 border-[#e5dcce] hover:bg-[#faf7f2]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-amber-300 font-bold' : 'text-stone-400'}`}>
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Living Dictionary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDictEntries.map((entry, idx) => {
              const formattedIndex = String(idx + 1).padStart(2, '0');
              return (
                <div
                  key={entry.id}
                  onClick={() => {
                    soundService.playReaction();
                    setSelectedDictEntry(entry);
                  }}
                  className="p-5 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/60 hover:shadow-md cursor-pointer transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Index and Category */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-3">
                      <span>[NO. {formattedIndex}]</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {entry.category}
                      </span>
                    </div>

                    {/* Glyph & Phonetic */}
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="flex items-baseline space-x-3">
                        <span className="text-4xl filter drop-shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200 inline-block">
                          {entry.glyph}
                        </span>
                        <span className="font-mono text-xs text-stone-500 italic">
                          {entry.phonetic}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleCopyGlyph(entry.glyph, e)}
                        title="Copy glyph"
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                      >
                        {copiedGlyph === entry.glyph ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Definition */}
                    <h4 className="text-base font-serif font-bold text-stone-900 group-hover:text-[#143d2b] transition-colors leading-snug">
                      &ldquo;{entry.definition}&rdquo;
                    </h4>

                    {/* Context snippet */}
                    <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                      {entry.context}
                    </p>
                  </div>

                  {/* Resonance Meter */}
                  <div className="mt-4 pt-3 border-t border-[#f0eae1]">
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                      <span className="group-hover:text-stone-700 transition-colors">Semantic Resonance</span>
                      <span className="font-semibold text-stone-800">{entry.resonanceScore}%</span>
                    </div>
                    <div className="w-full h-1 bg-stone-100 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-[#143d2b] rounded-full transition-all duration-300"
                        style={{ width: `${entry.resonanceScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: SPECIMEN PROFILE DOSSIER                                         */}
      {/* ========================================================================= */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-[#fdfbf7] border border-[#e5dcce] shadow-2xl text-stone-800 space-y-5">
            
            <button
              onClick={() => setSelectedProfile(null)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-xl bg-white border border-[#e5dcce] hover:bg-[#faf7f2] transition-colors"
            >
              <X className="w-4 h-4" />
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

      {/* ========================================================================= */}
      {/* MODAL 2: LIVING DICTIONARY GLYPH SPECIMEN                                  */}
      {/* ========================================================================= */}
      {selectedDictEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-[#fdfbf7] border-2 border-[#143d2b] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedDictEntry(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-stone-400 font-mono text-xs uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-[#143d2b]" />
              <span>Living Glyphic Dossier</span>
              <span>•</span>
              <span className="text-[#143d2b] font-semibold">{selectedDictEntry.category}</span>
            </div>

            <div className="flex items-center space-x-6 pb-4 border-b border-[#e5dcce]">
              <div className="w-20 h-20 rounded-3xl bg-white border border-[#e5dcce] shadow-xs flex items-center justify-center text-5xl transform hover:scale-105 transition-transform">
                {selectedDictEntry.glyph}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-mono text-stone-900 font-bold">
                  {selectedDictEntry.phonetic}
                </div>
                <div className="text-xs font-mono text-stone-500">
                  Resonance: <span className="font-bold text-[#143d2b]">{selectedDictEntry.resonanceScore}%</span>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => handleCopyGlyph(selectedDictEntry.glyph)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#143d2b] text-white text-xs font-mono hover:bg-[#0f2e20] transition-all shadow-xs"
                  >
                    {copiedGlyph === selectedDictEntry.glyph ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Glyph</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Definition */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                Definition
              </span>
              <h3 className="text-xl font-serif text-stone-900 leading-snug">
                &ldquo;{selectedDictEntry.definition}&rdquo;
              </h3>
            </div>

            {/* Context & Etymology */}
            <div className="space-y-2.5 text-xs text-stone-600">
              <div className="p-3 rounded-2xl bg-white border border-[#e5dcce] space-y-1">
                <span className="font-mono text-[10px] uppercase text-stone-400 block font-semibold">
                  Situational Context
                </span>
                <p className="leading-relaxed">{selectedDictEntry.context}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#faf6ee] border border-[#e5dcce] space-y-1">
                <span className="font-mono text-[10px] uppercase text-stone-400 block font-semibold">
                  Cultural Etymology & Linguistic Origin
                </span>
                <p className="leading-relaxed italic font-serif text-stone-800">{selectedDictEntry.etymology}</p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#e5dcce] space-y-1">
                <span className="font-mono text-[10px] uppercase text-stone-400 block font-semibold">
                  Sample Dialogue
                </span>
                <p className="font-mono text-xs text-stone-800 bg-stone-50 p-2 rounded-xl border border-stone-100">
                  {selectedDictEntry.example}
                </p>
              </div>
            </div>

            {/* Modal Bottom Bar */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-stone-400">
              <span>Press ESC to dismiss</span>
              <button
                onClick={() => setSelectedDictEntry(null)}
                className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition-colors"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
