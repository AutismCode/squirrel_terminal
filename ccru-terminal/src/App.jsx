import React from 'react';
import SquirrelTerminal from './components/SquirrelTerminal';
import MatrixRain from './components/MatrixRain';

const env = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  API_KEY: import.meta.env.VITE_API_KEY || ''
};

export const getEnvironment = () => env;
function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a0f1f]" />
      
      {/* Matrix Animation Layer */}
      <div className="fixed inset-0 z-0">
        <MatrixRain />
      </div>
      
      {/* Terminal Layer */}
      <div className="relative z-10">
        <SquirrelTerminal />
      </div>
    </div>
  );
}

export default App;