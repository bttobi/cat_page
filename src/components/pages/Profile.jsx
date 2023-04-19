import React from 'react';
import { useState, useContext, useEffect } from 'react';
import {motion} from 'framer-motion';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import useProfilePic from '../hooks/useProfilePic';

const Profile = () => {
  const [user, setUser] = useState({});
  const auth = useContext(UserContext);
  const [profilePicUrl, isFetched] = useProfilePic();

  const logOut = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) =>{
  setUser(currentUser);
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (<>
    {(user?.email != undefined || user?.email != null) ? 
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="font-article text-white w-auto h-auto mt-32 flex flex-col text-lg font-bold justify-center align-center items-center rounded-lg bg-dark p-4 shadow-lg shadow-black">
      <p>Welcome! </p>
      <p>{user?.email}</p>
      {profilePicUrl != "NOT FOUND" ? <div className="w-36 h-36 rounded-lg mt-4 border-white border-2" style={{backgroundImage: `url(${profilePicUrl})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
      : <div className="w-36 h-36 rounded-lg border-white border-2 p-3 flex justify-center align-center items-center text-center mt-4">No profile picture found!</div>}
      <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-dark mt-4" onClick={logOut}><Link to="/login">Sign out</Link></button>
    </motion.div>  : 
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="font-article text-white mt-32 flex flex-col text-lg font-bold justify-center align-center items-center rounded-lg bg-dark p-4 shadow-lg shadow-black">
      <span>You need to log in to view the profile! </span>
      <p>{user?.email}</p>
      <Link className="underline" to="/login">Log in here</Link>
    </motion.div>
    }
    </>
  )
}

export default Profile
