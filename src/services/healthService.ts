import { DayHealthRecord, WorkoutItem } from '../types';

export function calculateHealthScore(
  record: DayHealthRecord,
  workoutsToday: WorkoutItem[]
): number {
  // 1. Steps Component (25%)
  const stepsRatio = Math.min(1.2, record.steps / Math.max(1, record.stepGoal));
  const stepsScore = Math.min(100, stepsRatio * 100);

  // 2. Water Component (20%)
  const waterRatio = Math.min(1.2, record.waterMl / Math.max(1, record.waterGoalMl));
  const waterScore = Math.min(100, waterRatio * 100);

  // 3. Workout Component (25%)
  const totalWorkoutMins = workoutsToday.reduce((acc, w) => acc + w.durationMinutes, 0);
  const workoutTargetMins = 40;
  const workoutScore = Math.min(100, (totalWorkoutMins / workoutTargetMins) * 100);

  // 4. Sleep Component (15%)
  const sleepRatio = Math.min(1.2, record.sleepMinutes / Math.max(1, record.sleepGoalMinutes));
  const sleepScore = Math.min(100, sleepRatio * 100);

  // 5. Emotional Wellness Component (15%)
  const emo = record.emotional;
  const emoScore = Math.min(
    100,
    Math.max(
      20,
      (emo.happiness * 0.35 +
        emo.energy * 0.25 +
        emo.romance * 0.2 +
        (100 - emo.stress) * 0.2)
    )
  );

  const weightedScore =
    stepsScore * 0.25 +
    waterScore * 0.20 +
    workoutScore * 0.25 +
    sleepScore * 0.15 +
    emoScore * 0.15;

  return Math.min(100, Math.max(10, Math.round(weightedScore)));
}

export interface FitnessLevelInfo {
  levelName: string;
  badgeEmoji: string;
  description: string;
  color: string;
}

export function getFitnessLevel(score: number): FitnessLevelInfo {
  if (score >= 95) {
    return {
      levelName: 'Legendary Emoji',
      badgeEmoji: '🏆',
      description: 'Supreme physical conditioning. Unicode athletes bow before your discipline.',
      color: 'text-amber-400 border-amber-500/50 bg-amber-500/10'
    };
  }
  if (score >= 85) {
    return {
      levelName: 'Emoji Athlete',
      badgeEmoji: '🔥',
      description: 'Blazing metabolism and outstanding hydration. In peak performance form.',
      color: 'text-rose-400 border-rose-500/50 bg-rose-500/10'
    };
  }
  if (score >= 75) {
    return {
      levelName: 'Fitness Emoji',
      badgeEmoji: '🏋️',
      description: 'Consistent workouts and admirable step cadence. Regularly touches grass.',
      color: 'text-pink-400 border-pink-500/50 bg-pink-500/10'
    };
  }
  if (score >= 60) {
    return {
      levelName: 'Active Emoji',
      badgeEmoji: '🏃',
      description: 'Solid daily motion. Outrunning the sedentary lifestyle with purpose.',
      color: 'text-cyan-400 border-cyan-500/50 bg-cyan-500/10'
    };
  }
  if (score >= 40) {
    return {
      levelName: 'Casual Emoji',
      badgeEmoji: '🚶',
      description: 'Comfortable balance between strolls and comfortable seating.',
      color: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
    };
  }
  return {
    levelName: 'Couch Emoji',
    badgeEmoji: '🛋️',
    description: 'Horizontal equilibrium champion. Conserving precious caloric assets.',
    color: 'text-purple-400 border-purple-500/50 bg-purple-500/10'
  };
}

export function calculateDistanceKm(steps: number): number {
  return Number((steps * 0.00078).toFixed(2));
}

export function calculateStepCalories(steps: number): number {
  return Math.round(steps * 0.042);
}
