import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      // Make sure canvas fills the entire viewport
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      ctx.scale(scale, scale);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Configuration
    const fontSize = 30;
    const squirrelSize = 50;
    const columns = Math.floor(window.innerWidth / fontSize);
    
    // State arrays with proper initialization
    const drops = Array(columns).fill(0).map(() => Math.random() * -100); // Start above viewport
    const speeds = Array(columns).fill(0).map(() => 0.08 + Math.random() * 0.04);
    const isSpecialColumn = Array(columns).fill(false).map(() => Math.random() < 0.15);
    
    // Characters
    const matrixChars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ日ﾊﾐﾋーｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ≋⚡️กขคฆงฮ༄࿏☢☣☠卐☯☮◈◉✝✞✟†☨✠'.split('');
    const specialChars = ['🐿️', '🥜', '🥜', '🐿️'];

    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      drops.forEach((drop, i) => {
        const x = i * fontSize;
        const y = drop * fontSize;

        // Only render if within viewport bounds plus some padding
        if (y > -50 && y < (window.innerHeight + 50)) {
          // Draw special characters
          if (isSpecialColumn[i] && Math.random() > 0.6) {
            const char = specialChars[Math.floor(Math.random() * specialChars.length)];
            ctx.font = `${squirrelSize}px sans-serif`;
            ctx.fillStyle = 'rgba(255, 215, 0, 0.9)';
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ffd700';
            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;
          } else {
            // Draw matrix characters
            ctx.font = `${fontSize}px monospace`;
            ctx.textAlign = 'center';
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillStyle = 'rgba(0, 255, 0, 0.9)';
            ctx.fillText(char, x, y);
          }

          // Draw trailing characters
          ctx.font = `${fontSize}px monospace`;
          for (let j = 1; j < 15; j++) {
            const trailY = y - j * fontSize;
            if (trailY > 0) {
              const trailChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
              ctx.fillStyle = `rgba(0, 255, 0, ${0.03 + (0.02 * (15-j))})`;
              ctx.fillText(trailChar, x, trailY);
            }
          }
        }

        // Reset drops when they go off screen
        if (y > window.innerHeight + 100) {
          drops[i] = -10; // Reset to just above viewport
          isSpecialColumn[i] = Math.random() < 0.15;
        } else {
          drops[i] += speeds[i];
        }
      });

      // Random squirrel spawning
      if (Math.random() > 0.97) {
        const randomColumn = Math.floor(Math.random() * columns);
        isSpecialColumn[randomColumn] = true;
      }

      requestAnimationFrame(draw);
    };

    const animation = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 0.4,
        mixBlendMode: 'screen',
        filter: 'contrast(1.2) brightness(1.1)',
        zIndex: 0,
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  );
};

export default MatrixRain;