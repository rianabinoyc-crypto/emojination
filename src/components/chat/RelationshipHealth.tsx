import React from 'react';
import { RelationshipHealth as IRelationshipHealth } from '../../types';
import { Activity, ShieldCheck, Heart, Sparkles } from 'lucide-react';

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
    { label: 'Chemistry', emoji: '🔥', value: health.chemistry, color: 'bg-pink-500' },
    { label: 'Chaos', emoji: '💀', value: health.chaos, color: 'bg-purple-500' },
    { label: 'Communication', emoji: '💬', value: health.communication, color: 'bg-cyan-500' },
  ];

  return (
    <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-3 bg-slate-900/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-pink-400" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
            RELATIONSHIP HEALTH MATRIX
          </h4>
        </div>
        <span className="text-[11px] font-bold text-pink-400 font-mono">
          {partnerEmoji} {partnerName}
        </span>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2 text-xs">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex items-center justify-between text-slate-300 text-[11px]">
              <span className="flex items-center space-x-1.5">
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </span>
              <span className="font-mono font-bold text-slate-200">{m.value}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className={`h-full rounded-full ${m.color} transition-all duration-500`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Humorous Diagnosis */}
      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2 text-xs">
        <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200 block">Algorithmic Diagnosis:</span>
          <p className="text-slate-400 italic mt-0.5 leading-relaxed">
            "{health.diagnosis}"
          </p>
        </div>
      </div>
    </div>
  );
};
