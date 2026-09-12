import React, { useState } from 'react';
import { Plus, Flame, Compass } from 'lucide-react';
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
    <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-6 shadow-xs">
      
      {/* Title & Goal */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-xl shadow-xs">
            🚶
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">Step Telemetry</h3>
            <p className="text-xs text-stone-600">Track your daily ambulatory emoji metrics</p>
          </div>
        </div>

        <div>
          {editingGoal ? (
            <form onSubmit={handleSaveGoal} className="flex items-center space-x-1.5">
              <input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-24 bg-white text-xs px-2.5 py-1 rounded-lg border border-[#e5dcce] text-stone-900 focus:outline-none focus:border-[#143d2b]"
                min="1000"
              />
              <button
                type="submit"
                className="text-[10px] bg-[#143d2b] text-white font-bold px-2 py-1 rounded-lg"
              >
                Save
              </button>
            </form>
          ) : (
            <button
              onClick={() => setEditingGoal(true)}
              className="text-xs font-mono text-[#143d2b] hover:underline"
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
            <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {steps.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-stone-500">
              / {stepGoal.toLocaleString()} steps
            </span>
          </div>
          <span className="text-sm font-bold text-emerald-700 font-mono">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-[#f0eae1] p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Distance & Calorie telemetry */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center space-x-3">
          <Compass className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Distance</span>
            <span className="text-sm font-bold text-stone-900 font-mono">{distanceKm} km</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center space-x-3">
          <Flame className="w-5 h-5 text-rose-600 flex-shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase block">Burned</span>
            <span className="text-sm font-bold text-stone-900 font-mono">{caloriesBurned} kcal</span>
          </div>
        </div>
      </div>

      {/* Quick Add Increments */}
      <div className="space-y-2 pt-2 border-t border-[#f0eae1]">
        <span className="text-xs font-mono text-stone-600 block font-semibold">Quick Log Steps:</span>
        <div className="flex flex-wrap items-center gap-2">
          {[100, 500, 1000, 2500].map((amt) => (
            <button
              key={amt}
              onClick={() => onAddSteps(amt)}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#faf7f2] text-stone-800 text-xs font-semibold border border-[#e5dcce] transition-all active:scale-95 shadow-xs"
            >
              <Plus className="w-3 h-3 text-[#143d2b]" />
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
            className="flex-1 bg-white text-stone-900 placeholder-stone-400 rounded-xl px-3 py-2 text-xs border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
            min="1"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2 rounded-xl bg-[#143d2b] text-white font-semibold text-xs disabled:opacity-40 hover:bg-[#0f2e20] transition-all"
          >
            Log
          </button>
        </form>
      </div>

    </div>
  );
};
