import React, { useState } from 'react';

interface SleepTrackerProps {
  sleepMinutes: number;
  sleepGoalMinutes: number;
  bedtime: string;
  wakeTime: string;
  onUpdateSleep: (mins: number, bed: string, wake: string) => void;
}

export const SleepTracker: React.FC<SleepTrackerProps> = ({
  sleepMinutes,
  sleepGoalMinutes,
  bedtime,
  wakeTime,
  onUpdateSleep
}) => {
  const [bed, setBed] = useState(bedtime);
  const [wake, setWake] = useState(wakeTime);
  const [hours, setHours] = useState(String(Math.floor(sleepMinutes / 60)));
  const [minutes, setMinutes] = useState(String(sleepMinutes % 60));

  const sleepHours = Math.floor(sleepMinutes / 60);
  const sleepRemMins = sleepMinutes % 60;
  const goalHours = Math.floor(sleepGoalMinutes / 60);
  const progressPercent = Math.min(100, Math.round((sleepMinutes / Math.max(1, sleepGoalMinutes)) * 100));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const total = h * 60 + m;
    if (total > 0) {
      onUpdateSleep(total, bed, wake);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-6 shadow-xs">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-xl shadow-xs">
            😴
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">Sleep & Rest Cycle</h3>
            <p className="text-xs text-stone-600">Regenerate pixel integrity through horizontal slumber</p>
          </div>
        </div>

        <span className="text-xs font-mono text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
          Target: {goalHours}h
        </span>
      </div>

      {/* Progress & Stat */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              {sleepHours}h {sleepRemMins}m
            </span>
            <span className="text-xs font-mono text-stone-500">
              / {goalHours}h target
            </span>
          </div>
          <span className="text-sm font-bold text-indigo-900 font-mono">
            {progressPercent}%
          </span>
        </div>

        <div className="w-full h-3 rounded-full bg-[#f0eae1] p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Bedtime & Wake Time Log Form */}
      <form onSubmit={handleSave} className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-3 text-xs">
        <span className="font-mono text-stone-700 block font-bold">Update Sleep Session:</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <label className="text-[10px] text-stone-500 block mb-1">Bedtime:</label>
            <input
              type="time"
              value={bed}
              onChange={(e) => setBed(e.target.value)}
              className="w-full bg-white text-stone-900 text-xs rounded-xl p-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-500 block mb-1">Wake Time:</label>
            <input
              type="time"
              value={wake}
              onChange={(e) => setWake(e.target.value)}
              className="w-full bg-white text-stone-900 text-xs rounded-xl p-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-500 block mb-1">Hours:</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full bg-white text-stone-900 text-xs rounded-xl p-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              min="0"
              max="24"
            />
          </div>
          <div>
            <label className="text-[10px] text-stone-500 block mb-1">Minutes:</label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full bg-white text-stone-900 text-xs rounded-xl p-2 border border-[#e5dcce] focus:outline-none focus:border-[#143d2b]"
              min="0"
              max="59"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Save Sleep Record
          </button>
        </div>
      </form>

    </div>
  );
};
