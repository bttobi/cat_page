import setProfilePic from "../functions/setProfilePic";
import { useState, useContext, useRef } from "react";
import { UserContext } from '../../App';
import { AnimatePresence, motion } from "framer-motion";
import Notification from "../alerts/Notification";
import { ProfilePictureContext } from '../../App';

const CatCardClicked = (props) => {
  const auth = useContext(UserContext);
  const inputChangeNameRef = useRef();
  const [errorHappened, setErrorHappened] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [, setUserPicture] = useContext(ProfilePictureContext);

  const handleProfilePic = () => {
    if(auth.currentUser?.email === null || auth.currentUser?.email === undefined){
      setShowNotification(true);
      setErrorHappened(true);
      setNotificationMessage("You must log in to set a profile picture!");
      setTimeout(() => { setShowNotification(false) }, 2000);
      return;
    }

    try {
      setProfilePic(auth, props.cat.url);
      setUserPicture(props.cat.url);
      setNotificationMessage("Set successfully as profile picture!");
      setErrorHappened(false);
      setShowNotification(true);
      setTimeout(() => { setShowNotification(false) }, 2000);
    }
    
    catch(error){
      setShowNotification(true);
      setErrorHappened(true);
      setNotificationMessage("Some errors happened while setting profile picture!");
      setTimeout(() => { setShowNotification(false) }, 2000);
    }
  }

  const handleKeys = (e) => {
    if(e.key === "Enter"){
      props.handleEditNameFunc(inputChangeNameRef?.current?.value);
      setShowEditName(false);
    }
  }

  return (<>
    <div className="cat-details m-auto z-20 flex flex-col rounded-lg transition-all duration-300 opacity-100 font-article" style={{width: "90vw"}}>
      <div className="flex flex-col flex-grow cat-clicked-wrapper p-2 bg-primary rounded-lg shadow-lg shadow-black justify-start align-start items-center"  style={{minHeight: "60vh", maxHeight: "90vh", background: "rgba(0, 0, 0, .65) " + `url(${props.cat.url})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundBlendMode: "darken"}}>
        <button className="close-button btn btn-sm btn-error btn-square bg-primary right-0 top-0 mt-1 mr-1 btn-outline fixed transition-all duration-150 hover:scale-110" onClick={(e, isShown) => {props.showFunc(e, true);}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex flex-col items-center justify-center align-center h-full">
          {showEditName ? 
            <motion.input initial={{scaleX: 0}} animate={{scaleX: 1}} exit={{scaleX: 0}} ref={inputChangeNameRef} onKeyDown={handleKeys} className="input input-sm md:input-md lg:input-lg mt-4 lg:mt-6" placeholder="Edit name"/> 
            : <motion.div initial={{scaleX: 0}} animate={{scaleX: 1}} className="cat-name-details text-center border-secondary-white text-3xl lg:text-4xl font-bold mt-4 lg:mt-6" style={{fontSize: "clamp(2rem, 5vw, 4rem)"}}>{props.cat.customName ?? props.cat?.breeds[0]?.name ?? "Cute Cat"}</motion.div>}
          <div className="cat-description-wrapper mt-4 lg:mt-8">
            {(props.cat.breeds[0] != null || props.cat.breeds[0] != undefined) && 
            <div className="w-full flex flex-col justify-center items-center">
              {props.cat.customName != null && <div className="font-bold text-lg" style={{fontSize: "clamp(1rem, 3vw, 2.5rem)"}}>{"Breed: " + (props.cat?.breeds[0]?.name)}</div>}
              <div className="font-bold text-lg lg:pt-4 md:pt-4 pt-1" style={{fontSize: "clamp(1rem, 3vw, 2.5rem)"}}>{"Origin: " + (props.cat?.breeds[0]?.origin ?? "no origin information")}</div>
              <div className="font-bold text-lg lg:pt-4 md:pt-4 pt-1" style={{fontSize: "clamp(1rem, 3vw, 2.5rem)"}}>{"Weight (kg): " + ((props.cat?.breeds[0]?.weight.metric) ?? "No weight information")}</div>
            </div>}
          </div>
        </div>
        <div className="text-justify flex items-center justify-center flex-grow font-bold text-lg lg:px-8 lg:mt-8 mt-2 px-2 leading-normal" style={{fontSize: "clamp(0.82rem, 3vw, 1.8rem)"}}>{props.cat?.breeds[0]?.description ?? "Either a friendly cat or a total demon."}</div>
        <div className="button-wrapper h-full flex flex-col justify-center align-center w-full items-center content-center lg:mb-8 mb-0 lg:mt-4">
            {!showEditName && <button className="btn btn-sm align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}} onClick={props.handleFavFunc}>{props.isFavourite ? "🗑️ REMOVE FROM FAVOURITES" : "❤️ ADD TO FAVOURITES"}</button>}
            {props.isFavourite == true && 
            <div className="edit-name-wrapper flex flex-row justify-center align-center gap-4">
              <button className="btn btn-sm align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}} onClick={()=>{setShowEditName(!showEditName)}}>{showEditName ? <span onClick={()=>{props.handleEditNameFunc(inputChangeNameRef?.current?.value)}}>✅ SET NEW NAME</span> : "✏️ EDIT NAME"}</button>
              {props.cat.customName != null && <button className="btn btn-sm align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}} onClick={props.handleRemoveNameFunc}>🔄 RESET TO DEFAULT</button>}
            </div>}
            {showEditName && <button className="btn btn-sm align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}} onClick={()=>{setShowEditName(false)}}>❌ CANCEL RENAMING</button>}
            <a className="btn btn-sm align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" href={props.cat.url} target="_blank" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}}>See picture in full screen</a>
            <button className="btn btn-sm align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}} onClick={handleProfilePic}>SET AS PROFILE PICTURE</button>
        </div>
      </div>
    </div>
    <AnimatePresence>
      {showNotification && <Notification notification={ notificationMessage } errorHappened={errorHappened}/>}
    </AnimatePresence>
    </>
  )
}

export default CatCardClicked
