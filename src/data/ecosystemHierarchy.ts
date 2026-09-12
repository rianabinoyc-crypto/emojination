export type EcosystemPillarId = 'CONNECT' | 'EXPRESS' | 'TRACK';

export interface EcosystemAppMeta {
  id: string;
  pillarId: EcosystemPillarId;
  number: string;
  title: string;
  shortTitle: string;
  emoji: string;
  tagline: string;
  technicalSubtext: string;
  accent: string;
  route: string;
}

export interface EcosystemPillarMeta {
  id: EcosystemPillarId;
  name: string;
  emoji: string;
  code: string;
  headline: string;
  description: string;
  gradient: string;
  borderAccent: string;
  textAccent: string;
  apps: EcosystemAppMeta[];
}

export const ECOSYSTEM_HIERARCHY: Record<EcosystemPillarId, EcosystemPillarMeta> = {
  CONNECT: {
    id: 'CONNECT',
    name: 'CONNECT',
    emoji: '💘',
    code: 'PLR-01',
    headline: 'Quantum Romance & Social Mechanics',
    description: 'Solving the completely unnecessary problem of emoji relationships through ISO-9001 compliant reciprocal chemistry matching.',
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    borderAccent: 'border-pink-500/40',
    textAccent: 'text-pink-400',
    apps: [
      {
        id: 'dating',
        pillarId: 'CONNECT',
        number: '01.1',
        title: 'Emoji Dating Corner',
        shortTitle: 'Dating',
        emoji: '💘',
        tagline: 'Reciprocal Chemistry Swipe Deck',
        technicalSubtext: 'Non-Euclidean Swipe Physics & Algorithmic Mutual Consensus',
        accent: 'from-pink-500 to-rose-500',
        route: 'dating',
      },
      {
        id: 'matches',
        pillarId: 'CONNECT',
        number: '01.2',
        title: 'Neural Matches Hub',
        shortTitle: 'Matches',
        emoji: '💕',
        tagline: 'Confirmed Romantic Pairs',
        technicalSubtext: 'Mutual Consensus Dossier & Active Chemistry Monitors',
        accent: 'from-rose-500 to-pink-600',
        route: 'matches',
      },
      {
        id: 'personalities',
        pillarId: 'CONNECT',
        number: '01.3',
        title: '50+ Archetype Forge',
        shortTitle: 'Personalities',
        emoji: '🧠',
        tagline: 'Psychological Personality Directory',
        technicalSubtext: 'Multi-Variate Archetype Sliders & Custom Personality Synthesis',
        accent: 'from-purple-500 to-indigo-600',
        route: 'personalities',
      },
    ],
  },
  EXPRESS: {
    id: 'EXPRESS',
    name: 'EXPRESS',
    emoji: '💬',
    code: 'PLR-02',
    headline: 'Autonomous Dialogue & Linguistic Synthesis',
    description: 'Bypassing human alphabetical limitations with simulated autonomous AI messaging, cryptic ciphers, and mixology.',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    borderAccent: 'border-cyan-500/40',
    textAccent: 'text-cyan-400',
    apps: [
      {
        id: 'chat',
        pillarId: 'EXPRESS',
        number: '02.1',
        title: 'Simulated AI Chat',
        shortTitle: 'Chat',
        emoji: '💬',
        tagline: 'Autonomous Conversational Dialogue',
        technicalSubtext: '20+ Simulated Emotional States with Stochastic Typing Latency',
        accent: 'from-cyan-500 to-blue-500',
        route: 'chat',
      },
      {
        id: 'tools',
        pillarId: 'EXPRESS',
        number: '02.2',
        title: 'Mixology & Tools Suite',
        shortTitle: 'Tools',
        emoji: '🎨',
        tagline: 'Emoji Synthesis & Cryptography',
        technicalSubtext: 'Semantic Text-to-Emoji Translators, Horoscopes & Cipher Encoders',
        accent: 'from-amber-500 to-orange-500',
        route: 'tools',
      },
      {
        id: 'encyclopedia',
        pillarId: 'EXPRESS',
        number: '02.3',
        title: 'Unicode Lexicon & Lore',
        shortTitle: 'Encyclopedia',
        emoji: '📖',
        tagline: 'Historical Etymology Codex',
        technicalSubtext: 'Comprehensive Unicode 16.0 Metadata & Cross-Cultural Semiotics',
        accent: 'from-indigo-500 to-sky-500',
        route: 'encyclopedia',
      },
    ],
  },
  TRACK: {
    id: 'TRACK',
    name: 'TRACK',
    emoji: '❤️',
    code: 'PLR-03',
    headline: 'Bio-Telemetry, Dopamine & Empirical Data',
    description: 'Empirical body health, sleep cycles, carbon footprint, and gamified karma tracked with absurd scientific precision.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    borderAccent: 'border-emerald-500/40',
    textAccent: 'text-emerald-400',
    apps: [
      {
        id: 'health',
        pillarId: 'TRACK',
        number: '03.1',
        title: 'Emoji Health & Vitals',
        shortTitle: 'Health',
        emoji: '❤️',
        tagline: 'Bio-Telemetry & Fitness Record',
        technicalSubtext: '72 BPM Animated Vitals, Step Tracker, Hydration & Sleep Math',
        accent: 'from-rose-500 to-emerald-500',
        route: 'health',
      },
      {
        id: 'analytics',
        pillarId: 'TRACK',
        number: '03.2',
        title: 'Empirical Telemetry',
        shortTitle: 'Analytics',
        emoji: '📊',
        tagline: 'Absurd Relationship Statistics',
        technicalSubtext: 'Dopamine Saturation Curves, Carbon Footprint & Message Densities',
        accent: 'from-teal-500 to-cyan-500',
        route: 'analytics',
      },
      {
        id: 'achievements',
        pillarId: 'TRACK',
        number: '03.3',
        title: 'Karma & Achievements',
        shortTitle: 'Achievements',
        emoji: '🏆',
        tagline: 'Gamified Quests & Trophy Hall',
        technicalSubtext: 'Sub-Atomic XP Leveling, Daily Quests & Sound Chimes',
        accent: 'from-yellow-400 to-amber-500',
        route: 'achievements',
      },
    ],
  },
};

export const ALL_ECOSYSTEM_APPS: EcosystemAppMeta[] = [
  ...ECOSYSTEM_HIERARCHY.CONNECT.apps,
  ...ECOSYSTEM_HIERARCHY.EXPRESS.apps,
  ...ECOSYSTEM_HIERARCHY.TRACK.apps,
];

export function getPillarByRoute(route: string): EcosystemPillarMeta | null {
  for (const pillar of Object.values(ECOSYSTEM_HIERARCHY)) {
    if (pillar.apps.some(a => a.route === route)) {
      return pillar;
    }
  }
  return null;
}

export function getAppMetaByRoute(route: string): EcosystemAppMeta | null {
  return ALL_ECOSYSTEM_APPS.find(a => a.route === route) || null;
}
