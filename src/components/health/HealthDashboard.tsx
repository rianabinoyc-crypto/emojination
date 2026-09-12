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
  Activity, 
  Flame, 
  Droplet, 
  Dumbbell, 
  Moon, 
  Brain, 
  Sparkles, 
  Zap, 
  Trophy,
  Calendar
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
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 animate-heartbeat" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EMOJI HEALTH MONITOR
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Because apparently your emoji needs a fitness tracker.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-xl text-xs font-bold border flex items-center space-x-1.5 ${fitnessLevel.color}`}>
            <span>{fitnessLevel.badgeEmoji}</span>
            <span>{fitnessLevel.levelName}</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {healthRecord.date}
          </span>
        </div>
      </div>

      {/* Dynamic Health Score Hero Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow bg-slate-900/90 border border-rose-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Big Score Dial */}
        <div className="flex items-center space-x-6">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950 border-2 border-rose-500/40 flex flex-col items-center justify-center shadow-xl shadow-rose-500/10">
            <span className="text-4xl sm:text-5xl font-black text-white font-mono">
              {dynamicScore}
            </span>
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
              Health Score
            </span>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{fitnessLevel.levelName.toUpperCase()}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {dynamicScore >= 85 ? 'PEAK PIXEL PERFORMANCE' : dynamicScore >= 60 ? 'HEALTHY EQUILIBRIUM' : 'RESTORATION RECOMMENDED'}
            </h2>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              {fitnessLevel.description}
            </p>
          </div>
        </div>

        {/* Right: Health Streaks */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
          <div className="text-center px-2">
            <span className="text-[10px] font-mono text-slate-400 block">Steps</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">🚶 {streaks.stepStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block">Water</span>
            <span className="text-sm font-bold text-blue-400 font-mono">💧 {streaks.waterStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block">Workouts</span>
            <span className="text-sm font-bold text-pink-400 font-mono">🏋️ {streaks.workoutStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block">Sleep</span>
            <span className="text-sm font-bold text-indigo-400 font-mono">😴 {streaks.sleepStreak}d</span>
          </div>
          <div className="text-center px-2 border-l border-slate-800">
            <span className="text-[10px] font-mono text-rose-400 font-bold block">Overall</span>
            <span className="text-sm font-extrabold text-rose-400 font-mono">❤️ {streaks.healthStreak}d</span>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-2xl font-bold whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
              className="p-4 rounded-3xl glass-panel border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-1"
            >
              <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                <span>STEPS</span>
                <span>🚶</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {healthRecord.steps.toLocaleString()}
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400" 
                  style={{ width: `${Math.min(100, (healthRecord.steps / healthRecord.stepGoal) * 100)}%` }} 
                />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('water')}
              className="p-4 rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/50 cursor-pointer transition-all space-y-1"
            >
              <div className="flex justify-between items-center text-xs font-mono text-blue-400">
                <span>WATER</span>
                <span>💧</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {(healthRecord.waterMl / 1000).toFixed(1)} L
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-400" 
                  style={{ width: `${Math.min(100, (healthRecord.waterMl / healthRecord.waterGoalMl) * 100)}%` }} 
                />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('workouts')}
              className="p-4 rounded-3xl glass-panel border border-slate-800 hover:border-pink-500/50 cursor-pointer transition-all space-y-1"
            >
              <div className="flex justify-between items-center text-xs font-mono text-pink-400">
                <span>WORKOUT</span>
                <span>🏋️</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {workouts.reduce((acc, w) => acc + w.durationMinutes, 0)} min
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-pink-500" 
                  style={{ width: `${Math.min(100, (workouts.reduce((acc, w) => acc + w.durationMinutes, 0) / 40) * 100)}%` }} 
                />
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('sleep')}
              className="p-4 rounded-3xl glass-panel border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-1"
            >
              <div className="flex justify-between items-center text-xs font-mono text-indigo-400">
                <span>SLEEP</span>
                <span>😴</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {Math.floor(healthRecord.sleepMinutes / 60)}h {healthRecord.sleepMinutes % 60}m
              </div>
              <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500" 
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
