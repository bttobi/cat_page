import React from 'react';
import {motion} from 'framer-motion';

const NotLoggedIn = () => {
  return (
  <>
    <motion.div initial={{ top:10, opacity: 0 }} animate={{top: 0, opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute w-64 alert alert-warning shadow-lg z-30">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>You must log in in order to add cats to favourites!</span>
      </div>
    </motion.div>
  </>
  )
}

export default NotLoggedIn