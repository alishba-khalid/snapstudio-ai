module.exports = {
  content: [
    './app/**/*.{ts,tsx,css}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,css}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#030712',
        brand: {
          violet: '#8b5cf6',
          emerald: '#10b981',
          cyan: '#06b6d4',
          50: '#E5EBFF',
          100: '#CBD6FF',
          500: '#4361EE',
          600: '#3451D1',
          700: '#2941B8',
          900: '#0F1B6B',
        },
        surface: {
          50: '#101827',
          100: '#111b2e',
          200: '#15223f',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(0, 0, 0, 0.28)',
        card: '0 12px 32px rgba(0, 0, 0, 0.24)',
        premium: '0 0 40px -10px rgba(139, 92, 246, 0.3)',
      },
      borderRadius: {
        premium: '2rem',
      },
    },
  },
  plugins: [],
};
