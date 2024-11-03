import React from 'react';
import SquirrelTerminal from './components/SquirrelTerminal';
import MatrixRain from './components/MatrixRain';

// Environment variables configuration
const env = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  API_KEY: process.env.REACT_APP_API_KEY || 'retardednigga'
};

// Export environment configuration for use in other components
export const getEnvironment = () => env;

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0f1f] relative overflow-hidden">
      {/* Matrix Rain Animation */}
      <MatrixRain />
      
      {/* Animated scan line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-scan" />
      
      <SquirrelTerminal apiUrl={env.API_URL} apiKey={env.API_KEY} />
    </main>
  );
}

export default App;