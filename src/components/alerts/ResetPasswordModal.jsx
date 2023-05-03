import { useState, useRef, useContext } from 'react';
import Notification from './Notification';
import { AnimatePresence } from 'framer-motion';
import { sendPasswordResetEmail } from 'firebase/auth';
import { UserContext } from '../../App';

export const ResetPasswordModal = () => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [notificationIcon, setNotificationIcon] = useState(null);
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const auth = useContext(UserContext);

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setNotificationMessage("Email with password reset instructions sent!");
      setNotificationIcon(null);
      setIsNotificationShown(true);
      setErrorHappened(false);

      setTimeout(()=>{
        setIsNotificationShown(false);
      }, 2000);
    })
    .catch((error) => {
      setNotificationMessage("Provide a valid email!");
      setErrorHappened(true);
      setTimeout(()=>{
        setErrorHappened(false);
      }, 2000)
    });
  };

  return (
    <>
      <input type="checkbox" id="reset-pass" className="modal-toggle" />
      <label htmlFor="reset-pass" className="modal cursor-pointer font-article text-white">
        <label className="modal-box relative bg-dark flex flex-col justify-center align-center shadow-md shadow-black" htmlFor="">
          <label htmlFor="reset-pass" className="close-button btn btn-error btn-square bg-primary w-12 right-0 top-0 mt-2 mr-2 btn-outline fixed transition-all duration-150 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </label>
          <div className="wrapper flex flex-col justify-center align-center items-center">
            <p className="text-3xl font-bold mt-8 text-center">Do you want really want to reset your password?</p>
            <input className="input-email input w-full max-w-xs mt-8" ref={emailRef} type="email" name="email" required placeholder='Email' onChange={()=>{setEmail(emailRef.current.value)}}/>
            <button className="btn h-min text-center mt-8 text-white bg-green-500 hover:bg-green-700 border-0" onClick={resetPassword}>SEND PASSWORD RESET EMAIL</button>
          </div>
        </label>
      <AnimatePresence>
        {isNotificationShown && <Notification notification={ notificationMessage } errorHappened={errorHappened} icon={notificationIcon}/>}
      </AnimatePresence>
      </label>
    </>
  )
}
