import {
  UserProfile,
  Match,
  Message,
  NotificationItem,
  AppSettings,
  AnalyticsStats,
  DayHealthRecord,
  WorkoutItem,
  HealthStreaks,
  AchievementItem,
  DailyChallenge,
  GamificationState,
  EmojiProfile
} from '../types';
import { INITIAL_ACHIEVEMENTS, DAILY_CHALLENGES } from '../data/achievements';
import { calculateHealthScore } from './healthService';

const STORAGE_KEYS = {
  USER_PROFILE: 'emojination_user_profile_v2',
  ACCEPTED_IDS: 'emojination_accepted_ids_v2',
  REJECTED_IDS: 'emojination_rejected_ids_v2',
  MATCHES: 'emojination_matches_v2',
  MESSAGES: 'emojination_messages_v2',
  NOTIFICATIONS: 'emojination_notifications_v2',
  SETTINGS: 'emojination_settings_v2',
  ANALYTICS: 'emojination_analytics_v2',
  HEALTH_PREFIX: 'emojination_health_date_',
  WORKOUTS: 'emojination_workouts_v2',
  HEALTH_STREAKS: 'emojination_health_streaks_v2',
  CUSTOM_PERSONALITIES: 'emojination_custom_personalities_v2',
  DATING_POOL_INCLUSIONS: 'emojination_dating_pool_v2',
  ACHIEVEMENTS: 'emojination_achievements_v2',
  DAILY_CHALLENGES: 'emojination_daily_challenges_v2',
  GAMIFICATION: 'emojination_gamification_v2',
};

export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user_main',
  username: 'EmojiConnoisseur',
  tagline: 'Emoji Enthusiast',
  favoriteEmoji: '😎',
  archetype: 'Chaotic Optimist',
  bio: 'Software artisan, hydration advocate, caffeine enthusiast, and full-time overthinker. Exploring the infinite possibilities of the emoji ecosystem.',
  interests: ['💻 Coding', '🎮 Gaming', '☕ Coffee', '🏃 Fitness', '✨ Aesthetics'],
  stats: {
    confidence: 88,
    humor: 84,
    romance: 76,
    chaos: 68,
    socialEnergy: 75,
    emotionalStability: 80
  }
};

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  volume: 0.5,
  chatDelay: 'normal',
  defaultChatMode: 'emoji',
  reducedMotion: false
};

export const DEFAULT_ANALYTICS: AnalyticsStats = {
  messagesSent: 12,
  emojisSent: 84,
  matchesFormed: 2,
  profilesRejected: 4,
  profilesAccepted: 6,
  avgCompatibility: 91,
  avgChaos: 72,
  emojiDensity: 82,
  carbonFootprintKg: 0.00000042,
  replyTimeSec: 2.8
};

export const DEFAULT_HEALTH_STREAKS: HealthStreaks = {
  stepStreak: 4,
  waterStreak: 6,
  workoutStreak: 3,
  sleepStreak: 5,
  healthStreak: 7
};

export const DEFAULT_GAMIFICATION: GamificationState = {
  level: 12,
  currentXp: 1850,
  xpForNextLevel: 2500,
  totalXpEarned: 6850,
  streakDays: 7,
  lastActiveDate: getTodayDateString(),
  contributingActivities: ['Logged steps', 'Hydration logged', 'Emoji chat messages', 'Personality created']
};

export function createDefaultDayHealth(date: string = getTodayDateString()): DayHealthRecord {
  const initial: DayHealthRecord = {
    date,
    steps: 8432,
    stepGoal: 10000,
    waterMl: 1800,
    waterGoalMl: 2500,
    sleepMinutes: 462, // 7h 42m
    sleepGoalMinutes: 480, // 8h
    bedtime: '23:30',
    wakeTime: '07:12',
    emotional: {
      happiness: 85,
      energy: 78,
      romance: 72,
      chaos: 54,
      stress: 32
    },
    healthScore: 87
  };
  return initial;
}

export const DEFAULT_WORKOUTS: WorkoutItem[] = [
  {
    id: 'wo-1',
    activity: 'Morning Run',
    emoji: '🏃',
    durationMinutes: 30,
    intensity: 'high',
    caloriesBurned: 310,
    date: getTodayDateString(),
    notes: 'Brisk pace through the city park. Hydrated with electrolytes.'
  },
  {
    id: 'wo-2',
    activity: 'Yoga & Stretch',
    emoji: '🧘',
    durationMinutes: 20,
    intensity: 'low',
    caloriesBurned: 85,
    date: getTodayDateString(),
    notes: 'Sun salutations and deep spine alignment.'
  }
];

class StorageService {
  public getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  }

  public saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }

  public getAcceptedIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACCEPTED_IDS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveAcceptedIds(ids: string[]): void {
    localStorage.setItem(STORAGE_KEYS.ACCEPTED_IDS, JSON.stringify(ids));
  }

  public getRejectedIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REJECTED_IDS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveRejectedIds(ids: string[]): void {
    localStorage.setItem(STORAGE_KEYS.REJECTED_IDS, JSON.stringify(ids));
  }

  public getMatches(): Match[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MATCHES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveMatches(matches: Match[]): void {
    localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
  }

  public getMessages(): Record<string, Message[]> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  public saveMessages(messages: Record<string, Message[]>): void {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }

  public getNotifications(): NotificationItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (data) return JSON.parse(data);
      return [
        {
          id: 'notif-welcome',
          type: 'system',
          title: 'Welcome to Emoji-Nation',
          message: 'Your interactive emoji platform is ready.',
          timestamp: 'Just now',
          read: false,
          avatarEmoji: '✨'
        }
      ];
    } catch {
      return [];
    }
  }

  public saveNotifications(notifs: NotificationItem[]): void {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  public getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public saveSettings(settings: AppSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  public getAnalytics(): AnalyticsStats {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      return data ? JSON.parse(data) : DEFAULT_ANALYTICS;
    } catch {
      return DEFAULT_ANALYTICS;
    }
  }

  public saveAnalytics(stats: AnalyticsStats): void {
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(stats));
  }

  // ----------------------------------------------------
  // HEALTH DATA PERSISTENCE (DATE-AWARE)
  // ----------------------------------------------------

  public getDayHealth(date: string = getTodayDateString()): DayHealthRecord {
    try {
      const key = STORAGE_KEYS.HEALTH_PREFIX + date;
      const data = localStorage.getItem(key);
      if (data) return JSON.parse(data);
      const def = createDefaultDayHealth(date);
      this.saveDayHealth(def);
      return def;
    } catch {
      return createDefaultDayHealth(date);
    }
  }

  public saveDayHealth(record: DayHealthRecord): void {
    const key = STORAGE_KEYS.HEALTH_PREFIX + record.date;
    localStorage.setItem(key, JSON.stringify(record));
  }

  public getWorkouts(): WorkoutItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WORKOUTS);
      if (data) return JSON.parse(data);
      return DEFAULT_WORKOUTS;
    } catch {
      return DEFAULT_WORKOUTS;
    }
  }

  public saveWorkouts(workouts: WorkoutItem[]): void {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(workouts));
  }

  public getHealthStreaks(): HealthStreaks {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HEALTH_STREAKS);
      return data ? JSON.parse(data) : DEFAULT_HEALTH_STREAKS;
    } catch {
      return DEFAULT_HEALTH_STREAKS;
    }
  }

  public saveHealthStreaks(streaks: HealthStreaks): void {
    localStorage.setItem(STORAGE_KEYS.HEALTH_STREAKS, JSON.stringify(streaks));
  }

  // ----------------------------------------------------
  // CUSTOM PERSONALITIES & DATING POOL PERSISTENCE
  // ----------------------------------------------------

  public getCustomPersonalities(): EmojiProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_PERSONALITIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveCustomPersonalities(personalities: EmojiProfile[]): void {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PERSONALITIES, JSON.stringify(personalities));
  }

  public getDatingPoolInclusions(): string[] | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DATING_POOL_INCLUSIONS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public saveDatingPoolInclusions(ids: string[]): void {
    localStorage.setItem(STORAGE_KEYS.DATING_POOL_INCLUSIONS, JSON.stringify(ids));
  }

  // ----------------------------------------------------
  // ACHIEVEMENTS & GAMIFICATION PERSISTENCE
  // ----------------------------------------------------

  public getAchievements(): AchievementItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return data ? JSON.parse(data) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  }

  public saveAchievements(achievements: AchievementItem[]): void {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }

  public getDailyChallenges(): DailyChallenge[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGES);
      return data ? JSON.parse(data) : DAILY_CHALLENGES;
    } catch {
      return DAILY_CHALLENGES;
    }
  }

  public saveDailyChallenges(challenges: DailyChallenge[]): void {
    localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGES, JSON.stringify(challenges));
  }

  public getGamification(): GamificationState {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
      return data ? JSON.parse(data) : DEFAULT_GAMIFICATION;
    } catch {
      return DEFAULT_GAMIFICATION;
    }
  }

  public saveGamification(state: GamificationState): void {
    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(state));
  }

  // ----------------------------------------------------
  // RESET ALL DATA
  // ----------------------------------------------------

  public clearAllData(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('emojination_')) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  }
}

export const storageService = new StorageService();
