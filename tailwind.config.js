/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#FFFFFF',
        'brand-light': '#F5F5F5',
        'brand-gray': '#E5E5E5',
        'brand-dark': '#000000',
        'brand-text': '#1A1A1A',
        'brand-muted': '#666666',
      }
    },
  },
  plugins: [],
}
