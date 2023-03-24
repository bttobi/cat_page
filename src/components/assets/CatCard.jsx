import { useState, useRef, useEffect, useContext, useMemo } from 'react';
import { UserContext } from '../../App';
import CatCardClicked from './CatCardClicked';
import { motion, AnimatePresence } from 'framer-motion';
import addToFav from '../functions/addToFav';
import NotLoggedIn from '../alerts/NotLoggedIn';
import SuccessFav from '../alerts/SuccessFav';

const CatCard = (props) => {
  const catDetails = useRef();
  const [isShown, setIsShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [successDb, setSuccessDb] = useState(false);
  const auth = useContext(UserContext);

  const addToFavourites = async () => {
    if(auth.currentUser?.email === null || auth.currentUser?.email === undefined){
      setIsLoggedIn(false);
      setTimeout(()=>{setIsLoggedIn(true)}, 2000);
      return;
    }
    
    try{
      addToFav(props, auth);
      setSuccessDb(true);
      setTimeout(()=>{setSuccessDb(false)}, 2000);
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
      {!isLoggedIn && <NotLoggedIn/>}
      {successDb && <SuccessFav/>}
      {isShown &&
        <motion.div initial={{y: '-10rem', opacity: 0}} animate={{y: '0', opacity: 1}} exit={{opacity: 0}} className={"fixed top-28 flex w-min h-full flex-col justify-center align-start items-start z-10 filter-blur-0"}>
          <div className="cat-clicked-card-wrapper fixed flex justify-center align-start items-start w-full h-full z-" ref={catDetails}>
            <CatCardClicked cat={props.cat} func={hideDetails}/>
          </div>
        </motion.div>}
        </AnimatePresence>
        <AnimatePresence>
        <motion.div initial={{transform: 'scale(0)'}} whileHover={{transform: 'scale(1.25)'}} animate={{transform: 'scale(1)'}} className="cat-wrapper w-min h-min mx-4 mt-8 flex flex-col bg-primary border-4 border-secondary-white rounded-lg">
        <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
            <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
              <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-xl">{props.cat?.breeds[0]?.name || "Cute Cat"}</p>
            </div>
            <button className="align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={() => {addToFavourites()}}>❤️</button>
          </div>
            <div className="px-2 pb-2 flex flex-col justify-center items-center cursor-pointer" onClick={showDetails}>
              <div className="w-min h-min m-0 rounded-lg" style= {{width: '12rem', height: '10rem', backgroundImage: `url(${props.cat.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} alt="cat"></div>           
            </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default CatCard
