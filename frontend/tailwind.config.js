/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neumorphism: '20px 20px 60px #c5c5c5, -20px -20px 60px #ffffff',
        'neumorphism-inset': 'inset 20px 20px 60px #c5c5c5, inset -20px -20px 60px #ffffff',
      },
    },
  },
  plugins: [],
}

