export type ChatMode = 'normal' | 'emoji' | 'chaos' | 'extreme';

export type PersonalityCategory = 'romantic' | 'funny' | 'intelligent' | 'chaotic' | 'social' | 'calm' | 'strange';

export interface EmojiProfile {
  id: string;
  emoji: string;
  name: string;
  archetype: string;
  category: PersonalityCategory;
  personality: string;
  bio: string;
  interests: string[];
  confidence: number;
  humor: number;
  romance: number;
  chaos: number;
  socialEnergy: number;
  intelligence: number;
  emotionalStability: number;
  adventure?: number;
  calmness?: number;
  preferredTypes: string[];
  compatibilityNotes: string;
  reciprocalRate: number; // 0.0 to 1.0 probability
  greeting: string;
  isCustom?: boolean;
  inDatingPool?: boolean;
}

export interface UserProfile {
  id: string;
  username: string;
  tagline: string;
  favoriteEmoji: string;
  archetype: string;
  bio: string;
  interests: string[];
  stats: {
    confidence: number;
    humor: number;
    romance: number;
    chaos: number;
    socialEnergy: number;
    emotionalStability: number;
  };
}

export interface CompatibilityBreakdown {
  score: number;
  factors: {
    personality: number;
    interests: number;
    emotional: number;
    humor: number;
    romance: number;
    chaos: number;
    communication: number;
  };
  summary: string;
  verdict: string;
}

export interface RelationshipHealth {
  romance: number;
  humor: number;
  chemistry: number;
  chaos: number;
  communication: number;
  diagnosis: string;
}

export interface Match {
  id: string;
  emojiId: string;
  matchedAt: string;
  compatibility: number;
  relationshipHealth: RelationshipHealth;
  unreadCount: number;
  isPinned?: boolean;
}

export interface TranslationMetadata {
  original: string;
  translated: string;
  sentiment: {
    label: string;
    score: number;
  };
  emojiDensity: number;
  confidence: number;
  tokensMatched: number;
}

export interface Message {
  id: string;
  conversationId: string; // emojiId
  sender: 'user' | 'emoji';
  text: string;
  translatedText?: string;
  mode: ChatMode;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  reactions: Record<string, number>;
  userReactions: string[];
  translationMetadata?: TranslationMetadata;
}

export interface NotificationItem {
  id: string;
  type: 'match' | 'message' | 'reaction' | 'health' | 'achievement' | 'challenge' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatarEmoji?: string;
  linkTo?: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  volume: number;
  chatDelay: 'fast' | 'normal' | 'dramatic';
  defaultChatMode: ChatMode;
  reducedMotion: boolean;
}

export interface AnalyticsStats {
  messagesSent: number;
  emojisSent: number;
  matchesFormed: number;
  profilesRejected: number;
  profilesAccepted: number;
  avgCompatibility: number;
  avgChaos: number;
  emojiDensity: number;
  carbonFootprintKg: number;
  replyTimeSec: number;
}

// ----------------------------------------------------
// HEALTH & FITNESS TYPES
// ----------------------------------------------------

export interface WorkoutItem {
  id: string;
  activity: string;
  emoji: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  caloriesBurned: number;
  date: string; // YYYY-MM-DD
  notes: string;
}

export interface DayHealthRecord {
  date: string; // YYYY-MM-DD
  steps: number;
  stepGoal: number;
  waterMl: number;
  waterGoalMl: number;
  sleepMinutes: number;
  sleepGoalMinutes: number;
  bedtime: string;
  wakeTime: string;
  emotional: {
    happiness: number; // 0-100
    energy: number;    // 0-100
    romance: number;   // 0-100
    chaos: number;     // 0-100
    stress: number;    // 0-100
  };
  healthScore: number;
}

export interface HealthStreaks {
  stepStreak: number;
  waterStreak: number;
  workoutStreak: number;
  sleepStreak: number;
  healthStreak: number;
}

// ----------------------------------------------------
// ACHIEVEMENTS & GAMIFICATION TYPES
// ----------------------------------------------------

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'dating' | 'chat' | 'health' | 'tools' | 'mastery';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  progress: number;
  target: number;
  completed: boolean;
  xpReward: number;
}

export interface GamificationState {
  level: number;
  currentXp: number;
  xpForNextLevel: number;
  totalXpEarned: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  contributingActivities: string[];
}
