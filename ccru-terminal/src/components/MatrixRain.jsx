import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters including squirrel emoji and CCRU-style characters
    const chars = '🐿️サイバー☆○◎●◉⚡️かたカナ≋01'.split('');
    
    // Columns for matrix rain
    const drops = [];
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Add gradient effect
        const gradient = ctx.createLinearGradient(
          i * fontSize,
          drops[i] * fontSize,
          i * fontSize,
          drops[i] * fontSize + fontSize
        );
        gradient.addColorStop(0, '#0f0');
        gradient.addColorStop(0.5, '#8f0');
        gradient.addColorStop(1, '#0f0');
        ctx.fillStyle = gradient;

        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset position if drop reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop
        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-20"
    />
  );
};

export default MatrixRain;