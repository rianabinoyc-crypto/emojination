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
  Zap, 
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-150">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5dcce]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight flex items-center gap-3">
            <span>Emoji Analytics</span>
            <BarChart3 className="w-7 h-7 text-[#143d2b] inline" />
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            Empirical observations of synthetic intimacy, relational tensors, and fictional carbon dissipation.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e5dcce] text-stone-700 text-xs font-mono shadow-xs self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Synapse Feed</span>
        </div>
      </div>

      {/* Top 8 Overengineered KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Packets Sent</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            {stats.messagesSent.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% vs baseline prose</span>
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Emojis Generated</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-700">
            {stats.emojisSent.toLocaleString()}
          </div>
          <span className="text-[10px] text-rose-600 font-semibold">
            ✨ {stats.emojiDensity}% Unicode Density
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Matches Formed</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#143d2b]">
            {stats.matchesFormed}
          </div>
          <span className="text-[10px] text-[#143d2b] font-semibold">
            💕 {stats.avgCompatibility}% Avg Affinity
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Profiles Rejected</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-700">
            {stats.profilesRejected}
          </div>
          <span className="text-[10px] text-stone-500 font-semibold">
            ❌ {rejectRatio}% Rejection Rate
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Mean Chaos Index</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-purple-800">
            {stats.avgChaos}%
          </div>
          <span className="text-[10px] text-purple-700 font-semibold">
            ⚡ High Entropy Turbulence
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Romance Probability</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-rose-800">
            {Math.min(99, stats.avgCompatibility - 6)}%
          </div>
          <span className="text-[10px] text-rose-700 font-semibold">
            🌷 88% Butterfly Frequency
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Reply Latency</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-800">
            {stats.replyTimeSec}s
          </div>
          <span className="text-[10px] text-amber-700 font-semibold">
            ⚡ Algorithmic Response Time
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e5dcce] space-y-1 shadow-xs">
          <span className="text-[11px] font-mono uppercase text-stone-500 block">Acceptance Ratio</span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-800">
            {acceptRatio}%
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">
            ❤️ Right Swipes
          </span>
        </div>

      </div>

      {/* Visual Charts: Swipe Ratio Bar + Emoji Frequency Spectrum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Swipe Dynamics Visualizer */}
        <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>Swipe Equilibrium (Accept vs Reject)</span>
            </h3>
            <span className="text-xs font-mono text-stone-500">{totalSwipes} Total Swipes</span>
          </div>

          {/* Comparative Bar */}
          <div className="w-full h-8 rounded-2xl bg-[#f0eae1] flex overflow-hidden p-1">
            <div
              className="bg-[#143d2b] h-full rounded-xl flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
              style={{ width: `${acceptRatio}%` }}
            >
              {acceptRatio > 15 && `❤️ ${acceptRatio}%`}
            </div>
            <div
              className="bg-rose-600 h-full rounded-xl flex items-center justify-center text-xs font-bold text-white transition-all duration-500"
              style={{ width: `${rejectRatio}%` }}
            >
              {rejectRatio > 15 && `❌ ${rejectRatio}%`}
            </div>
          </div>

          <div className="flex justify-between text-xs text-stone-600 font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#143d2b]" />
              <span>Accepted ({stats.profilesAccepted})</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>Rejected ({stats.profilesRejected})</span>
            </div>
          </div>
        </div>

        {/* Emoji Category Distribution Spectrum */}
        <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#143d2b]" />
              <span>Emoji Semantic Volumes</span>
            </h3>
            <span className="text-xs font-mono text-stone-500">Unicode 15.0</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { cat: 'Tech & Gaming (💻 🎮)', pct: 88, color: 'bg-[#143d2b]' },
              { cat: 'Chaos & Fire (🔥 😈)', pct: 76, color: 'bg-orange-600' },
              { cat: 'Romance & Hearts (❤️ 🥰)', pct: 92, color: 'bg-rose-600' },
              { cat: 'Caffeine & Food (☕ 🍕)', pct: 64, color: 'bg-amber-600' },
            ].map((item) => (
              <div key={item.cat} className="space-y-1">
                <div className="flex justify-between text-stone-700 text-[11px]">
                  <span className="font-medium">{item.cat}</span>
                  <span className="font-mono text-stone-900 font-bold">{item.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0eae1] overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ABSURD FEATURE 1: EMOTIONAL WEATHER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#e5dcce]">
          <div className="flex items-center space-x-2">
            <CloudSun className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Atmospheric Emotional Forecast
            </h3>
          </div>
          <div className="flex items-center space-x-1 overflow-x-auto pb-1">
            {EMOTIONAL_WEATHER_CONDITIONS.map((cond, i) => (
              <button
                key={i}
                onClick={() => setActiveWeatherIdx(i)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeWeatherIdx === i
                    ? 'bg-[#143d2b] text-white font-semibold shadow-xs'
                    : 'bg-[#faf7f2] text-stone-600 hover:bg-white border border-[#e5dcce]'
                }`}
              >
                {cond.condition.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-2">
          <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] text-center space-y-1">
            <span className="text-4xl block mb-1">{currentWeather.condition.split(' ')[0]}</span>
            <h4 className="text-lg font-serif font-bold text-stone-900">{currentWeather.condition}</h4>
            <p className="text-xs font-mono text-[#143d2b] font-semibold">Temperature: {currentWeather.temp}</p>
          </div>

          <div className="sm:col-span-2 space-y-2 text-xs">
            <p className="text-stone-700 italic mb-3 font-serif text-sm">
              "{currentWeather.description}"
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e5dcce] flex justify-between">
                <span className="text-stone-500">Romance:</span>
                <span className="text-rose-700 font-bold">{currentWeather.romance}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e5dcce] flex justify-between">
                <span className="text-stone-500">Chaos Index:</span>
                <span className="text-purple-700 font-bold">{currentWeather.chaos}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e5dcce] flex justify-between">
                <span className="text-stone-500">Probability of 😂:</span>
                <span className="text-amber-700 font-bold">{currentWeather.laughProbability}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#e5dcce] flex justify-between">
                <span className="text-stone-500">Sadness:</span>
                <span className="text-sky-700 font-bold">{currentWeather.sadness}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABSURD FEATURE 2 & 3: HOROSCOPE & CARBON FOOTPRINT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Emoji Horoscope */}
        <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Compass className="w-5 h-5 text-purple-700" />
              <h3 className="text-base font-serif font-bold text-stone-900">
                Daily Emoji Astrological Forecast
              </h3>
            </div>
            <div className="flex items-center space-x-1">
              {EMOJI_HOROSCOPES.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHoroscopeIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                    activeHoroscopeIdx === idx ? 'bg-[#143d2b] text-white scale-110 shadow-xs' : 'hover:bg-[#faf7f2] text-stone-600'
                  }`}
                >
                  {h.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-serif font-bold text-stone-900">
                {currentHoroscope.sign}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Chaos: {currentHoroscope.chaosIndex}%
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed italic font-serif">
              "{currentHoroscope.prediction}"
            </p>

            <div className="flex items-center space-x-4 text-[11px] pt-2 border-t border-[#e5dcce] font-mono">
              <span className="text-stone-600">
                Harmonic: <span className="text-lg">{currentHoroscope.luckyEmoji}</span>
              </span>
              <span className="text-stone-600">
                Avert: <span className="text-lg">{currentHoroscope.dangerEmoji}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Emoji Carbon Footprint */}
        <div className="p-6 rounded-3xl bg-white border border-[#e5dcce] space-y-4 shadow-xs">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-serif font-bold text-stone-900">
              Unicode Carbon Offset Ledger
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🌱</div>
              <div>
                <span className="text-xs text-stone-500 block font-mono">
                  {stats.emojisSent.toLocaleString()} Emojis Rendered
                </span>
                <span className="text-xl font-serif font-bold text-emerald-800 font-mono">
                  {stats.carbonFootprintKg} kg
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed italic">
              Estimated fictional environmental impact: 0.00000042 imaginary kilograms of emoji emissions.
              100% carbon-neutral absurdity guaranteed by our quantum trees.
            </p>

            <div className="flex items-center space-x-2 pt-2 border-t border-[#e5dcce] text-[10px] text-emerald-800 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Green Unicode Computing Protocol</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
