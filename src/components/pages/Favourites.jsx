import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CatCard from '../assets/CatCard';
import useFavourites from '../hooks/useFavourites';
import LoadingIcons from 'react-loading-icons';

const Favourites = () => {
  const auth = useContext(UserContext);
  const [cats, isFetched] = useFavourites();
  const [showClicked, setShowClicked] = useState(false);

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="favourites-wrapper w-full h-full m-none mt-16 flex flex-col justify-center items-center font-article text-white">
      {(auth.currentUser?.email!=null || auth.currentUser?.email!=undefined) ? 
      <>
      <AnimatePresence>
        {showClicked && <motion.div initial={{ top:10, opacity: 0 }} animate={{top: 0, opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>}
      </AnimatePresence>
      <div className="cat-cards-wrapper w-full h-full flex flex-wrap items-start align-start content-start justify-center">
      {(!isFetched) ?
            <div className="loading-wrapper z-10 m-16 flex flex-col items-center justify-center">
              <LoadingIcons.Hearts width="16rem" speed="3"/>
              <span className="loading-text text-base font-bold font-article text-white">Loading...</span>
            </div> : 
            cats.map(el =>  <CatCard showClicked={getShowClicked} cat={el} key={el.url}/>)}
        </div>
        </>
    :<div className="not-loggedin-notification font-bold text-xl underline"><Link to="/login">You need to log in to see the favourite cats!</Link></div>}
    </motion.div>
  )
}

export default Favourites;
