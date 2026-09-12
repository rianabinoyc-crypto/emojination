import React, { useState } from 'react';
import { AnalyticsStats } from '../../types';
import { EMOJI_HOROSCOPES, EMOTIONAL_WEATHER_CONDITIONS } from '../../data/horoscopes';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  CloudSun, 
  Sparkles, 
  Compass, 
  Leaf, 
  Clock, 
  Heart, 
  Zap, 
  Smile, 
  CheckCircle2 
} from 'lucide-react';

interface AnalyticsDashboardProps {
  stats: AnalyticsStats;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ stats }) => {
  const [activeWeatherIdx, setActiveWeatherIdx] = useState(0);
  const [activeHoroscopeIdx, setActiveHoroscopeIdx] = useState(0);

  const currentWeather = EMOTIONAL_WEATHER_CONDITIONS[activeWeatherIdx];
  const currentHoroscope = EMOJI_HOROSCOPES[activeHoroscopeIdx];

  const totalSwipes = Math.max(1, stats.profilesAccepted + stats.profilesRejected);
  const acceptRatio = Math.round((stats.profilesAccepted / totalSwipes) * 100);
  const rejectRatio = 100 - acceptRatio;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EMOJINATION™ ANALYTICS
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Completely unnecessary telemetry and empirical observations of digital romance.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Real-time Neural Stream</span>
        </div>
      </div>

      {/* Top 8 Overengineered KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Messages Sent</span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats.messagesSent.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% vs baseline human speech</span>
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Emojis Generated</span>
          <div className="text-2xl sm:text-3xl font-black text-pink-400">
            {stats.emojisSent.toLocaleString()}
          </div>
          <span className="text-[10px] text-pink-300 font-semibold">
            ✨ {stats.emojiDensity}% Unicode Density
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Matches Formed</span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            {stats.matchesFormed}
          </div>
          <span className="text-[10px] text-cyan-300 font-semibold">
            💕 {stats.avgCompatibility}% Avg Compatibility
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Profiles Rejected</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">
            {stats.profilesRejected}
          </div>
          <span className="text-[10px] text-rose-300 font-semibold">
            ❌ {rejectRatio}% Rejection Rate
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Average Chaos Index</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            {stats.avgChaos}%
          </div>
          <span className="text-[10px] text-purple-300 font-semibold">
            🔥 High Entropy Turbulence
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Romance Probability</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-300">
            {Math.min(99, stats.avgCompatibility - 6)}%
          </div>
          <span className="text-[10px] text-rose-400 font-semibold">
            🌷 88% Butterfly Frequency
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Avg Reply Latency</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {stats.replyTimeSec}s
          </div>
          <span className="text-[10px] text-amber-300 font-semibold">
            ⚡ Algorithmic Response Time
          </span>
        </div>

        <div className="p-4 rounded-3xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-400 block">Acceptance Ratio</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {acceptRatio}%
          </div>
          <span className="text-[10px] text-emerald-300 font-semibold">
            ❤️ Right Swipes
          </span>
        </div>

      </div>

      {/* Visual Charts: Swipe Ratio Bar + Emoji Frequency Spectrum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Swipe Dynamics Visualizer */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <Flame className="w-4 h-4 text-pink-500" />
              <span>SWIPE EQUILIBRIUM (ACCEPT VS REJECT)</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">{totalSwipes} Total Swipes</span>
          </div>

          {/* Comparative Bar */}
          <div className="w-full h-8 rounded-2xl bg-slate-950 flex overflow-hidden p-1 border border-slate-800">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-xl flex items-center justify-center text-xs font-black text-slate-950 transition-all duration-500"
              style={{ width: `${acceptRatio}%` }}
            >
              {acceptRatio > 15 && `❤️ ${acceptRatio}%`}
            </div>
            <div
              className="bg-gradient-to-r from-rose-500 to-pink-600 h-full rounded-xl flex items-center justify-center text-xs font-black text-white transition-all duration-500"
              style={{ width: `${rejectRatio}%` }}
            >
              {rejectRatio > 15 && `❌ ${rejectRatio}%`}
            </div>
          </div>

          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Accepted ({stats.profilesAccepted})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Rejected ({stats.profilesRejected})</span>
            </div>
          </div>
        </div>

        {/* Emoji Category Distribution Spectrum */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>EMOJI CATEGORY VOLUMES</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Unicode 15.0</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { cat: 'Tech & Gaming (💻 🎮)', pct: 88, color: 'bg-cyan-400' },
              { cat: 'Chaos & Fire (🔥 😈)', pct: 76, color: 'bg-pink-500' },
              { cat: 'Romance & Hearts (❤️ 🥰)', pct: 92, color: 'bg-rose-400' },
              { cat: 'Caffeine & Food (☕ 🍕)', pct: 64, color: 'bg-amber-400' },
            ].map((item) => (
              <div key={item.cat} className="space-y-1">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{item.cat}</span>
                  <span className="font-mono text-slate-200">{item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ABSURD FEATURE 1: EMOTIONAL WEATHER */}
      <div className="p-6 rounded-3xl glass-panel-glow border border-pink-500/30 bg-slate-900/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-black text-white">
              EMOTIONAL WEATHER REPORT
            </h3>
          </div>
          <div className="flex items-center space-x-1">
            {EMOTIONAL_WEATHER_CONDITIONS.map((cond, i) => (
              <button
                key={i}
                onClick={() => setActiveWeatherIdx(i)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  activeWeatherIdx === i
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cond.condition.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
            <span className="text-3xl block">{currentWeather.condition.split(' ')[0]}</span>
            <h4 className="text-lg font-black text-white">{currentWeather.condition}</h4>
            <p className="text-xs font-mono text-pink-400">Temperature: {currentWeather.temp}</p>
          </div>

          <div className="sm:col-span-2 space-y-2 text-xs">
            <p className="text-slate-300 italic mb-3">
              "{currentWeather.description}"
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Romance:</span>
                <span className="text-rose-400 font-bold">{currentWeather.romance}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Chaos Index:</span>
                <span className="text-purple-400 font-bold">{currentWeather.chaos}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Probability of 😂:</span>
                <span className="text-amber-400 font-bold">{currentWeather.laughProbability}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Sadness:</span>
                <span className="text-cyan-400 font-bold">{currentWeather.sadness}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABSURD FEATURE 2: EMOJI HOROSCOPE & ABSURD FEATURE 3: CARBON FOOTPRINT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Emoji Horoscope */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-extrabold text-white">
                DAILY EMOJI HOROSCOPE
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              {EMOJI_HOROSCOPES.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHoroscopeIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                    activeHoroscopeIdx === idx ? 'bg-purple-600 text-white scale-110' : 'bg-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  {h.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-300">
                {currentHoroscope.sign}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                Chaos: {currentHoroscope.chaosIndex}%
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{currentHoroscope.prediction}"
            </p>

            <div className="flex items-center space-x-4 text-[11px] pt-2 border-t border-slate-800 font-mono">
              <span className="text-slate-400">
                Lucky: <span className="text-lg">{currentHoroscope.luckyEmoji}</span>
              </span>
              <span className="text-slate-400">
                Avoid: <span className="text-lg">{currentHoroscope.dangerEmoji}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Emoji Carbon Footprint */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-extrabold text-white">
              EMOJI CARBON FOOTPRINT
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌱</div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">
                  {stats.emojisSent.toLocaleString()} Emojis Rendered
                </span>
                <span className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
                  {stats.carbonFootprintKg} kg
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed italic">
              Estimated fictional environmental impact: 0.00000042 imaginary kilograms of emoji emissions.
              100% carbon-neutral absurdity guaranteed by our quantum trees.
            </p>

            <div className="flex items-center space-x-2 pt-2 border-t border-slate-800 text-[10px] text-emerald-400 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Certified Green Unicode Computing</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
