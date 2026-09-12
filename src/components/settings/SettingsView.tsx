import React from 'react';
import { AppSettings, ChatMode } from '../../types';
import { Settings, Volume2, VolumeX, RefreshCw, Sparkles, Zap, ShieldAlert } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6 text-slate-400" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            APPLICATION SETTINGS
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tune the algorithmic parameters and audio fidelity of your emoji ecosystem.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Sound Settings */}
        <div className="p-5 rounded-3xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Web Audio Synthesizer Effects</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-md">
              Synthesizes zero-dependency whooshes, match celebration chords, pops, and reaction chimes via the browser AudioContext.
            </p>
          </div>

          <button
            onClick={handleSoundToggle}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
              settings.soundEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {settings.soundEnabled ? 'AUDIO ENABLED' : 'AUDIO MUTED'}
          </button>
        </div>

        {/* Chat Response Speed */}
        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Simulated Typing Latency</span>
            </h3>
            <p className="text-xs text-slate-400">
              Adjust how long emojis deliberate before sending their profound emoji insights.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'fast', label: '⚡ Fast (0.8s)' },
              { id: 'normal', label: '⏱️ Normal (1.8s)' },
              { id: 'dramatic', label: '🎭 Dramatic Pause (3.5s)' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleDelayChange(opt.id as any)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  settings.chatDelay === opt.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Default Translation Mode */}
        <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Default Chat Translation Mode</span>
            </h3>
            <p className="text-xs text-slate-400">
              Set the baseline translation engine for outgoing messages.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'normal', label: 'Normal Text' },
              { id: 'emoji', label: 'Emoji Translation' },
              { id: 'chaos', label: 'Chaos Arrows ➡️' },
              { id: 'extreme', label: 'Extreme Cinematic' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleModeChange(opt.id as any)}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                  settings.defaultChatMode === opt.id
                    ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Data Persistence & Danger Zone */}
        <div className="p-5 rounded-3xl glass-panel border border-rose-900/40 bg-rose-950/10 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-rose-400 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Data Persistence & State Management</span>
            </h3>
            <p className="text-xs text-slate-400">
              All swipes, messages, matches, and profile edits are saved in browser LocalStorage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onSeedDemoData}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Seed Demo Matches & State</span>
            </button>

            <button
              onClick={onResetAllData}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 text-xs font-bold transition-all flex items-center justify-center space-x-2"
            >
              <span>Reset Everything to Default</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
