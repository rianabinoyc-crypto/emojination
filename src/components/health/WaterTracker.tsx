import React, { useState } from 'react';
import { Droplet } from 'lucide-react';

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
    <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-6 shadow-xs">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-xl shadow-xs">
            💧
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">Hydration Matrix</h3>
            <p className="text-xs text-stone-600">Keep your emojis hydrated and lubricated</p>
          </div>
        </div>

        <span className="text-xs font-mono text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
          Target: {goalL} L
        </span>
      </div>

      {/* Progress Metric & Main Bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {currentL} L
            </span>
            <span className="text-xs font-mono text-stone-500">
              / {goalL} L ({waterMl.toLocaleString()} ml)
            </span>
          </div>
          <span className="text-sm font-bold text-sky-800 font-mono">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-[#f0eae1] p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-sky-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="space-y-2 pt-2 border-t border-[#f0eae1]">
        <span className="text-xs font-mono text-stone-600 block font-semibold">Quick Log Volume:</span>
        <div className="flex flex-wrap items-center gap-2">
          {[250, 500, 750].map((amt) => (
            <button
              key={amt}
              onClick={() => onAddWater(amt)}
              className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#faf7f2] text-stone-800 text-xs font-semibold border border-[#e5dcce] transition-all active:scale-95 shadow-xs"
            >
              <Droplet className="w-3 h-3 text-sky-600" />
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
            className="flex-1 bg-white text-stone-900 placeholder-stone-400 rounded-xl px-3 py-2 text-xs border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
            min="1"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2 rounded-xl bg-[#143d2b] text-white font-semibold text-xs disabled:opacity-40 hover:bg-[#0f2e20] transition-all"
          >
            Log Water
          </button>
        </form>
      </div>

    </div>
  );
};
