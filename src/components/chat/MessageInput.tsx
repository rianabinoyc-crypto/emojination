import React, { useState, useEffect } from 'react';
import { ChatMode } from '../../types';
import { translateText } from '../../services/translationEngine';
import { Send, Sparkles, Flame, Zap, HelpCircle } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string, mode: ChatMode) => void;
  disabled?: boolean;
  defaultMode?: ChatMode;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  defaultMode = 'emoji'
}) => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<ChatMode>(defaultMode);
  const [preview, setPreview] = useState('');

  // Update live preview whenever text or mode changes
  useEffect(() => {
    if (!text.trim()) {
      setPreview('');
      return;
    }
    const result = translateText(text, mode);
    setPreview(result.translated);
  }, [text, mode]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text, mode);
    setText('');
    setPreview('');
  };

  const modes: { id: ChatMode; label: string; icon: string; desc: string }[] = [
    { id: 'normal', label: 'Normal', icon: '📝', desc: 'Standard readable text' },
    { id: 'emoji', label: 'Emoji', icon: '✨', desc: 'Smart semantic emoji translation' },
    { id: 'chaos', label: 'Chaos', icon: '🔥', desc: 'Unnecessarily elaborate sequence with arrows' },
    { id: 'extreme', label: 'Extreme', icon: '🎬', desc: 'Absurd cinematic multi-stage emoji narrative' }
  ];

  return (
    <div className="p-3 sm:p-4 bg-slate-950/90 border-t border-slate-800/80 backdrop-blur-lg space-y-2.5">
      
      {/* Chat Mode Switcher Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mr-1 hidden sm:inline">
            Mode:
          </span>
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              title={m.desc}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                mode === m.id
                  ? 'bg-pink-500 text-white shadow-sm shadow-pink-500/30'
                  : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Overengineered mode badge */}
        <span className="text-[10px] font-mono text-cyan-400 hidden sm:inline">
          {mode === 'extreme' ? '🔥 100% UNHINGED' : mode === 'chaos' ? '⚡ HIGH TURBULENCE' : mode === 'emoji' ? '✨ UNICODE v15' : '📄 RAW ASCII'}
        </span>
      </div>

      {/* Live Translation Preview Bar */}
      {preview && mode !== 'normal' && (
        <div className="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800/80 text-xs flex items-center justify-between text-pink-300 animate-in fade-in duration-100">
          <div className="flex items-center space-x-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
            <span className="font-mono text-slate-400 text-[10px]">Preview:</span>
            <span className="font-semibold text-sm truncate">{preview}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 ml-2 whitespace-nowrap">
            Auto-translating
          </span>
        </div>
      )}

      {/* Input Field & Send Action */}
      <form onSubmit={handleSend} className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            mode === 'extreme'
              ? 'Type a sentence to trigger a multi-stage cinematic emoji journey...'
              : mode === 'chaos'
              ? 'Type something (e.g. "I need coffee" or "gaming")...'
              : mode === 'emoji'
              ? 'Type text (e.g. "I love coding and gaming")...'
              : 'Type regular message...'
          }
          disabled={disabled}
          className="flex-1 bg-slate-900/90 text-slate-100 placeholder-slate-500 rounded-2xl px-4 py-3.5 text-sm border border-slate-800 focus:outline-none focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/20 transition-all"
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white disabled:opacity-40 disabled:pointer-events-none hover:shadow-lg hover:shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
