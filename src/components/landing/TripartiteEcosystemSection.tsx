import React, { useState } from 'react';
import {
  ECOSYSTEM_HIERARCHY,
  EcosystemPillarId,
  EcosystemPillarMeta,
  EcosystemAppMeta,
} from '../../data/ecosystemHierarchy';
import { EmojiArrowIcon, EmojiSparkleIcon } from './CustomIcons';
import { soundService } from '../../services/soundService';

interface TripartiteEcosystemSectionProps {
  onNavigate: (route: string) => void;
}

export const TripartiteEcosystemSection: React.FC<TripartiteEcosystemSectionProps> = ({ onNavigate }) => {
  const [activePillarId, setActivePillarId] = useState<EcosystemPillarId>('CONNECT');

  const activePillar = ECOSYSTEM_HIERARCHY[activePillarId];

  const handlePillarSelect = (id: EcosystemPillarId) => {
    soundService.playReaction();
    setActivePillarId(id);
  };

  const handleAppLaunch = (route: string) => {
    soundService.playAccept();
    onNavigate(route);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 select-none">
      
      {/* Section Blueprint Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 border-b border-stone-200/80 pb-6 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-stone-400 text-xs font-mono tracking-wider uppercase mb-2">
            <span>[ARCHITECTURE 01]</span>
            <span>•</span>
            <span>THE TRIPARTITE ECOSYSTEM MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900">
            One Unified <span className="italic font-normal text-stone-600">Emoji Universe</span>
          </h2>
        </div>
        <p className="text-stone-500 font-serif italic text-sm sm:text-base max-w-md">
          Not disparate pages, but a structured multi-pillar operating system solving simple emoji problems with unnecessarily complicated technology.
        </p>
      </div>

      {/* Overengineered Hierarchy Schematic (Tree Diagram) */}
      <div className="mb-10 text-center font-mono">
        {/* Master Root Node */}
        <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-2xl bg-stone-900 text-stone-50 shadow-md">
          <EmojiSparkleIcon className="w-4 h-4 text-amber-300" />
          <span className="font-serif font-bold text-sm tracking-wider">EMOJINATION™</span>
          <span className="text-[10px] text-stone-400 font-mono">[ROOT / OS v2.0]</span>
        </div>

        {/* Connector Stem */}
        <div className="w-[1.5px] h-6 bg-stone-300 mx-auto my-1" />

        {/* Three Branching Stems */}
        <div className="max-w-3xl mx-auto relative hidden md:block">
          <div className="h-[1.5px] bg-stone-300 w-full" />
          <div className="flex justify-between">
            <div className="w-[1.5px] h-6 bg-stone-300 ml-8" />
            <div className="w-[1.5px] h-6 bg-stone-300" />
            <div className="w-[1.5px] h-6 bg-stone-300 mr-8" />
          </div>
        </div>
      </div>

      {/* The 3 Pillars Interactive Command Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {(Object.keys(ECOSYSTEM_HIERARCHY) as EcosystemPillarId[]).map((pillarKey) => {
          const pillar = ECOSYSTEM_HIERARCHY[pillarKey];
          const isSelected = activePillarId === pillarKey;

          return (
            <div
              key={pillarKey}
              onClick={() => handlePillarSelect(pillarKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePillarSelect(pillarKey)}
              className={`group cursor-pointer p-5 sm:p-6 rounded-3xl border transition-all duration-300 text-left relative focus:outline-none ${
                isSelected
                  ? 'bg-white shadow-xl shadow-stone-900/5 border-stone-800 -translate-y-1'
                  : 'bg-white/60 hover:bg-white/90 border-stone-200/80 hover:border-stone-300'
              }`}
            >
              {/* Pillar Meta Tag */}
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-stone-400 font-semibold">{pillar.code}</span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  {pillar.apps.length} Systems Active
                </span>
              </div>

              {/* Title with Glyph */}
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                  {pillar.emoji}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  {pillar.name}
                </h3>
              </div>

              {/* Headline */}
              <p className="text-xs font-serif italic text-stone-600 mb-3 line-clamp-1">
                {pillar.headline}
              </p>

              {/* App Capsule Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-stone-100">
                {pillar.apps.map(app => (
                  <span
                    key={app.id}
                    className="inline-flex items-center space-x-1 px-2 py-1 rounded-lg bg-stone-50 border border-stone-200/60 text-[11px] font-mono text-stone-700"
                  >
                    <span>{app.emoji}</span>
                    <span>{app.shortTitle}</span>
                  </span>
                ))}
              </div>

              {/* Active Indicator Bar */}
              <div className={`absolute bottom-0 inset-x-6 h-1 rounded-full transition-all duration-300 ${
                isSelected ? 'bg-stone-900' : 'bg-transparent'
              }`} />
            </div>
          );
        })}
      </div>

      {/* Focused Pillar Blueprint & Deep Link Launchpad */}
      <div className="rounded-3xl bg-white border border-stone-200 shadow-lg p-6 sm:p-10 backdrop-blur-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-stone-400 uppercase">
              <span>ACTIVE PILLAR DOSSIER</span>
              <span>•</span>
              <span className="font-bold text-stone-800">{activePillar.name}</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1">
              {activePillar.headline}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-sm">
            {activePillar.description}
          </p>
        </div>

        {/* Deep Apps in this Pillar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {activePillar.apps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppLaunch(app.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleAppLaunch(app.route)}
              className="group cursor-pointer p-5 rounded-2xl bg-[#faf8f5] hover:bg-white border border-stone-200/70 hover:border-stone-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-stone-400">
                  <span>[{app.number}]</span>
                  <span className="text-stone-600 font-semibold">{app.shortTitle}</span>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    {app.emoji}
                  </span>
                  <h5 className="text-base sm:text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {app.title}
                  </h5>
                </div>

                <p className="text-xs text-stone-600 font-medium mb-2">
                  {app.tagline}
                </p>
                <p className="text-[10px] font-mono text-stone-400 leading-tight">
                  {app.technicalSubtext}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-mono text-stone-500 group-hover:text-stone-900 transition-colors">
                <span>Launch Subsystem</span>
                <EmojiArrowIcon className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
