import React, { useState } from 'react';
import { EmojiProfile, PersonalityCategory } from '../../types';
import { X, Sparkles, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-[#fdfbf7] border-2 border-[#143d2b] shadow-2xl text-stone-900 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#e5dcce]">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#143d2b]/10 text-[#143d2b] text-xs font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SYNAPSE SYNTHESIZER</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Forge Bespoke Persona
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors border border-[#e5dcce]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Avatar Selector */}
          <div>
            <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Pick Avatar Glyph:</label>
            <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-white border border-[#e5dcce] max-h-28 overflow-y-auto">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setEmoji(opt)}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all ${
                    emoji === opt
                      ? 'bg-[#143d2b] text-white scale-110 shadow-xs'
                      : 'hover:bg-[#faf7f2]'
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
              <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cyber Pegasus"
                className="w-full bg-white text-stone-900 rounded-xl px-3.5 py-2.5 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Archetype Tagline:</label>
              <input
                type="text"
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                placeholder="e.g. The Vintage Polymath"
                className="w-full bg-white text-stone-900 rounded-xl px-3.5 py-2.5 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Category:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['romantic', 'funny', 'intelligent', 'chaotic', 'social', 'calm', 'strange'] as PersonalityCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-medium uppercase transition-all ${
                    category === cat
                      ? 'bg-[#143d2b] text-white shadow-xs font-semibold'
                      : 'bg-white text-stone-600 border border-[#e5dcce] hover:bg-stone-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bio & Greeting */}
          <div>
            <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Personality & Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe their eccentric habits, emotional traits, and digital demeanor..."
              rows={2}
              className="w-full bg-white text-stone-900 rounded-xl px-3.5 py-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Core Interests (comma-separated):</label>
              <input
                type="text"
                value={interestsStr}
                onChange={(e) => setInterestsStr(e.target.value)}
                className="w-full bg-white text-stone-900 rounded-xl px-3 py-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-stone-600 block mb-1 font-semibold">Match Greeting Message:</label>
              <input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="What they transmit upon pair bonding..."
                className="w-full bg-white text-stone-900 rounded-xl px-3 py-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              />
            </div>
          </div>

          {/* The 8 Required Trait Sliders */}
          <div className="p-4 rounded-2xl bg-white border border-[#e5dcce] space-y-3">
            <span className="font-bold text-stone-900 font-mono block text-xs uppercase">
              TUNE 8 TRAIT SLIDERS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>❤️ Romance</span>
                  <span className="text-rose-700 font-bold">{romance}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={romance}
                  onChange={(e) => setRomance(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-rose-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>😂 Humor</span>
                  <span className="text-amber-700 font-bold">{humor}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humor}
                  onChange={(e) => setHumor(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>💀 Chaos</span>
                  <span className="text-purple-700 font-bold">{chaos}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={chaos}
                  onChange={(e) => setChaos(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>🧠 Intelligence</span>
                  <span className="text-emerald-700 font-bold">{intelligence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intelligence}
                  onChange={(e) => setIntelligence(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-emerald-700"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>⚡ Energy</span>
                  <span className="text-sky-700 font-bold">{energy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-sky-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>🎉 Social</span>
                  <span className="text-pink-700 font-bold">{social}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={social}
                  onChange={(e) => setSocial(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-pink-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>😌 Calmness</span>
                  <span className="text-teal-700 font-bold">{calmness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={calmness}
                  onChange={(e) => setCalmness(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-teal-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-stone-700 mb-1">
                  <span>🔥 Confidence</span>
                  <span className="text-orange-700 font-bold">{confidence}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#f0eae1] rounded cursor-pointer accent-orange-600"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white text-stone-600 border border-[#e5dcce] text-xs font-semibold hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Forge & Seed to Pool</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
