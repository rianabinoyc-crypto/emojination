export type EcosystemPillarId = 'CONNECT' | 'EXPRESS' | 'TRACK';

export interface EcosystemAppMeta {
  id: string;
  pillarId: EcosystemPillarId;
  number: string;
  brandName: string;
  title: string;
  shortTitle: string;
  emoji: string;
  tagline: string;
  technicalSubtext: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  route: string;
}

export interface EcosystemPillarMeta {
  id: EcosystemPillarId;
  name: string;
  emoji: string;
  code: string;
  headline: string;
  description: string;
  pillarTheme: {
    bg: string;
    text: string;
    border: string;
    pill: string;
  };
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
    pillarTheme: {
      bg: 'bg-[#fdf2f8]',
      text: 'text-pink-900',
      border: 'border-pink-300',
      pill: 'bg-pink-100 text-pink-800 border-pink-200',
    },
    apps: [
      {
        id: 'dating',
        pillarId: 'CONNECT',
        number: '01.1',
        brandName: 'EMOJI-FLIRT™',
        title: 'Emoji Dating Corner',
        shortTitle: 'Flirt',
        emoji: '💘',
        tagline: 'Quantum Romance Swipe Matrix',
        technicalSubtext: 'Non-Euclidean Swipe Physics & Algorithmic Mutual Consensus',
        accentBg: 'bg-rose-50',
        accentText: 'text-rose-900',
        accentBorder: 'border-rose-200',
        route: 'dating',
      },
      {
        id: 'matches',
        pillarId: 'CONNECT',
        number: '01.2',
        brandName: 'PAIR-OS™',
        title: 'Neural Matches Hub',
        shortTitle: 'Matches',
        emoji: '💕',
        tagline: 'Confirmed Soulmate Diagnostics',
        technicalSubtext: 'Mutual Consensus Dossier & Active Chemistry Monitors',
        accentBg: 'bg-pink-50',
        accentText: 'text-pink-900',
        accentBorder: 'border-pink-200',
        route: 'matches',
      },
      {
        id: 'personalities',
        pillarId: 'CONNECT',
        number: '01.3',
        brandName: 'PERSONA-FORGE™',
        title: '50+ Archetype Forge',
        shortTitle: 'Personas',
        emoji: '🧠',
        tagline: 'Linguistic Psychology Lab',
        technicalSubtext: 'Multi-Variate Archetype Sliders & Custom Personality Synthesis',
        accentBg: 'bg-purple-50',
        accentText: 'text-purple-900',
        accentBorder: 'border-purple-200',
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
    pillarTheme: {
      bg: 'bg-[#f0f9ff]',
      text: 'text-sky-900',
      border: 'border-sky-300',
      pill: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    apps: [
      {
        id: 'chat',
        pillarId: 'EXPRESS',
        number: '02.1',
        brandName: 'EMOJI-TALK™',
        title: 'Simulated AI Chat',
        shortTitle: 'Chat',
        emoji: '💬',
        tagline: 'Autonomous Conversational Dialogue',
        technicalSubtext: '20+ Simulated Emotional States with Stochastic Typing Latency',
        accentBg: 'bg-sky-50',
        accentText: 'text-sky-900',
        accentBorder: 'border-sky-200',
        route: 'chat',
      },
      {
        id: 'tools',
        pillarId: 'EXPRESS',
        number: '02.2',
        brandName: 'EMOJI-LAB™',
        title: 'Mixology & Tools Suite',
        shortTitle: 'Studio',
        emoji: '🎨',
        tagline: 'Chemical Emoji Synthesizer & Ciphers',
        technicalSubtext: 'Semantic Text-to-Emoji Translators, Horoscopes & Cipher Encoders',
        accentBg: 'bg-amber-50',
        accentText: 'text-amber-900',
        accentBorder: 'border-amber-200',
        route: 'tools',
      },
      {
        id: 'encyclopedia',
        pillarId: 'EXPRESS',
        number: '02.3',
        brandName: 'EMOJI-PEDIA™',
        title: 'Unicode Lexicon & Lore',
        shortTitle: 'Codex',
        emoji: '📖',
        tagline: 'Historical Etymology Codex',
        technicalSubtext: 'Comprehensive Unicode 16.0 Metadata & Cross-Cultural Semiotics',
        accentBg: 'bg-indigo-50',
        accentText: 'text-indigo-900',
        accentBorder: 'border-indigo-200',
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
    pillarTheme: {
      bg: 'bg-[#f0fdf4]',
      text: 'text-emerald-900',
      border: 'border-emerald-300',
      pill: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    apps: [
      {
        id: 'health',
        pillarId: 'TRACK',
        number: '03.1',
        brandName: 'EMOJI-FIT™',
        title: 'Emoji Health & Vitals',
        shortTitle: 'Vitals',
        emoji: '❤️',
        tagline: 'Absurd Bio-Telemetry & Sleep Math',
        technicalSubtext: '72 BPM Animated Vitals, Step Tracker, Hydration & Sleep Math',
        accentBg: 'bg-emerald-50',
        accentText: 'text-emerald-900',
        accentBorder: 'border-emerald-200',
        route: 'health',
      },
      {
        id: 'analytics',
        pillarId: 'TRACK',
        number: '03.2',
        brandName: 'DATA-PULSE™',
        title: 'Empirical Telemetry',
        shortTitle: 'Telemetry',
        emoji: '📊',
        tagline: 'Dopamine Saturation & Telemetry',
        technicalSubtext: 'Dopamine Saturation Curves, Carbon Footprint & Message Densities',
        accentBg: 'bg-teal-50',
        accentText: 'text-teal-900',
        accentBorder: 'border-teal-200',
        route: 'analytics',
      },
      {
        id: 'achievements',
        pillarId: 'TRACK',
        number: '03.3',
        brandName: 'QUEST-VAULT™',
        title: 'Karma & Achievements',
        shortTitle: 'Quests',
        emoji: '🏆',
        tagline: 'Gamified Karma & Trophy Hall',
        technicalSubtext: 'Sub-Atomic XP Leveling, Daily Quests & Sound Chimes',
        accentBg: 'bg-amber-50',
        accentText: 'text-amber-900',
        accentBorder: 'border-amber-200',
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
