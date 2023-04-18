import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const HamburgerMenu = (props) => {
  const hamburgerRef = useRef(null);
  const [hamburgerIsActive, setHamburgerIsActive] = useState(false);

  const changeVisibility = () => {
    setHamburgerIsActive(!hamburgerIsActive);
  }
  
  const handleAnimation = (e) => {
    e.stopPropagation();
    if(hamburgerRef?.current && !hamburgerRef?.current.contains(e.target)){
      setHamburgerIsActive(false);
      hamburgerRef.current.firstChild.checked = false;
    }
  }
  
  useEffect(()=>{
    window.addEventListener('click', e => handleAnimation(e));
    return window.removeEventListener('click', e => handleAnimation(e));
  }, []);

  return (
  <>
    <label ref={hamburgerRef} className="hamburger-btn absolute right-0 w-full h-3/4 rounded-lg lg:hidden cursor-pointer">
      <input aria-label="Open hamburger menu" onChange={changeVisibility} className="hamburger-btn w-0 h-0 cursor-pointer absolute p-0 m-0" type="checkbox"/>
    </label>
    <AnimatePresence>
      {hamburgerIsActive &&
      <motion.div className="cursor-pointer mt-20" initial={{x: "10rem", opacity: 0}} animate={{x: "0rem", opacity: 1}} exit={{x: "10rem", opacity: 0}}>
        <ul className='hamburger-menu text-lg lg:hidden absolute right-0 p-2 mt-64 shadow rounded-box w-48 flex flex-col text-center justify-center items-center bg-dark'>
          {props.children.map((child, index) => <li className="flex rounded-lg w-full h-full mb-2" key={index}>{child}</li>)}
        </ul>
      </motion.div>}
    </AnimatePresence>
  </>
  )
}

export default HamburgerMenu