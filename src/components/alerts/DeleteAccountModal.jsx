import React, { useState } from 'react';
import SuccessNotification from './SuccessNotification';
import FailedNotification from './FailedNotification';
import { AnimatePresence } from 'framer-motion';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { useNavigate } from 'react-router-dom';
import { collection, doc, deleteDoc } from 'firebase/firestore';
import db from '../../firebase';

const DeleteAccountModal = ({ userToDelete }) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [notificationIcon, setNotificationIcon] = useState(null);
  const navigate = useNavigate();

  const deleteAccount = async () => {
    await userToDelete?.delete()
    .then(async ()=> {

      const collectionRef = collection(db, userToDelete?.email);
      const documentRefs = [doc(collectionRef, "favourites"), doc(collectionRef, "profile-picture")];
      documentRefs.forEach(async document => {
        await deleteDoc(document);
      });

      setNotificationMessage("Deleted user successfully!");
      setNotificationIcon(<TailSpin stroke={"#000"}/>);
      setIsNotificationShown(true);
      setTimeout(()=>{
        setIsNotificationShown(false);
        navigate("/login");
      }, 2000)
    })
  
    .catch(error => {
      console.log(error)
      setNotificationMessage("Some errors happened!");
      setErrorHappened(true);
      setTimeout(()=>{
        setErrorHappened(false);
      }, 2000)
    });

    //TO DO need to remove all documents from user
    //TO DO ADD MODAL TO BE SURE
  };

  return (<>
      <input type="checkbox" id="del-acc" className="modal-toggle" />
      <label htmlFor="del-acc" className="modal cursor-pointer font-article text-white">
        <label className="modal-box relative bg-dark flex flex-col justify-center align-center shadow-md shadow-black" htmlFor="">
          <label htmlFor="del-acc" className="close-button btn btn-error btn-square bg-primary w-12 right-0 top-0 mt-2 mr-2 btn-outline fixed transition-all duration-150 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </label>
          <div className="wrapper flex flex-col justify-center align-center items-center">
            <h3 className="text-3xl font-bold mt-8 text-center">Are you sure to delete your account?</h3>
            <button className="btn w-min text-center mt-8 text-white bg-red-500 hover:bg-red-700 border-0" onClick={deleteAccount}>DELETE ACCOUNT</button>
          </div>
        </label>
      <AnimatePresence>
        {isNotificationShown && <SuccessNotification notification={ notificationMessage } icon={ notificationIcon }/>}
        {errorHappened && <FailedNotification notification={ notificationMessage }/>}
      </AnimatePresence>
      </label>
    </>
  )
}

export default DeleteAccountModal