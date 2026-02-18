/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./dist/**/*.{html,js}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      colors: {
        'emerald-deep':  '#064e3b',
        'emerald-dark':  '#022c22',
        'teal-midnight': '#0d3b3b',
        gold:            '#fbbf24',
        'gold-dim':      '#b8941a',
      },

      animation: {
        float:        'float 6s ease-in-out infinite',
        shimmer:      'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },

        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },

        'glow-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
      },
    },
  },

  plugins: [],
}
