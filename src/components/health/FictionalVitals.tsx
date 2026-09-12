import React from 'react';
import { Heart, ShieldAlert } from 'lucide-react';

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
    <div className="p-6 rounded-3xl border border-[#e5dcce] bg-white space-y-6 shadow-xs">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-center text-xl shadow-xs">
            🩺
          </div>
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">Synthetic Biometrics</h3>
            <p className="text-xs text-stone-600">Simulated vital signs of imaginary unicode lifeforms</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#143d2b]/10 text-[#143d2b] border border-[#143d2b]/20 text-[10px] font-mono font-bold uppercase tracking-wider">
          Simulated Feed
        </span>
      </div>

      {/* Grid of Vitals */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Heart Rate with Animated Pulse */}
        <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-1 text-center relative overflow-hidden">
          <div className="w-9 h-9 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center animate-heartbeat">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <span className="text-[10px] font-mono text-stone-500 uppercase block">Emoji Pulse</span>
          <div className="text-2xl font-serif font-bold text-stone-900">
            72 <span className="text-xs font-sans font-normal text-rose-600">BPM</span>
          </div>
        </div>

        {/* Stress */}
        <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-1 text-center">
          <div className="text-2xl">🧠</div>
          <span className="text-[10px] font-mono text-stone-500 uppercase block">Stress</span>
          <div className="text-2xl font-serif font-bold text-emerald-800">
            {stress}%
          </div>
        </div>

        {/* Energy */}
        <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-1 text-center">
          <div className="text-2xl">⚡</div>
          <span className="text-[10px] font-mono text-stone-500 uppercase block">Energy</span>
          <div className="text-2xl font-serif font-bold text-amber-700">
            {energy}%
          </div>
        </div>

        {/* Chaos */}
        <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-1 text-center">
          <div className="text-2xl">💀</div>
          <span className="text-[10px] font-mono text-stone-500 uppercase block">Chaos</span>
          <div className="text-2xl font-serif font-bold text-orange-700">
            {chaos}%
          </div>
        </div>

      </div>

      {/* Explicit Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-start space-x-2.5 text-xs text-stone-600">
        <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-stone-800">Disclaimer:</strong> These vitals are strictly fictional metrics designed for entertainment and satirical algorithmic immersion. Emojis possess zero biological cells or heart muscle.
        </p>
      </div>

    </div>
  );
};
