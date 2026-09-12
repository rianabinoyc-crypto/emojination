import React, { useState } from 'react';
import { WorkoutItem } from '../../types';
import { Dumbbell, Plus, Trash2, Edit3, Flame, Clock, Filter, Calendar } from 'lucide-react';
import { getTodayDateString } from '../../services/storageService';

const WORKOUT_PRESETS = [
  { name: 'Running', emoji: '🏃', calPerMin: 11 },
  { name: 'Walking', emoji: '🚶', calPerMin: 4 },
  { name: 'Cycling', emoji: '🚴', calPerMin: 8 },
  { name: 'Gym / Weights', emoji: '🏋️', calPerMin: 7 },
  { name: 'Swimming', emoji: '🏊', calPerMin: 10 },
  { name: 'Yoga', emoji: '🧘', calPerMin: 4 },
  { name: 'Stretching', emoji: '🤸', calPerMin: 3 },
  { name: 'Dancing', emoji: '💃', calPerMin: 8 },
  { name: 'Sports', emoji: '⚽', calPerMin: 9 },
  { name: 'Custom', emoji: '⚡', calPerMin: 6 }
];

interface WorkoutTrackerProps {
  workouts: WorkoutItem[];
  onAddWorkout: (workout: WorkoutItem) => void;
  onDeleteWorkout: (id: string) => void;
}

export const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({
  workouts,
  onAddWorkout,
  onDeleteWorkout
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activity, setActivity] = useState('Running');
  const [duration, setDuration] = useState('30');
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');
  const [filterType, setFilterType] = useState('all');

  const selectedPreset = WORKOUT_PRESETS.find(p => p.name === activity) || WORKOUT_PRESETS[0];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const durMins = parseInt(duration, 10);
    if (isNaN(durMins) || durMins <= 0) return;

    const intensityMultiplier = intensity === 'high' ? 1.3 : intensity === 'low' ? 0.8 : 1.0;
    const estCalories = Math.round(durMins * selectedPreset.calPerMin * intensityMultiplier);

    const newWorkout: WorkoutItem = {
      id: `wo-${Date.now()}`,
      activity: selectedPreset.name,
      emoji: selectedPreset.emoji,
      durationMinutes: durMins,
      intensity,
      caloriesBurned: estCalories,
      date: getTodayDateString(),
      notes: notes.trim() || 'Logged via Emoji Health'
    };

    onAddWorkout(newWorkout);
    setShowAddForm(false);
    setNotes('');
    setDuration('30');
  };

  const filteredWorkouts = workouts.filter(w => {
    if (filterType === 'all') return true;
    return w.activity.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 bg-slate-900/80">
      
      {/* Title & Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center text-xl">
            🏋️
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">WORKOUT TRACKER</h3>
            <p className="text-xs text-slate-400">Record, filter, and review athletic exertion</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-pink-500 text-white font-bold text-xs hover:bg-pink-600 transition-all shadow-md shadow-pink-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Workout</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Activity:</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl px-3 py-2 border border-slate-800"
              >
                {WORKOUT_PRESETS.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.emoji} {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Duration (minutes):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl px-3 py-2 border border-slate-800"
                min="1"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 block mb-1">Intensity:</label>
              <div className="grid grid-cols-3 gap-1">
                {(['low', 'medium', 'high'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setIntensity(lvl)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                      intensity === lvl ? 'bg-pink-500 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Notes / Routine:</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 5 sets of bench press, high pace interval..."
              className="w-full bg-slate-900 text-slate-100 text-xs rounded-xl px-3 py-2 border border-slate-800"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-bold shadow"
            >
              Save Workout
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Filter:</span>
        {['all', 'Running', 'Walking', 'Gym / Weights', 'Yoga', 'Cycling'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterType(cat)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap ${
              filterType === cat
                ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Activities' : cat}
          </button>
        ))}
      </div>

      {/* Workout History List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {filteredWorkouts.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <span className="text-3xl block mb-2">🛋️</span>
            <p className="text-xs font-semibold">Your emoji appears to be enjoying a sedentary lifestyle.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Click "Log Workout" above to record your first sweat session!</p>
          </div>
        ) : (
          filteredWorkouts.map((w) => (
            <div
              key={w.id}
              className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{w.emoji}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-white">{w.activity}</h4>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {w.intensity} intensity
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{w.notes}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right font-mono text-xs">
                  <div className="text-slate-200 font-bold">{w.durationMinutes} min</div>
                  <div className="text-pink-400 text-[10px]">{w.caloriesBurned} kcal</div>
                </div>

                <button
                  onClick={() => onDeleteWorkout(w.id)}
                  title="Delete workout"
                  className="text-slate-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
