import { Link } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const Navbar = () => {
  const [user, setUser] = useState({});
  
  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  });

  return (
    <nav className="navbar w-full h-16 p-0 fixed z-20 flex justify-between items-center bg-primary text-secondary-white font-header text-xl">
      <Link to="/random" className="flex lg:w-16 flex-row justify-center items-center p-3 rounded-md transition-all duration-300 lg:hover:rotate-12">
        <img src="./img/paw.png" height="40px" width="40px" alt="random"/>
        <span className="btn border-none text-white text-lg bg-transparent lg:hidden flex self-center transition-all duration-300 active:bg-dark hover:bg-dark p-2 rounded-lg">CAT PAGE</span>
      </Link>
      <ul className="w-full h-full lg:flex hidden flex-row justify-center items-center">
        <li className="w-full flex font-article justify-center gap-16 align-center">
          <NavLink className="btn bg-primary text-secondary-white text-lg border-0 p-3 rounded-md transition-all duration-300 hover:bg-dark" to="/random">Random Cats</NavLink>
          <NavLink className="btn bg-primary text-secondary-white text-lg border-0 p-3 rounded-md transition-all duration-300 hover:bg-dark" to="/cat_breeds">Cat Breeds</NavLink>
          <NavLink className="btn bg-primary text-secondary-white text-lg border-0 p-3 rounded-md transition-all duration-300 hover:bg-dark" to="/favourites">Favourites</NavLink>
          <NavLink className="btn bg-primary text-secondary-white text-lg border-0 p-3 rounded-md transition-all duration-300 hover:bg-dark" to="/about">About</NavLink>
        </li>
        {user?.email ?  
        <li className="flex justify-center items-center w-12"><NavLink className="btn bg-primary text-secondary-white text-lg p-1 mr-4 border-0 rounded-md transition-all duration-300 hover:bg-dark"  to="/profile"><img src="./img/cat_profile.png" width="40px" height="40px" alt="Cat profile picture"></img></NavLink></li> 
        : <li className="flex justify-center items-center w-12" ><NavLink className="btn flex justify-center items-center align-center bg-primary text-secondary-white text-lg px-6 mr-4 border-0 rounded-md transition-all duration-300 hover:bg-dark" to="/"><i className="gg-log-in"></i></NavLink></li>
        }
      </ul>
      <HamburgerMenu>
        <NavLink to="/random" className="home-link menu-item w-full bg-primary p-2 m-0 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Random Cats</NavLink>
        <NavLink to="/cat_breeds" className="cat-breeds-link menu-item bg-primary w-full p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Cat Breeds</NavLink>
        <NavLink to="/favourites" className="favourites-link menu-item bg-primary p-2 w-full transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Favourites</NavLink>
        <NavLink to="/about" className="about-link menu-item bg-primary w-full p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">About</NavLink>
        {user?.email ?  
          <NavLink to="/profile" className="about-link menu-item bg-primary w-full p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Profile</NavLink>
          : <NavLink to="/" className="about-link menu-item bg-primary w-full p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Login</NavLink>
        }
      </HamburgerMenu>
    </nav>
  )
}

export default Navbar