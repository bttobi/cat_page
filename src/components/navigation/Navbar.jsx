import { NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useContext } from 'react';
import { UserContext } from '../../App';

const Navbar = () => {
  const [user, setUser] = useState({});
  const auth = useContext(UserContext);
  
  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  });

  return (
    <nav className="navbar w-full h-16 p-0 fixed z-20 flex justify-center items-center bg-primary text-secondary-white font-header text-xl">
      <ul className="w-full h-full flex flex-row justify-between items-center">
        <li className="flex flex-row p-3 rounded-md transition-all duration-300 hover:rotate-12">
          <NavLink to="/cat_page" className="flex flex-row justify-center items-center">
            <img className="bg-primary" src="./img/paw.png" height="40px" width="40px" alt="home/random page icon with link"/>
          </NavLink>
        </li>
        <li className="w-full flex justify-center align-center">
          <NavLink to="/cat_page" className="home-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Random Cats</NavLink>
          <NavLink to="/cat_page/cat_breeds" className="cat-breeds-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Cat Breeds</NavLink>
          <NavLink to="/cat_page/favourites" className="favourites-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">Favourites</NavLink>
          <NavLink to="/cat_page/about" className="about-link bg-primary p-2 transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none mx-1">About</NavLink>
        </li>
        {user?.email ?  
        <NavLink to="/cat_page/profile" className="profile-link bg-primary transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none"><li className={" flex justify-center items-center"} style={{padding: "3px"}}><img src="./img/cat_profile.png" height="40px" width="40px" alt="profile link/image"/></li></NavLink> 
        : <NavLink to="/cat_page/login" className="login-link bg-primary transition-all duration-250 hover:bg-dark rounded-lg text-white outline-none"><li className={" flex justify-center items-center"} style={{width:"40px", height:"46px", marginRight: "6px"}}><i className="gg-log-in" alt="login picture"/></li></NavLink>
        }
      </ul>
    </nav>
  )
}

export default Navbar