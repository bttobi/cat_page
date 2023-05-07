import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import CatCardClicked from './CatCardClicked';
import { motion, AnimatePresence } from 'framer-motion';
import addToFav from '../functions/addToFav';
import removeFromFav from '../functions/removeFromFav';
import Notification from '../alerts/Notification';
import changeName from '../functions/changeName';

const CatCard = (props) => {
  const catDetails = useRef();
  const inputChangeNameRef = useRef();
  const editNameRef = useRef();
  const [isShown, setIsShown] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [isFavourite, setIsFavourite] = useState(props?.isFavourite | false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const auth = useContext(UserContext);

  const handleFavourites = async () => {
    if(auth.currentUser?.email === null || auth.currentUser?.email === undefined){
      setShowNotification(true);
      setErrorHappened(true);
      setNotificationMessage("You must log in to add a cat to favourites!");
      setTimeout(() => { setShowNotification(false) }, 2000);
      return;
    }
    
    try {
      if (!isFavourite) { //you can only add if not favourite
        addToFav(props, auth); //passing all cat info
        setIsFavourite(true);
        setNotificationMessage("Added to favourites!");
        setShowNotification(true);
        setErrorHappened(false);
        setTimeout(() => { setShowNotification(false) }, 2000);
        return;
      }
      removeFromFav(props, auth); //passing all cat info
      setIsFavourite(false);
      setNotificationMessage("Removed from favourites!");
      setShowNotification(true);
      setTimeout(() => { setShowNotification(false) }, 2000);
    }
    
    catch(error){
      setShowNotification(true);
      setErrorHappened(true);
      setNotificationMessage("Some errors happened");
      setTimeout(() => { setErrorHappened(false) }, 2000);
    }
  }

  const editName = async (customName) => {
    try {
      if(customName.trim() == "") throw "white_char";
      else if(customName.length > 12) throw "too_long";

      changeName(props, auth, customName);
      setErrorHappened(false);
      props.cat.customName = customName;
      setNotificationMessage("Success - changed name!");
      setShowNotification(true);
      setTimeout(()=> {
        setShowNotification(false);
      }, 2000)
    }
    catch(error){
      setErrorHappened(true);
      let dispError;
      switch (error){
        case "white_char":
          dispError = "No white characters!"
          break;

        case "too_long":
          dispError = "Maximum 12 characters!"
          break;
        
        default:
          dispError = "Errors happened while changing name!";
          break;
      }
      setNotificationMessage(dispError);
      setShowNotification(true);
      setTimeout(()=> {
        setShowNotification(false);
      }, 2000)
    }
  }

  const handleKeys = (e) => {
    if(e.key === "Enter"){
      editName(inputChangeNameRef?.current?.value);
      setShowEditName(false);
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

    if(inputChangeNameRef.current != null && (!inputChangeNameRef.current.contains(e.target) || clicked)
    && !editNameRef.current.contains(e.target) || clicked){
      setShowEditName(false);
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
        <motion.div initial={{transform: 'scale(0)'}} whileHover={{transform: 'scale(1.05)'}} animate={{transform: 'scale(1)'}} exit={{transform: 'scale(0)'}} className="cat-wrapper w-min h-min mx-4 mt-8 flex flex-col bg-primary rounded-lg shadow-lg shadow-black">
          <div className="favourite py-6 pr-2 pl-2 w-full h-14 flex flex-row justify-center items-center align-center">
            <button className="fav-button absolute ml-2 left-0 align-start w-min h-min transition-all duration-200 hover:scale-125" onClick={()=>{setShowEditName(!showEditName)}}>{isFavourite ? (showEditName ? <span ref={editNameRef} onClick={()=>{editName(inputChangeNameRef?.current?.value)}}>✅</span> : "✏️") : ""}</button>
            <div className="description-wrapper w-32 break-words h-20 flex justify-center border-secondary-white rounded-lg">
              <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-xl">
                <AnimatePresence>
                  {showEditName && isFavourite ? <motion.input ref={inputChangeNameRef} onKeyDown={handleKeys} initial={{scaleX: 0}} animate={{scaleX: 1}} exit={{scaleX: 0}} className="input input-sm w-28" placeholder="Edit name" type="text"/> : 
                  <motion.span initial={{scaleX: 0}} animate={{scaleX: 1}} className="text-lg">{props.cat?.customName ? props.cat?.customName : (props.cat?.breeds[0]?.name ?? "Cute Cat")}</motion.span>}
                </AnimatePresence>
              </p>
            </div>
            <button className="fav-button absolute right-0 mr-2 align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={handleFavourites}>{isFavourite ? (showEditName ? <span onClick={()=>{setShowEditName(false)}}>❌</span> : "🗑️") : "❤️"}</button>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer" onClick={showDetails}>
            <div className="w-min h-min m-0 rounded-lg" style= {{minWidth: '12rem', minHeight: '14rem', backgroundImage: `url(${props.cat.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} alt="cat"></div>           
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
      {isShown &&
        <motion.div initial={{y: '-10rem', opacity: 0}} animate={{y: '0', opacity: 1}} exit={{opacity: 0}} className="fixed top-28 flex flex-col justify-center align-center items-center z-10 filter-blur-0" ref={catDetails}>
            <CatCardClicked cat={props.cat} isFavourite={isFavourite} showFunc={hideDetails} handleFavFunc={handleFavourites} handleEditNameFunc={editName}/>
        </motion.div>}
      </AnimatePresence>
      {/* DISPLAY NOTIFICATIONS */}
      <AnimatePresence>
        {showNotification && <Notification notification={ notificationMessage } errorHappened={errorHappened} />}
      </AnimatePresence>
    </>
  )
}

export default CatCard
