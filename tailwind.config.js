/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  ["./src/**/*.{html,jsx}"],
  theme: 
  {
    extend: 
    {
      colors: 
      {
        'bg-primary': '#048276',
        'primary': '#0bb68c',
        'secondary': '#95de8c',
        'secondary-white': '#fff',
        'dark': '#2C3637'
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
