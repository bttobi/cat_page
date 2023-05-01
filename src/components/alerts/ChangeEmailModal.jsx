import { useState, useRef, useContext } from 'react';
import SuccessNotification from './SuccessNotification';
import FailedNotification from './FailedNotification';
import { AnimatePresence } from 'framer-motion';
import { updateEmail } from 'firebase/auth';
import { UserContext } from '../../App';
import { collection, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import db from '../../firebase';
import { useNavigate } from 'react-router-dom';

export const ChangeEmailModal = ({userToChange}) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [notificationIcon, setNotificationIcon] = useState(null);
  const [errorIcon, setErrorIcon] = useState(null);
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const resetPassword = async () => {
    //get the current data
    const collectionRef = collection(db, auth.currentUser.email);
    const favDocumentRef = doc(collectionRef, "favourites");
    const profDocumentRef = doc(collectionRef, "profile-picture");
    const favDocumentSnap = await getDoc(favDocumentRef);
    const profDocumentSnap = await getDoc(profDocumentRef);

    if(email == auth.currentUser.email){
      setNotificationMessage("You are already using that email!");
        setErrorHappened(true);
        setTimeout(()=>{
          setErrorHappened(false);
        }, 2000);
        return;
    };

    await updateEmail(userToChange, email).then(async ()=>{ 
      if(favDocumentSnap.data() == null && profDocumentSnap.data() == null){
        setNotificationMessage("Email updated!");
        setNotificationIcon(null);
        setIsNotificationShown(true);

        setTimeout(()=>{
          setIsNotificationShown(false);
          window.location.reload();
        }, 2000);
        return;
      }

      //try to copy the database if the database exists
      const newCollectionRef = collection(db, auth.currentUser.email);
      const newFavDocumentRef = doc(newCollectionRef, "favourites");
      const newProfDocumentRef = doc(newCollectionRef, "profile-picture");
      favDocumentSnap.data() != null && await setDoc(newFavDocumentRef, favDocumentSnap.data());
      profDocumentSnap.data() != null && await setDoc(newProfDocumentRef, profDocumentSnap.data());

      //and remove the old data
      const favDocumentRef = doc(collectionRef, "favourites");
      const profDocumentRef = doc(collectionRef, "profile-picture");
      await deleteDoc(favDocumentRef);
      await deleteDoc(profDocumentRef);

      setNotificationMessage("Email updated!");
      setNotificationIcon(null);
      setIsNotificationShown(true);

      setTimeout(()=>{
        setIsNotificationShown(false);
        window.location.reload();
      }, 2000);
      })

      .catch(error => {
        if(error.code == "auth/requires-recent-login"){
          setErrorIcon(<TailSpin stroke={"#000"}/>);
          setNotificationMessage("You need to relogin to change email!");
          setErrorHappened(true);
          setTimeout(()=>{
            setErrorHappened(false);
            navigate("/login");
          }, 2000);
          return;
        } 
        setNotificationMessage("Errors happened while changing the email!");
        setErrorHappened(true);
        setTimeout(()=>{
          setErrorHappened(false);
        }, 2000);
        return;
      })
    };

  return (
    <>
      <input type="checkbox" id="change-email" className="modal-toggle" />
      <label htmlFor="change-email" className="modal cursor-pointer font-article text-white">
        <label className="modal-box relative bg-dark flex flex-col justify-center align-center shadow-md shadow-black" htmlFor="">
          <label htmlFor="change-email" className="close-button btn btn-error btn-square bg-primary w-12 right-0 top-0 mt-2 mr-2 btn-outline fixed transition-all duration-150 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </label>
          <div className="wrapper flex flex-col justify-center align-center items-center">
            <p className="text-3xl font-bold mt-8 text-center">What email do you want to change to?</p>
            <input className="input-email input w-full max-w-xs mt-8" ref={emailRef} type="email" name="email" required placeholder='Email' onChange={()=>{setEmail(emailRef.current.value)}}/>
            <button className="btn h-min text-center mt-8 text-white bg-green-500 hover:bg-green-700 border-0" onClick={resetPassword}>CHANGE EMAIL</button>
          </div>
        </label>
      <AnimatePresence>
        {isNotificationShown && <SuccessNotification notification={ notificationMessage } icon={ notificationIcon }/>}
        {errorHappened && <FailedNotification notification={ notificationMessage } icon={ errorIcon }/>}
      </AnimatePresence>
      </label>
    </>
  )
}

export default ChangeEmailModal
