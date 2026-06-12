/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Brain, Send, User, ChevronRight, Loader } from 'lucide-react';

interface Message {
  sender: 'user' | 'coach';
  text: string;
}

interface CoachChatProps {
  initialPrompt: string;
  onClearInitialPrompt: () => void;
  onSendMessage: (history: Message[]) => Promise<string>;
}

export default function CoachChat({ initialPrompt, onClearInitialPrompt, onSendMessage }: CoachChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'coach',
      text: "Hello! I am **Coach Apex**, your performance dietitian and dynamic trainer. I've reviewed your biometric specs and activities standing this week. Ask me anything: let's configure your squat biomechanics, vertical stride balance, or daily high protein targets!"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle external launch from dashboard Quick select suggestions
  useEffect(() => {
    if (initialPrompt) {
      setInputText(initialPrompt);
      onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: Message = { sender: 'user', text: inputText };
    const extendedHistory = [...messages, userMsg];
    
    setMessages(extendedHistory);
    setInputText("");
    setLoading(true);

    try {
      const gres = await onSendMessage(extendedHistory);
      setMessages([...extendedHistory, { sender: 'coach', text: gres }]);
    } catch (err) {
      console.error(err);
      setMessages([...extendedHistory, { sender: 'coach', text: "Apologies, the telemetry coordinates suffered a momentary failure. Please repeat your prompt!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto border-2 border-orange/15 rounded-3xl bg-zinc-950 p-6 flex flex-col h-[600px] shadow-2xl relative" id="coaching-advisor-chat">
      
      {/* Top Coach card info */}
      <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-4">
        <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center glow-orange overflow-hidden shadow-lg">
          <Brain className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h4 className="font-display font-bold text-lg text-white">Coach Apex Intelligences</h4>
          <span className="text-[9px] font-mono text-orange uppercase font-bold tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            VIRTUAL ATHLETIC DIETITIAN & TRAINER
          </span>
        </div>
      </div>

      {/* Messages Feed body */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 select-text">
        {messages.map((m, index) => {
          const isUser = m.sender === 'user';
          return (
            <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed ${
                isUser 
                  ? 'bg-zinc-900 border border-orange/30 text-zinc-100 rounded-tr-none' 
                  : 'bg-zinc-900/60 border border-white/5 text-zinc-300 rounded-tl-none markdown-body'
              }`}>
                {/* Parse key bold markdown markers */}
                <p className="whitespace-pre-line">
                  {m.text.split('**').map((chunk, i) => i % 2 === 1 ? <strong key={i} className="text-orange font-bold font-display">{chunk}</strong> : chunk)}
                </p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-xl bg-zinc-900/30 border border-white/5 text-zinc-500 text-xs flex items-center gap-3">
              <Loader className="w-4 h-4 text-orange animate-spin" />
              <span>Coach is calculating split biomechanics parameters...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Bottom Composer Box form */}
      <form onSubmit={handleSubmit} className="flex gap-3 pt-2 border-t border-zinc-900">
        <input
          type="text"
          placeholder="Ask Coach Apex: 'How do I optimize my quad volume?' or 'Generate high-protein recipes'"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          disabled={loading}
          className="flex-1 bg-zinc-900 border border-zinc-850 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-orange font-sans placeholder-zinc-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-orange hover:bg-orange/95 text-white font-bold rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-orange/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
