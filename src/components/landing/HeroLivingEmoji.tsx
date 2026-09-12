import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  EmojiTranslateIcon,
  EmojiEmotionIcon,
  EmojiExploreIcon,
  EmojiSparkleIcon,
  EmojiArrowIcon,
} from './CustomIcons';
import { soundService } from '../../services/soundService';

interface HeroLivingEmojiProps {
  onTranslateClick: () => void;
  onExploreClick: () => void;
}

interface Fragment {
  id: string;
  phrase: string;
  emoji: string;
  subtext: string;
  position: string;
  delay: string;
}

const COMMUNICATION_FRAGMENTS: Fragment[] = [
  {
    id: 'f1',
    phrase: '"hello"',
    emoji: '👋',
    subtext: 'frictionless greeting',
    position: 'top-[8%] left-[2%] sm:left-[6%]',
    delay: '0s',
  },
  {
    id: 'f2',
    phrase: '"hmm..."',
    emoji: '🤔',
    subtext: 'unspoken doubt',
    position: 'top-[36%] -left-[3%] sm:left-[1%]',
    delay: '1.2s',
  },
  {
    id: 'f3',
    phrase: '"really?"',
    emoji: '🤨',
    subtext: 'polite skepticism',
    position: 'top-[68%] left-[8%] sm:left-[12%]',
    delay: '2.4s',
  },
  {
    id: 'f4',
    phrase: '"no way"',
    emoji: '💀',
    subtext: 'hyperbolic demise',
    position: 'top-[14%] right-[4%] sm:right-[10%]',
    delay: '0.8s',
  },
  {
    id: 'f5',
    phrase: '"exhausted"',
    emoji: '😮‍💨 ☕ 🫠',
    subtext: 'biological collapse',
    position: 'bottom-[6%] right-[2%] sm:right-[8%]',
    delay: '1.8s',
  },
];

export const HeroLivingEmoji: React.FC<HeroLivingEmojiProps> = ({
  onTranslateClick,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const [activeMood, setActiveMood] = useState<'laugh' | 'love' | 'cool' | 'melt' | 'awe'>('laugh');
  const [clicked, setClicked] = useState(false);

  // Mouse physics tracking (inertial damping)
  const mouseState = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    isHovering: false,
    hasTouch: false,
    isReducedMotion: false,
  });

  useEffect(() => {
    mouseState.current.hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    mouseState.current.isReducedMotion = media.matches;

    let animId: number;

    const loop = () => {
      const state = mouseState.current;
      if (!state.isReducedMotion && !state.hasTouch) {
        const lerp = 0.075;
        state.currentX += (state.targetX - state.currentX) * lerp;
        state.currentY += (state.targetY - state.currentY) * lerp;

        const now = performance.now();
        const idleFloatY = Math.sin(now * 0.0018) * 6;
        const idleWobble = Math.cos(now * 0.0014) * 1.5;

        if (mascotRef.current) {
          const transX = state.currentX * 20;
          const transY = state.currentY * 18 + idleFloatY;
          const rotate = state.currentX * 6 + idleWobble;
          mascotRef.current.style.transform = `translate3d(${transX.toFixed(2)}px, ${transY.toFixed(2)}px, 0) rotate(${rotate.toFixed(2)}deg)`;
        }
      } else if (mascotRef.current) {
        const idleFloatY = Math.sin(performance.now() * 0.0018) * 5;
        mascotRef.current.style.transform = `translate3d(0, ${idleFloatY.toFixed(2)}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseState.current.hasTouch || mouseState.current.isReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width * 0.65;
    const centerY = rect.top + rect.height * 0.45;

    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width * 0.5)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height * 0.5)));

    mouseState.current.targetX = normX;
    mouseState.current.targetY = normY;
    mouseState.current.isHovering = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseState.current.targetX = 0;
    mouseState.current.targetY = 0;
    mouseState.current.isHovering = false;
  }, []);

  const handleMascotClick = () => {
    soundService.playReaction();
    setClicked(true);
    setTimeout(() => setClicked(false), 500);

    // Cycle expressions playfully
    const moods: Array<'laugh' | 'love' | 'cool' | 'melt' | 'awe'> = ['laugh', 'love', 'cool', 'melt', 'awe'];
    const next = moods[(moods.indexOf(activeMood) + 1) % moods.length];
    setActiveMood(next);
  };

  const MOOD_EMOJIS = {
    laugh: '😂',
    love: '🥰',
    cool: '😎',
    melt: '🫠',
    awe: '🥹',
  };

  const MOOD_LABELS = {
    laugh: 'Pure Euphoria',
    love: 'Tender Resonance',
    cool: 'Unbothered Zen',
    melt: 'Gentle Collapse',
    awe: 'Emotional Overwhelm',
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-24 pb-20 sm:pb-28 select-none"
    >
      {/* Editorial Category Metadata & Coordinates */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-stone-500 text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-8 sm:mb-12 border-b border-stone-200/70 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse" />
          <span className="text-stone-700 font-semibold">FIG 01. — THE NEW PHONETICS</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-400 hidden sm:inline">A VISUAL LANGUAGE EXPERIMENT</span>
        </div>
        <div className="flex items-center space-x-3 text-stone-400">
          <span>[UNICODE 16.0]</span>
          <span>•</span>
          <span>3,782 EXPRESSIVE GLYPHS</span>
        </div>
      </div>

      {/* Asymmetric Composition Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        
        {/* Left Column: Expressive Editorial Typography & Tactile Controls */}
        <div className="lg:col-span-7 z-10 space-y-6 sm:space-y-8">
          
          {/* Micro-label pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 border border-stone-200/90 shadow-sm backdrop-blur-sm text-xs font-medium text-stone-700">
            <EmojiEmotionIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>Beyond alphabetical constraints</span>
            <span className="text-amber-500 font-serif italic text-sm">✦</span>
          </div>

          {/* Master Headline: Editorial Serif Interplay */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif tracking-tight text-stone-900 leading-[1.05]">
              Say <span className="italic font-normal text-stone-600">more.</span>
              <br />
              Use <span className="font-sans font-extrabold tracking-tighter text-stone-900 underline decoration-amber-300/60 decoration-wavy decoration-2">less.</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-stone-600 max-w-xl pt-2 leading-relaxed">
              Where sentences dissolve into emotional resonance. Discover the playful grammar of feelings.
            </p>
          </div>

          {/* Understated Tactile Controls */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 pt-2">
            {/* Primary Action Button */}
            <button
              onClick={onTranslateClick}
              className="group relative inline-flex items-center space-x-2.5 px-6 sm:px-7 py-3.5 rounded-2xl bg-stone-900 text-stone-50 text-sm sm:text-base font-medium shadow-md shadow-stone-900/10 hover:bg-stone-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <EmojiTranslateIcon className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span>Translate something</span>
              <EmojiArrowIcon className="w-4 h-4 text-stone-400 group-hover:text-stone-100 group-hover:translate-x-1 transition-all" />
            </button>

            {/* Secondary Tactile Explorer Button */}
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center space-x-2 px-5 sm:px-6 py-3.5 rounded-2xl bg-white/70 hover:bg-white border border-stone-200/80 text-stone-700 text-sm sm:text-base font-medium hover:border-stone-300 shadow-sm hover:shadow transition-all duration-200"
            >
              <EmojiExploreIcon className="w-4 h-4 text-stone-500 group-hover:text-stone-900 transition-colors" />
              <span>Explore the language</span>
            </button>
          </div>

          {/* Minimalist Stat Ribbon */}
          <div className="pt-4 flex items-center space-x-6 text-xs text-stone-500">
            <div className="flex items-center space-x-1.5">
              <span className="font-mono font-semibold text-stone-800">100%</span>
              <span>non-verbal</span>
            </div>
            <span className="text-stone-300">/</span>
            <div className="flex items-center space-x-1.5">
              <span className="font-mono font-semibold text-stone-800">0</span>
              <span>empty corporate jargon</span>
            </div>
          </div>
        </div>

        {/* Right Column: Unexpected Living Emoji Anchor & Communicative Satellites */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] my-6 lg:my-0">
          
          {/* Subtle Paper Ambient Glow Base */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-200/30 via-rose-200/25 to-purple-200/20 blur-3xl pointer-events-none" />

          {/* Floating Communication Fragments Connected to Center */}
          <div className="absolute inset-0 pointer-events-none">
            {COMMUNICATION_FRAGMENTS.map((frag) => (
              <div
                key={frag.id}
                className={`absolute ${frag.position} flex flex-col items-center group pointer-events-auto cursor-pointer animate-atmosphere-float`}
                style={{
                  animationDuration: '16s',
                  animationDelay: frag.delay,
                }}
                onClick={() => {
                  soundService.playReaction();
                }}
              >
                {/* Visual Transformation Capsule */}
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-stone-200/90 shadow-sm backdrop-blur-sm hover:border-amber-300 hover:shadow-md hover:scale-105 transition-all duration-200">
                  <span className="text-xs font-serif italic text-stone-600">{frag.phrase}</span>
                  <span className="text-stone-300 text-[10px]">→</span>
                  <span className="text-sm filter drop-shadow-sm">{frag.emoji}</span>
                </div>
                {/* Tiny Annotation */}
                <span className="text-[9px] font-mono text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  {frag.subtext}
                </span>
              </div>
            ))}
          </div>

          {/* Micro Geometric Symbols & Accents Around Hero */}
          <div className="absolute top-4 left-6 text-stone-400/70 text-xs font-serif italic pointer-events-none select-none">
            “intent”
          </div>
          <div className="absolute bottom-6 left-12 text-stone-300 text-sm font-mono pointer-events-none select-none">
            ✦ [01]
          </div>
          <div className="absolute top-10 right-4 text-stone-400/60 text-xs font-mono pointer-events-none select-none">
            ↝ resonance
          </div>

          {/* Central Living Mascot Entity (Reacts to Cursor) */}
          <div
            ref={mascotRef}
            onClick={handleMascotClick}
            role="button"
            tabIndex={0}
            aria-label={`Living Emoji Anchor: ${MOOD_LABELS[activeMood]}`}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleMascotClick()}
            className="relative cursor-pointer group flex flex-col items-center justify-center p-6 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            style={{
              willChange: 'transform',
            }}
          >
            {/* Soft Paper Drop Shadow Halo */}
            <div className="absolute inset-4 rounded-full bg-amber-600/10 blur-2xl group-hover:bg-amber-600/20 transition-all duration-300" />
            
            {/* Elegant Translucent Paper Pedestal */}
            <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-white/95 via-amber-50/70 to-rose-50/50 border border-white/80 shadow-[0_24px_50px_-15px_rgba(217,119,6,0.22),0_8px_16px_-4px_rgba(0,0,0,0.04)] flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-105">
              
              {/* Surrounding Companion Emojis (Inspired by reference visual) */}
              <div className="absolute -top-3 -right-2 text-2xl sm:text-3xl filter drop-shadow animate-atmosphere-float" style={{ animationDuration: '14s' }}>
                🐶
              </div>
              <div className="absolute -bottom-2 -left-3 text-2xl sm:text-3xl filter drop-shadow animate-atmosphere-float" style={{ animationDuration: '18s', animationDelay: '-4s' }}>
                🐼
              </div>
              <div className="absolute top-6 -left-4 text-xl sm:text-2xl filter drop-shadow animate-atmosphere-float" style={{ animationDuration: '12s', animationDelay: '-8s' }}>
                ✨
              </div>
              <div className="absolute bottom-4 -right-3 text-xl sm:text-2xl filter drop-shadow animate-atmosphere-float" style={{ animationDuration: '15s', animationDelay: '-2s' }}>
                😮
              </div>

              {/* Main Center Emoji Glyph */}
              <span
                key={activeMood}
                className={`relative text-7xl sm:text-8xl md:text-9xl filter drop-shadow-[0_12px_24px_rgba(180,83,9,0.25)] transition-all duration-300 animate-emoji-pop ${
                  clicked ? 'scale-125 rotate-12' : 'group-hover:scale-110'
                }`}
              >
                {MOOD_EMOJIS[activeMood]}
              </span>
            </div>

            {/* Click Expression Indicator Pill */}
            <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/90 border border-stone-200/90 shadow-sm text-[11px] font-mono text-stone-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{MOOD_LABELS[activeMood]}</span>
              <span className="text-stone-300 text-[10px] pl-0.5">• click to shift</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
