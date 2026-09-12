import React, { useState } from 'react';
import { 
  mixEmojis, 
  decodeEmojiMeaning, 
  translateEmojiToEnglish, 
  getRandomEmojiStory, 
  calculateEmojiDensity, 
  MixedEmojiResult, 
  MeaningResult 
} from '../../services/emojiToolsService';
import { translateText } from '../../services/translationEngine';
import { ChatMode } from '../../types';
import { 
  Wrench, 
  Sparkles, 
  Shuffle, 
  BookOpen, 
  BarChart2, 
  ArrowRight, 
  Copy, 
  Check, 
  Flame, 
  Layers 
} from 'lucide-react';
import { soundService } from '../../services/soundService';

export const EmojiToolsView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'textToEmoji' | 'meaning' | 'mixer' | 'translator' | 'randomizer' | 'density'>('textToEmoji');

  // Text -> Emoji tool state
  const [inputText, setInputText] = useState('I love coding and gaming');
  const [textMode, setTextMode] = useState<ChatMode>('emoji');
  const [textToEmojiResult, setTextToEmojiResult] = useState('');

  // Emoji -> Meaning tool state
  const [inputEmojis, setInputEmojis] = useState('☕ 💻 🔥');
  const [meaningResult, setMeaningResult] = useState<MeaningResult | null>(null);

  // Emoji Mixer tool state
  const [mix1, setMix1] = useState('😎');
  const [mix2, setMix2] = useState('🔥');
  const [mixerResult, setMixerResult] = useState<MixedEmojiResult | null>(null);

  // Emoji -> English Translator tool state
  const [translateInput, setTranslateInput] = useState('☕ 🧠 ⚡ 😌');
  const [translatedEnglish, setTranslatedEnglish] = useState('');

  // Randomizer tool state
  const [randomStory, setRandomStory] = useState<{ emojis: string; story: string } | null>(null);

  // Density tool state
  const [densityInput, setDensityInput] = useState('Hey! 👋 I was wondering if you want to grab coffee ☕ and chat about our new project 💻⚡? It is going to be so much fun! 🎉🥳');
  const [densityResult, setDensityResult] = useState<ReturnType<typeof calculateEmojiDensity> | null>(null);

  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundService.playReaction();
    setTimeout(() => setCopied(false), 2000);
  };

  const runTextToEmoji = () => {
    const res = translateText(inputText, textMode);
    setTextToEmojiResult(res.translated);
    soundService.playMessage();
  };

  const runDecodeMeaning = () => {
    const res = decodeEmojiMeaning(inputEmojis);
    setMeaningResult(res);
    soundService.playMessage();
  };

  const runMixer = () => {
    const res = mixEmojis(mix1, mix2);
    setMixerResult(res);
    soundService.playAccept();
  };

  const runTranslateEnglish = () => {
    const res = translateEmojiToEnglish(translateInput);
    setTranslatedEnglish(res);
    soundService.playMessage();
  };

  const runRandomizer = () => {
    const res = getRandomEmojiStory();
    setRandomStory(res);
    soundService.playReject();
  };

  const runDensity = () => {
    const res = calculateEmojiDensity(densityInput);
    setDensityResult(res);
    soundService.playMessage();
  };

  const tools = [
    { id: 'textToEmoji', label: 'Text → Emoji', icon: '✨', desc: 'Convert human prose into unicode sequences' },
    { id: 'meaning', label: 'Emoji → Meaning', icon: '🔍', desc: 'Decode mysterious emoji sequences' },
    { id: 'mixer', label: 'Emoji Mixer', icon: '🧪', desc: 'Combine two emojis into a fused concept' },
    { id: 'translator', label: 'Emoji Translator', icon: '🔤', desc: 'Convert emoji strings to English text' },
    { id: 'randomizer', label: 'Random Story', icon: '🎲', desc: 'Generate absurd emoji narratives' },
    { id: 'density', label: 'Density Meter', icon: '📊', desc: 'Calculate Unicode saturation of messages' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2.5">
            <Wrench className="w-7 h-7 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              EMOJI TOOLS SUITE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            State-of-the-art computational linguistic utilities for the modern emoji era.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
          6 Integrated Utilities
        </span>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id as any)}
            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              activeTool === t.id
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800'
            }`}
          >
            <span className="text-2xl mb-1">{t.icon}</span>
            <div>
              <h4 className="text-xs font-bold text-white leading-tight">{t.label}</h4>
              <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{t.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ACTIVE TOOL VIEW */}

      {/* 1. Text -> Emoji */}
      {activeTool === 'textToEmoji' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5 bg-slate-900/80">
          <div>
            <h3 className="text-base font-extrabold text-white">TEXT → EMOJI CONVERTER</h3>
            <p className="text-xs text-slate-400">Convert plain text sentences into expressive semantic emojis</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {(['normal', 'emoji', 'chaos', 'extreme'] as ChatMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setTextMode(m)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold uppercase transition-all ${
                    textMode === m ? 'bg-amber-500 text-slate-950 font-black shadow' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {m} Mode
                </button>
              ))}
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type anything here..."
              rows={3}
              className="w-full bg-slate-950 text-slate-100 p-4 rounded-2xl border border-slate-800 focus:border-amber-500 text-sm"
            />

            <button
              onClick={runTextToEmoji}
              className="px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-all shadow-md"
            >
              Convert to Emojis
            </button>
          </div>

          {textToEmojiResult && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                {textToEmojiResult}
              </div>
              <button
                onClick={() => handleCopy(textToEmojiResult)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Emoji -> Meaning */}
      {activeTool === 'meaning' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5 bg-slate-900/80">
          <div>
            <h3 className="text-base font-extrabold text-white">EMOJI → MEANING DECODER</h3>
            <p className="text-xs text-slate-400">Discover what those cryptic emoji combinations actually signify</p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={inputEmojis}
              onChange={(e) => setInputEmojis(e.target.value)}
              placeholder="Enter emojis (e.g. ☕ 💻 🔥)..."
              className="w-full bg-slate-950 text-slate-100 p-4 rounded-2xl border border-slate-800 focus:border-amber-500 text-xl"
            />

            <button
              onClick={runDecodeMeaning}
              className="px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-all shadow-md"
            >
              Decode Meaning
            </button>
          </div>

          {meaningResult && (
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-2xl">{meaningResult.emojis}</span>
                <span className="font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  Sentiment: {meaningResult.sentiment}
                </span>
              </div>
              <p className="text-sm text-slate-200">{meaningResult.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {meaningResult.keywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 font-mono text-[11px]">
                    #{kw}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 italic pt-1 border-t border-slate-800/60">
                {meaningResult.subtext}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Emoji Mixer */}
      {activeTool === 'mixer' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5 bg-slate-900/80">
          <div>
            <h3 className="text-base font-extrabold text-white">EMOJI MIXER</h3>
            <p className="text-xs text-slate-400">Combine any two glyphs into a unified molecular hybrid</p>
          </div>

          <div className="flex items-center justify-center space-x-4 my-4">
            <input
              type="text"
              value={mix1}
              onChange={(e) => setMix1(e.target.value)}
              className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-slate-800 text-center text-3xl focus:border-amber-500"
            />
            <span className="text-2xl font-black text-amber-400">+</span>
            <input
              type="text"
              value={mix2}
              onChange={(e) => setMix2(e.target.value)}
              className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-slate-800 text-center text-3xl focus:border-amber-500"
            />
          </div>

          <div className="text-center">
            <button
              onClick={runMixer}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              FUSE EMOJIS
            </button>
          </div>

          {mixerResult && (
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-center space-y-2 animate-in zoom-in-95 duration-150">
              <div className="text-5xl">{mixerResult.combo}</div>
              <h4 className="text-lg font-black text-white">{mixerResult.title}</h4>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                {mixerResult.category}
              </span>
              <p className="text-xs text-slate-300 max-w-md mx-auto italic mt-1 leading-relaxed">
                "{mixerResult.description}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Emoji -> English Translator */}
      {activeTool === 'translator' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5 bg-slate-900/80">
          <div>
            <h3 className="text-base font-extrabold text-white">EMOJI → ENGLISH TRANSLATOR</h3>
            <p className="text-xs text-slate-400">Convert cryptic emoji sequences back into English prose</p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={translateInput}
              onChange={(e) => setTranslateInput(e.target.value)}
              placeholder="Paste emoji sentence here..."
              className="w-full bg-slate-950 text-slate-100 p-4 rounded-2xl border border-slate-800 focus:border-amber-500 text-xl"
            />

            <button
              onClick={runTranslateEnglish}
              className="px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-all shadow-md"
            >
              Translate to English
            </button>
          </div>

          {translatedEnglish && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="text-base font-bold text-white italic">
                "{translatedEnglish}"
              </div>
              <button
                onClick={() => handleCopy(translatedEnglish)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Random Story Generator */}
      {activeTool === 'randomizer' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5 bg-slate-900/80">
          <div>
            <h3 className="text-base font-extrabold text-white">RANDOM EMOJI NARRATIVE GENERATOR</h3>
            <p className="text-xs text-slate-400">Spawn randomized unicode sequences with absurd algorithmic lore</p>
          </div>

          <button
            onClick={runRandomizer}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-xs shadow-md"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate Random Narrative</span>
          </button>

          {randomStory && (
            <div className="p-6 rounded-2xl bg-slate-950/90 border border-purple-500/40 space-y-3 animate-in zoom-in-95 duration-150">
              <div className="text-2xl sm:text-3xl font-mono text-center tracking-widest">
                {randomStory.emojis}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic text-center max-w-lg mx-auto">
                "{randomStory.story}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* 6. Emoji Density Calculator */}
      {activeTool === 'density' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5 bg-slate-900/80">
          <div>
            <h3 className="text-base font-extrabold text-white">EMOJI DENSITY CALCULATOR</h3>
            <p className="text-xs text-slate-400">Audit the Unicode concentration and emotional mass of any text</p>
          </div>

          <div className="space-y-3">
            <textarea
              value={densityInput}
              onChange={(e) => setDensityInput(e.target.value)}
              placeholder="Paste any message here to measure its emoji saturation..."
              rows={4}
              className="w-full bg-slate-950 text-slate-100 p-4 rounded-2xl border border-slate-800 focus:border-amber-500 text-sm"
            />

            <button
              onClick={runDensity}
              className="px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-all shadow-md"
            >
              Analyze Density
            </button>
          </div>

          {densityResult && (
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Total Chars</span>
                  <span className="text-lg font-bold text-white">{densityResult.totalChars}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Emoji Glyphs</span>
                  <span className="text-lg font-bold text-pink-400">{densityResult.emojiChars}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Saturation</span>
                  <span className="text-lg font-bold text-amber-400">{densityResult.densityPercentage}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center font-bold text-emerald-400">
                {densityResult.verdict}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
