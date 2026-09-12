import React from 'react';

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
    { key: 'happiness', label: 'Happiness Quotient', emoji: '😊', color: 'accent-amber-500' },
    { key: 'energy', label: 'Synaptic Energy', emoji: '⚡', color: 'accent-sky-600' },
    { key: 'romance', label: 'Romance Sentiment', emoji: '❤️', color: 'accent-rose-500' },
    { key: 'chaos', label: 'Chaos Entropy', emoji: '🔥', color: 'accent-orange-600' },
    { key: 'stress', label: 'Stress Buffer', emoji: '😌', color: 'accent-emerald-600' }
  ];

  return (
    <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-6 shadow-xs">
      
      {/* Title */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-xl shadow-xs">
          🧠
        </div>
        <div>
          <h3 className="text-base font-serif font-bold text-stone-900">Emotional Spectrum</h3>
          <p className="text-xs text-stone-600">Tune your psychological and synaptic bandwidth sliders</p>
        </div>
      </div>

      {/* Sliders List */}
      <div className="space-y-4">
        {sliders.map((s) => (
          <div key={s.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-2 text-stone-700">
                <span className="text-base">{s.emoji}</span>
                <span className="font-medium">{s.label}</span>
              </span>
              <span className="font-mono font-bold text-stone-900">{emotional[s.key]}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={emotional[s.key]}
              onChange={(e) => handleChange(s.key, parseInt(e.target.value, 10))}
              className={`w-full h-2 bg-[#f0eae1] rounded-lg cursor-pointer ${s.color}`}
            />
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] text-xs text-stone-600 italic">
        "Adjusting emotional metrics directly influences your overall Dynamic Health Score and compatibility algorithms."
      </div>

    </div>
  );
};
