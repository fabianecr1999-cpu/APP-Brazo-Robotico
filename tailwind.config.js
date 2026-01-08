/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stark-blue': '#00f0ff', // Color cian del robot y botones
      },
    },
  },
  plugins: [],
}