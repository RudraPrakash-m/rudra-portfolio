import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { rudraData } from '../data/videos';

export const DeveloperTerminal = ({ isOpen, setIsOpen }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `🚀 Rudra Prakash Mallick [Version 2.5.0-mern]
(c) 2026 Rudra Prakash Mallick. All rights reserved.

Type 'help' to view available commands or 'skills' / 'projects' / 'resume'.
Type 'exit' or press ESC / Ctrl+K to close.`
    }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Auto scroll to bottom of terminal
  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  // Global Keyboard listener for Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const rawCmd = inputVal.trim();
      if (!rawCmd) return;

      const newHistory = [...history, { type: 'input', text: `rudra@portfolio:~$ ${rawCmd}` }];
      const cmd = rawCmd.toLowerCase();

      // Add to command history for up/down navigation
      setCommandHistory((prev) => [...prev, rawCmd]);
      setHistoryIndex(-1);

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-1.5 text-xs sm:text-sm font-mono text-emerald-400">
                <p className="text-white font-bold mb-2">Available Shell Commands:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  <div><span className="text-cyan-300 font-bold">whoami / about</span> - Summary & bio</div>
                  <div><span className="text-cyan-300 font-bold">skills</span> - Technical competencies</div>
                  <div><span className="text-cyan-300 font-bold">projects</span> - Live MERN projects</div>
                  <div><span className="text-cyan-300 font-bold">journey / edu</span> - Education & experience</div>
                  <div><span className="text-cyan-300 font-bold">contact</span> - Contact & social links</div>
                  <div><span className="text-cyan-300 font-bold">cat resume</span> - Resume info & download</div>
                  <div><span className="text-cyan-300 font-bold">matrix</span> - Digital rain Easter egg</div>
                  <div><span className="text-cyan-300 font-bold">clear / cls</span> - Clear terminal buffer</div>
                  <div><span className="text-cyan-300 font-bold">exit / quit</span> - Close terminal window</div>
                </div>
              </div>
            )
          });
          break;

        case 'whoami':
        case 'about':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-1 text-xs sm:text-sm font-mono text-slate-200">
                <p className="text-emerald-400 font-bold text-base">{rudraData.name}</p>
                <p className="text-cyan-300">{rudraData.role} • {rudraData.subRole}</p>
                <p className="text-neutral-300 mt-2">
                  Passionate developer specializing in high-performance full-stack web applications, REST API architecture, JWT authentication, and modern interactive frontends.
                </p>
                <p className="text-neutral-400">📍 Based in {rudraData.location}</p>
              </div>
            )
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-2 text-xs sm:text-sm font-mono">
                <p className="text-emerald-400 font-bold">⚡ Technical Stack & Tooling:</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rudraData.skills.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-3 text-xs sm:text-sm font-mono">
                <p className="text-emerald-400 font-bold">📂 Featured Production Projects:</p>
                {rudraData.projects.map((p) => (
                  <div key={p.id} className="p-2.5 rounded bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">{p.title}</span>
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-1 text-xs">
                        Live Demo ↗
                      </a>
                    </div>
                    <p className="text-xs text-neutral-400">{p.category}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-black/40 text-neutral-300 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          });
          break;

        case 'journey':
        case 'edu':
        case 'education':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-200">
                <p className="text-emerald-400 font-bold">🎓 Education & Career Timeline:</p>
                <div className="space-y-2 border-l-2 border-emerald-500/40 pl-3 ml-1 mt-2">
                  <div>
                    <span className="text-white font-bold">B.Tech in Computer Science</span>
                    <p className="text-xs text-neutral-400">Gandhi Institute For Technology (GIFT) • 2022 - 2026 • CGPA: 8.32</p>
                  </div>
                  <div>
                    <span className="text-white font-bold">Intermediate (12th Science)</span>
                    <p className="text-xs text-neutral-400">Sai Sristi Higher Secondary School • 2020 - 2022 • 79.5%</p>
                  </div>
                  <div>
                    <span className="text-white font-bold">Matriculation (10th)</span>
                    <p className="text-xs text-neutral-400">Saraswati Sishu Vidya Mandir • 2020 • 73.66%</p>
                  </div>
                  <div>
                    <span className="text-cyan-300 font-bold">Associate Software Engineer - Trainee</span>
                    <p className="text-xs text-neutral-400">Aashdit Technology, Bhubaneswar • Joining July 2026</p>
                  </div>
                </div>
              </div>
            )
          });
          break;

        case 'contact':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-1.5 text-xs sm:text-sm font-mono">
                <p className="text-emerald-400 font-bold">📬 Connect with Rudra:</p>
                <p className="text-neutral-300">📧 Email: <a href={`mailto:${rudraData.email}`} className="text-cyan-400 hover:underline">{rudraData.email}</a></p>
                <p className="text-neutral-300">📱 Phone: <a href={`tel:${rudraData.phone}`} className="text-cyan-400 hover:underline">{rudraData.phone}</a></p>
                <p className="text-neutral-300">💼 LinkedIn: <a href={rudraData.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{rudraData.linkedin}</a></p>
                <p className="text-neutral-300">🐙 GitHub: <a href={rudraData.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{rudraData.github}</a></p>
              </div>
            )
          });
          break;

        case 'cat resume':
        case 'resume':
        case 'cv':
          newHistory.push({
            type: 'output',
            content: (
              <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-200">
                <p className="text-emerald-400 font-bold">📄 Rudra_Prakash_Resume.pdf [PDF, 1 Page]</p>
                <p className="text-xs text-neutral-400">Full-Stack MERN Developer • B.Tech CSE • GIFT Autonomous</p>
                <div className="pt-1">
                  <a
                    href={rudraData.resumeUrl || "/Rudra _Prakash.pdf"}
                    download="Rudra_Prakash_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    ⬇ Download Official CV (PDF)
                  </a>
                </div>
              </div>
            )
          });
          break;

        case 'clear':
        case 'cls':
          setHistory([]);
          setInputVal('');
          return;

        case 'matrix':
          newHistory.push({
            type: 'output',
            content: (
              <p className="text-emerald-400 font-mono text-xs animate-pulse">
                Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐇
              </p>
            )
          });
          break;

        case 'sudo':
          newHistory.push({
            type: 'output',
            content: (
              <p className="text-red-400 font-mono text-xs">
                Permission denied: User 'guest' is not in the sudoers file. This incident has been logged. 😉
              </p>
            )
          });
          break;

        case 'exit':
        case 'quit':
          setIsOpen(false);
          setInputVal('');
          return;

        default:
          newHistory.push({
            type: 'error',
            text: `command not found: '${rawCmd}'. Type 'help' to see valid commands.`
          });
          break;
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIndex < commandHistory.length - 1 && historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const available = ['help', 'skills', 'projects', 'journey', 'contact', 'resume', 'whoami', 'clear', 'exit'];
      const current = inputVal.toLowerCase().trim();
      const match = available.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full ${isMaximized ? 'h-[94vh] max-w-[96vw]' : 'max-w-2xl h-[520px] max-h-[85vh]'} flex flex-col rounded-2xl bg-[#0d1117]/95 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] backdrop-blur-2xl overflow-hidden transition-all duration-300 font-mono`}
      >
        {/* Top Window Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity"
              title="Close (ESC)"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:opacity-80 transition-opacity"
              title="Minimize / Maximize"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity"
              title="Expand"
            />
            <span className="ml-3 text-xs text-neutral-400 font-mono flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
              rudra@developer-box:~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-neutral-400">
            <span className="hidden sm:inline bg-black/40 px-2 py-0.5 rounded border border-white/5 font-mono">
              Ctrl+K
            </span>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="hover:text-white p-1"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-white p-1"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body Content */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 cursor-text text-sm scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent"
        >
          {history.map((item, idx) => (
            <div key={idx}>
              {item.type === 'system' && (
                <pre className="text-xs sm:text-sm text-neutral-400 whitespace-pre-wrap font-mono leading-relaxed">
                  {item.text}
                </pre>
              )}
              {item.type === 'input' && (
                <div className="text-emerald-400 font-mono font-semibold flex items-center gap-2">
                  <span>{item.text}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="py-1">{item.content}</div>
              )}
              {item.type === 'error' && (
                <p className="text-red-400 text-xs sm:text-sm font-mono">{item.text}</p>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold shrink-0 font-mono">
              rudra@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm caret-emerald-400 p-0"
              placeholder="type 'help'..."
            />
            <button
              onClick={() => handleCommand({ key: 'Enter' })}
              className="p-1 rounded text-emerald-400/60 hover:text-emerald-400 sm:hidden"
              title="Run Command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>

          <div ref={bottomRef} />
        </div>

        {/* Terminal Bottom Bar */}
        <div className="px-4 py-2 bg-[#161b22] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 select-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">ONLINE</span>
            <span>• zsh 5.9</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">TAB for autocomplete</span>
            <span className="hidden sm:inline">↑↓ for history</span>
          </div>
        </div>
      </div>
    </div>
  );
};
