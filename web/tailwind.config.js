/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f4f6f9',
          100: '#e8ecf2',
          200: '#c8d1e0',
          300: '#9aacbf',
          400: '#6a7f9e',
          500: '#4a5f7e',
          600: '#3a4f6e',
          700: '#2a3f5e',
          800: '#1a2744',
          900: '#0f1724',
        },
        accent: {
          50: '#fdf5f0',
          100: '#fae8da',
          200: '#f0c9a8',
          300: '#e0a070',
          400: '#c47a40',
          500: '#8b4513',
          600: '#753a11',
          700: '#5f2f0e',
          800: '#4a240b',
          900: '#351a08',
        },
      },
    },
  },
  plugins: [],
};
