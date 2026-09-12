import React, { useState } from 'react';
import { Footprints, Plus, Flame, Compass, CheckCircle2 } from 'lucide-react';
import { calculateDistanceKm, calculateStepCalories } from '../../services/healthService';

interface StepTrackerProps {
  steps: number;
  stepGoal: number;
  onAddSteps: (amount: number) => void;
  onSetGoal: (goal: number) => void;
}

export const StepTracker: React.FC<StepTrackerProps> = ({
  steps,
  stepGoal,
  onAddSteps,
  onSetGoal
}) => {
  const [customInput, setCustomInput] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(String(stepGoal));

  const progressPercent = Math.min(100, Math.round((steps / Math.max(1, stepGoal)) * 100));
  const distanceKm = calculateDistanceKm(steps);
  const caloriesBurned = calculateStepCalories(steps);

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onAddSteps(parsed);
      setCustomInput('');
    }
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(goalInput, 10);
    if (!isNaN(parsed) && parsed >= 1000) {
      onSetGoal(parsed);
      setEditingGoal(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 bg-slate-900/80">
      
      {/* Title & Goal */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-xl">
            🚶
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">STEP TRACKER</h3>
            <p className="text-xs text-slate-400">Track your daily ambulatory emoji metrics</p>
          </div>
        </div>

        <div>
          {editingGoal ? (
            <form onSubmit={handleSaveGoal} className="flex items-center space-x-1.5">
              <input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-24 bg-slate-950 text-xs px-2.5 py-1 rounded-lg border border-cyan-500 text-white"
                min="1000"
              />
              <button
                type="submit"
                className="text-[10px] bg-cyan-500 text-slate-950 font-bold px-2 py-1 rounded-lg"
              >
                Save
              </button>
            </form>
          ) : (
            <button
              onClick={() => setEditingGoal(true)}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              Goal: {stepGoal.toLocaleString()}
            </button>
          )}
        </div>
      </div>

      {/* Progress Metric & Main Bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
              {steps.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">
              / {stepGoal.toLocaleString()} steps
            </span>
          </div>
          <span className="text-sm font-bold text-cyan-400 font-mono">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-4 rounded-full bg-slate-950 p-0.5 border border-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Distance & Calorie telemetry */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
          <Compass className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Distance</span>
            <span className="text-sm font-bold text-white font-mono">{distanceKm} km</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
          <Flame className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Burned</span>
            <span className="text-sm font-bold text-white font-mono">{caloriesBurned} kcal</span>
          </div>
        </div>
      </div>

      {/* Quick Add Increments */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <span className="text-xs font-mono text-slate-400 block">Quick Log Steps:</span>
        <div className="flex flex-wrap items-center gap-2">
          {[100, 500, 1000, 2500].map((amt) => (
            <button
              key={amt}
              onClick={() => onAddSteps(amt)}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-all active:scale-95"
            >
              <Plus className="w-3 h-3" />
              <span>+{amt.toLocaleString()}</span>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <form onSubmit={handleCustomAdd} className="flex items-center space-x-2 pt-2">
          <input
            type="number"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Custom steps amount..."
            className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 rounded-xl px-3 py-2 text-xs border border-slate-800 focus:border-cyan-500"
            min="1"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs disabled:opacity-40 hover:bg-cyan-400 transition-all"
          >
            Log
          </button>
        </form>
      </div>

    </div>
  );
};
