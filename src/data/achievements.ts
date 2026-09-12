import { AchievementItem, DailyChallenge } from '../types';

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-first-match',
    title: 'First Match',
    description: 'Trigger your very first reciprocal emoji love match.',
    emoji: '🏆',
    category: 'dating',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 150
  },
  {
    id: 'ach-ten-matches',
    title: 'Matchmaker Deluxe',
    description: 'Accumulate 10 confirmed emoji soulmate connections.',
    emoji: '❤️',
    category: 'dating',
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    xpReward: 350
  },
  {
    id: 'ach-hundred-messages',
    title: 'Chatterbox Extraordinaire',
    description: 'Exchange 100 messages across your emoji conversations.',
    emoji: '💬',
    category: 'chat',
    progress: 0,
    maxProgress: 100,
    unlocked: false,
    xpReward: 250
  },
  {
    id: 'ach-thousand-emojis',
    title: 'Emoji Rainmaker',
    description: 'Transmit 1,000 emojis into the digital atmosphere.',
    emoji: '🔥',
    category: 'chat',
    progress: 0,
    maxProgress: 1000,
    unlocked: false,
    xpReward: 400
  },
  {
    id: 'ach-laughing-emojis',
    title: 'Meme Enthusiast',
    description: 'Deploy the 😂 or 🤣 emoji 100 times.',
    emoji: '😂',
    category: 'chat',
    progress: 0,
    maxProgress: 100,
    unlocked: false,
    xpReward: 200
  },
  {
    id: 'ach-ten-k-steps',
    title: 'Step Master',
    description: 'Walk 10,000 steps in a single day.',
    emoji: '🚶',
    category: 'health',
    progress: 0,
    maxProgress: 10000,
    unlocked: false,
    xpReward: 300
  },
  {
    id: 'ach-hydration-hero',
    title: 'Hydration Hero',
    description: 'Drink at least 2,500 ml of water in a single day.',
    emoji: '💧',
    category: 'health',
    progress: 0,
    maxProgress: 2500,
    unlocked: false,
    xpReward: 200
  },
  {
    id: 'ach-ten-workouts',
    title: 'Gym Rat',
    description: 'Record 10 completed emoji workout sessions.',
    emoji: '🏋️',
    category: 'health',
    progress: 0,
    maxProgress: 10,
    unlocked: false,
    xpReward: 350
  },
  {
    id: 'ach-sleep-champion',
    title: 'Sleep Champion',
    description: 'Log 8+ hours of restful, regenerative emoji slumber.',
    emoji: '😴',
    category: 'health',
    progress: 0,
    maxProgress: 480,
    unlocked: false,
    xpReward: 200
  },
  {
    id: 'ach-personality-master',
    title: 'Personality Architect',
    description: 'Create your own custom emoji personality with tuned sliders.',
    emoji: '🧠',
    category: 'mastery',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 300
  },
  {
    id: 'ach-encyclopedia-explorer',
    title: 'Encyclopedia Explorer',
    description: 'Inspect the detailed dossiers of 15 different emoji species.',
    emoji: '📖',
    category: 'mastery',
    progress: 0,
    maxProgress: 15,
    unlocked: false,
    xpReward: 250
  },
  {
    id: 'ach-tool-master',
    title: 'Tool Master',
    description: 'Use every tool in the Emoji Tools Suite at least once.',
    emoji: '🎨',
    category: 'tools',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    xpReward: 300
  },
  {
    id: 'ach-max-chaos',
    title: 'Maximum Chaos',
    description: 'Reach a Chaos Index above 90% in your profile or conversation.',
    emoji: '💀',
    category: 'mastery',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 250
  }
];

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-send-emojis',
    title: 'Unicode Influx',
    description: 'Send 20 emojis today across any conversation.',
    emoji: '✨',
    progress: 0,
    target: 20,
    completed: false,
    xpReward: 100
  },
  {
    id: 'dc-reach-steps',
    title: 'Touch Grass Routine',
    description: 'Log at least 5,000 steps on your Emoji Fitness Tracker.',
    emoji: '🚶',
    progress: 0,
    target: 5000,
    completed: false,
    xpReward: 150
  },
  {
    id: 'dc-translate-msgs',
    title: 'Linguistic Alchemy',
    description: 'Translate 10 messages through the translation engine.',
    emoji: '🔤',
    progress: 0,
    target: 10,
    completed: false,
    xpReward: 120
  },
  {
    id: 'dc-dating-match',
    title: 'Spark of Romance',
    description: 'Form at least one new dating match today.',
    emoji: '💘',
    progress: 0,
    target: 1,
    completed: false,
    xpReward: 180
  },
  {
    id: 'dc-use-laugh',
    title: 'Spread the Giggles',
    description: 'Use the 😂 or 🤣 emoji 10 times in chats or tools.',
    emoji: '😂',
    progress: 0,
    target: 10,
    completed: false,
    xpReward: 100
  }
];
