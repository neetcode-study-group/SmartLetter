/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        interLight: ['Inter-Extra-Light', 'sans-serif'],
      },
      width: {
        100: '420px',
      },
      height: {
        120: '538px',
      },
    },
  },
  plugins: [],
}
