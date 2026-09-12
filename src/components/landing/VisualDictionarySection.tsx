import React, { useState } from 'react';
import { EmojiExploreIcon, EmojiEmotionIcon, EmojiSparkleIcon } from './CustomIcons';
import { soundService } from '../../services/soundService';

interface DictionaryEntry {
  glyph: string;
  phonetic: string;
  definition: string;
  category: string;
  context: string;
  resonanceScore: number;
}

const DICTIONARY_ENTRIES: DictionaryEntry[] = [
  {
    glyph: '💀',
    phonetic: '/dɛd/',
    definition: 'I have no words. Language has officially concluded.',
    category: 'Hyperbolic Demise',
    context: 'Exhaustion of vocabulary triggered by excessive irony or shock.',
    resonanceScore: 99,
  },
  {
    glyph: '👀',
    phonetic: '/lʊk/',
    definition: 'I am observing silently. Please continue the chaos.',
    category: 'Silent Surveillance',
    context: 'Appears uninvited during high-stakes conversational drama.',
    resonanceScore: 94,
  },
  {
    glyph: '🫠',
    phonetic: '/mɛlt/',
    definition: 'Everything is dissolving, yet I choose to smile politely.',
    category: 'Quiet Collapse',
    context: 'When reality becomes liquid and deadlines become abstract poetry.',
    resonanceScore: 98,
  },
  {
    glyph: '✨',
    phonetic: '/spɑːk/',
    definition: 'This possesses completely unearned cosmic significance.',
    category: 'Aesthetic Validation',
    context: 'Sprinkled indiscriminately to convert mundane text into luxury.',
    resonanceScore: 89,
  },
  {
    glyph: '🥹',
    phonetic: '/wep/',
    definition: 'My emotional container is currently compromised.',
    category: 'Vulnerable Softness',
    context: 'Pure overwhelm in response to unexpected beauty or tenderness.',
    resonanceScore: 93,
  },
  {
    glyph: '🤡',
    phonetic: '/klaʊn/',
    definition: 'I have willingly orchestrated my own public downfall.',
    category: 'Tragic Self-Awareness',
    context: 'The exact moment you realize you believed your own excuses.',
    resonanceScore: 96,
  },
  {
    glyph: '🫡',
    phonetic: '/səˈluːt/',
    definition: 'Understood. The request is impossible, executing anyway.',
    category: 'Resigned Compliance',
    context: 'Sent to superiors when the ship is undeniably sinking.',
    resonanceScore: 97,
  },
  {
    glyph: '🗿',
    phonetic: '/stəʊn/',
    definition: 'Total, unwavering refusal to acknowledge your absurdity.',
    category: 'Monumental Inertia',
    context: 'Stone-faced defiance against unnecessary conversational energy.',
    resonanceScore: 91,
  },
];

export const VisualDictionarySection: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(DICTIONARY_ENTRIES[0]);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 select-none">
      
      {/* Section Header: Minimalist Editorial Lexicon */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-stone-200/80 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-stone-400 text-xs font-mono tracking-wider uppercase mb-2">
            <span>[SECTION 03]</span>
            <span>•</span>
            <span>EXPERIMENTAL LEXICON</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900">
            The Living <span className="italic font-normal text-stone-600">Dictionary</span>
          </h2>
        </div>
        <p className="text-stone-500 font-serif italic text-sm sm:text-base max-w-md">
          A catalogue of symbols redefining human emotional precision. Tap any glyph to inspect its semantic frequency.
        </p>
      </div>

      {/* Floating Editorial Entries Layout (No generic cards; pure whitespace, thin rules & typography) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {DICTIONARY_ENTRIES.map((entry, idx) => {
          const isSelected = selectedEntry?.glyph === entry.glyph;
          return (
            <div
              key={entry.glyph}
              onClick={() => {
                soundService.playReaction();
                setSelectedEntry(entry);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedEntry(entry)}
              className="group relative cursor-pointer pt-4 border-t border-stone-200/80 hover:border-stone-800 transition-colors duration-300 focus:outline-none"
            >
              {/* Micro-Index and Category Label */}
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-4">
                <span>[NO. 0{idx + 1}]</span>
                <span className="text-stone-500 group-hover:text-stone-800 transition-colors uppercase tracking-wider">
                  {entry.category}
                </span>
              </div>

              {/* Large Glyph and Phonetic Accent */}
              <div className="flex items-baseline space-x-4 mb-3">
                <span className="text-4xl sm:text-5xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300 inline-block">
                  {entry.glyph}
                </span>
                <span className="font-mono text-xs text-stone-400 italic">
                  {entry.phonetic}
                </span>
              </div>

              {/* Primary Definition */}
              <p className="text-base sm:text-lg font-serif text-stone-900 leading-snug group-hover:text-amber-900 transition-colors">
                &ldquo;{entry.definition}&rdquo;
              </p>

              {/* Usage Context */}
              <p className="text-xs text-stone-500 font-light mt-2 leading-relaxed">
                {entry.context}
              </p>

              {/* Subtle Resonance Gauge Line */}
              <div className="mt-4 pt-2 flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span>Resonance</span>
                <span className="font-semibold text-stone-700">{entry.resonanceScore}%</span>
              </div>
              <div className="w-full h-[1.5px] bg-stone-100 mt-1 overflow-hidden">
                <div
                  className="h-full bg-stone-400 group-hover:bg-amber-500 transition-all duration-500"
                  style={{ width: `${entry.resonanceScore}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
