import React from 'react'
import {motion} from 'framer-motion';

const SuccessNotification = ({ notification }) => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="fixed w-auto alert alert-success m-0 top-20 shadow-md shadow-black text-center z-30 flex flex-row justify-center align-center items-center content-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <p style={{margin: "0"}}>{notification}</p>
    </motion.div>
  )
}

export default SuccessNotification