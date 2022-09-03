/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        rainbow:
          "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red)"
      },
    },
  },
  plugins: [],
};
