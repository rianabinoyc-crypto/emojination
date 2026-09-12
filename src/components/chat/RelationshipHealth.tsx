import React from 'react';
import { RelationshipHealth as IRelationshipHealth } from '../../types';
import { Activity, Sparkles } from 'lucide-react';

interface RelationshipHealthProps {
  health: IRelationshipHealth;
  partnerName: string;
  partnerEmoji: string;
}

export const RelationshipHealth: React.FC<RelationshipHealthProps> = ({
  health,
  partnerName,
  partnerEmoji
}) => {
  const metrics = [
    { label: 'Romance', emoji: '❤️', value: health.romance, color: 'bg-rose-500' },
    { label: 'Humor', emoji: '😂', value: health.humor, color: 'bg-amber-500' },
    { label: 'Chemistry', emoji: '🔥', value: health.chemistry, color: 'bg-orange-500' },
    { label: 'Chaos', emoji: '⚡', value: health.chaos, color: 'bg-purple-600' },
    { label: 'Communication', emoji: '💬', value: health.communication, color: 'bg-emerald-600' },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-3xl border border-[#e5dcce] space-y-3.5 bg-white shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-[#143d2b]" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
            RELATIONSHIP HEALTH MATRIX
          </h4>
        </div>
        <span className="text-xs font-semibold text-[#143d2b] font-mono">
          {partnerEmoji} {partnerName}
        </span>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-between text-stone-700 text-[11px]">
              <span className="flex items-center space-x-1.5">
                <span>{m.emoji}</span>
                <span className="font-medium">{m.label}</span>
              </span>
              <span className="font-mono font-bold text-stone-900">{m.value}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#f0eae1] overflow-hidden">
              <div
                className={`h-full rounded-full ${m.color} transition-all duration-500`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Humorous Diagnosis */}
      <div className="p-3 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-start space-x-2.5 text-xs">
        <Sparkles className="w-4 h-4 text-[#143d2b] flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900 block font-mono text-[11px]">Algorithmic Diagnosis:</span>
          <p className="text-stone-700 italic mt-0.5 leading-relaxed font-sans">
            "{health.diagnosis}"
          </p>
        </div>
      </div>
    </div>
  );
};
