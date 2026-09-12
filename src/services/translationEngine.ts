import { ChatMode, TranslationMetadata } from '../types';
import { EMOJI_DICTIONARY, PHRASE_DICTIONARY, SENTIMENT_KEYWORDS } from '../data/emojiDictionary';

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

  // If mode is NORMAL, we keep the original text, but still compute metadata
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

  // Check direct phrase dictionary first
  const normalizedLower = trimmed.toLowerCase().replace(/[.,!?;:]/g, '');
  if (PHRASE_DICTIONARY[normalizedLower]) {
    const rawResult = PHRASE_DICTIONARY[normalizedLower];
    const transformed = applyModeStyling(rawResult, mode, normalizedLower);
    const analysis = analyzeSentiment(trimmed);
    return {
      translated: transformed,
      metadata: {
        original: trimmed,
        translated: transformed,
        sentiment: analysis.sentiment,
        emojiDensity: 95,
        confidence: 98,
        tokensMatched: trimmed.split(/\s+/).length
      }
    };
  }

  // Tokenize and match phrases and words
  const words = trimmed.split(/\s+/);
  const translatedTokens: string[] = [];
  let matchedCount = 0;

  for (let i = 0; i < words.length; i++) {
    const rawWord = words[i];
    const cleanWord = rawWord.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Check 2-word sliding window
    if (i < words.length - 1) {
      const nextWord = words[i + 1].toLowerCase().replace(/[^a-z0-9]/g, '');
      const twoWord = `${cleanWord} ${nextWord}`;
      if (PHRASE_DICTIONARY[twoWord]) {
        translatedTokens.push(PHRASE_DICTIONARY[twoWord]);
        matchedCount += 2;
        i++; // skip next
        continue;
      }
    }

    if (EMOJI_DICTIONARY[cleanWord]) {
      translatedTokens.push(EMOJI_DICTIONARY[cleanWord]);
      matchedCount++;
    } else {
      // If no emoji found for this word
      if (mode === 'extreme') {
        // In extreme mode, map unmatched words to quirky concept emojis
        const hash = cleanWord.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const fillers = ['✨', '💭', '🌀', '💫', '⚡', '🔮'];
        translatedTokens.push(fillers[hash % fillers.length]);
      } else if (mode === 'chaos') {
        // In chaos mode, add exclamation or spark occasionally
        translatedTokens.push('⚡');
      } else {
        // In standard emoji mode, if word is common stop word, ignore or keep minimal
        const stopWords = ['a', 'an', 'the', 'is', 'are', 'am', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of'];
        if (!stopWords.includes(cleanWord)) {
          // If unmatched substantive word, keep it or provide a sparkle
          translatedTokens.push('✨');
        }
      }
    }
  }

  // Combine tokens according to mode
  let finalEmojiString = '';
  if (mode === 'chaos') {
    finalEmojiString = translatedTokens.join(' ➡️ ');
    if (!finalEmojiString.includes('⚡') && !finalEmojiString.includes('🔥')) {
      finalEmojiString += ' ➡️ 💥';
    }
  } else if (mode === 'extreme') {
    finalEmojiString = ['🎬', ...translatedTokens, '🏁'].join(' ➡️ ');
  } else {
    // Standard EMOJI mode
    finalEmojiString = translatedTokens.join(' ');
  }

  // Fallback if empty
  if (!finalEmojiString.trim()) {
    finalEmojiString = '💬✨';
  }

  const analysis = analyzeSentiment(trimmed);
  const density = Math.min(100, Math.max(50, Math.round((matchedCount / Math.max(1, words.length)) * 100)));
  const confidence = Math.min(99, Math.max(65, 75 + Math.round(matchedCount * 5)));

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

function applyModeStyling(baseEmoji: string, mode: ChatMode, text: string): string {
  if (mode === 'chaos') {
    if (text.includes('coffee')) return '☕ ➡️ 🧠 ➡️ ⚡ ➡️ 😌';
    if (text.includes('gaming')) return '🎮 ➡️ 🎧 ➡️ 💥 ➡️ 🏆';
    if (text.includes('coding')) return '💻 ➡️ 🐛 ➡️ 🤬 ➡️ 🚀';
    return baseEmoji.split(' ').join(' ➡️ ') + ' ➡️ ⚡';
  }
  if (mode === 'extreme') {
    if (text.includes('university') || text.includes('school')) {
      return '🚶➡️🎓🏫➡️📚➡️🧠➡️☕➡️😵💫➡️🏠➡️😴';
    }
    if (text.includes('date') || text.includes('love')) {
      return '👀➡️💘➡️🍷🕯️➡️🍝➡️💬✨➡️🥰➡️💍➡️🏰';
    }
    return '🎬➡️ ' + baseEmoji.split(' ').join(' ➡️ ') + ' ➡️🏁';
  }
  return baseEmoji;
}

function analyzeSentiment(text: string): { sentiment: { label: string; score: number } } {
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
  // Rough estimate of emoji characters in string
  const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
  const matches = text.match(emojiRegex);
  if (!matches) return 15;
  return Math.min(100, Math.round((matches.length / text.length) * 100));
}
