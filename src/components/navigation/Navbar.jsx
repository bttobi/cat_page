import { Link } from '@tanstack/react-router'

const buttonStyle= "p-3 rounded-md transition-all duration-300 hover:bg-bg-primary hover:bg-dark";
export let loggedIn = true;

const Navbar = () => {
  return (
    <nav className="navbar w-full h-16 fixed z-20 flex justify-center items-center bg-primary text-secondary-white font-header text-xl">
      <ul className="w-full h-full flex flex-row justify-between items-center">
        <li className="flex flex-row p-3 rounded-md transition-all duration-300 hover:rotate-12">
          <Link to="/" className="flex flex-row justify-center items-center">
            <img src="/img/paw.png" height="40px" width="40px" alt="Home"/>
          </Link>
        </li>
        <li className="w-full flex justify-center align-center">
          <div className={buttonStyle + " mx-1"}><Link to="/favourites">Favourites</Link></div>
          <div className={buttonStyle + " mx-1"}><Link to="/about">About</Link></div>
        </li>
        {loggedIn ?  
        <li className={buttonStyle + " flex justify-center items-center"} style={{padding: "6px", right:"0", marginRight: "6px"}}><Link to="/profile"><img src="/img/cat_profile.png" height="40px" width="40px" alt="profile"/></Link></li> 
        : <li className={buttonStyle + " flex justify-center items-center"} style={{width:"52px", height:"52px", right:"0", marginRight: "6px"}}><Link to="/login"><i className="gg-log-in"></i></Link></li>
        }
      </ul>
    </nav>
  )
}

export default Navbar