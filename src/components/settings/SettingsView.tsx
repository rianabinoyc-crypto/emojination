import React from 'react';
import { AppSettings, ChatMode } from '../../types';
import { Settings, Volume2, VolumeX, RefreshCw, Sparkles, Zap, ShieldAlert, Sliders, Database } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface SettingsViewProps {
  settings: AppSettings;
  onUpdateSettings: (updated: AppSettings) => void;
  onResetAllData: () => void;
  onSeedDemoData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetAllData,
  onSeedDemoData
}) => {
  const handleSoundToggle = () => {
    const next = !settings.soundEnabled;
    soundService.setEnabled(next);
    if (next) soundService.playAccept();
    onUpdateSettings({ ...settings, soundEnabled: next });
  };

  const handleDelayChange = (delay: 'fast' | 'normal' | 'dramatic') => {
    onUpdateSettings({ ...settings, chatDelay: delay });
  };

  const handleModeChange = (mode: ChatMode) => {
    onUpdateSettings({ ...settings, defaultChatMode: mode });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150 text-stone-800">
      
      {/* Header */}
      <div className="pb-4 border-b border-[#e5dcce]">
        <div className="flex items-center space-x-3">
          <Sliders className="w-7 h-7 text-[#143d2b]" />
          <h1 className="text-3xl sm:text-4xl font-serif text-[#143d2b] tracking-tight">
            Settings
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Adjust audio synthesizer effects, simulated response latency, and data persistence.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Sound Settings */}
        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-serif font-bold text-[#143d2b] flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-[#143d2b]" />
              <span>Web Audio Synthesizer Oscillators</span>
            </h3>
            <p className="text-xs text-stone-600 max-w-md leading-relaxed">
              Synthesizes zero-dependency whooshes, match celebration chords, pops, and reaction chimes via the native browser AudioContext.
            </p>
          </div>

          <button
            onClick={handleSoundToggle}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all border self-start sm:self-auto ${
              settings.soundEnabled
                ? 'bg-[#143d2b] text-white border-[#143d2b] shadow-sm'
                : 'bg-[#faf7f2] text-stone-600 border-[#e5dcce] hover:bg-stone-200'
            }`}
          >
            {settings.soundEnabled ? 'AUDIO ENABLED' : 'AUDIO MUTED'}
          </button>
        </div>

        {/* Chat Response Speed */}
        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] shadow-xs space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-serif font-bold text-[#143d2b] flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span>Simulated Cognition & Typing Latency</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Adjust how long synthetic emoji minds deliberate before emitting their profound glyph sequences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'fast', label: '⚡ Fast (0.8s)' },
              { id: 'normal', label: '⏱️ Normal (1.8s)' },
              { id: 'dramatic', label: '🎭 Dramatic Pause (3.5s)' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleDelayChange(opt.id as any)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                  settings.chatDelay === opt.id
                    ? 'bg-[#143d2b] text-white border-[#143d2b] shadow-sm'
                    : 'bg-[#faf7f2] text-stone-700 border-[#e5dcce] hover:bg-stone-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Default Translation Mode */}
        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] shadow-xs space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-serif font-bold text-[#143d2b] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Baseline Linguistic Engine</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Set the default cryptographic transformation mode for outgoing human keystrokes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'normal', label: 'Normal Text' },
              { id: 'emoji', label: 'Emoji Translation' },
              { id: 'chaos', label: 'Chaos Arrows ➡️' },
              { id: 'extreme', label: 'Cinematic' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleModeChange(opt.id as any)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  settings.defaultChatMode === opt.id
                    ? 'bg-[#143d2b] text-white border-[#143d2b] shadow-sm'
                    : 'bg-[#faf7f2] text-stone-700 border-[#e5dcce] hover:bg-stone-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Persistence & Danger Zone */}
        <div className="p-5 rounded-3xl bg-white border-2 border-rose-200/80 shadow-xs space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-serif font-bold text-rose-900 flex items-center space-x-2">
              <Database className="w-4 h-4 text-rose-700" />
              <span>State Ledger & LocalStorage Persistence</span>
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              All pair bonds, conversation transcripts, bio changes, and health vitals are continuously persisted to client storage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onSeedDemoData}
              className="flex-1 py-3 px-4 rounded-xl bg-[#faf7f2] hover:bg-stone-200 text-stone-800 text-xs font-bold border border-[#e5dcce] transition-all flex items-center justify-center space-x-2 shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Seed Synthetic Consortium Matches</span>
            </button>

            <button
              onClick={onResetAllData}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-xs"
            >
              <span>Purge Entire State Ledger</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
