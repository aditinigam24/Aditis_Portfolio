module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  safelist: [
    { pattern: /^h-\[\d+px\]$/ },
    { pattern: /^w-\[\d+px\]$/ },
    { pattern: /^bg-white\/\[\d+(?:\.\d+)?\]$/ },
    { pattern: /^from-white\/\[\d+(?:\.\d+)?\]$/ },
    { pattern: /^to-white\/\[\d+(?:\.\d+)?\]$/ },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
