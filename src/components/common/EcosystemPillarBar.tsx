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
    <div className="w-full bg-[#faf7f2]/95 border-b border-stone-200/80 px-4 sm:px-6 py-2.5 backdrop-blur-md text-xs select-none text-stone-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        
        {/* Left: Breadcrumbs & Sibling Tabs */}
        <div className="flex items-center space-x-2.5 overflow-x-auto py-0.5 scrollbar-none">
          
          {/* Root Link */}
          <button
            onClick={() => {
              soundService.playReaction();
              onNavigate('landing');
            }}
            className="text-stone-500 hover:text-stone-900 font-mono font-bold tracking-wider uppercase transition-colors flex items-center space-x-1"
          >
            <span>EMOJINATION</span>
          </button>
          
          <span className="text-stone-300 font-mono">/</span>

          {/* Active Pillar Pill */}
          <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase border ${currentPillar.pillarTheme.pill}`}>
            {currentPillar.name}
          </span>

          <span className="text-stone-300 font-mono">/</span>

          {/* Sibling Subsystem Tabs within this Pillar */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
            {currentPillar.apps.map(app => {
              const isCurrent = app.route === currentRoute;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    soundService.playAccept();
                    onNavigate(app.route);
                  }}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-[#143d2b] text-white shadow-sm font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <span>{app.emoji}</span>
                  <span className="truncate max-w-[120px]">{app.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Brand Product Designation Tag */}
          <span className="hidden sm:inline-block font-mono text-[10px] text-stone-400 font-semibold px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
            {currentApp.brandName}
          </span>
        </div>

        {/* Right: Telemetry Ticker & Global Command Hub */}
        <div className="flex items-center space-x-3 text-stone-500 text-[11px] font-mono">
          
          {/* Overengineered Live Status Meter */}
          <div className="hidden lg:flex items-center space-x-2 bg-white px-3 py-1 rounded-xl border border-stone-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-stone-800 font-semibold">NEURAL PULSE: 72 BPM</span>
            <span className="text-stone-300">•</span>
            <span className="text-rose-700 font-medium">ISO-9001 ROMANCE READY</span>
          </div>

          {/* Switch to Other Pillars Quick Pills */}
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-stone-400 uppercase text-[10px]">Jump:</span>
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
                    className="px-2 py-0.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80 shadow-sm transition-colors text-[10px]"
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
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/80 shadow-sm transition-all"
          >
            <Command className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium text-xs">Hub</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 bg-stone-100 rounded text-[9px] text-stone-500 border border-stone-200">
              ⌘K
            </kbd>
          </button>

        </div>

      </div>
    </div>
  );
};
