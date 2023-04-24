/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  ["./index.html", "./src/**/*.{html,jsx,js}"],
  theme: 
  {
    fontFamily: 
      {
        'header': ['"Manrope"', 'sans-serif'],
        'article': ['Lato', 'sans-serif']
      },
    extend: 
    {
      colors: 
      {
        'bg-primary': '#159895',
        'primary': '#1A5F7A',
        'secondary': '#57C5B6',
        'secondary-white': '#fff',
        'dark': '#002B5B'
      },
      fontFamily: 
      {
        'header': ['"Manrope"', 'sans-serif'],
        'article': ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [require('daisyui')]
}
