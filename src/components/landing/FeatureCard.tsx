import React, { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

export interface FeatureItem {
  id: string;
  emoji: string;
  title: string;
  category: string;
  description: string;
  accentGradient: string;
  iconBg: string;
  borderColor: string;
  glowShadow: string;
  textColor: string;
  depthFactor: number; // For card parallax variation (1 to 3px)
}

interface FeatureCardProps {
  feature: FeatureItem;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(({
  feature,
  isHovered,
  onHover,
  onClick
}, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => onClick(feature.id)}
      onMouseEnter={() => onHover(feature.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(feature.id)}
      onBlur={() => onHover(null)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${feature.title}: ${feature.description}`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(feature.id)}
      className={`group relative p-4 sm:p-5 md:p-6 rounded-3xl cursor-pointer transition-all duration-300 ease-out flex flex-col items-center text-center select-none overflow-hidden ${
        feature.glowShadow
      } ${
        isHovered
          ? '-translate-y-1.5 scale-[1.02] bg-slate-900/85 border-white/25 shadow-2xl'
          : 'bg-slate-900/55 hover:bg-slate-900/75 border-white/10'
      } border backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50`}
      style={{
        willChange: 'transform',
      }}
    >
      {/* Background Subtle Accent Radial Gradient */}
      <div
        className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl pointer-events-none ${feature.iconBg}`}
      />

      {/* Category Micro-Badge */}
      <div className="mb-2.5 sm:mb-3 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-400 group-hover:text-slate-200 transition-colors">
        {feature.category}
      </div>

      {/* Fluid Icon Container */}
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 shadow-lg ${
          feature.iconBg
        } border ${feature.borderColor} ${
          isHovered
            ? 'scale-110 rotate-3 shadow-xl'
            : 'group-hover:scale-105 group-hover:rotate-1'
        }`}
      >
        {/* Inner Glass highlight */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />

        <span className="relative text-3xl sm:text-4xl filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
          {feature.emoji}
        </span>
      </div>

      {/* Title */}
      <h3 className={`text-sm sm:text-base md:text-lg font-bold tracking-wide transition-colors ${
        isHovered ? feature.textColor : 'text-white'
      }`}>
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal line-clamp-2 leading-relaxed max-w-[200px]">
        {feature.description}
      </p>

      {/* Fluid Arrow CTA Micro-interaction */}
      <div className="mt-3 sm:mt-4 flex items-center space-x-1 text-xs font-semibold opacity-60 group-hover:opacity-100 transition-all duration-300">
        <span className={`${feature.textColor} text-[11px] sm:text-xs tracking-wide`}>
          Launch
        </span>
        <ArrowRight
          className={`w-3.5 h-3.5 ${feature.textColor} transform transition-transform duration-300 group-hover:translate-x-1`}
        />
      </div>

      {/* Glowing Bottom Accent Border on Hover */}
      <div
        className={`absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r ${feature.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';
