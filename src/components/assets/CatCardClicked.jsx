import setProfilePic from "../functions/setProfilePic";
import { useState, useContext } from "react";
import { UserContext } from '../../App';
import { AnimatePresence } from "framer-motion";
import FailedNotification from "../alerts/FailedNotification";
import SuccessNotification from "../alerts/SuccessNotification";

const CatCardClicked = (props) => {
  const auth = useContext(UserContext);
  const [errorHappened, setErrorHappened] = useState(false);
  const [isProfilePicSet, setIsProfilePicSet] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [warningNotificationMessage, setWarningNotificationMessage] = useState("");

  const handleProfilePic = () => {
    if(auth.currentUser?.email === null || auth.currentUser?.email === undefined){
      setErrorHappened(true);
      setWarningNotificationMessage("You must log in to set a profile picture!");
      setTimeout(() => { setErrorHappened(false) }, 2000);
      return;
    }

    try {
      setProfilePic(auth, props.cat.url);
      setIsProfilePicSet(true);
      setNotificationMessage("Set successfully as profile picture!");
      setShowSuccessNotification(true);
      setTimeout(() => { setShowSuccessNotification(false) }, 2000);
    }
    
    catch(error){
      setErrorHappened(true);
      setWarningNotificationMessage("Some errors happened");
      setTimeout(() => { setErrorHappened(false) }, 2000);
    }
  }

  return (<>
    <div className="cat-details m-auto z-20 flex flex-col rounded-lg transition-all duration-300 opacity-100 font-article" style={{minWidth:"90vw", maxWidth: "90vw"}}>
      <div className="flex flex-col flex-grow cat-clicked-wrapper p-2 bg-primary rounded-lg shadow-lg shadow-black justify-center align-center items-center"  style={{minHeight: "80vh", background: "rgba(0, 0, 0, .65) " + `url(${props.cat.url})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundBlendMode: "darken"}}>
        <button className="close-button w-12 btn btn-error btn-square bg-primary right-0 top-0 mt-1 mr-1 btn-outline fixed transition-all duration-150 hover:scale-110" onClick={(e, isShown) => {props.showFunc(e, true);}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="cat-name-details text-center border-secondary-white text-4xl font-bold" style={{fontSize: "clamp(2rem, 5vw, 4rem)"}}>{props.cat?.breeds[0]?.name || "Cute Cat"}</div>
        <div className="cat-description-wrapper mt-2 lg:mt-8">
        {(props.cat.breeds[0] != null || props.cat.breeds[0] != undefined) && 
        <div className="w-full flex flex-col justify-center items-center">
          <div className="font-bold text-lg" style={{fontSize: "clamp(1rem, 3vw, 2rem)"}}>{"Origin: " + (props.cat?.breeds[0]?.origin || "no origin information")}</div>
          <div className="font-bold text-lg pt-4" style={{fontSize: "clamp(1rem, 3vw, 2rem)"}}>{"Weight (kg): " + ((props.cat?.breeds[0]?.weight.metric) || "No weight information")}</div>
        </div>}
          <div className="text-justify font-bold text-lg lg:px-8 lg:mt-8 mt-2 px-2 leading-normal" style={{fontSize: "clamp(0.8rem, 1.5vw, 1.5rem)"}}>{props.cat?.breeds[0]?.description || "Either a friendly cat or a total demon."}</div>
        </div>
        <div className="button-wrapper lg:mt-8 mt-0 self-end h-full flex flex-col justify-center align-end w-full items-center content-center">
            <button className="btn align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1rem)"}} onClick={props.handleFavFunc}>{props.isFavourite ? "🗑️ REMOVE FROM FAVOURITES" : "❤️ ADD TO FAVOURITES"}</button>
            <a className="btn align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" href={props.cat.url} target="_blank" style={{fontSize: "clamp(0.8rem, 1.5vw, 1rem)"}}>See picture in full screen</a>
            <button className="btn align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(0.8rem, 1.5vw, 1rem)"}} onClick={handleProfilePic}>SET AS PROFILE PICTURE</button>
        </div>
      </div>
    </div>
    <AnimatePresence>
      {errorHappened && <FailedNotification notification={ warningNotificationMessage } />}
      {showSuccessNotification && <SuccessNotification notification={ notificationMessage } />}
    </AnimatePresence>
    </>
  )
}

export default CatCardClicked
