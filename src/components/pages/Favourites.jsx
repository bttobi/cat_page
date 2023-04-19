import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import CatCard from '../assets/CatCard';
import useFavourites from '../hooks/useFavourites';
import LoadingIcons from 'react-loading-icons';
import { onAuthStateChanged } from 'firebase/auth';

const Favourites = () => {
  const auth = useContext(UserContext);
  const [cats, isFetched] = useFavourites();
  const [showClicked, setShowClicked] = useState(false);
  const [user, setUser] = useState({});
  
  if(!isFetched){ //if not yet fetched check if user is logged in
    onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
    });
  }

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="favourites-wrapper w-full h-full m-none my-32 flex flex-col justify-center items-center font-article text-white">
      {(user?.email!=null || user?.email!=undefined) ? 
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
              cats.length != 0 ? 
              cats.map(el => <CatCard showClicked={getShowClicked} isFavourite={ true } cat={el} key={el.url}/>)
              : <div className="not-loggedin-notification font-bold text-xl underline"><Link to="/">No favourite cats found... Add some to favourites!</Link></div>} 
        </div>
        </>
    :<div className="not-loggedin-notification font-bold text-xl flex flex-col justify-center align-center items-center rounded-lg bg-dark p-4 shadow-lg shadow-black">
      <p>You need to log in to see the favourite cats!</p>
      <Link className="underline" to="/login">Log in here</Link>
    </div>}
    </motion.div>
  )
}

export default Favourites;
