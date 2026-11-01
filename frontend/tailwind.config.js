/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0b2545',
          blue: '#133863',
          dark: '#0a192f',
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          header: '#0a192f',
          saffron: '#d97706',
          green: '#059669'
        }
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
