import React from 'react';
import { EmojiArrowIcon } from './CustomIcons';
import { soundService } from '../../services/soundService';

interface VisualDictionarySectionProps {
  onNavigate?: (route: string) => void;
}

export const VisualDictionarySection: React.FC<VisualDictionarySectionProps> = ({ onNavigate }) => {
  const handleClick = () => {
    soundService.playAccept();
    if (onNavigate) {
      onNavigate('encyclopedia');
    }
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 select-none">
      
      {/* Centered Minimalist Icon & Tagline Showcase */}
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="The Living Dictionary — A catalogue of symbols redefining human emotional precision."
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
        className="group relative cursor-pointer p-8 sm:p-12 rounded-3xl bg-white/70 hover:bg-white border border-stone-200/80 hover:border-stone-400 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-stone-400"
      >
        {/* Subtle Monospace Annotation */}
        <div className="flex items-center space-x-2 text-stone-400 text-xs font-mono tracking-wider uppercase mb-5">
          <span>[SECTION 02]</span>
          <span>•</span>
          <span>PHONETIC LEXICON</span>
        </div>

        {/* The Icon */}
        <div className="relative mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-4xl sm:text-5xl shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:border-amber-300 transition-all duration-300">
            📖
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs shadow-xs group-hover:scale-110 transition-transform">
            ✨
          </span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 mb-3 group-hover:text-amber-900 transition-colors">
          The Living <span className="italic font-normal text-stone-600">Dictionary</span>
        </h2>

        {/* Tagline */}
        <p className="text-stone-500 font-serif italic text-base sm:text-xl max-w-lg leading-relaxed">
          A catalogue of symbols redefining human emotional precision.
        </p>

        {/* Minimal Tactile Action Cue */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center space-x-2 text-xs font-mono text-stone-400 group-hover:text-stone-800 transition-colors">
          <span>Explore Full Lexicon</span>
          <EmojiArrowIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

    </section>
  );
};
