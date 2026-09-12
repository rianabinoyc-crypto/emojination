import React from 'react';
import {
  getPillarByRoute,
  getAppMetaByRoute,
  ECOSYSTEM_HIERARCHY,
  EcosystemPillarId,
} from '../../data/ecosystemHierarchy';
import { Activity, Sparkles, Command, ArrowRight } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface EcosystemPillarBarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenCommandPalette: () => void;
}

export const EcosystemPillarBar: React.FC<EcosystemPillarBarProps> = ({
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
}) => {
  const currentPillar = getPillarByRoute(currentRoute);
  const currentApp = getAppMetaByRoute(currentRoute);

  if (!currentPillar || !currentApp) return null;

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800/80 px-4 sm:px-6 py-2.5 backdrop-blur-md text-xs select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Left: Breadcrumbs & Sibling Tabs */}
        <div className="flex items-center space-x-2.5 overflow-x-auto py-0.5 scrollbar-none">
          
          {/* Root Link */}
          <button
            onClick={() => {
              soundService.playReaction();
              onNavigate('landing');
            }}
            className="text-slate-400 hover:text-pink-400 font-mono font-bold tracking-wider uppercase transition-colors flex items-center space-x-1"
          >
            <span>EMOJINATION</span>
          </button>
          
          <span className="text-slate-600 font-mono">/</span>

          {/* Active Pillar Pill */}
          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase border ${currentPillar.borderAccent} bg-slate-950 ${currentPillar.textAccent}`}>
            {currentPillar.name}
          </span>

          <span className="text-slate-600 font-mono">/</span>

          {/* Sibling Subsystem Tabs within this Pillar */}
          <div className="flex items-center space-x-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
            {currentPillar.apps.map(app => {
              const isCurrent = app.route === currentRoute;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    soundService.playAccept();
                    onNavigate(app.route);
                  }}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{app.emoji}</span>
                  <span className="truncate max-w-[120px]">{app.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Telemetry Ticker & Global Command Hub */}
        <div className="flex items-center space-x-3 text-slate-400 text-[11px] font-mono">
          
          {/* Overengineered Live Status Meter */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-300 font-medium">NEURAL LOAD: OPTIMAL</span>
            <span className="text-slate-600">•</span>
            <span className="text-pink-400 font-medium">ISO-9001 COMPLIANT</span>
          </div>

          {/* Switch to Other Pillars Quick Pills */}
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-slate-600 uppercase text-[10px]">Jump:</span>
            {(Object.keys(ECOSYSTEM_HIERARCHY) as EcosystemPillarId[])
              .filter(p => p !== currentPillar.id)
              .map(otherKey => {
                const otherPillar = ECOSYSTEM_HIERARCHY[otherKey];
                const defaultApp = otherPillar.apps[0];
                return (
                  <button
                    key={otherKey}
                    onClick={() => {
                      soundService.playAccept();
                      onNavigate(defaultApp.route);
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[10px]"
                  >
                    {otherPillar.emoji} {otherPillar.name}
                  </button>
                );
              })}
          </div>

          {/* Spotlight Command Hub Trigger */}
          <button
            onClick={() => {
              soundService.playReaction();
              onOpenCommandPalette();
            }}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-pink-500/50 shadow-sm transition-all"
          >
            <Command className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-semibold text-xs">Hub</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 bg-slate-900 rounded text-[9px] text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

        </div>

      </div>
    </div>
  );
};
