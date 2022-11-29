/** @type {import('tailwindcss').Config} */
module.exports = {
  content: 
  [
    './src/index.jsx',
    './src/App.jsx',
    './src/components/navigation/Navbar.jsx',
    './src/components/pages/Home.jsx',
    './src/components/pages/About.jsx',
    './src/components/pages/Login.jsx',
    './src/components/pages/Favourites.jsx',
    './src/components/assets/CatCard.jsx',
    './src/components/functions/Search.jsx'
  ],
  theme: 
  {
    extend: 
    {
      colors: 
      {
        'bg-primary': '#2C3639',
        'primary': '#3F4E4F',
        'secondary': '#A27B5C',
        'secondary-white': '#DCD7C9',
        'dark': '#2C3637'
      },
      fontFamily: 
      {
        'header': ['"Patrick Hand"', 'cursive'],
        'article': ['"Roboto"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
