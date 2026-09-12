import React, { useState } from 'react';
import { DayHealthRecord, WorkoutItem, HealthStreaks } from '../../types';
import { calculateHealthScore, getFitnessLevel } from '../../services/healthService';
import { StepTracker } from './StepTracker';
import { WaterTracker } from './WaterTracker';
import { WorkoutTracker } from './WorkoutTracker';
import { SleepTracker } from './SleepTracker';
import { EmotionalHealth } from './EmotionalHealth';
import { FictionalVitals } from './FictionalVitals';
import { 
  Heart, 
  Sparkles, 
} from 'lucide-react';

interface HealthDashboardProps {
  healthRecord: DayHealthRecord;
  workouts: WorkoutItem[];
  streaks: HealthStreaks;
  onUpdateHealthRecord: (updated: DayHealthRecord) => void;
  onAddWorkout: (workout: WorkoutItem) => void;
  onDeleteWorkout: (id: string) => void;
  onUpdateStreaks: (updated: HealthStreaks) => void;
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({
  healthRecord,
  workouts,
  streaks,
  onUpdateHealthRecord,
  onAddWorkout,
  onDeleteWorkout,
  onUpdateStreaks
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'water' | 'workouts' | 'sleep' | 'emotional' | 'vitals'>('overview');

  // Dynamically recalculate health score based on active parameters
  const dynamicScore = calculateHealthScore(healthRecord, workouts);
  const fitnessLevel = getFitnessLevel(dynamicScore);

  // Handlers for child trackers
  const handleAddSteps = (amt: number) => {
    const updated = {
      ...healthRecord,
      steps: healthRecord.steps + amt
    };
    updated.healthScore = calculateHealthScore(updated, workouts);
    onUpdateHealthRecord(updated);
  };

  const handleSetStepGoal = (goal: number) => {
    const updated = {
      ...healthRecord,
      stepGoal: goal
    };
    updated.healthScore = calculateHealthScore(updated, workouts);
    onUpdateHealthRecord(updated);
  };

  const handleAddWater = (ml: number) => {
    const updated = {
      ...healthRecord,
      waterMl: healthRecord.waterMl + ml
    };
    updated.healthScore = calculateHealthScore(updated, workouts);
    onUpdateHealthRecord(updated);
  };

  const handleSetWaterGoal = (goalMl: number) => {
    const updated = {
      ...healthRecord,
      waterGoalMl: goalMl
    };
    updated.healthScore = calculateHealthScore(updated, workouts);
    onUpdateHealthRecord(updated);
  };

  const handleUpdateSleep = (mins: number, bed: string, wake: string) => {
    const updated = {
      ...healthRecord,
      sleepMinutes: mins,
      bedtime: bed,
      wakeTime: wake
    };
    updated.healthScore = calculateHealthScore(updated, workouts);
    onUpdateHealthRecord(updated);
  };

  const handleUpdateEmotional = (emo: typeof healthRecord.emotional) => {
    const updated = {
      ...healthRecord,
      emotional: emo
    };
    updated.healthScore = calculateHealthScore(updated, workouts);
    onUpdateHealthRecord(updated);
  };

  const tabs: { id: typeof activeTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'steps', label: 'Steps', icon: '🚶' },
    { id: 'water', label: 'Water', icon: '💧' },
    { id: 'workouts', label: 'Workouts', icon: '🏋️' },
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'emotional', label: 'Emotional', icon: '🧠' },
    { id: 'vitals', label: 'Vitals', icon: '🩺' }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-in fade-in duration-150">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5dcce]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight flex items-center gap-3">
            <span>Emoji Health & Fitness</span>
            <Heart className="w-7 h-7 text-rose-600 fill-rose-500 inline" />
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Because your imaginary unicode identity requires rigorous physiological surveillance.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#e5dcce] bg-white text-stone-800 flex items-center space-x-1.5 shadow-xs">
            <span>{fitnessLevel.badgeEmoji}</span>
            <span>{fitnessLevel.levelName}</span>
          </div>
          <span className="text-xs font-mono text-stone-500 bg-[#faf7f2] px-3 py-1.5 rounded-full border border-[#e5dcce]">
            {healthRecord.date}
          </span>
        </div>
      </div>

      {/* Dynamic Health Score Hero Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] shadow-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Big Score Dial */}
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#143d2b] text-white flex flex-col items-center justify-center shadow-md">
            <span className="text-4xl sm:text-5xl font-bold font-serif">
              {dynamicScore}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-200 mt-0.5">
              Score Index
            </span>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{fitnessLevel.levelName.toUpperCase()}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {dynamicScore >= 85 ? 'Peak Pixel Vitality' : dynamicScore >= 60 ? 'Harmonious Equilibrium' : 'Restoration Recommended'}
            </h2>
            <p className="text-xs text-stone-600 max-w-md leading-relaxed">
              {fitnessLevel.description}
            </p>
          </div>
        </div>

        {/* Right: Health Streaks */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-[#faf7f2] p-4 rounded-2xl border border-[#e5dcce]">
          <div className="text-center px-2">
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Steps</span>
            <span className="text-sm font-bold text-stone-900 font-mono">🚶 {streaks.stepStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-[#e5dcce]">
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Water</span>
            <span className="text-sm font-bold text-stone-900 font-mono">💧 {streaks.waterStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-[#e5dcce]">
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Workouts</span>
            <span className="text-sm font-bold text-stone-900 font-mono">🏋️ {streaks.workoutStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-[#e5dcce]">
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Sleep</span>
            <span className="text-sm font-bold text-stone-900 font-mono">😴 {streaks.sleepStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-[#e5dcce]">
            <span className="text-[10px] font-mono text-rose-700 font-bold block">Overall</span>
            <span className="text-sm font-extrabold text-rose-700 font-mono">❤️ {streaks.healthStreak}d</span>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-[#143d2b] text-white shadow-xs font-semibold'
                : 'bg-white text-stone-600 hover:bg-[#faf7f2] border border-[#e5dcce]'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Views */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div 
              onClick={() => setActiveTab('steps')}
              className="p-4 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/50 cursor-pointer transition-all space-y-1 shadow-xs"
            >
              <div className="flex justify-between items-center text-xs font-mono text-stone-600">
                <span className="font-bold">STEPS</span>
                <span>🚶</span>
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900">
                {healthRecord.steps.toLocaleString()}
              </div>
              <div className="w-full bg-[#f0eae1] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600" 
                  style={{ width: `${Math.min(100, (healthRecord.steps / healthRecord.stepGoal) * 100)}%` }} 
                />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('water')}
              className="p-4 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/50 cursor-pointer transition-all space-y-1 shadow-xs"
            >
              <div className="flex justify-between items-center text-xs font-mono text-stone-600">
                <span className="font-bold">WATER</span>
                <span>💧</span>
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900">
                {(healthRecord.waterMl / 1000).toFixed(1)} L
              </div>
              <div className="w-full bg-[#f0eae1] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-600" 
                  style={{ width: `${Math.min(100, (healthRecord.waterMl / healthRecord.waterGoalMl) * 100)}%` }} 
                />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('workouts')}
              className="p-4 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/50 cursor-pointer transition-all space-y-1 shadow-xs"
            >
              <div className="flex justify-between items-center text-xs font-mono text-stone-600">
                <span className="font-bold">WORKOUT</span>
                <span>🏋️</span>
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900">
                {workouts.reduce((acc, w) => acc + w.durationMinutes, 0)} min
              </div>
              <div className="w-full bg-[#f0eae1] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rose-500" 
                  style={{ width: `${Math.min(100, (workouts.reduce((acc, w) => acc + w.durationMinutes, 0) / 40) * 100)}%` }} 
                />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('sleep')}
              className="p-4 rounded-3xl bg-white border border-[#e5dcce] hover:border-[#143d2b]/50 cursor-pointer transition-all space-y-1 shadow-xs"
            >
              <div className="flex justify-between items-center text-xs font-mono text-stone-600">
                <span className="font-bold">SLEEP</span>
                <span>😴</span>
              </div>
              <div className="text-2xl font-serif font-bold text-stone-900">
                {Math.floor(healthRecord.sleepMinutes / 60)}h {healthRecord.sleepMinutes % 60}m
              </div>
              <div className="w-full bg-[#f0eae1] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600" 
                  style={{ width: `${Math.min(100, (healthRecord.sleepMinutes / healthRecord.sleepGoalMinutes) * 100)}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Vitals Teaser */}
          <FictionalVitals
            stress={healthRecord.emotional.stress}
            energy={healthRecord.emotional.energy}
            chaos={healthRecord.emotional.chaos}
          />
        </div>
      )}

      {activeTab === 'steps' && (
        <StepTracker
          steps={healthRecord.steps}
          stepGoal={healthRecord.stepGoal}
          onAddSteps={handleAddSteps}
          onSetGoal={handleSetStepGoal}
        />
      )}

      {activeTab === 'water' && (
        <WaterTracker
          waterMl={healthRecord.waterMl}
          waterGoalMl={healthRecord.waterGoalMl}
          onAddWater={handleAddWater}
          onSetGoal={handleSetWaterGoal}
        />
      )}

      {activeTab === 'workouts' && (
        <WorkoutTracker
          workouts={workouts}
          onAddWorkout={onAddWorkout}
          onDeleteWorkout={onDeleteWorkout}
        />
      )}

      {activeTab === 'sleep' && (
        <SleepTracker
          sleepMinutes={healthRecord.sleepMinutes}
          sleepGoalMinutes={healthRecord.sleepGoalMinutes}
          bedtime={healthRecord.bedtime}
          wakeTime={healthRecord.wakeTime}
          onUpdateSleep={handleUpdateSleep}
        />
      )}

      {activeTab === 'emotional' && (
        <EmotionalHealth
          emotional={healthRecord.emotional}
          onUpdateEmotional={handleUpdateEmotional}
        />
      )}

      {activeTab === 'vitals' && (
        <FictionalVitals
          stress={healthRecord.emotional.stress}
          energy={healthRecord.emotional.energy}
          chaos={healthRecord.emotional.chaos}
        />
      )}

    </div>
  );
};
