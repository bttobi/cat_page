import React from 'react'
import {motion} from 'framer-motion';

const SuccessNotification = ({ notification }) => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed w-36 alert alert-success shadow-md shadow-black text-center z-30">
      <div className="flex justify-center align-center items-center w-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{notification}</span>
      </div>
    </motion.div>
  )
}

export default SuccessNotification