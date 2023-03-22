import { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../../App';
import CatCardClicked from './CatCardClicked';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const CatCard = (props) => {
  const catDetails = useRef();
  const [isShown, setIsShown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [successDb, setSuccessDb] = useState(false);
  const auth = useContext(UserContext);

  const hideDetails = (e, clicked) => {
    if(catDetails.current != null && (!catDetails.current.contains(e.target) || clicked)){
      setIsShown(false);
      props.showClicked(false);
    }
  }

  const addToFavourites = async () => {
    if(auth.currentUser?.email === null || auth.currentUser?.email === undefined){
      setIsLoggedIn(false);
      setTimeout(()=>{setIsLoggedIn(true)}, 2000);
      return;
    }
    
    try{
      const hasBreed = (props.cat.breeds[0]!==undefined ||  props.cat.breeds[0]!==null) ? false : true;
      const newCat = 
      {
        breed_name: hasBreed ? props.cat.breeds[0].name : "Cute Cat",
        url: props.cat.url,
        origin: hasBreed ? props.cat.breeds[0].origin : "",
        temperament: hasBreed ? props.cat.breeds[0].temperament : "",
        weight: hasBreed ? props.cat.breeds[0].weight.metric : "",
        life_span: hasBreed ? props.cat.breeds[0].life_span : "",
        wikipedia_url: hasBreed ? props.cat.breeds[0].wikipedia_url : ""
      };

      const collectionRef = collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, uuidv4());
      await setDoc(documentRef, newCat);

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

  useEffect(() => {
    document.addEventListener("click", hideDetails, true);
    return () => {
      document.removeEventListener("click", hideDetails, true);
    }
  }, []);

  console.log(props.cat)

  return (
    <>
      <AnimatePresence>
      {!isLoggedIn && <>
        <motion.div initial={{ top:10, opacity: 0 }} animate={{top: 0, opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute w-64 alert alert-warning shadow-lg z-30">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>You must log in in order to add cats to favourites!</span>
          </div>
        </motion.div>
        </>}
        {successDb &&
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute w-64 alert alert-success shadow-lg text-center z-30">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Added to favourites!</span>
          </div>
        </motion.div>}
      {isShown &&
        <motion.div initial={{y: '-10rem', opacity: 0}} animate={{y: '0', opacity: 1}} exit={{opacity: 0}} className={"fixed top-28 flex w-min h-full flex-col justify-center align-start items-start z-10 filter-blur-0"}>
          <div className="cat-clicked-card-wrapper fixed flex justify-center align-start items-start w-full h-full" ref={catDetails}>
            <CatCardClicked cat={props.cat} func={hideDetails}/>
          </div>
        </motion.div>}
        </AnimatePresence>
        <AnimatePresence>
        <motion.div initial={{transform: 'scale(0)'}} whileHover={{transform: 'scale(1.25)'}} animate={{transform: 'scale(1)'}} className="cat-wrapper w-min h-min mx-4 mt-8 flex flex-col bg-primary border-4 border-secondary-white rounded-lg">
        <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
            <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
              <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-xl">{props.cat.breed_name || "Cute Cat"}</p>
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
