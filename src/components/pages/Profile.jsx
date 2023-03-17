import React from 'react';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { auth } from '../../firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState({});
  
  onAuthStateChanged(auth, (currentUser) =>{
    setUser(currentUser);
  });

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="font-article text-white w-full h-full mt-16">
      {user.email}<br></br>
      <button onClick={logOut}>Sign out</button>
    </motion.div>
  )
}

export default Profile
