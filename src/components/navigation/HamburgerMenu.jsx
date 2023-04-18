import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const HamburgerMenu = (props) => {
    const hamburgerRef = useRef(null);
    const [hamburgerIsActive, setHamburgerIsActive] = useState(true);

    return (
    <>
        <label ref={hamburgerRef} className="hamburger-btn w-full h-3/4 rounded-lg lg:hidden cursor-pointer">
            <input aria-label="Open hamburger menu" className="hamburger-btn w-0 h-0 cursor-pointer absolute p-0 m-0" type="checkbox"/>
        </label>
        <AnimatePresence>
            {hamburgerIsActive &&
            <motion.div className="cursor-pointer" initial={{y: "-4rem", opacity: 0}} animate={{y: "0rem", opacity: 1}} exit={{y: "-4rem", opacity: 0}}>
                <ul className='flex r-0'>
                    {props.children.map((child, index) => <li key={index}>{child}</li>)}
                </ul>
            </motion.div>}
        </AnimatePresence>
    </>
    )
}

export default HamburgerMenu