import React, { forwardRef } from 'react';

interface AmbientGradientProps {
  intensity: number; // 0 to 1 proximity factor
}

export const AmbientGradient = forwardRef<HTMLDivElement, AmbientGradientProps>(({ intensity }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Primary Warm/Magenta Ambient Glow Layer (Strongest Movement) */}
      <div
        id="gradient-layer-1"
        className="absolute w-[600px] sm:w-[850px] h-[380px] sm:h-[480px] rounded-full blur-[110px] sm:blur-[150px] transition-opacity duration-500 ease-out"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(236,72,153,0.28) 0%, rgba(168,85,247,0.22) 45%, rgba(59,130,246,0.08) 75%, transparent 100%)',
          opacity: 0.65 + intensity * 0.35,
          transform: 'translate3d(0, -30px, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Secondary Cool/Cyan Glow Layer (Counter Parallax for 3D Depth) */}
      <div
        id="gradient-layer-2"
        className="absolute w-[500px] sm:w-[700px] h-[320px] sm:h-[420px] rounded-full blur-[90px] sm:blur-[130px] transition-opacity duration-500 ease-out"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.25) 0%, rgba(99,102,241,0.20) 50%, transparent 80%)',
          opacity: 0.55 + intensity * 0.3,
          transform: 'translate3d(0, 40px, 0)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Tertiary Mascot Core Glow (Magnetic proximity aura) */}
      <div
        id="gradient-layer-3"
        className="absolute w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full blur-[70px] sm:blur-[95px] transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle at center, rgba(244,114,182,0.35) 0%, rgba(192,132,252,0.25) 40%, rgba(34,211,238,0.12) 70%, transparent 100%)',
          opacity: 0.5 + intensity * 0.5,
          transform: `scale(${1 + intensity * 0.15})`,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
});

AmbientGradient.displayName = 'AmbientGradient';
