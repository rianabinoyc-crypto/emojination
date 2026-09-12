import React, { useRef } from 'react';
import { SoftAtmosphere } from './SoftAtmosphere';
import { HeroLivingEmoji } from './HeroLivingEmoji';
import { LanguageMorphSection } from './LanguageMorphSection';
import { VisualDictionarySection } from './VisualDictionarySection';
import { EcosystemAtlasSection } from './EcosystemAtlasSection';
import {
  EmojiEmotionIcon,
  EmojiTranslateIcon,
  EmojiSparkleIcon,
  EmojiArrowIcon,
} from './CustomIcons';
import { soundService } from '../../services/soundService';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const languageSectionRef = useRef<HTMLDivElement>(null);
  const dictionarySectionRef = useRef<HTMLDivElement>(null);
  const ecosystemSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    soundService.playReaction();
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLaunchApp = () => {
    soundService.playAccept();
    onNavigate('dating');
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fdfbf7] text-stone-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-amber-200 selection:text-stone-900 overflow-x-hidden">
      
      {/* 1. Light Atmospheric Color Foundation */}
      <SoftAtmosphere />

      {/* 2. Minimalist Floating Navigation */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 pt-4 pb-2 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-white/75 border border-stone-200/70 shadow-sm backdrop-blur-md pointer-events-auto transition-all">
          
          {/* Brand Identity / Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
          >
            <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 group-hover:rotate-12 transition-transform">
              <EmojiEmotionIcon className="w-4 h-4" />
            </div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-900">
              Emoji<span className="text-amber-600 font-normal italic">-Nation</span>
            </span>
          </div>

          {/* Minimal Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-stone-500">
            <button
              onClick={() => scrollToSection(languageSectionRef)}
              className="hover:text-stone-900 transition-colors"
            >
              Language
            </button>
            <button
              onClick={() => scrollToSection(dictionarySectionRef)}
              className="hover:text-stone-900 transition-colors"
            >
              Dictionary
            </button>
            <button
              onClick={() => scrollToSection(ecosystemSectionRef)}
              className="hover:text-stone-900 transition-colors"
            >
              Atlas
            </button>
          </nav>

          {/* Minimal Tactile Launch Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLaunchApp}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-stone-900 text-stone-50 text-xs font-medium hover:bg-stone-800 shadow-sm active:scale-95 transition-all"
            >
              <span>Launch App</span>
              <EmojiArrowIcon className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Main Composition Stream */}
      <main className="relative z-10 w-full">
        
        {/* Asymmetric Living Hero Section */}
        <HeroLivingEmoji
          onTranslateClick={() => scrollToSection(languageSectionRef)}
          onExploreClick={() => scrollToSection(languageSectionRef)}
        />

        {/* Section Divider Line with Annotation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 my-4 flex items-center justify-between text-stone-300 text-[10px] font-mono">
          <span>// TRANSLATION PROTOCOL & MORPH ENGINE</span>
          <div className="flex-1 mx-4 border-b border-stone-200/70" />
          <span>✦ 01</span>
        </div>

        {/* Interactive Transformation Engine Section */}
        <div ref={languageSectionRef}>
          <LanguageMorphSection />
        </div>

        {/* Section Divider Line with Annotation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 my-4 flex items-center justify-between text-stone-300 text-[10px] font-mono">
          <span>// PHONETIC LEXICON & EXPERIMENTAL DICTIONARY</span>
          <div className="flex-1 mx-4 border-b border-stone-200/70" />
          <span>✦ 02</span>
        </div>

        {/* Experimental Visual Dictionary Section */}
        <div ref={dictionarySectionRef}>
          <VisualDictionarySection />
        </div>

        {/* Section Divider Line with Annotation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 my-4 flex items-center justify-between text-stone-300 text-[10px] font-mono">
          <span>// APPLICATION DIRECTORY</span>
          <div className="flex-1 mx-4 border-b border-stone-200/70" />
          <span>✦ 03</span>
        </div>

        {/* Application Directory */}
        <div ref={ecosystemSectionRef}>
          <EcosystemAtlasSection onNavigate={onNavigate} />
        </div>

      </main>

      {/* 4. Editorial Colophon / Clean Minimal Footer */}
      <footer className="relative z-10 w-full border-t border-stone-200/80 bg-white/40 backdrop-blur-sm mt-16 sm:mt-24 py-12 px-4 sm:px-8 select-none">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-stone-500">
          <div className="space-y-1">
            <p className="font-serif text-sm font-semibold text-stone-900">
              Emoji-Nation™ — An Experimental Visual Language Playground
            </p>
            <p className="font-light text-stone-500">
              Conceived for humans who prefer expressive resonance over verbose rhetoric.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] text-stone-400">
            <span>WORDS → FEELINGS → EMOJI</span>
            <span>•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-stone-700 hover:text-stone-900 underline underline-offset-4"
            >
              Top ↑
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};
