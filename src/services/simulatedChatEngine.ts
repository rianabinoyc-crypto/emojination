import { EmojiProfile } from '../types';

export interface ChatResponseResult {
  text: string;
  translatedText?: string;
  reactionToUserMsg?: string;
}

export function generateSimulatedReply(
  partner: EmojiProfile,
  userMessage: string
): ChatResponseResult {
  const lower = userMessage.toLowerCase();

  // 1. Contextual matching
  if (lower.includes('gaming') || lower.includes('game')) {
    const replies: Record<string, string> = {
      'cool-guy': '🎮🔥 Same. What are we playing? If it is not running at 144Hz I am not interested.',
      'chaos-gremlin': '🎮💣 Let us spawn 5,000 explosives and crash the server physics engine!',
      'nerd-emoji': '🎮 My pathfinding heuristics in Elden Ring are theoretically optimal. 1v1 me?',
      'sleepy-soul': '🎮 I tried playing Animal Crossing and fell asleep on my controller. Woke up on a beach.',
      'laughing-legend': '🎮 LMAO I just fell off the map 14 times in a row. Truly professional esports.'
    };
    return {
      text: replies[partner.id] || `🎮🔥 Gaming detected! ${partner.emoji} Ready to queue up together!`,
      reactionToUserMsg: '🔥'
    };
  }

  if (lower.includes('coding') || lower.includes('programming') || lower.includes('developer') || lower.includes('bug')) {
    const replies: Record<string, string> = {
      'nerd-emoji': '💻 If our code compiles on the first try, we should immediately be suspicious.',
      'cool-guy': '💻 Code is poetry, but my git commits are strictly unformatted works of art.',
      'chaos-gremlin': '💻 Direct commit to main branch with message "testing in prod". That is my religion.',
      'robot': '🤖 BEEP. Compiling your heart into my runtime memory. 0 errors, 1 infinite loop.',
      'slightly-unstable': '💻 I have 73 merge conflicts and none of them can hurt me anymore. 🙃'
    };
    return {
      text: replies[partner.id] || `💻⚡ Coding talk! My favorite. Let us build something ridiculous together!`,
      reactionToUserMsg: '💻'
    };
  }

  if (lower.includes('tired') || lower.includes('sleep') || lower.includes('nap') || lower.includes('bed')) {
    const replies: Record<string, string> = {
      'sleepy-soul': '😴🛌 You need an emoji-powered nap. I have been training for this my whole life.',
      'soft-heart': '🥺 Oh no, please rest! Drink some chamomile tea and wrap yourself in 4 blankets.',
      'party-animal': '😴 TIRED?! In this economy?! Drink 3 energy drinks and hit the dance floor! 🎉',
      'cool-guy': '😎 Power nap with sunglasses on. That way nobody knows if you are asleep or deep in thought.'
    };
    return {
      text: replies[partner.id] || `😴🛌 Time to recharge your battery. Don't push yourself too hard!`,
      reactionToUserMsg: '😴'
    };
  }

  if (lower.includes('coffee') || lower.includes('tea') || lower.includes('espresso')) {
    return {
      text: `☕ Liquid sanity. I am currently running on 94% caffeine and 6% pure adrenaline.`,
      reactionToUserMsg: '☕'
    };
  }

  if (lower.includes('love') || lower.includes('crush') || lower.includes('cute') || lower.includes('date')) {
    const replies: Record<string, string> = {
      'hopeless-romantic': '🥰 My heart just did an acoustic backflip. When are we picking out our matching ringtones?',
      'romantic': '😍 STOP IT! You are making my pixels blush in 16.7 million true colors.',
      'flirt': '😏 Flattery will get you everywhere with me. Keep talking.',
      'ice-cold': '🥶 My internal thermometer rose by 0.04 degrees Celsius. Remarkable.',
      'detective': '🧐 My magnifying glass reveals that you are 98.4% genuine.'
    };
    return {
      text: replies[partner.id] || `❤️ Aww, the chemistry between us is genuinely statistically significant!`,
      reactionToUserMsg: '❤️'
    };
  }

  if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey') || lower.includes('yo')) {
    return {
      text: `${partner.greeting}`,
      reactionToUserMsg: '👋'
    };
  }

  // General personality responses
  const fallbackByArchetype: Record<string, string> = {
    'cool-guy': '😎 That is so smooth. The vibes are completely immaculate right now.',
    'hopeless-romantic': '🥰 Everything you type sounds like a handwritten poem from 1892.',
    'laughing-legend': '😂 PLEASE I just spat water all over my display monitor!',
    'soft-heart': '🥺 You are so sweet. Can we be best emojis forever?',
    'chaos-gremlin': '😈 I am actively planning something completely irresponsible because of this message.',
    'nerd-emoji': '🤓 That hypothesis aligns with our current relational tensor matrix. Proceed.',
    'sleepy-soul': '😴 I agree with whatever you said as long as I don’t have to get up.',
    'cowboy': '🤠 Well butter my biscuits! You sure know how to spin a yarn, partner.',
    'detective': '🧐 Fascinating testimony. I shall record this in the official dossier.',
    'ice-cold': '🥶 Hmph. You might actually be somewhat tolerable.',
    'chaos-agent': '🤪 HONK HONK! The circus train has left the station and you are the conductor!',
    'angel': '😇 May your day be blessed with fast download speeds and infinite peace.',
    'alien': '👽 Your Earth customs continue to delight my sensory tentacles.',
    'robot': '🤖 Processing input: Sentiment positive. Emotional buffer: 100% capacity.',
    'dark-humor': '💀 If I had a pulse, it would probably be accelerating right now.',
    'rich-emoji': '🤑 Brilliant! I am allocating another $500k in imaginary seed funding to this chat.',
    'angry-emoji': '😤 WHY AM I SMILING RIGHT NOW?! THIS WAS NOT SUPPOSED TO HAPPEN!',
    'party-animal': '🥳 CONFETTI CANNON ENGAGED! Every sentence deserves a parade!',
    'emotional-support': '😭 You are literally my favorite person on this entire platform!',
    'romantic': '😍 Everything you say is like poetry in motion. I cannot look away.',
    'slightly-unstable': '🙃 I don’t know what is happening, but I support it with 100% of my unstable heart.',
    'overthinker': '🤯 Hold on, let me cross-reference the philosophical implications of that message...',
    'melting': '🫠 I am literally a puddle of melted emojis on the carpet now.',
    'flirt': '😏 Keep looking at me with that font and see what happens.',
    'suspicious': '🤨 I will accept that answer for now. But I am keeping one eye on you.'
  };

  return {
    text: fallbackByArchetype[partner.id] || `${partner.emoji} Truly profound. The algorithm approves!`,
    reactionToUserMsg: partner.emoji
  };
}
