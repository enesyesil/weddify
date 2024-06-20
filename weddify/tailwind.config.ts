module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#4b6b28', // Darker shade of green
          200: '#3a5520', // Even darker shade of green
        },
        brown: {
          600: '#8D6E63',
        },
      },
      fontFamily: {
        minecraft: ['Minecraft', 'monospace'],
      },
    },
  },
  plugins: [],
};
