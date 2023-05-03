import { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import { collection, doc, deleteDoc } from 'firebase/firestore';
import db from '../../firebase';
import Notification from './Notification';

const ProfilePictureModal = ({profilePicture, userToChange}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [errorHappened, setErrorHappened] = useState(false);

  const removeProfilePicture = async () => {
    try{
      const collectionRef = collection(db, userToChange.email);
      const documentRef = doc(collectionRef, "profile-picture");
      await deleteDoc(documentRef);
      setShowNotification(true);
      setErrorHappened(false);
      setNotificationMessage("Profile picture removed successfully!");
      setTimeout(()=>{setShowNotification(false); window.location.reload();}, 2000);
    }
    catch(error){
      console.log(error);
      setShowNotification(true);
      setErrorHappened(true);
      setNotificationMessage("Errors happened while removing profile picture!");
      setTimeout(()=>{setShowNotification(false)}, 2000);
    }
  }

  return (
    <>
      <input type="checkbox" id="prof-pic" className="modal-toggle" />
      <label htmlFor="prof-pic" className="modal cursor-pointer font-article text-white">
        <label className="modal-box relative bg-dark flex flex-col justify-center align-center shadow-md shadow-black" htmlFor="">
          <label htmlFor="prof-pic" className="close-button btn btn-error btn-square bg-primary w-12 right-0 top-0 mt-2 mr-2 btn-outline fixed transition-all duration-150 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </label>
          <div className="wrapper flex flex-col justify-center align-center items-center">
            <p className="text-3xl font-bold mt-8 text-center">What do you want to do with the profile picture?</p>
            <div className="w-48 h-48 rounded-lg mt-4 border-white border-2" style={{backgroundImage: `url(${profilePicture})`, backgroundSize: "cover", backgroundPosition: "center"}} />
            <button className="btn h-min text-center mt-8 text-white bg-red-500 hover:bg-red-700 border-0" onClick={removeProfilePicture}>REMOVE PROFILE PIC</button>
            <a className="btn h-min text-center mt-8 text-white bg-green-500 hover:bg-green-700 border-0" href={profilePicture} target="_blank">SEE PROFILE PIC IN FULLSCREEN</a>
          </div>
        </label>
      <AnimatePresence>
        {showNotification && <Notification notification={notificationMessage} errorHappened={errorHappened}/>}
      </AnimatePresence>
      </label>
    </>
  )
}

export default ProfilePictureModal