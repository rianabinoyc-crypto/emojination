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
  Copy, 
  Check, 
} from 'lucide-react';
import { soundService } from '../../services/soundService';

export const EmojiToolsView: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'textToEmoji' | 'meaning' | 'mixer' | 'translator' | 'randomizer' | 'density'>('textToEmoji');

  // Text -> Emoji tool state
  const [inputText, setInputText] = useState('I love coding and coffee');
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-in fade-in duration-150">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#e5dcce]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight flex items-center gap-3">
            <span>Emoji Tools</span>
            <Wrench className="w-7 h-7 text-[#143d2b] inline" />
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
            State-of-the-art computational linguistic utilities, semantic translators, molecular mixers, and unicode density analyzers.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-white text-stone-800 border border-[#e5dcce] text-xs font-mono font-semibold shadow-xs self-start sm:self-auto">
          6 Integrated Utilities
        </span>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTool(t.id as any)}
            className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between shadow-xs ${
              activeTool === t.id
                ? 'bg-[#143d2b] text-white border-[#143d2b]'
                : 'bg-white text-stone-600 hover:bg-[#faf7f2] border border-[#e5dcce]'
            }`}
          >
            <span className="text-2xl mb-1.5">{t.icon}</span>
            <div>
              <h4 className={`text-xs font-bold leading-tight font-serif ${activeTool === t.id ? 'text-white' : 'text-stone-900'}`}>{t.label}</h4>
              <p className={`text-[10px] line-clamp-1 mt-0.5 ${activeTool === t.id ? 'text-emerald-200' : 'text-stone-500'}`}>{t.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ACTIVE TOOL VIEW */}

      {/* 1. Text -> Emoji */}
      {activeTool === 'textToEmoji' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-5 shadow-xs">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Text → Emoji Synthesizer</h3>
            <p className="text-xs text-stone-600">Transcribe natural human language into semantic unicode expressions</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {(['normal', 'emoji', 'chaos', 'extreme'] as ChatMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setTextMode(m)}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium uppercase transition-all ${
                    textMode === m ? 'bg-[#143d2b] text-white font-semibold shadow-xs' : 'bg-white text-stone-600 border border-[#e5dcce] hover:bg-stone-50'
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
              className="w-full bg-[#faf7f2] text-stone-900 p-4 rounded-2xl border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] text-sm font-sans"
            />

            <button
              onClick={runTextToEmoji}
              className="px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-all shadow-xs"
            >
              Synthesize to Emojis
            </button>
          </div>

          {textToEmojiResult && (
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-between">
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
                {textToEmojiResult}
              </div>
              <button
                onClick={() => handleCopy(textToEmojiResult)}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-[#e5dcce] shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Emoji -> Meaning */}
      {activeTool === 'meaning' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-5 shadow-xs">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Emoji → Meaning Semantic Decoder</h3>
            <p className="text-xs text-stone-600">Audit what esoteric emoji sequences actually express underneath</p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={inputEmojis}
              onChange={(e) => setInputEmojis(e.target.value)}
              placeholder="Enter emojis (e.g. ☕ 💻 🔥)..."
              className="w-full bg-[#faf7f2] text-stone-900 p-4 rounded-2xl border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] text-xl"
            />

            <button
              onClick={runDecodeMeaning}
              className="px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-all shadow-xs"
            >
              Decode Meaning
            </button>
          </div>

          {meaningResult && (
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#e5dcce] pb-2">
                <span className="text-2xl">{meaningResult.emojis}</span>
                <span className="font-mono px-3 py-0.5 rounded-full bg-[#143d2b]/10 text-[#143d2b] font-bold">
                  Sentiment: {meaningResult.sentiment}
                </span>
              </div>
              <p className="text-base text-stone-900 font-serif">{meaningResult.summary}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {meaningResult.keywords.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full bg-white border border-[#e5dcce] text-stone-700 font-mono text-[11px]">
                    #{kw}
                  </span>
                ))}
              </div>
              <p className="text-stone-600 italic pt-1 border-t border-[#e5dcce]">
                {meaningResult.subtext}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Emoji Mixer */}
      {activeTool === 'mixer' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-5 shadow-xs">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Molecular Emoji Fusion</h3>
            <p className="text-xs text-stone-600">Fuse any two unicode atoms into a unified synthetic concept</p>
          </div>

          <div className="flex items-center justify-center space-x-4 my-4">
            <input
              type="text"
              value={mix1}
              onChange={(e) => setMix1(e.target.value)}
              className="w-16 h-16 rounded-2xl bg-[#faf7f2] border-2 border-[#e5dcce] text-center text-3xl focus:border-[#143d2b] focus:outline-none"
            />
            <span className="text-2xl font-serif font-bold text-stone-500">+</span>
            <input
              type="text"
              value={mix2}
              onChange={(e) => setMix2(e.target.value)}
              className="w-16 h-16 rounded-2xl bg-[#faf7f2] border-2 border-[#e5dcce] text-center text-3xl focus:border-[#143d2b] focus:outline-none"
            />
          </div>

          <div className="text-center">
            <button
              onClick={runMixer}
              className="px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs shadow-xs transition-all"
            >
              Fuse Emojis
            </button>
          </div>

          {mixerResult && (
            <div className="p-6 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] text-center space-y-2 animate-in zoom-in-95 duration-150">
              <div className="text-5xl">{mixerResult.combo}</div>
              <h4 className="text-xl font-serif font-bold text-stone-900">{mixerResult.title}</h4>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#143d2b]/10 text-[#143d2b] font-bold">
                {mixerResult.category}
              </span>
              <p className="text-xs text-stone-600 max-w-md mx-auto italic mt-1 leading-relaxed">
                "{mixerResult.description}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Emoji -> English Translator */}
      {activeTool === 'translator' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-5 shadow-xs">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Emoji → English Translator</h3>
            <p className="text-xs text-stone-600">Reverse-compile emoji glyphs back into legible English prose</p>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={translateInput}
              onChange={(e) => setTranslateInput(e.target.value)}
              placeholder="Paste emoji sentence here..."
              className="w-full bg-[#faf7f2] text-stone-900 p-4 rounded-2xl border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] text-xl"
            />

            <button
              onClick={runTranslateEnglish}
              className="px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-all shadow-xs"
            >
              Translate to English
            </button>
          </div>

          {translatedEnglish && (
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] flex items-center justify-between">
              <div className="text-base font-serif font-bold text-stone-900 italic">
                "{translatedEnglish}"
              </div>
              <button
                onClick={() => handleCopy(translatedEnglish)}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-[#e5dcce] shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Random Story Generator */}
      {activeTool === 'randomizer' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-5 shadow-xs">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Algorithmic Lore Generator</h3>
            <p className="text-xs text-stone-600">Spawn randomized unicode sequences with absurd algorithmic backstories</p>
          </div>

          <button
            onClick={runRandomizer}
            className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs shadow-xs transition-all"
          >
            <Shuffle className="w-4 h-4" />
            <span>Generate Random Narrative</span>
          </button>

          {randomStory && (
            <div className="p-6 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-3 animate-in zoom-in-95 duration-150">
              <div className="text-3xl font-mono text-center tracking-widest">
                {randomStory.emojis}
              </div>
              <p className="text-sm text-stone-700 leading-relaxed italic text-center max-w-lg mx-auto font-sans">
                "{randomStory.story}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* 6. Emoji Density Calculator */}
      {activeTool === 'density' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5dcce] space-y-5 shadow-xs">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">Unicode Density Analyzer</h3>
            <p className="text-xs text-stone-600">Audit the Unicode saturation and emotional mass of any passage</p>
          </div>

          <div className="space-y-3">
            <textarea
              value={densityInput}
              onChange={(e) => setDensityInput(e.target.value)}
              placeholder="Paste any message here to measure its emoji saturation..."
              rows={4}
              className="w-full bg-[#faf7f2] text-stone-900 p-4 rounded-2xl border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] text-sm"
            />

            <button
              onClick={runDensity}
              className="px-6 py-2.5 rounded-full bg-[#143d2b] hover:bg-[#0f2e20] text-white font-semibold text-xs transition-all shadow-xs"
            >
              Analyze Density
            </button>
          </div>

          {densityResult && (
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] space-y-4 text-xs font-mono">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white border border-[#e5dcce]">
                  <span className="text-stone-500 block text-[11px]">Total Chars</span>
                  <span className="text-lg font-bold text-stone-900">{densityResult.totalChars}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#e5dcce]">
                  <span className="text-stone-500 block text-[11px]">Emoji Glyphs</span>
                  <span className="text-lg font-bold text-rose-700">{densityResult.emojiChars}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#e5dcce]">
                  <span className="text-stone-500 block text-[11px]">Saturation</span>
                  <span className="text-lg font-bold text-emerald-800">{densityResult.densityPercentage}%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#e5dcce] text-center font-bold text-stone-800 font-serif text-sm">
                {densityResult.verdict}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
