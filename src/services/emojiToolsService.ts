export interface MixedEmojiResult {
  combo: string;
  title: string;
  description: string;
  category: string;
}

export interface MeaningResult {
  emojis: string;
  summary: string;
  sentiment: string;
  keywords: string[];
  subtext: string;
}

export function mixEmojis(e1: string, e2: string): MixedEmojiResult {
  const clean1 = e1.trim();
  const clean2 = e2.trim();
  const pair = `${clean1}+${clean2}`;
  const reversePair = `${clean2}+${clean1}`;

  const customMixes: Record<string, { title: string; description: string; category: string }> = {
    '😎+🔥': {
      title: 'Supercharged Chad',
      description: 'Radiates 100,000 lumens of pure swagger. Polarized sunglasses now double as welding visors.',
      category: 'Pure Confidence'
    },
    '🤖+❤️': {
      title: 'Cyber Romance',
      description: 'A 64-bit neural net experiencing an emotional stack overflow. Handshake protocol upgraded to unconditional love.',
      category: 'Silicon Feelings'
    },
    '💀+😂': {
      title: 'Lethal Laughter',
      description: 'Laughed so intensely that soul left physical hardware. Resurrected strictly to forward the meme.',
      category: 'Dark Humor'
    },
    '☕+💻': {
      title: 'The Production Pusher',
      description: 'Powered by 400mg of caffeine and zero unit tests. Fixes bugs by introducing more charismatic bugs.',
      category: 'Developer Lore'
    },
    '😈+🥺': {
      title: 'Chaotic Sweetheart',
      description: 'Will commit municipal arson and then ask you for a warm hug with puppy dog eyes.',
      category: 'Emotional Hazard'
    },
    '😴+🍕': {
      title: 'The Horizontal Banquet',
      description: 'Consumes four slices of pepperoni without breaking horizontal equilibrium. A modern miracle.',
      category: 'Couch Royalty'
    },
    '👽+🎸': {
      title: 'Intergalactic Rocker',
      description: 'Plays 8-string solos on radio telescope frequencies. Crop circles are actually their guitar tablature.',
      category: 'Galactic Sounds'
    },
    '🤠+🚀': {
      title: 'Space Cowboy',
      description: 'Lassoes orbiting communication satellites and roams the asteroid belt in leather chaps.',
      category: 'Frontier Sci-Fi'
    }
  };

  const found = customMixes[pair] || customMixes[reversePair];
  if (found) {
    return {
      combo: `${clean1}${clean2}`,
      ...found
    };
  }

  return {
    combo: `${clean1}${clean2}`,
    title: `Fused ${clean1} & ${clean2}`,
    description: `A volatile molecular fusion of ${clean1} and ${clean2}. The algorithmic committee is monitoring this hybrid closely for spontaneous combustions.`,
    category: 'Experimental Hybrid'
  };
}

export function decodeEmojiMeaning(input: string): MeaningResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      emojis: '',
      summary: 'Please enter one or more emojis to analyze.',
      sentiment: 'Void',
      keywords: [],
      subtext: 'Awaiting input...'
    };
  }

  const keywords: string[] = [];
  let sentiment = 'Curious';

  if (trimmed.includes('❤️') || trimmed.includes('🥰') || trimmed.includes('😍')) {
    sentiment = 'High Romance';
    keywords.push('Infatuation', 'Warmth', 'Pheromone Surge');
  }
  if (trimmed.includes('💻') || trimmed.includes('🤖') || trimmed.includes('🎮')) {
    sentiment = 'Technological Dopamine';
    keywords.push('Code Compiles', 'Overclocking', 'Silicon Serenade');
  }
  if (trimmed.includes('🔥') || trimmed.includes('😈') || trimmed.includes('⚡')) {
    sentiment = 'Unhinged Turbulence';
    keywords.push('High Chaos', 'Safety Violation', 'Zero Chill');
  }
  if (trimmed.includes('☕') || trimmed.includes('😴') || trimmed.includes('🛌')) {
    sentiment = 'Horizontal Equilibrium';
    keywords.push('Rest Restoration', 'Decaf Rejection', 'Cozy Sanctuary');
  }
  if (trimmed.includes('😂') || trimmed.includes('💀') || trimmed.includes('🤣')) {
    sentiment = 'Meme Hysteria';
    keywords.push('Cynical Gold', 'Abdominal Cramps', 'Peak Satire');
  }

  if (keywords.length === 0) {
    keywords.push('Mystery Glyphs', 'Subconscious Signals', 'Quantum Resonance');
  }

  return {
    emojis: trimmed,
    summary: `The sequence "${trimmed}" denotes a cognitive state dominated by ${sentiment.toLowerCase()}.`,
    sentiment,
    keywords,
    subtext: `Algorithmic subtext: The sender desires immediate validation, high-bandwidth connection, and possibly pizza.`
  };
}

export function translateEmojiToEnglish(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return 'Enter emojis above to translate.';

  const mappings: Record<string, string> = {
    '❤️ 💻 🎮': 'I love coding and gaming deeply.',
    '☕ 🧠 ⚡ 😌': 'I require caffeine to activate my higher cognitive faculties.',
    '🚶 🎓 🏫 📚 🧠 ☕ 😵 🏠 😴': 'I attended university, overworked my brain, drank emergency coffee, and collapsed in bed.',
    '👀 💘 🍷 🕯️ 🥰': 'We locked eyes, felt instant attraction, shared candlelight wine, and fell in love.',
    '🎮 🔥 🏆': 'I am dominating the gaming lobby with blistering speed.',
    '🍕 🤤 🛋️': 'I am craving pizza while comfortably glued to the sofa.',
    '🌱 🦶 🏃 🌞': 'I am going outside to touch grass and bask in the solar radiance.'
  };

  if (mappings[trimmed]) return mappings[trimmed];

  // Heuristic translation
  const pieces: string[] = [];
  if (trimmed.includes('❤️')) pieces.push('love');
  if (trimmed.includes('💻')) pieces.push('programming');
  if (trimmed.includes('🎮')) pieces.push('video games');
  if (trimmed.includes('☕')) pieces.push('coffee');
  if (trimmed.includes('😴')) pieces.push('sleeping');
  if (trimmed.includes('🔥')) pieces.push('excitement');
  if (trimmed.includes('🍕')) pieces.push('food');
  if (trimmed.includes('✈️')) pieces.push('traveling');

  if (pieces.length > 0) {
    return `Approximate translation: A passionate journey involving ${pieces.join(', ')}.`;
  }

  return `Decoded narrative: An avant-garde sequence expressing profound human complexities through unicode art.`;
}

export function getRandomEmojiStory(): { emojis: string; story: string } {
  const stories = [
    {
      emojis: '☕ ➡️ 💻 ➡️ 🐛 ➡️ 🤬 ➡️ 🍕 ➡️ 💡 ➡️ 🚀',
      story: 'The Developer Cycle: Coffee consumed, code written, bug encountered, verbal crisis, emergency pizza, sudden epiphany, deployment successful.'
    },
    {
      emojis: '👀 ➡️ 💘 ➡️ 🍷 ➡️ 🍝 ➡️ 💬 ➡️ 🥰 ➡️ 💍',
      story: 'The Romance Arc: Mutual gaze, algorithmic arrow, candlelight dinner, witty banter, emotional melting, lifelong matrimony.'
    },
    {
      emojis: '🚶 ➡️ 🌲 ➡️ 🪨 ➡️ 🍄 ➡️ 👽 ➡️ 🛸 ➡️ 🌌',
      story: 'The Woodland Enigma: Stroll in nature, peculiar rock, luminous fungus, extraterrestrial visitation, abduction to the Andromeda cluster.'
    },
    {
      emojis: '😴 ➡️ 🥱 ➡️ 🛏️ ➡️ 📱 ➡️ 🤯 ➡️ ⏰ ➡️ 💀',
      story: 'The Modern Evening: Sleepy, bedtime reached, "just 5 minutes on phone", existential crisis, alarm rings, dead inside.'
    }
  ];

  return stories[Math.floor(Math.random() * stories.length)];
}

export function calculateEmojiDensity(text: string): {
  totalChars: number;
  emojiChars: number;
  densityPercentage: number;
  verdict: string;
} {
  const totalChars = text.length;
  if (totalChars === 0) {
    return { totalChars: 0, emojiChars: 0, densityPercentage: 0, verdict: 'Empty Message' };
  }

  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
  const matches = text.match(emojiRegex) || [];
  const emojiChars = matches.length;

  const densityPercentage = Math.min(100, Math.round((emojiChars / totalChars) * 100));

  let verdict = 'Text Heavy';
  if (densityPercentage > 80) verdict = '🔥 Pure Unicode Energy (Transcendental)';
  else if (densityPercentage > 50) verdict = '✨ Certified Emoji Native';
  else if (densityPercentage > 20) verdict = '💬 Balanced Linguistic Hybrid';
  else if (densityPercentage > 0) verdict = '📄 Sparse Emoji Garnish';

  return {
    totalChars,
    emojiChars,
    densityPercentage,
    verdict
  };
}
