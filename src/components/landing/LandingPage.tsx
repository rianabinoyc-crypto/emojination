import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { AmbientGradient } from './AmbientGradient';
import { EmojiMascot } from './EmojiMascot';
import { FeatureCard, FeatureItem } from './FeatureCard';
import { CursorTrail } from './CursorTrail';
import { soundService } from '../../services/soundService';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

const ECOSYSTEM_FEATURES: FeatureItem[] = [
  {
    id: 'dating',
    emoji: '💘',
    title: 'Emoji Dating',
    category: 'Romance',
    description: 'Discover your emoji soulmate through reciprocal chemistry matching.',
    accentGradient: 'from-pink-500 via-rose-500 to-red-500',
    iconBg: 'bg-gradient-to-br from-pink-500/20 to-rose-600/10',
    borderColor: 'border-pink-500/30 group-hover:border-pink-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.35)]',
    textColor: 'text-pink-400 group-hover:text-pink-300',
    depthFactor: 1.8,
  },
  {
    id: 'chat',
    emoji: '💬',
    title: 'Emoji Chat',
    category: 'Communication',
    description: 'Full simulated AI messaging with 20+ moods and dynamic reactions.',
    accentGradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    iconBg: 'bg-gradient-to-br from-cyan-500/20 to-blue-600/10',
    borderColor: 'border-cyan-500/30 group-hover:border-cyan-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.35)]',
    textColor: 'text-cyan-400 group-hover:text-cyan-300',
    depthFactor: 2.2,
  },
  {
    id: 'health',
    emoji: '❤️',
    title: 'Emoji Health',
    category: 'Vitals & Fitness',
    description: 'Monitor emotional vitals, fictional workouts, sleep, and hydration.',
    accentGradient: 'from-rose-500 via-pink-500 to-emerald-500',
    iconBg: 'bg-gradient-to-br from-rose-500/20 to-red-600/10',
    borderColor: 'border-rose-500/30 group-hover:border-rose-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.35)]',
    textColor: 'text-rose-400 group-hover:text-rose-300',
    depthFactor: 1.5,
  },
  {
    id: 'personalities',
    emoji: '🧠',
    title: 'Personalities',
    category: '50+ Archetypes',
    description: 'Browse the 50+ emoji directory and craft your own custom characters.',
    accentGradient: 'from-purple-500 via-indigo-500 to-violet-500',
    iconBg: 'bg-gradient-to-br from-purple-500/20 to-violet-600/10',
    borderColor: 'border-purple-500/30 group-hover:border-purple-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.35)]',
    textColor: 'text-purple-400 group-hover:text-purple-300',
    depthFactor: 2.4,
  },
  {
    id: 'encyclopedia',
    emoji: '📖',
    title: 'Encyclopedia',
    category: 'Knowledge Base',
    description: 'Explore deep Unicode lore, etymology, meanings, and fun trivia.',
    accentGradient: 'from-indigo-500 via-sky-500 to-blue-500',
    iconBg: 'bg-gradient-to-br from-indigo-500/20 to-sky-600/10',
    borderColor: 'border-indigo-500/30 group-hover:border-indigo-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.35)]',
    textColor: 'text-indigo-400 group-hover:text-indigo-300',
    depthFactor: 1.6,
  },
  {
    id: 'tools',
    emoji: '🎨',
    title: 'Emoji Tools',
    category: 'Creative Suite',
    description: 'Translate text, mix emoji recipes, read horoscopes, and cipher messages.',
    accentGradient: 'from-amber-500 via-yellow-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-amber-500/20 to-orange-600/10',
    borderColor: 'border-amber-500/30 group-hover:border-amber-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.35)]',
    textColor: 'text-amber-400 group-hover:text-amber-300',
    depthFactor: 2.1,
  },
  {
    id: 'analytics',
    emoji: '📊',
    title: 'Emoji Analytics',
    category: 'Data & Metrics',
    description: 'Inspect overengineered relationship stats, dopamine levels, and footprint.',
    accentGradient: 'from-teal-500 via-emerald-500 to-cyan-500',
    iconBg: 'bg-gradient-to-br from-teal-500/20 to-cyan-600/10',
    borderColor: 'border-teal-500/30 group-hover:border-teal-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.35)]',
    textColor: 'text-teal-400 group-hover:text-teal-300',
    depthFactor: 1.7,
  },
  {
    id: 'achievements',
    emoji: '🏆',
    title: 'Achievements',
    category: 'Gamification',
    description: 'Level up your emoji karma, earn 20+ trophies, and claim daily quests.',
    accentGradient: 'from-yellow-400 via-amber-500 to-orange-500',
    iconBg: 'bg-gradient-to-br from-yellow-500/20 to-amber-600/10',
    borderColor: 'border-yellow-500/30 group-hover:border-yellow-500/60',
    glowShadow: 'hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.35)]',
    textColor: 'text-yellow-400 group-hover:text-yellow-300',
    depthFactor: 2.3,
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [magneticProximity, setMagneticProximity] = useState<number>(0);

  // References for high-performance DOM transform updates (zero React re-renders on mousemove)
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Physics animation state
  const mouseRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    targetProximity: 0,
    currentProximity: 0,
    isHovering: false,
    hasTouch: false,
    isReducedMotion: false,
  });

  // Setup device and accessibility detection
  useEffect(() => {
    mouseRef.current.hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mouseRef.current.isReducedMotion = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      mouseRef.current.isReducedMotion = e.matches;
    };
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  // Animation Frame Loop for smooth physics and lerp interpolation
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      const state = mouseRef.current;

      if (!state.isReducedMotion && !state.hasTouch) {
        // Smooth lerp damping
        const lerpFactor = 0.085;
        state.currentX += (state.targetX - state.currentX) * lerpFactor;
        state.currentY += (state.targetY - state.currentY) * lerpFactor;
        state.currentProximity += (state.targetProximity - state.currentProximity) * 0.1;

        // Idle organic float sine wave
        const now = performance.now();
        const idleFloatY = Math.sin(now * 0.0016) * 7;
        const idleFloatRotate = Math.cos(now * 0.0012) * 1.5;

        // 1. Update Mascot Transform
        if (mascotRef.current) {
          const mascotX = state.currentX * 24;
          const mascotY = state.currentY * 20 + idleFloatY;
          const mascotRotate = state.currentX * 8 + idleFloatRotate;
          const mascotScale = 1.0 + state.currentProximity * 0.06;

          mascotRef.current.style.transform = `translate3d(${mascotX.toFixed(2)}px, ${mascotY.toFixed(2)}px, 0) rotate(${mascotRotate.toFixed(2)}deg) scale(${mascotScale.toFixed(3)})`;
        }

        // 2. Update Gradient Layers (Parallax hierarchy)
        if (gradientRef.current) {
          const layer1 = gradientRef.current.querySelector('#gradient-layer-1') as HTMLElement | null;
          const layer2 = gradientRef.current.querySelector('#gradient-layer-2') as HTMLElement | null;
          const layer3 = gradientRef.current.querySelector('#gradient-layer-3') as HTMLElement | null;

          if (layer1) {
            // Layer 1: Strongest responsive movement
            const l1X = state.currentX * 48;
            const l1Y = state.currentY * 38 - 30;
            layer1.style.transform = `translate3d(${l1X.toFixed(2)}px, ${l1Y.toFixed(2)}px, 0)`;
          }

          if (layer2) {
            // Layer 2: Counter parallax for 3D depth
            const l2X = state.currentX * -32;
            const l2Y = state.currentY * -24 + 40;
            layer2.style.transform = `translate3d(${l2X.toFixed(2)}px, ${l2Y.toFixed(2)}px, 0)`;
          }

          if (layer3) {
            // Layer 3: Core mascot aura
            const l3X = state.currentX * 18;
            const l3Y = state.currentY * 16;
            const l3Scale = 1 + state.currentProximity * 0.18;
            layer3.style.transform = `translate3d(${l3X.toFixed(2)}px, ${l3Y.toFixed(2)}px, 0) scale(${l3Scale.toFixed(3)})`;
          }
        }

        // 3. Update Feature Cards Subtle Parallax
        ECOSYSTEM_FEATURES.forEach(feat => {
          const cardEl = cardRefs.current[feat.id];
          if (cardEl && cardEl !== document.activeElement) {
            const cardX = state.currentX * feat.depthFactor;
            const cardY = state.currentY * feat.depthFactor;
            // Only apply small transform offset when not actively hovered
            if (cardEl.dataset.hovered !== 'true') {
              cardEl.style.transform = `translate3d(${cardX.toFixed(2)}px, ${cardY.toFixed(2)}px, 0)`;
            }
          }
        });
      } else {
        // Mobile / Touch / Reduced Motion: Fallback smooth idle float
        if (mascotRef.current) {
          const idleFloatY = Math.sin(performance.now() * 0.0016) * 6;
          mascotRef.current.style.transform = `translate3d(0, ${idleFloatY.toFixed(2)}px, 0)`;
        }
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Handle Mouse Movement across Hero Container
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseRef.current.hasTouch || mouseRef.current.isReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.35; // Center slightly higher around mascot

    // Normalized coordinates (-1 to 1)
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

    // Distance to mascot center (0 = on top, 1 = distant)
    const dist = Math.sqrt(normX * normX + normY * normY);
    const proximity = Math.max(0, 1 - Math.min(dist / 0.85, 1));

    mouseRef.current.targetX = normX;
    mouseRef.current.targetY = normY;
    mouseRef.current.targetProximity = proximity;
    mouseRef.current.isHovering = true;

    // Throttle state update for magnetic proximity intensity if changed significantly
    if (Math.abs(proximity - magneticProximity) > 0.15) {
      setMagneticProximity(proximity);
    }
  }, [magneticProximity]);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
    mouseRef.current.targetProximity = 0;
    mouseRef.current.isHovering = false;
    setMagneticProximity(0);
  }, []);

  const handleFeatureHover = useCallback((id: string | null) => {
    setHoveredCardId(id);
    if (id) {
      const cardEl = cardRefs.current[id];
      if (cardEl) cardEl.dataset.hovered = 'true';
    } else {
      Object.values(cardRefs.current).forEach(el => {
        if (el) el.dataset.hovered = 'false';
      });
    }
  }, []);

  const handleNavigateWithSound = (route: string) => {
    soundService.playAccept();
    onNavigate(route);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-hidden bg-slate-950 text-slate-100 selection:bg-pink-500 selection:text-white"
    >
      {/* 1. Blurred Ambient Light Gradient (3 layers, cursor-reactive) */}
      <AmbientGradient ref={gradientRef} intensity={magneticProximity} />

      {/* 2. Cursor Trail Sparkles (Disabled on touch / reduced motion) */}
      <CursorTrail
        containerRef={containerRef}
        enabled={!mouseRef.current.hasTouch && !mouseRef.current.isReducedMotion}
      />

      {/* 3. Subtle Futuristic Background Ambient Grid & Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 75%)',
          }}
        />
      </div>

      {/* 4. Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-6xl w-full my-auto py-4 sm:py-6 text-center">
        
        {/* Brand Header */}
        <header className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          {/* Main Title: EMOJINATION™ with subtle animated gradient */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none drop-shadow-sm">
            <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              EMOJINATION
            </span>
            <span className="text-2xl sm:text-4xl text-pink-500 ml-1 font-bold inline-block">™</span>
          </h1>

          {/* Concise Tagline */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow">
            Everything Emoji. One Place.
          </div>

          {/* Supporting Micro-line */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium tracking-wide flex items-center justify-center space-x-2">
            <span>Chat</span>
            <span className="text-pink-500">•</span>
            <span>Date</span>
            <span className="text-purple-400">•</span>
            <span>Track</span>
            <span className="text-cyan-400">•</span>
            <span>Learn</span>
            <span className="text-indigo-400">•</span>
            <span>Create</span>
            <span className="text-amber-400">•</span>
            <span>Explore</span>
          </p>
        </header>

        {/* 5. Central Living Emoji Mascot (😎 reacts to cursor & card hover) */}
        <EmojiMascot
          ref={mascotRef}
          activeFeatureId={hoveredCardId}
          proximity={magneticProximity}
          onClick={() => {
            // Mascot click triggers playful interaction
          }}
        />

        {/* 6. Modern Fluid Feature Icons (8 Destinations) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mt-6 sm:mt-8 w-full max-w-5xl px-1 sm:px-2">
          {ECOSYSTEM_FEATURES.map((feat) => (
            <FeatureCard
              key={feat.id}
              ref={(el) => (cardRefs.current[feat.id] = el)}
              feature={feat}
              isHovered={hoveredCardId === feat.id}
              onHover={handleFeatureHover}
              onClick={handleNavigateWithSound}
            />
          ))}
        </div>

        {/* 7. Central "ENTER EMOJINATION" CTA */}
        <div className="mt-8 sm:mt-10">
          <button
            onClick={() => handleNavigateWithSound('dating')}
            aria-label="Enter Emojination Ecosystem"
            className="relative group px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-extrabold text-xs sm:text-sm tracking-widest uppercase text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/20 focus:outline-none focus:ring-4 focus:ring-pink-500/40"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white/90" style={{ animationDuration: '8s' }} />
              <span>ENTER EMOJINATION ECOSYSTEM</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </button>
        </div>

      </main>

      {/* 8. Clean, Non-Promotional Futuristic Footer */}
      <footer className="relative z-10 w-full max-w-5xl pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 text-center sm:text-left select-none">
        <p className="text-slate-400 font-medium">
          EMOJINATION™ — Everything Emoji. One Place.
        </p>
        <p className="text-slate-500 flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-pink-500" />
          <span>Futuristic Interactive Emoji Universe</span>
        </p>
      </footer>
    </div>
  );
};
