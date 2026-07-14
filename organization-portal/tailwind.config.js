/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A1628',
        secondary: '#1B3A5C',
        accent: '#D4A843',
        success: '#2D6A4F',
        surface: '#FFFFFF',
        background: '#F4F6F9',
        textDark: '#1A1A2E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
