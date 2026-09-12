import React, { useState, useEffect } from 'react';
import { ChatMode } from '../../types';
import { translateText } from '../../services/translationEngine';
import { Send, Sparkles } from 'lucide-react';

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
    <div className="p-3 sm:p-4 bg-[#fdfbf7] border-t border-[#e5dcce] space-y-2.5">
      
      {/* Chat Mode Switcher Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
          <span className="text-[10px] font-mono font-bold text-stone-500 uppercase mr-1 hidden sm:inline">
            Mode:
          </span>
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              title={m.desc}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                mode === m.id
                  ? 'bg-[#143d2b] text-white shadow-xs font-semibold'
                  : 'bg-white text-stone-600 border border-[#e5dcce] hover:bg-stone-50'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Overengineered mode badge */}
        <span className="text-[10px] font-mono text-[#143d2b] font-semibold hidden sm:inline">
          {mode === 'extreme' ? '🔥 100% UNHINGED' : mode === 'chaos' ? '⚡ HIGH TURBULENCE' : mode === 'emoji' ? '✨ UNICODE v15' : '📄 RAW ASCII'}
        </span>
      </div>

      {/* Live Translation Preview Bar */}
      {preview && mode !== 'normal' && (
        <div className="px-3.5 py-2 rounded-2xl bg-[#faf7f2] border border-[#e5dcce] text-xs flex items-center justify-between text-stone-800 animate-in fade-in duration-100 shadow-xs">
          <div className="flex items-center space-x-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#143d2b] flex-shrink-0" />
            <span className="font-mono text-stone-500 text-[10px]">Preview:</span>
            <span className="font-semibold text-sm truncate">{preview}</span>
          </div>
          <span className="text-[10px] font-mono text-stone-500 ml-2 whitespace-nowrap">
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
              ? 'Type text (e.g. "I love coding and coffee")...'
              : 'Type regular message...'
          }
          disabled={disabled}
          className="flex-1 bg-white text-stone-900 placeholder-stone-400 rounded-2xl px-4 py-3.5 text-sm border border-[#e5dcce] focus:outline-none focus:border-[#143d2b] focus:ring-2 focus:ring-[#143d2b]/10 transition-all shadow-xs"
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          aria-label="Send message"
          className="p-3.5 rounded-2xl bg-[#143d2b] hover:bg-[#0f2e20] text-white disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
