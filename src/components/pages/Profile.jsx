import React from 'react'
import {motion} from 'framer-motion';
import { auth } from '../../firebase.js';

const Profile = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="font-article text-white w-full h-full mt-16">
      {auth.currentUser?.email}
    </motion.div>
  )
}

export default Profile
