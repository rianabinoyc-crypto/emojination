import React from 'react';
import { Smile, Heart, Zap, Skull, ShieldAlert } from 'lucide-react';

interface EmotionalMetrics {
  happiness: number;
  energy: number;
  romance: number;
  chaos: number;
  stress: number;
}

interface EmotionalHealthProps {
  emotional: EmotionalMetrics;
  onUpdateEmotional: (updated: EmotionalMetrics) => void;
}

export const EmotionalHealth: React.FC<EmotionalHealthProps> = ({
  emotional,
  onUpdateEmotional
}) => {
  const handleChange = (key: keyof EmotionalMetrics, value: number) => {
    onUpdateEmotional({
      ...emotional,
      [key]: value
    });
  };

  const sliders: { key: keyof EmotionalMetrics; label: string; emoji: string; color: string }[] = [
    { key: 'happiness', label: 'Happiness', emoji: '😊', color: 'accent-amber-400' },
    { key: 'energy', label: 'Energy Level', emoji: '⚡', color: 'accent-cyan-400' },
    { key: 'romance', label: 'Romance Sentiment', emoji: '❤️', color: 'accent-rose-500' },
    { key: 'chaos', label: 'Chaos Entropy', emoji: '💀', color: 'accent-purple-500' },
    { key: 'stress', label: 'Stress Index', emoji: '😌', color: 'accent-pink-500' }
  ];

  return (
    <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6 bg-slate-900/80">
      
      {/* Title */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center text-xl">
          🧠
        </div>
        <div>
          <h3 className="text-base font-extrabold text-white">EMOTIONAL HEALTH</h3>
          <p className="text-xs text-slate-400">Tune your psychological and synaptic bandwidth sliders</p>
        </div>
      </div>

      {/* Sliders List */}
      <div className="space-y-4">
        {sliders.map((s) => (
          <div key={s.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-slate-300">
                <span className="text-base">{s.emoji}</span>
                <span>{s.label}</span>
              </span>
              <span className="font-bold text-white">{emotional[s.key]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={emotional[s.key]}
              onChange={(e) => handleChange(s.key, parseInt(e.target.value, 10))}
              className={`w-full h-2 bg-slate-950 rounded-lg cursor-pointer ${s.color}`}
            />
          </div>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 italic">
        "Adjusting emotional metrics directly influences your overall Dynamic Health Score and compatibility algorithms."
      </div>

    </div>
  );
};
