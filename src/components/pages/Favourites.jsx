import { motion, AnimatePresence } from 'framer-motion';
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../App';
import CatCard from '../assets/CatCard';
import { v4 as uuidv4 } from 'uuid';
import useFavourites from '../hooks/useFavourites';

const Favourites = () => {
  const auth = useContext(UserContext);
  const cats = useFavourites();
  const [showClicked, setShowClicked] = useState(false);

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="favourites-wrapper w-full h-full m-none mt-16 flex flex-col justify-center items-center font-article text-white">
      <AnimatePresence>
        {showClicked && <motion.div initial={{ top:10, opacity: 0 }} animate={{top: 0, opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>}
      </AnimatePresence>
      <div className="cat-cards-wrapper w-full h-full flex flex-row flex-wrap items-start align-start content-start justify-center">
        {auth?.currentUser?.email && 
          cats.map(el => 
            <CatCard showClicked={getShowClicked} cat={el} key={uuidv4()}/>)}
      </div>
    </motion.div>
  )
}

export default Favourites;
