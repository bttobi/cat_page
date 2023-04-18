import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import CatCardClicked from './CatCardClicked';
import { motion, AnimatePresence } from 'framer-motion';
import addToFav from '../functions/addToFav';
import removeFromFav from '../functions/removeFromFav';
import SuccessNotification from '../alerts/SuccessNotification';
import FailedNotification from '../alerts/FailedNotification';

const CatCard = (props) => {
  const catDetails = useRef();
  const [isShown, setIsShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isFavourite, setIsFavourite] = useState(props?.isFavourite | false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationMessage, setNotoficationMessage] = useState("");
  const auth = useContext(UserContext);

  const handleFavourites = async () => {
    if(auth.currentUser?.email === null || auth.currentUser?.email === undefined){
      setIsLoggedIn(false);
      setTimeout(() => { setIsLoggedIn(true) }, 2000);
      return;
    }
    
    try {
      if (!isFavourite) { //you can only add if not favourite
        addToFav(props, auth); //passing all cat info
        setIsFavourite(true);
        setNotoficationMessage("Added to favourites!");
        setShowSuccessNotification(true);
        setTimeout(() => { setShowSuccessNotification(false) }, 2000);
        return;
      }
      removeFromFav(props, auth); //passing all cat info
      setIsFavourite(false);
      setNotoficationMessage("Removed from favourites!");
      setShowSuccessNotification(true);
      setTimeout(() => { setShowSuccessNotification(false) }, 2000);
    }
    
    catch(error){
      console.log(error)
    }
  }

  const showDetails = () => {
    setIsShown(true);
    props.showClicked(true);
  }

  const hideDetails = (e, clicked) => {
    if(catDetails.current != null && (!catDetails.current.contains(e.target) || clicked)){
      setIsShown(false);
      props.showClicked(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", hideDetails, true);
    return () => {
      document.removeEventListener("click", hideDetails, true);
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.div initial={{transform: 'scale(0)'}} whileHover={{transform: 'scale(1.15)'}} animate={{transform: 'scale(1)'}} className="cat-wrapper w-min h-min mx-4 mt-8 flex flex-col bg-primary rounded-lg shadow-lg shadow-black">
        <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
            <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
              <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-xl">{props.cat?.breeds[0]?.name || "Cute Cat"}</p>
            </div>
            <button className="fav-button align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={handleFavourites}>{isFavourite ? "🗑️" : "❤️"}</button>
          </div>
            <div className="flex flex-col justify-center items-center cursor-pointer" onClick={showDetails}>
              <div className="w-min h-min m-0 rounded-lg" style= {{minWidth: '12rem', minHeight: '12rem', backgroundImage: `url(${props.cat.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} alt="cat"></div>           
            </div>
        </motion.div>
        </AnimatePresence>
      <AnimatePresence>
      {/* DISPLAY NOTIFICATIONS */}
      {isShown &&
        <motion.div initial={{y: '-10rem', opacity: 0}} animate={{y: '0', opacity: 1}} exit={{opacity: 0}} className="fixed top-28 flex flex-col justify-center align-center items-center z-10 filter-blur-0" ref={catDetails}>
            <CatCardClicked cat={props.cat} isFavourite={ isFavourite } showFunc={hideDetails} handleFavFunc={handleFavourites}/>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {!isLoggedIn && <FailedNotification notification={'You must log in to see the favourites!'} />}
        {showSuccessNotification && <SuccessNotification notification={ notificationMessage } />}
      </AnimatePresence>
    </>
  )
}

export default CatCard
