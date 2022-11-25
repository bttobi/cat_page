import { Link } from '@tanstack/react-router'

const buttonStyle= "p-3 rounded-md transition-all duration-300 hover:bg-bg-primary hover:bg-dark";


const Navbar = () => {
  let loggedIn = true;
  return (
    <div className="w-full h-16 fixed flex justify-center items-center bg-primary text-secondary-white font-header text-xl">
      <ul className="w-full h-full flex flex-row justify-between items-center">
        <li className="p-3 rounded-md transition-all duration-300 hover:rotate-12">
          <Link to="/" style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <img src="/img/paw.png" height="40px" width="40px" alt="Home"/>
          </Link>
        </li>
        <li className={buttonStyle}><Link to="/favourites">Favourites</Link></li>
        <li className={buttonStyle}><Link to="/about">About</Link></li>
        <li className={buttonStyle} style={{padding: "1rem", right:"0"}}>
        {loggedIn ? <Link to="/profile"><img src="/img/cat_profile.png" height="40px" width="40px" alt="profile"/></Link> : <Link to="/login"><i className="gg-log-in" style={{marginRight: "0px"}}></i></Link>}
        </li>
      </ul>
    </div>
  )
}

export default Navbar