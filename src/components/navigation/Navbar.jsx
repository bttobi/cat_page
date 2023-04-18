import { Link } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
<<<<<<< Updated upstream
import { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
=======
import { useState } from 'react';

const buttonStyle= "btn bg-primary text-secondary-white text-lg border-0 p-3 rounded-md transition-all duration-300 hover:bg-bg-primary hover:bg-dark";
>>>>>>> Stashed changes

const Navbar = () => {
  const [user, setUser] = useState({});
  
  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  });

  return (
    <nav className="navbar w-full h-16 p-0 fixed z-20 flex justify-center items-center bg-primary text-secondary-white font-header text-xl">
      <ul className="w-full h-full flex flex-row justify-between items-center">
        <li className="flex flex-row p-3 rounded-md transition-all duration-300 hover:rotate-12">
          <Link to="/" className="flex flex-row justify-center items-center">
            <img src="/img/paw.png" height="40px" width="40px" alt="random"/>
          </Link>
        </li>
        <li className="w-full flex justify-center align-center">
          <button className={buttonStyle + " mx-1"}><Link to="/cat_breeds">Cat Breeds</Link></button>
          <button className={buttonStyle + " mx-1"}><Link to="/favourites">Favourites</Link></button>
          <button className={buttonStyle + " mx-1"}><Link to="/about">About</Link></button>
        </li>
        {user?.email ?  
        <li className={buttonStyle + " flex justify-center items-center"} style={{padding: "3px", right:"0", marginRight: "6px"}}><Link to="/profile"><img src="/img/cat_profile.png" height="40px" width="40px" alt="profile"/></Link></li> 
        : <li className={buttonStyle + " flex justify-center items-center"} style={{width:"52px", height:"52px", right:"0", marginRight: "6px"}}><Link to="/login"><i className="gg-log-in"></i></Link></li>
        }
      </ul>
      <HamburgerMenu>
        <NavLink to="/" className="home-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Random Cats</NavLink>
        <NavLink to="/cat_breeds" className="cat-breeds-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Cat Breeds</NavLink>
        <NavLink to="/favourites" className="favourites-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Favourites</NavLink>
        <NavLink to="/about" className="about-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">About</NavLink>
        {user?.email ?  
        <NavLink to="/profile" className="profile-link bg-primary transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none hidden lg:flex"><div className={" flex justify-center items-center"} style={{padding: "3px"}}><img src="./img/cat_profile.png" height="40px" width="40px" alt="profile link/image"/></div></NavLink> 
        : <NavLink to="/login" className="login-link bg-primary transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none hidden lg:flex"><div className={" flex justify-center items-center"} style={{width:"40px", height:"46px", marginRight: "6px"}}><i className="gg-log-in" alt="login picture"/></div></NavLink>
        }
      </HamburgerMenu>
    </nav>
  )
}

export default Navbar