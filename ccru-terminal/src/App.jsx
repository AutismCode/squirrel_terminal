import React from 'react';
import SquirrelTerminal from './components/SquirrelTerminal';

// Environment variables configuration
const env = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  API_KEY: process.env.REACT_APP_API_KEY || 'lol'
};

// Export environment configuration for use in other components
export const getEnvironment = () => env;

function App() {
  // Pass environment variables to SquirrelTerminal as props
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0f1f] relative overflow-hidden">
      {/* Animated cyber grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBvcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      {/* Animated scan line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent animate-scan" />
      
      <SquirrelTerminal apiUrl={env.API_URL} apiKey={env.API_KEY} />
    </main>
  );
}

export default App;