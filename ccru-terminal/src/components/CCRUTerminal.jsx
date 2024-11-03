import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Loader2, WifiOff } from 'lucide-react';

const API_URL = 'https://overlord.codes/api';  // Updated to remove port number
const API_KEY = 'test123';

// Custom hook for auto-scrolling
const useAutoScroll = (dependency) => {
  const endRef = useRef(null);
  
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);
  
  return endRef;
};

const CCRUTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      content: '【CCRU Terminal v1.0】\nInitializing hyperstitional matrix...\nType your query to interface with the CCRU database.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const inputRef = useRef(null);
  const scrollRef = useAutoScroll(history);
  const maxRetries = 3;

  // Enhanced connection check with retry mechanism
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
          const data = await response.json();
          setIsConnected(true);
          setHistory(prev => [...prev, {
            type: 'system',
            content: `【CONNECTION ESTABLISHED】\n${data.message}\nAwaiting input...`
          }]);
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Connection error:', error);
        if (connectionAttempts < maxRetries) {
          setHistory(prev => [...prev, {
            type: 'system',
            content: `【RETRY】Attempting to reconnect... (${connectionAttempts + 1}/${maxRetries})`
          }]);
          setTimeout(() => {
            setConnectionAttempts(prev => prev + 1);
          }, 2000);
        } else {
          setHistory(prev => [...prev, {
            type: 'error',
            content: '【ERROR】Connection to hyperstitional matrix failed.\nSystem operating in offline mode.'
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Query failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data) {
        setHistory(prev => [...prev, { 
          type: 'response',
          content: data.data.response || 'No response received.'
        }]);
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Query error:', error);
      setHistory(prev => [...prev, {
        type: 'error',
        content: `【ERROR】Temporal distortion detected:\n${error.message}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-black p-4 font-mono text-red-500 overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4 p-2 border border-red-800 bg-black/50">
          <Terminal className="w-5 h-5" />
          <span className="text-xs">CCRU//TERMINAL::INTERFACE</span>
          <div className="ml-auto flex items-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span className={`text-xs flex items-center gap-1 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
              {!isConnected && <WifiOff className="w-3 h-3" />}
              {isConnected ? '【CONNECTED】' : '【OFFLINE】'}
            </span>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[80vh] mb-4 scrollbar-thin scrollbar-thumb-red-900 scrollbar-track-transparent">
          {history.map((entry, i) => (
            <div 
              key={i} 
              className={`mb-4 ${
                entry.type === 'input' 
                  ? 'text-green-500' 
                  : entry.type === 'error' 
                    ? 'text-red-500' 
                    : entry.type === 'system'
                      ? 'text-yellow-500'
                      : 'text-red-400'
              }`}
            >
              {entry.type === 'input' ? (
                <div className="flex gap-2">
                  <span className="text-red-500">❯</span>
                  <span>{entry.content}</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{entry.content}</div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="text-red-500 animate-pulse flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Querying hyperstitional matrix...
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-2 p-2 bg-black/50 border border-red-800">
            <span className="text-red-500">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-green-500 outline-none"
              placeholder={isConnected ? "Enter your query..." : "Connection offline..."}
              disabled={isLoading || !isConnected}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CCRUTerminal;