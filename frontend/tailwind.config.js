/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        'deep-blue': {
          50: '#E6E6F2',
          100: '#B3B3D6',
          500: '#0A192F',
          900: '#112240',
        },
      },
    },
  },
  plugins: [],
}