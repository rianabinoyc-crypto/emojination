import { ChatMode, TranslationMetadata } from '../types';
import { 
  EMOJI_DICTIONARY, 
  PHRASE_DICTIONARY, 
  IRREGULAR_VERBS, 
  SENTIMENT_KEYWORDS 
} from '../data/emojiDictionary';

// Number to emoji mapping
const NUMBER_EMOJIS: Record<string, string> = {
  '0': '0️⃣',
  '1': '1️⃣',
  '2': '2️⃣',
  '3': '3️⃣',
  '4': '4️⃣',
  '5': '5️⃣',
  '6': '6️⃣',
  '7': '7️⃣',
  '8': '8️⃣',
  '9': '9️⃣',
  '10': '🔟',
  '100': '💯',
};

// Punctuation to emoji translation
const PUNCTUATION_MAP: Record<string, string> = {
  '?': '❓',
  '??': '❓🤔',
  '???': '🤯❓',
  '!': '❗',
  '!!': '‼️🔥',
  '!!!': '💥⚡',
  '...': '💭',
};

/**
 * Intelligent stemming / lemmatization to find root words
 */
function findRootEmoji(cleanWord: string): string | null {
  // 1. Direct dictionary match
  if (EMOJI_DICTIONARY[cleanWord]) {
    return EMOJI_DICTIONARY[cleanWord];
  }

  // 2. Check irregular verbs table
  if (IRREGULAR_VERBS[cleanWord]) {
    const root = IRREGULAR_VERBS[cleanWord];
    if (EMOJI_DICTIONARY[root]) {
      return EMOJI_DICTIONARY[root];
    }
  }

  // 3. Number match
  if (NUMBER_EMOJIS[cleanWord]) {
    return NUMBER_EMOJIS[cleanWord];
  }

  // 4. Common contraction roots
  if (cleanWord === 'dont' || cleanWord === 'cant' || cleanWord === 'wont' || cleanWord === 'cannot') {
    return '🚫🙅';
  }
  if (cleanWord === 'im') return '🙋';
  if (cleanWord === 'youre') return '👉';
  if (cleanWord === 'theyre' || cleanWord === 'were') return '👥';

  // 5. Morphological stemming rules
  // Ends in -ing
  if (cleanWord.endsWith('ing') && cleanWord.length > 4) {
    const base = cleanWord.slice(0, -3);
    if (EMOJI_DICTIONARY[base]) return EMOJI_DICTIONARY[base];
    if (EMOJI_DICTIONARY[base + 'e']) return EMOJI_DICTIONARY[base + 'e']; // e.g. dancing -> dance
    // Double consonant: running -> run, swimming -> swim
    if (base.length > 2 && base[base.length - 1] === base[base.length - 2]) {
      const single = base.slice(0, -1);
      if (EMOJI_DICTIONARY[single]) return EMOJI_DICTIONARY[single];
    }
  }

  // Ends in -ed
  if (cleanWord.endsWith('ed') && cleanWord.length > 4) {
    const base = cleanWord.slice(0, -2);
    if (EMOJI_DICTIONARY[base]) return EMOJI_DICTIONARY[base];
    if (cleanWord.endsWith('ied')) {
      const yBase = cleanWord.slice(0, -3) + 'y'; // e.g. cried -> cry
      if (EMOJI_DICTIONARY[yBase]) return EMOJI_DICTIONARY[yBase];
    }
    const eBase = cleanWord.slice(0, -1); // e.g. loved -> love
    if (EMOJI_DICTIONARY[eBase]) return EMOJI_DICTIONARY[eBase];
  }

  // Ends in -s or -es
  if (cleanWord.endsWith('es') && cleanWord.length > 3) {
    const base = cleanWord.slice(0, -2);
    if (EMOJI_DICTIONARY[base]) return EMOJI_DICTIONARY[base];
    if (cleanWord.endsWith('ies')) {
      const yBase = cleanWord.slice(0, -3) + 'y'; // parties -> party
      if (EMOJI_DICTIONARY[yBase]) return EMOJI_DICTIONARY[yBase];
    }
  }
  if (cleanWord.endsWith('s') && cleanWord.length > 2) {
    const base = cleanWord.slice(0, -1);
    if (EMOJI_DICTIONARY[base]) return EMOJI_DICTIONARY[base];
  }

  // Ends in -ly
  if (cleanWord.endsWith('ly') && cleanWord.length > 4) {
    const base = cleanWord.slice(0, -2);
    if (EMOJI_DICTIONARY[base]) return EMOJI_DICTIONARY[base];
  }

  return null;
}

/**
 * Concept-hash fallback: Every word gets an expressive, deterministic emoji
 */
function getConceptFallbackEmoji(word: string): string {
  const codeSum = word.split('').reduce((acc, c, idx) => acc + c.charCodeAt(0) * (idx + 1), 0);
  const semanticClusters = [
    '✨', '💭', '🌀', '💫', '⚡', '🔮', '🌟', '🕊️', 
    '🧩', '🪐', '🌊', '🌿', '🎯', '🔥', '💎', '🚀',
    '🌈', '💡', '🫧', '☀️', '☕', '🎭', '🗿', '🤌'
  ];
  return semanticClusters[codeSum % semanticClusters.length];
}

/**
 * Core text-to-emoji semantic tokenization pipeline
 */
export function convertProseToEmojiTokens(input: string): { tokens: string[]; matchedCount: number; totalWords: number } {
  const trimmed = input.trim();
  if (!trimmed) return { tokens: [], matchedCount: 0, totalWords: 0 };

  // Check full sentence phrase dictionary match first
  const normalizedFull = trimmed.toLowerCase().replace(/[.,!?;:]/g, '');
  if (PHRASE_DICTIONARY[normalizedFull]) {
    const phraseEmojis = PHRASE_DICTIONARY[normalizedFull].split(/\s+/).filter(Boolean);
    return {
      tokens: phraseEmojis,
      matchedCount: trimmed.split(/\s+/).length,
      totalWords: trimmed.split(/\s+/).length
    };
  }

  const rawWords = trimmed.split(/\s+/);
  const tokens: string[] = [];
  let matchedCount = 0;

  for (let i = 0; i < rawWords.length; i++) {
    const rawWord = rawWords[i];
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z0-9']/g, '').replace(/'s$/, '');

    // 1. Check 3-word sliding window
    if (i < rawWords.length - 2) {
      const nextWord = rawWords[i + 1].toLowerCase().replace(/[^a-z0-9']/g, '');
      const thirdWord = rawWords[i + 2].toLowerCase().replace(/[^a-z0-9']/g, '');
      const threeWord = `${cleanWord} ${nextWord} ${thirdWord}`;
      if (PHRASE_DICTIONARY[threeWord]) {
        tokens.push(...PHRASE_DICTIONARY[threeWord].split(/\s+/));
        matchedCount += 3;
        i += 2;
        continue;
      }
    }

    // 2. Check 2-word sliding window
    if (i < rawWords.length - 1) {
      const nextWord = rawWords[i + 1].toLowerCase().replace(/[^a-z0-9']/g, '');
      const twoWord = `${cleanWord} ${nextWord}`;
      if (PHRASE_DICTIONARY[twoWord]) {
        tokens.push(...PHRASE_DICTIONARY[twoWord].split(/\s+/));
        matchedCount += 2;
        i += 1;
        continue;
      }
    }

    // 3. Direct / Lemmatized word match
    const foundEmoji = findRootEmoji(cleanWord);
    if (foundEmoji) {
      tokens.push(foundEmoji);
      matchedCount++;
    } else if (cleanWord.length > 0) {
      // 4. Fallback for unlisted substantive words
      const stopWords = ['a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'is', 'are', 'was', 'were'];
      if (!stopWords.includes(cleanWord)) {
        tokens.push(getConceptFallbackEmoji(cleanWord));
        matchedCount += 0.5;
      }
    }

    // Check punctuation attached to word
    if (rawWord.endsWith('???')) tokens.push(PUNCTUATION_MAP['???']);
    else if (rawWord.endsWith('??')) tokens.push(PUNCTUATION_MAP['??']);
    else if (rawWord.endsWith('?')) tokens.push(PUNCTUATION_MAP['?']);
    else if (rawWord.endsWith('!!!')) tokens.push(PUNCTUATION_MAP['!!!']);
    else if (rawWord.endsWith('!')) tokens.push(PUNCTUATION_MAP['!']);
  }

  return {
    tokens: tokens.length > 0 ? tokens : ['💬', '✨'],
    matchedCount: Math.round(matchedCount),
    totalWords: rawWords.length
  };
}

/**
 * Enhanced Morphing function used by the Transformation Engine with 4 intensity levels
 */
export function morphTextWithIntensity(
  input: string, 
  intensityLevel: number
): { translated: string; sentiment: string; dopamine: number } {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      translated: '💬 ✨',
      sentiment: 'Neutral Ground',
      dopamine: 70
    };
  }

  const { tokens, matchedCount, totalWords } = convertProseToEmojiTokens(trimmed);
  const analysis = analyzeSentiment(trimmed);

  // Level 0: Pure, faithful 1-to-1 semantic sequence
  if (intensityLevel === 0) {
    return {
      translated: tokens.join(' '),
      sentiment: analysis.sentiment.label,
      dopamine: Math.min(99, Math.max(75, 70 + matchedCount * 4))
    };
  }

  // Level 1: Articulated semantic flow with connector arrows
  if (intensityLevel === 1) {
    const formatted = tokens.join(' ➡️ ');
    return {
      translated: formatted,
      sentiment: analysis.sentiment.label,
      dopamine: Math.min(99, Math.max(82, 78 + matchedCount * 4))
    };
  }

  // Level 2: Dramatic Amplification with emotional multipliers
  if (intensityLevel === 2) {
    const dramaticAddons = ['🫠', '💀', '🔥', '⚡'];
    const chosenAddon = dramaticAddons[matchedCount % dramaticAddons.length];
    const sequence = [...tokens, '➡️', chosenAddon, '💥'].join(' ');
    return {
      translated: sequence,
      sentiment: `Heightened ${analysis.sentiment.label}`,
      dopamine: Math.min(99, Math.max(90, 85 + matchedCount * 3))
    };
  }

  // Level 3: Unhinged / Cosmic Maximalism
  const cosmicSequence = [
    '🎬',
    ...tokens,
    '➡️',
    '💀',
    '🪦',
    '🫠',
    '🛸',
    '🌌',
    '🏁'
  ].join(' ');

  return {
    translated: cosmicSequence,
    sentiment: `Cosmic ${analysis.sentiment.label}`,
    dopamine: 99
  };
}

/**
 * Standard app-wide translateText function for Chat, Tools and general usage
 */
export function translateText(
  input: string,
  mode: ChatMode
): { translated: string; metadata: TranslationMetadata } {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      translated: '',
      metadata: {
        original: '',
        translated: '',
        sentiment: { label: 'Neutral', score: 50 },
        emojiDensity: 0,
        confidence: 0,
        tokensMatched: 0
      }
    };
  }

  // If mode is NORMAL, keep original text
  if (mode === 'normal') {
    const analysis = analyzeSentiment(trimmed);
    return {
      translated: trimmed,
      metadata: {
        original: trimmed,
        translated: trimmed,
        sentiment: analysis.sentiment,
        emojiDensity: countEmojiDensity(trimmed),
        confidence: 100,
        tokensMatched: 0
      }
    };
  }

  const { tokens, matchedCount, totalWords } = convertProseToEmojiTokens(trimmed);
  let finalEmojiString = '';

  if (mode === 'chaos') {
    finalEmojiString = tokens.join(' ➡️ ') + ' ➡️ ⚡💥';
  } else if (mode === 'extreme') {
    finalEmojiString = ['🎬', ...tokens, '➡️', '💀', '🫠', '🏁'].join(' ');
  } else {
    // Default 'emoji' mode
    finalEmojiString = tokens.join(' ');
  }

  const analysis = analyzeSentiment(trimmed);
  const density = Math.min(100, Math.max(60, Math.round((matchedCount / Math.max(1, totalWords)) * 100)));
  const confidence = Math.min(99, Math.max(75, 80 + Math.round(matchedCount * 3)));

  return {
    translated: finalEmojiString,
    metadata: {
      original: trimmed,
      translated: finalEmojiString,
      sentiment: analysis.sentiment,
      emojiDensity: density,
      confidence,
      tokensMatched: matchedCount
    }
  };
}

export function analyzeSentiment(text: string): { sentiment: { label: string; score: number } } {
  const lower = text.toLowerCase();
  let romanceScore = 0;
  let humorScore = 0;
  let chaosScore = 0;
  let chillScore = 0;
  let energyScore = 0;
  let intellectScore = 0;

  SENTIMENT_KEYWORDS.romance.forEach(w => { if (lower.includes(w)) romanceScore += 25; });
  SENTIMENT_KEYWORDS.humor.forEach(w => { if (lower.includes(w)) humorScore += 25; });
  SENTIMENT_KEYWORDS.chaos.forEach(w => { if (lower.includes(w)) chaosScore += 30; });
  SENTIMENT_KEYWORDS.chill.forEach(w => { if (lower.includes(w)) chillScore += 25; });
  SENTIMENT_KEYWORDS.energy.forEach(w => { if (lower.includes(w)) energyScore += 25; });
  SENTIMENT_KEYWORDS.intellect.forEach(w => { if (lower.includes(w)) intellectScore += 25; });

  const scores = [
    { label: 'Romance & Warmth', score: romanceScore },
    { label: 'Unbridled Humor', score: humorScore },
    { label: 'Chaotic Gremlin Energy', score: chaosScore },
    { label: 'Horizontal Chill', score: chillScore },
    { label: 'High Dopamine Energy', score: energyScore },
    { label: 'Intellectual Overthinking', score: intellectScore }
  ];

  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];

  if (top.score === 0) {
    return {
      sentiment: {
        label: 'Optimistic Equilibrium',
        score: 88
      }
    };
  }

  return {
    sentiment: {
      label: top.label,
      score: Math.min(99, Math.max(72, 60 + top.score))
    }
  };
}

function countEmojiDensity(text: string): number {
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
  const matches = text.match(emojiRegex);
  if (!matches) return 15;
  return Math.min(100, Math.round((matches.length / text.length) * 100));
}
