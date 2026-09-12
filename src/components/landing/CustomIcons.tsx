import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Translate: Two expressive faces connected by a curved flowing arrow ( 🙂 ↝ 😎 )
export const EmojiTranslateIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left calm face */}
    <circle cx="6" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="5" cy="11" r="0.6" fill="currentColor" />
    <circle cx="7" cy="11" r="0.6" fill="currentColor" />
    <path d="M5 13.5C5.4 14.2 6.6 14.2 7 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

    {/* Curved connector arrow */}
    <path
      d="M10.8 11C12.2 9.5 13 14 14.5 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="0.2 0"
    />
    <path d="M13.5 10.5L15 12L13.8 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

    {/* Right ecstatic face */}
    <circle cx="18" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Sunglasses / cool visor */}
    <path d="M15.5 11H20.5M16 11.8C16.5 12.8 17.5 12.8 18 11.8M18 11.8C18.5 12.8 19.5 12.8 20 11.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M16.8 14C17.4 14.6 18.6 14.6 19.2 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 2. Text → Emoji: Text symbol transforming into a lively smile ( Aa → 😊 )
export const EmojiTextToEmojiIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Letter A */}
    <path d="M4 16L6.8 7L9.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.9 13.2H8.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Lowercase a */}
    <ellipse cx="12" cy="13.5" rx="1.8" ry="2.2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M13.8 11.5V15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />

    {/* Minimalist arrow */}
    <path d="M15.5 12H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M17 10.5L18.5 12L17 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />

    {/* Tiny Smiling Face dot */}
    <circle cx="21" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="20.4" cy="11.4" r="0.35" fill="currentColor" />
    <circle cx="21.6" cy="11.4" r="0.35" fill="currentColor" />
    <path d="M20.4 12.8C20.6 13.2 21.4 13.2 21.6 12.8" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

// 3. Emotion: Abstract communicative face whose expression shifts
export const EmojiEmotionIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Winking eye and open eye */}
    <circle cx="9" cy="10" r="1.2" fill="currentColor" />
    <path d="M14 10.5C14.5 9.5 16 9.5 16.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Warm asymmetric smirk / smile */}
    <path
      d="M8.5 14.5C9.8 16.5 14.2 16.8 16 14.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="16.8" cy="13.2" r="0.8" fill="currentColor" opacity="0.4" />
  </svg>
);

// 4. Copy: Two friendly overlapping speech bubbles (instead of generic clipboards)
export const EmojiCopyIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Back bubble */}
    <path
      d="M15 6H8C6.3 6 5 7.3 5 9V13C5 14.1 5.6 15 6.5 15.5L5.5 17.5L8.2 16.5H15C16.7 16.5 18 15.2 18 13.5V9C18 7.3 16.7 6 15 6Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.5"
    />
    {/* Front bubble */}
    <path
      d="M18 9H11C9.3 9 8 10.3 8 12V16C8 17.1 8.6 18 9.5 18.5L8.5 20.5L11.2 19.5H18C19.7 19.5 21 18.2 21 16.5V12C21 10.3 19.7 9 18 9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12.5" cy="14" r="0.7" fill="currentColor" />
    <circle cx="15" cy="14" r="0.7" fill="currentColor" />
    <circle cx="17.5" cy="14" r="0.7" fill="currentColor" />
  </svg>
);

// 5. Generate / Remix: Particles converging into one emoji
export const EmojiGenerateIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Central emoji orb */}
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10.5" cy="11" r="0.7" fill="currentColor" />
    <circle cx="13.5" cy="11" r="0.7" fill="currentColor" />
    <path d="M10.8 13.6C11.3 14.4 12.7 14.4 13.2 13.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />

    {/* Converging radiant particles */}
    <path d="M12 2.5V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 19V21.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M2.5 12H5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M19 12H21.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="5" cy="5" r="1" fill="currentColor" />
    <circle cx="19" cy="5" r="1" fill="currentColor" />
    <circle cx="19" cy="19" r="1" fill="currentColor" />
    <circle cx="5" cy="19" r="1" fill="currentColor" />
  </svg>
);

// 6. Explore: An eye containing a tiny emoji pupil
export const EmojiExploreIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Friendly eye contours */}
    <path
      d="M2.5 12C4.8 7.5 8.8 5 12 5C15.2 5 19.2 7.5 21.5 12C19.2 16.5 15.2 19 12 19C8.8 19 4.8 16.5 2.5 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Smiling Emoji Pupil */}
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="11" cy="11.3" r="0.5" fill="currentColor" />
    <circle cx="13" cy="11.3" r="0.5" fill="currentColor" />
    <path d="M11.2 12.8C11.5 13.5 12.5 13.5 12.8 12.8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
  </svg>
);

// 7. Language: Multiple speech bubbles organically merging
export const EmojiLanguageIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Large primary bubble */}
    <path
      d="M13 4H7C4.2 4 2 6.2 2 9C2 10.8 3 12.3 4.5 13.2L3.8 16.2L7 14.8H13C15.8 14.8 18 12.6 18 9.8C18 7 15.8 4 13 4Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Organic merging secondary bubble */}
    <path
      d="M17 10.5H18.5C20.4 10.5 22 12 22 13.8C22 15 21.3 16 20.2 16.6L20.8 18.8L18.5 17.8H16"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Glyphs inside */}
    <path d="M6.5 9.5H13.5M6.5 7.5H10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// 8. Send: Curved speech bubble transitioning into a forward arrow
export const EmojiSendIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 12C3 7 7 3 12 3C17 3 21 7 21 12C21 17 17 21 12 21C9.8 21 7.8 20.2 6.2 18.8L3 20L4.2 16.8C3.4 15.4 3 13.8 3 12Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 12H15M15 12L12 9M15 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 9. Randomize: Cluster of tiny expressions shuffling
export const EmojiRandomIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Face 1 */}
    <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="7" cy="7.2" r="0.5" fill="currentColor" />
    <circle cx="9" cy="7.2" r="0.5" fill="currentColor" />
    <path d="M7 9.5C7.5 10.2 8.5 10.2 9 9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

    {/* Face 2 */}
    <circle cx="16.5" cy="15.5" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M15 14.5H16M17 14.5H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M15.5 17C16 16.3 17 16.3 17.5 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />

    {/* Dynamic shuffle loop */}
    <path d="M15.5 6C17.5 7 18.5 8.5 18 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1 1.5" />
    <path d="M8.5 18C6.5 17 5.5 15.5 6 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1 1.5" />
  </svg>
);

// 10. Sparkle / Starlet: Organic hand-drawn twinkle
export const EmojiSparkleIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
      fill="currentColor"
    />
  </svg>
);

// 11. Editorial Arrow: Elegant slender direction indicator
export const EmojiArrowIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 10H15.5M15.5 10L10.5 5M15.5 10L10.5 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
