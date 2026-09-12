import React, { useState } from 'react';
import { EmojiProfile, PersonalityCategory } from '../../types';
import { X, Sparkles, Plus, Check } from 'lucide-react';

const AVATAR_OPTIONS = [
  '🤠', '🥷', '🦄', '🦖', '🐉', '🧙', '🧛', '🧜', '🧝', '🧞', 
  '🧟', '🤖', '👾', '👽', '👻', '🥑', '🍕', '🍣', '🚀', '⭐',
  '💎', '🔥', '⚡', '🌈', '🍄', '🎸', '🎮', '🛹', '🍿', '🧁'
];

interface CustomCreatorModalProps {
  onClose: () => void;
  onSave: (personality: EmojiProfile) => void;
}

export const CustomCreatorModal: React.FC<CustomCreatorModalProps> = ({
  onClose,
  onSave
}) => {
  const [emoji, setEmoji] = useState('🦄');
  const [name, setName] = useState('');
  const [archetype, setArchetype] = useState('');
  const [category, setCategory] = useState<PersonalityCategory>('chaotic');
  const [bio, setBio] = useState('');
  const [interestsStr, setInterestsStr] = useState('Cosmic Travel, Pixel Art, Espresso');
  const [greeting, setGreeting] = useState('');

  // 8 Trait Sliders
  const [romance, setRomance] = useState(70);
  const [humor, setHumor] = useState(80);
  const [chaos, setChaos] = useState(85);
  const [intelligence, setIntelligence] = useState(75);
  const [energy, setEnergy] = useState(80);
  const [social, setSocial] = useState(75);
  const [calmness, setCalmness] = useState(40);
  const [confidence, setConfidence] = useState(85);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedInterests = interestsStr
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    const newProfile: EmojiProfile = {
      id: `custom-${Date.now()}`,
      emoji,
      name: name.trim(),
      archetype: archetype.trim() || 'Custom Created Entity',
      category,
      personality: bio.trim() || 'Custom created emoji personality in Emojination.',
      bio: bio.trim() || 'A uniquely crafted character forged in the Emojination personality lab.',
      interests: parsedInterests.length > 0 ? parsedInterests : ['✨ Aesthetics', '💬 Banter', '☕ Coffee'],
      confidence,
      humor,
      romance,
      chaos,
      socialEnergy: social,
      intelligence,
      emotionalStability: Math.min(100, Math.max(30, Math.round((calmness + confidence) / 2))),
      calmness,
      preferredTypes: ['😎', '🥰', '😂'],
      compatibilityNotes: `High synergy with ${category} personalities. Responds strongly to confident conversationalists.`,
      reciprocalRate: 0.88,
      greeting: greeting.trim() || `Hey there! I am ${name.trim()} and I just joined the dating pool! ${emoji}`,
      isCustom: true,
      inDatingPool: true
    };

    onSave(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 glass-panel-glow bg-slate-900 border border-purple-500/40 shadow-2xl text-slate-100 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-black text-white">
              CREATE YOUR OWN EMOJI PERSONALITY
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Avatar Selector */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Pick Avatar Glyph:</label>
            <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 max-h-28 overflow-y-auto">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setEmoji(opt)}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all ${
                    emoji === opt
                      ? 'bg-purple-600 text-white scale-110 shadow-md'
                      : 'hover:bg-slate-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Archetype */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cyber Pegasus"
                className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Archetype Tagline:</label>
              <input
                type="text"
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                placeholder="e.g. The Neon Dreamer"
                className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Category:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['romantic', 'funny', 'intelligent', 'chaotic', 'social', 'calm', 'strange'] as PersonalityCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold uppercase transition-all ${
                    category === cat
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bio & Greeting */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Personality & Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe their quirky habits, red flags, and digital charms..."
              rows={2}
              className="w-full bg-slate-950 text-slate-100 rounded-xl px-3.5 py-2 border border-slate-800 focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Core Interests (comma-separated):</label>
              <input
                type="text"
                value={interestsStr}
                onChange={(e) => setInterestsStr(e.target.value)}
                className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Match Greeting Message:</label>
              <input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="What they say when you match..."
                className="w-full bg-slate-950 text-slate-100 rounded-xl px-3 py-2 border border-slate-800 focus:border-purple-500"
              />
            </div>
          </div>

          {/* The 8 Required Trait Sliders */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <span className="font-bold text-white font-mono block">
              TUNE 8 TRAIT SLIDERS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>❤️ Romance</span>
                  <span className="text-rose-400 font-bold">{romance}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={romance}
                  onChange={(e) => setRomance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>😂 Humor</span>
                  <span className="text-amber-400 font-bold">{humor}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humor}
                  onChange={(e) => setHumor(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>💀 Chaos</span>
                  <span className="text-purple-400 font-bold">{chaos}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={chaos}
                  onChange={(e) => setChaos(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>🧠 Intelligence</span>
                  <span className="text-cyan-400 font-bold">{intelligence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intelligence}
                  onChange={(e) => setIntelligence(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>⚡ Energy</span>
                  <span className="text-yellow-400 font-bold">{energy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-yellow-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>🎉 Social</span>
                  <span className="text-pink-400 font-bold">{social}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={social}
                  onChange={(e) => setSocial(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-pink-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>😌 Calmness</span>
                  <span className="text-emerald-400 font-bold">{calmness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calmness}
                  onChange={(e) => setCalmness(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                  <span>🔥 Confidence</span>
                  <span className="text-rose-400 font-bold">{confidence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-extrabold shadow-lg shadow-purple-500/25 flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save & Add to Dating Pool</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
