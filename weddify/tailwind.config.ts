module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      backgroundImage: {
        'wedding-bg': "url('/wedding-background.png')",
      },
      colors: {
        green: {
          100: '#4b6b28',
          200: '#3a5520',
        },
        brown: {
          600: '#8D6E63',
        },
      },
      fontFamily: {
        minecraft: ['"Press Start 2P"', 'monospace'],
      },
    },
  },
  plugins: [],
};
