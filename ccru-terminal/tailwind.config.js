/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scan': 'scan 8s linear infinite',
        'glitch': 'glitch 1s infinite linear alternate-reverse',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%': { 
            clipPath: 'inset(40% 0 61% 0)',
            transform: 'skew(0.15deg)',
          },
          '20%': { 
            clipPath: 'inset(92% 0 1% 0)',
            transform: 'skew(0.25deg)',
          },
          '40%': { 
            clipPath: 'inset(43% 0 1% 0)',
            transform: 'skew(0.5deg)',
          },
          '60%': { 
            clipPath: 'inset(25% 0 58% 0)',
            transform: 'skew(0.1deg)',
          },
          '80%': { 
            clipPath: 'inset(54% 0 7% 0)',
            transform: 'skew(-0.2deg)',
          },
          '100%': { 
            clipPath: 'inset(58% 0 43% 0)',
            transform: 'skew(-0.4deg)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}