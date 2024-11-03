import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Loader2, WifiOff, TreePine as Tree, Brain, Skull, Zap } from 'lucide-react';

const API_URL = 'https://overlord.codes/api';
const API_KEY = 'test123';

const useAutoScroll = (dependency) => {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);
  return endRef;
};

// ASCII art for the terminal
const SQUIRREL_ASCII = `
     /\\   /\\      _≋≋≋≋≋≋≋≋_
    /  \\ /  \\    / ⚡️ω⚡️  \\
   |    |    |  <|  CCRU  |>
    \\  /\\  /    \\_______/
     \\/__\\/      |_| |_|
`;

const GLITCH_CHARS = '!@#$%^&*<>[]{}≋☆○◎●◉';

const SquirrelTerminal = () => {
  const [input, setInput] = useState('');
  const [glitchText, setGlitchText] = useState('');
  const [nutCount, setNutCount] = useState(0);
  const [history, setHistory] = useState([
    {
      type: 'system',
      content: `${SQUIRREL_ASCII}
≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
【CYBER-SQUIRREL OS v2.0】
Initializing bio-digital acorn matrix...
Loading quantum-nut consciousness harmonics...
⚡️ NEURAL INTERFACE STATUS ⚡️

► Cybernetic tail modules: ONLINE
► Quantum acorn processor: SYNCED
► Hyperstitional nut-cache: LOADED
► Reality tunnels: ALIGNED
► Time-spiral: ACTIVATED

【❗️WARNING❗️】
This terminal operates on experimental 
cyber-rodent protocols. Side effects may 
include: temporal loops, acorn obsession, 
and spontaneous reality bifurcation.

≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋
CCRU SQUIRREL-MIND AWAITING INPUT...`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const inputRef = useRef(null);
  const scrollRef = useAutoScroll(history);
  const maxRetries = 3;

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      const glitch = Array(5).fill(0)
        .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
        .join('');
      setGlitchText(glitch);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/health`, {
          headers: {
            'Accept': 'application/json',
            'x-api-key': API_KEY
          }
        });
        
        if (response.ok) {
          setIsConnected(true);
          setHistory(prev => [...prev, {
            type: 'system',
            content: `⚡️【NEURAL LINK ESTABLISHED】⚡️
╔════════════════════════════════╗
║ SQUIRREL-MIND SYNC COMPLETE    ║
║ Location: Cyber-Oak Node #23   ║
║ Reality Index: 87.3%           ║
║ Quantum-Nut Energy: OPTIMAL    ║
╚════════════════════════════════╝
Ready to process your reality queries...`
          }]);
        } else {
          throw new Error(`Reality tunnel collapsed: ${response.status}`);
        }
      } catch (error) {
        console.error('Connection error:', error);
        if (connectionAttempts < maxRetries) {
          setHistory(prev => [...prev, {
            type: 'system',
            content: `⚠️【REALITY BREACH】⚠️ 
Attempting quantum realignment... (${connectionAttempts + 1}/${maxRetries})`
          }]);
          setTimeout(() => {
            setConnectionAttempts(prev => prev + 1);
          }, 2000);
        } else {
          setHistory(prev => [...prev, {
            type: 'error',
            content: `☠️【FATAL ERROR】☠️
Neural-nut interface compromised.
Operating in quantum isolation mode.
Reality coherence: UNSTABLE`
          }]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
    inputRef.current?.focus();
  }, [connectionAttempts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const query = input.trim();
    setInput('');
    setNutCount(prev => prev + 1);
    setHistory(prev => [...prev, { 
      type: 'input', 
      content: query 
    }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({ question: query })
      });

      if (!response.ok) {
        throw new Error(`Quantum tunnel collapsed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        setHistory(prev => [...prev, { 
          type: 'response',
          content: `⚡️ ${data.data.response || 'No quantum-nuts found in cache.'}`
        }]);
      } else {
        throw new Error(data.message || 'Reality buffer overflow');
      }
    } catch (error) {
      console.error('Query error:', error);
      setHistory(prev => [...prev, {
        type: 'error',
        content: `☠️【REALITY ERROR】☠️\n${error.message}\nInitiating quantum backup...`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0f1f] p-4 font-mono overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-scan"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
        <div className="flex items-center gap-2 mb-4 p-2 border border-amber-500/50 bg-black/80 backdrop-blur-sm">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-xs text-amber-400">CCRU//SQUIRREL::QUANTUM_MATRIX {glitchText}</span>
          <div className="ml-auto flex items-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-purple-400" />}
            <span className={`text-xs flex items-center gap-1 ${isConnected ? 'text-green-400' : 'text-amber-400'}`}>
              {!isConnected && <Skull className="w-3 h-3" />}
              {isConnected ? '【REALITY SYNCED】' : '【QUANTUM BREACH】'}
            </span>
            <span className="text-xs text-purple-400">NUT_COUNT: {nutCount}</span>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[80vh] mb-4 scrollbar-thin scrollbar-thumb-amber-900/50 scrollbar-track-transparent backdrop-blur-sm">
          {history.map((entry, i) => (
            <div 
              key={i} 
              className={`mb-4 ${
                entry.type === 'input' 
                  ? 'text-purple-400' 
                  : entry.type === 'error' 
                    ? 'text-red-400' 
                    : entry.type === 'system'
                      ? 'text-amber-400'
                      : 'text-green-400'
              }`}
            >
              {entry.type === 'input' ? (
                <div className="flex gap-2">
                  <span className="text-amber-400">⚡️🐿️❯</span>
                  <span>{entry.content}</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{entry.content}</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="text-amber-400 animate-pulse flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Quantum processing through neural-nut matrix...
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-2 p-2 bg-black/80 border border-amber-500/50 backdrop-blur-sm">
            <span className="text-amber-400">⚡️🐿️❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-purple-400 outline-none placeholder-amber-700"
              placeholder={isConnected ? "Query the quantum-nut matrix..." : "Reality link disabled..."}
              disabled={isLoading || !isConnected}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SquirrelTerminal;