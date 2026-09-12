import React from 'react';

export const SoftAtmosphere: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* 1. Base Warm Light Canvas */}
      <div className="absolute inset-0 bg-[#fdfbf7]" />

      {/* 2. Delicate Paper Grain & Micro-Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#1c1917 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Soft Atmospheric Radial Light Layers (Low contrast, diffuse, paper-like) */}

      {/* Layer A: Warm Pale Peach / Apricot Light (Top Left) */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full blur-[140px] opacity-70 transition-transform duration-1000 ease-out animate-atmosphere-float"
        style={{
          background: 'radial-gradient(circle, rgba(254, 215, 170, 0.42) 0%, rgba(254, 240, 138, 0.25) 50%, transparent 75%)',
          animationDuration: '24s',
        }}
      />

      {/* Layer B: Gentle Lavender & Soft Lilac Light (Top Right / Hero Backing) */}
      <div
        className="absolute top-[5%] right-[-5%] w-[50vw] h-[50vw] max-w-[750px] max-h-[750px] rounded-full blur-[150px] opacity-65 transition-transform duration-1000 ease-out animate-atmosphere-float"
        style={{
          background: 'radial-gradient(circle, rgba(233, 213, 255, 0.38) 0%, rgba(254, 205, 211, 0.22) 55%, transparent 80%)',
          animationDelay: '-6s',
          animationDuration: '28s',
        }}
      />

      {/* Layer C: Whisper Coral & Pale Rose (Mid-page) */}
      <div
        className="absolute top-[45%] left-[15%] w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full blur-[160px] opacity-55 transition-transform duration-1000 ease-out animate-atmosphere-float"
        style={{
          background: 'radial-gradient(circle, rgba(254, 205, 211, 0.32) 0%, rgba(255, 237, 213, 0.20) 60%, transparent 80%)',
          animationDelay: '-12s',
          animationDuration: '22s',
        }}
      />

      {/* Layer D: Extremely Pale Sky / Clean Cyan (Bottom Subtle Contrast) */}
      <div
        className="absolute -bottom-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-[160px] opacity-45 transition-transform duration-1000 ease-out animate-atmosphere-float"
        style={{
          background: 'radial-gradient(circle, rgba(207, 250, 254, 0.35) 0%, rgba(233, 213, 255, 0.18) 55%, transparent 75%)',
          animationDelay: '-18s',
          animationDuration: '26s',
        }}
      />
    </div>
  );
};
