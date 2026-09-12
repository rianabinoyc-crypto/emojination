import React, { useState, useMemo } from 'react';
import {
  EmojiTranslateIcon,
  EmojiTextToEmojiIcon,
  EmojiCopyIcon,
  EmojiGenerateIcon,
  EmojiRandomIcon,
  EmojiSparkleIcon,
  EmojiArrowIcon,
} from './CustomIcons';
import { soundService } from '../../services/soundService';

interface PresetPhrase {
  id: string;
  human: string;
  levels: string[];
  sentiment: string;
  dopamine: number;
}

const PRESET_PHRASES: PresetPhrase[] = [
  {
    id: 'p1',
    human: 'I am completely exhausted.',
    levels: [
      '😮‍💨',
      '😮‍💨 ☕ 🫠',
      '😮‍💨 ☕ 🫠 🛌 💀',
      '😮‍💨 ☕ 🫠 🛌 💀 🪦 👻 🧯 💥',
    ],
    sentiment: 'Biological Depletion',
    dopamine: 88,
  },
  {
    id: 'p2',
    human: 'That meeting could have been an email.',
    levels: [
      '😐 📧',
      '☕ 💻 😐 📧 💀',
      '🥱 🕒 📉 🤯 🪦 📧',
      '🗑️ 🔥 📉 🤡 💀 📧 🗿 🫠',
    ],
    sentiment: 'Corporate Despair',
    dopamine: 96,
  },
  {
    id: 'p3',
    human: 'That was absolutely unbelievable.',
    levels: [
      '😳',
      '😳 💀 🤯',
      '🤯 🚀 🎆 💀 🫠 ✨',
      '👁️👄👁️ 💥 🌌 🛸 💀 🪦 🔥 🏆',
    ],
    sentiment: 'Sensory Overload',
    dopamine: 98,
  },
  {
    id: 'p4',
    human: 'I have no idea what is happening.',
    levels: [
      '👀 ❓',
      '👀 ❓ 🫠 🌀',
      '😵‍💫 ❓ 🕳️ 🫠 🤡',
      '🌪️ 🫨 ❓ 🕳️ 👽 🧩 💀 🫠 🪐',
    ],
    sentiment: 'Existential Confusion',
    dopamine: 92,
  },
  {
    id: 'p5',
    human: 'Send help immediately.',
    levels: [
      '🆘',
      '🆘 🧯 🏃💨',
      '🚨 🆘 🧯 🏃💨 🫠 💀',
      '🚒 🚨 🆘 🧯 💥 🌋 🏃💨 💀 🪦',
    ],
    sentiment: 'Critical Emergency',
    dopamine: 94,
  },
];

export const LanguageMorphSection: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p1');
  const [customInput, setCustomInput] = useState<string>('');
  const [intensityLevel, setIntensityLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const activePreset = useMemo(() => {
    return PRESET_PHRASES.find(p => p.id === selectedPresetId) || PRESET_PHRASES[0];
  }, [selectedPresetId]);

  // Current translated output based on preset or custom typing
  const currentOutput = useMemo(() => {
    if (customInput.trim()) {
      // Basic dynamic translator mapping for custom input
      const text = customInput.toLowerCase();
      const tokens: string[] = [];
      if (text.includes('love') || text.includes('heart')) tokens.push('❤️', '🥰');
      if (text.includes('happy') || text.includes('good') || text.includes('great')) tokens.push('✨', '😄');
      if (text.includes('tired') || text.includes('sleep') || text.includes('bed')) tokens.push('😴', '🛌', '☕');
      if (text.includes('fire') || text.includes('hot') || text.includes('lit')) tokens.push('🔥', '⚡');
      if (text.includes('dead') || text.includes('lol') || text.includes('haha')) tokens.push('💀', '🤣');
      if (text.includes('think') || text.includes('wonder')) tokens.push('🤔', '💭');
      if (text.includes('work') || text.includes('code') || text.includes('meeting')) tokens.push('💻', '📧', '☕');
      if (tokens.length === 0) tokens.push('💭', '✨', '💬');

      // Intensity amplifier
      if (intensityLevel > 0) {
        tokens.push('🫠');
      }
      if (intensityLevel > 1) {
        tokens.push('💀', '💥');
      }
      if (intensityLevel > 2) {
        tokens.push('🪦', '🛸', '🌌');
      }
      return tokens.join(' ');
    }

    const levels = activePreset.levels;
    const idx = Math.min(intensityLevel, levels.length - 1);
    return levels[idx];
  }, [customInput, activePreset, intensityLevel]);

  const handleMakeItWorse = () => {
    soundService.playReaction();
    setIntensityLevel(prev => (prev + 1) % 4);
  };

  const handleCopy = () => {
    soundService.playAccept();
    navigator.clipboard.writeText(currentOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRandomize = () => {
    soundService.playReaction();
    const otherPresets = PRESET_PHRASES.filter(p => p.id !== selectedPresetId);
    const random = otherPresets[Math.floor(Math.random() * otherPresets.length)];
    setSelectedPresetId(random.id);
    setCustomInput('');
    setIntensityLevel(Math.floor(Math.random() * 3));
  };

  const INTENSITY_NAMES = ['Mild / Reserved', 'Articulated', 'Dramatic', 'Unhinged / Cosmic'];

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 select-none">
      
      {/* Section Header: Editorial Language Blueprint */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 border-b border-stone-200/80 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-stone-400 text-xs font-mono tracking-wider uppercase mb-2">
            <span>[SECTION 02]</span>
            <span>•</span>
            <span>TRANSLATION DYNAMICS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900">
            The Transformation <span className="italic font-normal text-stone-600">Engine</span>
          </h2>
        </div>
        <p className="text-stone-500 font-serif italic text-sm sm:text-base max-w-md">
          Ordinary alphabets dilute human intent. Watch rigid lexical structures dissolve into pure expressive semiotics.
        </p>
      </div>

      {/* Preset Phrase Picker Capsules */}
      <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-xs font-mono text-stone-400 uppercase mr-1">Select phrase:</span>
        {PRESET_PHRASES.map((preset) => {
          const isSelected = selectedPresetId === preset.id && !customInput;
          return (
            <button
              key={preset.id}
              onClick={() => {
                soundService.playReaction();
                setSelectedPresetId(preset.id);
                setCustomInput('');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-sm scale-105'
                  : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200/80 hover:border-stone-300'
              }`}
            >
              &ldquo;{preset.human}&rdquo;
            </button>
          );
        })}
      </div>

      {/* Main Open Workspace: Paper Canvas */}
      <div className="relative rounded-3xl bg-white/80 border border-stone-200/90 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.05)] p-6 sm:p-10 backdrop-blur-md">
        
        {/* Subtle Paper Grid Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-stone-100 pb-8">
          
          {/* Left: What I Want To Say (Input) */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider uppercase text-stone-400">
                WHAT I WANT TO SAY [RAW HUMAN THOUGHT]
              </span>
              <EmojiTextToEmojiIcon className="w-4 h-4 text-amber-500" />
            </div>
            
            <input
              type="text"
              value={customInput || activePreset.human}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type any sentence or thought..."
              className="w-full text-xl sm:text-2xl font-serif text-stone-900 bg-transparent border-b-2 border-dashed border-stone-300 focus:border-stone-800 focus:outline-none py-2 transition-colors"
            />
            
            <p className="text-[11px] text-stone-400 font-mono">
              Click to edit or type your own real-time thought above
            </p>
          </div>

          {/* Center Connector: Arrow Transition */}
          <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shadow-sm animate-pulse">
              <EmojiTranslateIcon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-stone-400 mt-1 uppercase tracking-widest">
              SEMANTIC MORPH
            </span>
          </div>

          {/* Right: Emoji Translation Output */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider uppercase text-amber-700 font-semibold">
                EMOJI TRANSLATION [TRANSCENDENT]
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-800 font-mono">
                {activePreset.sentiment}
              </span>
            </div>

            {/* Rendered Emoji Sequence */}
            <div className="min-h-[64px] flex items-center p-3 rounded-2xl bg-[#faf8f5] border border-stone-200/60 shadow-inner">
              <span
                key={currentOutput}
                className="text-3xl sm:text-4xl lg:text-5xl filter drop-shadow-sm tracking-widest animate-emoji-pop select-all"
              >
                {currentOutput}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1">
              <span>Dopamine Saturation: {activePreset.dopamine}%</span>
              <span>Level: {INTENSITY_NAMES[intensityLevel]}</span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar With Custom Icon Language */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          
          {/* Left Actions: "Make it worse" / Intensify button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleMakeItWorse}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300/60 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95"
            >
              <EmojiGenerateIcon className="w-4 h-4 text-amber-600" />
              <span>Make it worse (Intensify)</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[10px] font-mono">
                lvl {intensityLevel + 1}
              </span>
            </button>

            <button
              onClick={handleRandomize}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs sm:text-sm font-medium transition-all"
            >
              <EmojiRandomIcon className="w-3.5 h-3.5 text-stone-500" />
              <span>Randomize</span>
            </button>
          </div>

          {/* Right Actions: Copy with custom double-speech-bubble icon */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs sm:text-sm font-medium shadow-sm active:scale-95 transition-all"
            >
              <EmojiCopyIcon className="w-4 h-4 text-amber-300" />
              <span>{copied ? 'Copied to clipboard!' : 'Copy Glyphs'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
