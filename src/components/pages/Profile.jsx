import React from 'react';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { auth } from '../../firebase.js';
import { Link } from '@tanstack/react-router';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState({});

  const logOut = async () => {
    await signOut(auth);
  };

  onAuthStateChanged(auth, (currentUser) =>{
  setUser(currentUser);
});

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="font-article text-white w-full h-full mt-16">
      {user?.email}<br></br>
      <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-sm border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-bg-primary mt-4" onClick={logOut}><Link to="/login">Sign out</Link></button>
    </motion.div>
  )
}

export default Profile
