/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#C9A84C', light: '#E2C47A', dark: '#9A7A30' },
        navy: { DEFAULT: '#0D1B2A', light: '#152336', mid: '#1A2D42', accent: '#1E3A5F' },
        cream: '#F5F0E8',
        charcoal: '#1C1C1E',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}