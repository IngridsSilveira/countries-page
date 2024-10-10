/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'dark-text': '#e0e0e0',
        'light-bg': '#ffffff',
        'light-text': '#000000',
      },
      fontFamily: {
        'baloo': ['Baloo Paaji 2', 'sans-serif'],
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
  },
  plugins: [],
}

