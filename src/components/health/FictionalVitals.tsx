import React from 'react';
import { Heart, Activity, Zap, Skull, ShieldAlert, Sparkles } from 'lucide-react';

interface FictionalVitalsProps {
  stress: number;
  energy: number;
  chaos: number;
}

export const FictionalVitals: React.FC<FictionalVitalsProps> = ({
  stress,
  energy,
  chaos
}) => {
  return (
    <div className="p-6 rounded-3xl glass-panel-glow border border-pink-500/30 bg-slate-900/90 space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center text-xl">
            🩺
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">EMOJI VITALS</h3>
            <p className="text-xs text-slate-400">Biological telemetry of imaginary unicode lifeforms</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold uppercase tracking-wider animate-pulse">
          Simulated Signal
        </span>
      </div>

      {/* Grid of Vitals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Heart Rate with Animated Pulse */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-center relative overflow-hidden">
          <div className="w-9 h-9 mx-auto rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center animate-heartbeat">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Emoji Heart Rate</span>
          <div className="text-2xl font-black text-white font-mono">
            72 <span className="text-xs font-normal text-rose-400">BPM</span>
          </div>
        </div>

        {/* Stress */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-center">
          <div className="text-2xl">🧠</div>
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Stress</span>
          <div className="text-2xl font-black text-cyan-400 font-mono">
            {stress}%
          </div>
        </div>

        {/* Energy */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-center">
          <div className="text-2xl">⚡</div>
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Energy</span>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {energy}%
          </div>
        </div>

        {/* Chaos */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-center">
          <div className="text-2xl">💀</div>
          <span className="text-[10px] font-mono text-slate-400 uppercase block">Chaos</span>
          <div className="text-2xl font-black text-purple-400 font-mono">
            {chaos}%
          </div>
        </div>

      </div>

      {/* Explicit Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex items-start space-x-2.5 text-[11px] text-slate-400">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Disclaimer:</strong> These vitals are strictly fictional metrics designed for entertainment and satirical algorithmic immersion. Emojis possess zero biological cells or heart muscle.
        </p>
      </div>

    </div>
  );
};
