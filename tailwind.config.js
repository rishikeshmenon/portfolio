module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
      },
      boxShadow: {
        'glow': "0 0 20px rgba(59,130,246,0.15)",
        'glow-green': "0 0 20px var(--glow-green)",
        'glow-blue': "0 0 20px var(--glow-blue)",
        'card': "0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        'card-hover': "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px var(--glow-green), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        'grid-move': 'grid-move 20s linear infinite',
        'typing': 'typing 3.5s steps(30, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'glitch-1': 'glitch-1 0.5s infinite',
        'glitch-2': 'glitch-2 0.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'var(--accent-primary)' },
        },
        'glitch-1': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(-1px, -1px)' },
          '60%': { transform: 'translate(1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
        'glitch-2': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(1px, 0)' },
          '40%': { transform: 'translate(-1px, 0)' },
          '60%': { transform: 'translate(0, 1px)' },
          '80%': { transform: 'translate(0, -1px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [],
};
