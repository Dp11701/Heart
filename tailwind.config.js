/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "sans-serif"],
      },
    },
  },
  plugins: [],
}

