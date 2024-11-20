/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1', backgroundColor: 'rgba(255, 255, 255, 1)' },
          '50%': { opacity: '1', backgroundColor: 'rgba(255, 255, 0, 5)' },
        },
      },
    },
  },
  plugins: [],
}

