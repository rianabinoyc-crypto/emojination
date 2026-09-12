import React from 'react';
import {
  EmojiTranslateIcon,
  EmojiEmotionIcon,
  EmojiExploreIcon,
  EmojiSendIcon,
  EmojiLanguageIcon,
  EmojiGenerateIcon,
  EmojiSparkleIcon,
  EmojiArrowIcon,
} from './CustomIcons';
import { soundService } from '../../services/soundService';

interface Department {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  emoji: string;
  tag: string;
  icon: React.ReactNode;
}

const DEPARTMENTS: Department[] = [
  {
    id: 'dating',
    number: '01',
    title: 'Dating Corner',
    subtitle: 'Reciprocal romantic semiotics and algorithmic emoji soulmate matching.',
    emoji: '💘',
    tag: 'Romance Engine',
    icon: <EmojiEmotionIcon className="w-4 h-4 text-amber-600" />,
  },
  {
    id: 'chat',
    number: '02',
    title: 'Simulated Dialogue',
    subtitle: 'Real-time AI chat with 20+ moods, simulated typing, and message reactions.',
    emoji: '💬',
    tag: 'Autonomous Exchange',
    icon: <EmojiSendIcon className="w-4 h-4 text-stone-700" />,
  },
  {
    id: 'health',
    number: '03',
    title: 'Vitals & Fitness',
    subtitle: 'Track steps, hydration, sleep cycles, and completely unnecessary emoji health.',
    emoji: '❤️',
    tag: 'Bio-Telemetry',
    icon: <EmojiSparkleIcon className="w-4 h-4 text-rose-500" />,
  },
  {
    id: 'personalities',
    number: '04',
    title: '50+ Archetypes',
    subtitle: 'Explore the 50+ character personality registry or forge custom personalities.',
    emoji: '🧠',
    tag: 'Linguistic Forge',
    icon: <EmojiLanguageIcon className="w-4 h-4 text-purple-600" />,
  },
  {
    id: 'encyclopedia',
    number: '05',
    title: 'Unicode Lexicon',
    subtitle: 'Unabridged historical etymology, Unicode trivia, and cross-cultural semantics.',
    emoji: '📖',
    tag: 'Archival Codex',
    icon: <EmojiExploreIcon className="w-4 h-4 text-indigo-600" />,
  },
  {
    id: 'tools',
    number: '06',
    title: 'Mixology & Tools',
    subtitle: 'Fuse emojis into novel hybrids, cipher cryptic notes, and read horoscopes.',
    emoji: '🎨',
    tag: 'Creative Suite',
    icon: <EmojiGenerateIcon className="w-4 h-4 text-amber-600" />,
  },
  {
    id: 'analytics',
    number: '07',
    title: 'Deep Analytics',
    subtitle: 'Empirical data streams, dopamine density curves, and carbon footprints.',
    emoji: '📊',
    tag: 'Unnecessary Stats',
    icon: <EmojiTranslateIcon className="w-4 h-4 text-emerald-600" />,
  },
  {
    id: 'achievements',
    number: '08',
    title: 'Trophies & Quests',
    subtitle: 'Universal gamification, level rankings, daily quests, and elite badges.',
    emoji: '🏆',
    tag: 'Honor Registry',
    icon: <EmojiSparkleIcon className="w-4 h-4 text-amber-500" />,
  },
];

interface EcosystemAtlasSectionProps {
  onNavigate: (route: string) => void;
}

export const EcosystemAtlasSection: React.FC<EcosystemAtlasSectionProps> = ({ onNavigate }) => {
  const handleLaunch = (route: string) => {
    soundService.playAccept();
    onNavigate(route);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 select-none">
      
      {/* Section Header: Editorial Department Directory */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-stone-200/80 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-stone-400 text-xs font-mono tracking-wider uppercase mb-2">
            <span>[SECTION 04]</span>
            <span>•</span>
            <span>THE ECOSYSTEM ATLAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900">
            Departments of <span className="italic font-normal text-stone-600">Expression</span>
          </h2>
        </div>
        <p className="text-stone-500 font-serif italic text-sm sm:text-base max-w-md">
          Not isolated features, but interconnected rooms of a living visual ecosystem. Click to enter any domain.
        </p>
      </div>

      {/* Editorial Index Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {DEPARTMENTS.map((dept) => (
          <div
            key={dept.id}
            onClick={() => handleLaunch(dept.id)}
            role="button"
            tabIndex={0}
            aria-label={`Enter Department ${dept.title}: ${dept.subtitle}`}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLaunch(dept.id)}
            className="group relative cursor-pointer p-6 sm:p-7 rounded-3xl bg-white/70 hover:bg-white border border-stone-200/80 hover:border-stone-400 shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
          >
            {/* Top row: Number, Custom Icon, Tag */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs text-stone-400 font-semibold tracking-wider">
                  [{dept.number}]
                </span>
                <span className="p-1.5 rounded-lg bg-stone-50 border border-stone-100 group-hover:scale-110 transition-transform">
                  {dept.icon}
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                {dept.tag}
              </span>
            </div>

            {/* Middle: Emoji Specimen & Department Title */}
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-3xl sm:text-4xl filter drop-shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 inline-block">
                {dept.emoji}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-stone-900 group-hover:text-amber-900 transition-colors">
                {dept.title}
              </h3>
            </div>

            {/* Description Subtext */}
            <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed pl-12">
              {dept.subtitle}
            </p>

            {/* Tactile Entry Arrow */}
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-mono text-stone-400 group-hover:text-stone-800 transition-colors">
              <span>Open Department</span>
              <div className="flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                <span className="text-[10px] uppercase font-sans font-semibold">Enter</span>
                <EmojiArrowIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
