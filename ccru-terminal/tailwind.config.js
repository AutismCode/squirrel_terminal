// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          black: '#0a0a0a',
          red: '#ff0000',
          green: '#00ff00',
          yellow: '#ffff00',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}