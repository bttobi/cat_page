import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const buttonStyle= "btn bg-primary text-secondary-white text-lg border-0 p-3 rounded-md transition-all duration-300 hover:bg-bg-primary hover:bg-dark";

const Navbar = () => {
  const [user, setUser] = useState({});
  
  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  });

  return (
    <nav className="navbar w-full h-16 p-0 fixed z-20 flex justify-center items-center bg-primary text-secondary-white font-header text-xl">
      <ul className="w-full h-full flex flex-row justify-between items-center">
        <li className="flex flex-row p-3 rounded-md transition-all duration-300 hover:rotate-12">
          <NavLink to="/" className="flex flex-row justify-center items-center">
            <img src="/img/paw.png" height="40px" width="40px" alt="random"/>
          </NavLink>
        </li>
        <li className="w-full flex justify-center align-center">
          <button className={buttonStyle + " mx-1"}><NavLink to="/">Random Cats</NavLink></button>
          <button className={buttonStyle + " mx-1"}><NavLink to="/cat_breeds">Cat Breeds</NavLink></button>
          <button className={buttonStyle + " mx-1"}><NavLink to="/favourites">Favourites</NavLink></button>
          <button className={buttonStyle + " mx-1"}><NavLink to="/about">About</NavLink></button>
        </li>
        {user?.email ?  
        <li className={buttonStyle + " flex justify-center items-center"} style={{padding: "3px", right:"0", marginRight: "6px"}}><NavLink to="/profile"><img src="/img/cat_profile.png" height="40px" width="40px" alt="profile"/></NavLink></li> 
        : <li className={buttonStyle + " flex justify-center items-center"} style={{width:"52px", height:"52px", right:"0", marginRight: "6px"}}><NavLink to="/login"><i className="gg-log-in"/></NavLink></li>
        }
      </ul>
    </nav>
  )
}

export default Navbar