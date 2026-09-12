import React, { useState } from 'react';
import { Droplet, Plus, Sparkles } from 'lucide-react';

interface WaterTrackerProps {
  waterMl: number;
  waterGoalMl: number;
  onAddWater: (amountMl: number) => void;
  onSetGoal: (goalMl: number) => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  waterMl,
  waterGoalMl,
  onAddWater,
  onSetGoal
}) => {
  const [customInput, setCustomInput] = useState('');

  const currentL = (waterMl / 1000).toFixed(1);
  const goalL = (waterGoalMl / 1000).toFixed(1);
  const progressPercent = Math.min(100, Math.round((waterMl / Math.max(1, waterGoalMl)) * 100));

  const handleCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onAddWater(parsed);
      setCustomInput('');
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 bg-slate-900/80">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xl">
            💧
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">WATER INTAKE</h3>
            <p className="text-xs text-slate-400">Keep your emojis hydrated and lubricated</p>
          </div>
        </div>

        <span className="text-xs font-mono text-blue-400">
          Goal: {goalL} L
        </span>
      </div>

      {/* Progress Metric & Main Bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
              {currentL} L
            </span>
            <span className="text-xs font-mono text-slate-400">
              / {goalL} L ({waterMl.toLocaleString()} ml)
            </span>
          </div>
          <span className="text-sm font-bold text-blue-400 font-mono">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-4 rounded-full bg-slate-950 p-0.5 border border-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="space-y-2 pt-2 border-t border-slate-800/80">
        <span className="text-xs font-mono text-slate-400 block">Quick Drink Hydration:</span>
        <div className="flex flex-wrap items-center gap-2">
          {[250, 500, 750].map((amt) => (
            <button
              key={amt}
              onClick={() => onAddWater(amt)}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-300 text-xs font-bold border border-slate-700 transition-all active:scale-95"
            >
              <Droplet className="w-3 h-3" />
              <span>+{amt} ml</span>
            </button>
          ))}
        </div>

        {/* Custom Input */}
        <form onSubmit={handleCustomAdd} className="flex items-center space-x-2 pt-2">
          <input
            type="number"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Custom ml (e.g. 350)..."
            className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 rounded-xl px-3 py-2 text-xs border border-slate-800 focus:border-blue-500"
            min="1"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2 rounded-xl bg-blue-500 text-slate-950 font-bold text-xs disabled:opacity-40 hover:bg-blue-400 transition-all"
          >
            Log Water
          </button>
        </form>
      </div>

    </div>
  );
};
