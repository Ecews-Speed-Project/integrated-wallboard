/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './pages/**/*.{ts,tsx}',
    "./src/components/ui/**/*.{js,jsx,ts,tsx}", // Include UI components
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
