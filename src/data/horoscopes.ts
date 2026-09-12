export interface EmojiHoroscope {
  emoji: string;
  sign: string;
  prediction: string;
  luckyEmoji: string;
  dangerEmoji: string;
  chaosIndex: number;
}

export const EMOJI_HOROSCOPES: EmojiHoroscope[] = [
  {
    emoji: '😎',
    sign: 'Cool Guy Constellation',
    prediction: 'Avoid conversations with 😤 before 4 PM. Your polarized shades will deflect three awkward double-texts today.',
    luckyEmoji: '☕',
    dangerEmoji: '😤',
    chaosIndex: 68
  },
  {
    emoji: '🥰',
    sign: 'Nebula of Mutual Infatuation',
    prediction: 'Mercury is in retrograde, which means your crush will accidentally react with a thumbs-up instead of a red heart.',
    luckyEmoji: '💌',
    dangerEmoji: '🥶',
    chaosIndex: 45
  },
  {
    emoji: '😈',
    sign: 'Cluster of Questionable Life Choices',
    prediction: 'A minor international treaty will be rewritten because you sent a fire emoji in a formal email thread.',
    luckyEmoji: '🔥',
    dangerEmoji: '😇',
    chaosIndex: 99
  },
  {
    emoji: '🤓',
    sign: 'Binary Quasar',
    prediction: 'You will find a syntax error in your match’s dating bio. Do NOT comment on it unless you want to spend the weekend alone.',
    luckyEmoji: '💻',
    dangerEmoji: '🫠',
    chaosIndex: 32
  },
  {
    emoji: '😴',
    sign: 'Horizontal Supercluster',
    prediction: 'The universe commands you to stay in bed for an extra 42 minutes. Any social interaction before 1 PM is deemed invalid.',
    luckyEmoji: '🛏️',
    dangerEmoji: '🥳',
    chaosIndex: 12
  },
  {
    emoji: '💀',
    sign: 'Void of Cynical Comedy',
    prediction: 'Your dark humor will baffle 4 out of 5 soft hearts. The 5th will propose marriage on the spot.',
    luckyEmoji: '🦇',
    dangerEmoji: '🥺',
    chaosIndex: 88
  }
];

export const ABSURD_DIAGNOSES = [
  "Relationship is healthy but dangerously dependent on 😂.",
  "High chemistry detected. The algorithm recommends touching grass together.",
  "Warning: Sarcasm levels exceed ISO-9001 romance compliance standards.",
  "Emotional bandwidth saturated. Recommend 15 minutes of uninterrupted silence.",
  "Statistical compatibility is 97.4%, but your caffeine dependencies are in direct competition.",
  "Neural match verified. If this fails, blame the quantum entanglement subroutines."
];

export const EMOTIONAL_WEATHER_CONDITIONS = [
  {
    condition: '🌤️ MOSTLY HAPPY',
    temp: '27 😄',
    romance: 71,
    chaos: 44,
    sadness: 8,
    laughProbability: 93,
    description: 'Scattered giggles throughout the afternoon with a low chance of passive aggression.'
  },
  {
    condition: '⛈️ CHAOTIC THUNDER',
    temp: '41 🔥',
    romance: 38,
    chaos: 94,
    sadness: 14,
    laughProbability: 82,
    description: 'Severe unhinged meme alerts in effect. Keep fire extinguishers and helmets handy.'
  },
  {
    condition: '💖 ROMANTIC HUMIDITY',
    temp: '32 🥰',
    romance: 98,
    chaos: 22,
    sadness: 4,
    laughProbability: 75,
    description: '100% chance of butterfly swarms in lower abdominal regions.'
  },
  {
    condition: '🧊 CRYOGENIC CHILL',
    temp: '-5 🥶',
    romance: 25,
    chaos: 30,
    sadness: 45,
    laughProbability: 40,
    description: 'Dry responses approaching from the north. Layer up with warm affirmations.'
  }
];
