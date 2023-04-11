/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  ["./index.html", "./src/**/*.{html,jsx,js}"],
  theme: 
  {
    extend: 
    {
      colors: 
      {
        'bg-primary': '#74bde0',
        'primary': '#f8bc9a',
        'secondary': '#f8d49a',
        'secondary-white': '#fff',
        'dark': '#fa9a9b'
      },
      fontFamily: 
      {
        'header': ['"Patrick Hand"', 'cursive'],
        'article': ['"Roboto"', 'sans-serif']
      }
    },
  },
  plugins: [require('daisyui')]
}
