import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, Trash2, ArrowUpRight, Download, Mail, ChevronRight } from 'lucide-react';
import { processQuery } from '../data/aiKnowledgeBase';
import { rudraData } from '../data/videos';

export const RudraAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `👋 Hi! I'm **Rudra AI**, the virtual assistant for **${rudraData.name}**.

Ask me anything about Rudra's full-stack MERN expertise, WorkEasy security architecture, B.Tech credentials (8.32 CGPA), or hiring availability!`,
      suggestions: [
        'Why should we hire Rudra?',
        'Core Tech Stack',
        'WorkEasy Architecture',
        'Download CV',
        'Notice Period & Location'
      ]
    }
  ]);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        chatInputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    const userMessageId = Date.now();
    const newUserMsg = { id: userMessageId, sender: 'user', text: query };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate realistic thoughtful processing time (~350ms - 600ms)
    setTimeout(() => {
      const responseData = processQuery(query);
      const aiMessageId = Date.now() + 1;

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          sender: 'ai',
          text: responseData.text,
          actions: responseData.actions,
          suggestions: responseData.suggestions
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Chat cleared! What else would you like to know about **${rudraData.name}**?`,
        suggestions: [
          'Why should we hire Rudra?',
          'Core Tech Stack',
          'WorkEasy Architecture',
          'Download CV'
        ]
      }
    ]);
  };

  // Helper to render bold and links in AI text
  const formatText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Replace **bold** with <strong>
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Bottom-Right Launcher Trigger */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-8 z-50 pointer-events-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Rudra AI Chat" : "Open Rudra AI Chat Assistant"}
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen 
              ? 'bg-neutral-900 text-white rotate-90 border border-white/20' 
              : 'bg-black text-white hover:scale-110 active:scale-95 border-2 border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.35)]'
          }`}
          title="Rudra AI Recruiter Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
            </div>
          )}
        </button>
      </div>

      {/* Glassmorphic Chat Window */}
      {isOpen && (
        <div 
          onWheel={(e) => e.stopPropagation()} 
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed bottom-20 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] h-[520px] max-h-[80vh] flex flex-col rounded-2xl bg-[#0f1217]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 font-['Quicksand'] pointer-events-auto select-text text-white text-xs sm:text-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/90 border-b border-white/10 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-white">Rudra AI</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[9px] font-mono text-emerald-300 font-bold border border-emerald-500/30">
                    RECRUITER BOT
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Answers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-neutral-400">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Clear Conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message History Stream */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 no-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-start gap-2 max-w-[88%]">
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div 
                    className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none shadow-md font-medium' 
                        : 'bg-[#1a202c]/90 text-neutral-200 border border-white/10 rounded-tl-none shadow-lg'
                    }`}
                  >
                    {msg.sender === 'ai' ? formatText(msg.text) : <p>{msg.text}</p>}

                    {/* Rich Action Buttons attached to AI response */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/10">
                        {msg.actions.map((act, aIdx) => (
                          act.type === 'download' ? (
                            <a
                              key={aIdx}
                              href={act.href}
                              download={act.filename}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-bold text-[11px] hover:bg-emerald-400 transition-all shadow-sm cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>{act.label}</span>
                            </a>
                          ) : act.type === 'email' ? (
                            <a
                              key={aIdx}
                              href={act.href}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white font-semibold text-[11px] border border-white/20 transition-all cursor-pointer"
                            >
                              <Mail className="w-3 h-3 text-emerald-400" />
                              <span>{act.label}</span>
                            </a>
                          ) : act.type === 'query' ? (
                            <button
                              key={aIdx}
                              onClick={() => handleSendMessage(act.query)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 text-[11px] border border-emerald-500/20 transition-all cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <a
                              key={aIdx}
                              href={act.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-300 text-[11px] border border-cyan-500/20 transition-all cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick suggestions tied to message */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 text-[11px] font-medium transition-all cursor-pointer"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-neutral-400 text-xs pl-1">
                <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-[#1a202c]/90 border border-white/10 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-3 bg-[#161b22]/90 border-t border-white/10 flex items-center gap-2 select-none">
            <input
              ref={chatInputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, GPA, WorkEasy, CV..."
              className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 outline-none focus:border-emerald-400 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputVal.trim() || isTyping}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                inputVal.trim() && !isTyping
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer shadow-md'
                  : 'bg-white/5 text-neutral-500 cursor-not-allowed'
              }`}
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
