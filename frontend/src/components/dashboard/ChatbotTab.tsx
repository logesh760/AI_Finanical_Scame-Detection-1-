import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ShieldAlert, Info, CornerDownLeft, Loader2 } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const ChatbotTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am FinGuard AI, your security assistant. I monitor your account streams for suspicious behavior. Ask me about flagged transactions, risk scores, or security best practices.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLiveAI, setIsLiveAI] = useState<boolean | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      // Call mockApiService or direct API fetch for the chat
      const response = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiveAI(!data.isMock);

        const botMsg: Message = {
          id: `msg-bot-${Date.now()}`,
          sender: 'bot',
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Failed to get chatbot response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const botErrorMsg: Message = {
        id: `msg-error-${Date.now()}`,
        sender: 'bot',
        text: "Sorry, I am having trouble connecting to the security stream. Please check your network connection.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botErrorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const quickPrompts = [
    "Explain the XYZ Services transaction risk",
    "Is VM-ITDEPT-ALERT SMS a scam?",
    "How do I secure my AutoPay mandates?"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-[#1A1A1A] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">FinGuard AI Security Assistant</h2>
            <p className="text-[11px] text-gray-400">Intelligent Threat & Anomaly Assistant</p>
          </div>
        </div>

        {/* Live / Simulated indicator */}
        <div className="flex items-center gap-2">
          {isLiveAI === null ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
              <span className="text-[10px] font-mono uppercase tracking-wider">Awaiting query</span>
            </div>
          ) : isLiveAI ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Live Gemini AI</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">Simulated Data Layer</span>
            </div>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#141414]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
              msg.sender === 'user' 
                ? 'bg-red-600/10 border-red-500/20 text-red-400' 
                : 'bg-[#1A1A1A] border-white/5 text-gray-400'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-1">
              <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-red-600 text-white rounded-tr-none'
                  : 'bg-[#1A1A1A] border border-white/5 text-gray-300 rounded-tl-none'
              }`}>
                {msg.text.split('\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>{para}</p>
                ))}
              </div>
              <span className={`text-[9px] text-gray-500 block ${msg.sender === 'user' ? 'text-right' : ''}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-white/5 text-gray-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#1A1A1A] border border-white/5 text-xs text-gray-500 rounded-tl-none flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
              <span>Analyzing transaction behavioral patterns...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length === 1 && (
        <div className="px-6 py-3 bg-[#161616] border-t border-white/5">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-red-400" /> Suggested Inquiries
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs px-3 py-1.5 rounded-xl bg-[#1D1D1D] hover:bg-[#252525] border border-white/5 hover:border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input Bar */}
      <div className="p-4 bg-[#1A1A1A] border-t border-white/5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="relative flex items-center bg-[#121212] border border-white/5 focus-within:border-red-500/50 rounded-xl px-4 py-2.5 transition-all"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about high-risk transactions, SMS scam links, or AutoPay safety..."
            disabled={isSending}
            className="flex-1 bg-transparent text-xs text-white placeholder-gray-500 outline-none pr-10 border-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={isSending || !inputValue.trim()}
            className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:bg-[#1D1D1D] text-white disabled:text-gray-600 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[9px] text-gray-500 px-1">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-gray-600" />
            FinGuard AI is context-aware of your monitored dashboard.
          </span>
          <span className="font-mono">Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
