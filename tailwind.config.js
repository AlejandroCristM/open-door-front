/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '320px',
        md: '768px',
        lg: '1024px',
      },
      colors:{
        gray: '#E5E5E5',
        'blue-lt': '#140455',
        'orange-lt': '#FF4E00',
        'gray-lt': '#282F4B'
      } 
    },
  },
  plugins: [],
}
