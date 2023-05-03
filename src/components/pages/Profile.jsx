import { useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import useProfilePic from '../hooks/useProfilePic';
import SuccessNotification from '../alerts/SuccessNotification';
import FailedNotification from '../alerts/FailedNotification';
import { onAuthStateChanged } from 'firebase/auth';
import DeleteAccountModal from '../alerts/DeleteAccountModal';
import ChangeEmailModal from '../alerts/ChangeEmailModal';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

const Profile = () => {
  const [user, setUser] = useState({});
  const [profilePicUrl, isFetched] = useProfilePic();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const [notificationIcon, setNotificationIcon] = useState(null);

  const logOut = () => {
    signOut(auth)
    .then(()=> {
      setNotificationMessage("Signed out successfully!");
      setNotificationIcon(<TailSpin stroke={"#000"}/>);
      setIsNotificationShown(true);
      setTimeout(()=>{
        setIsNotificationShown(false);
        navigate("/login");
      }, 2000)
    })
    .catch(error => {
      setNotificationMessage("Some errors happened!");
      setErrorHappened(true);
      setTimeout(()=>{
        setErrorHappened(false);
      }, 2000)
    })
  };

  const changePassword = () => {
    sendPasswordResetEmail(auth, user?.email)
    .then(() => {
      setNotificationMessage("Email with password reset instructions sent!");
      setNotificationIcon(null);
      setIsNotificationShown(true);

      setTimeout(()=>{
        setIsNotificationShown(false);
      }, 2000);
    })
    .catch((error) => {
      setNotificationMessage("Some errors happened!");
      setErrorHappened(true);
      setTimeout(()=>{
        setErrorHappened(false);
      }, 2000)
    });
  };
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
    });
    window.scrollTo(0, 0);
  }, []);

  return (<>
    {(user?.email != undefined || user?.email != null || isNotificationShown || errorHappened) ? 
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="font-article text-white w-auto h-auto mt-32 flex flex-col text-lg font-bold justify-center align-center items-center rounded-lg bg-dark p-4 shadow-lg shadow-black">
      <p>Welcome!</p>
      <p>{user?.email != undefined || user?.email != null ? user?.email : "Signed out!"}</p>
      {profilePicUrl != "NOT FOUND" ? 
      <div className="w-36 h-36 rounded-lg mt-4 border-white border-2" style={{backgroundImage: `url(${profilePicUrl})`, backgroundSize: "cover", backgroundPosition: "center"}} />
      : <div className="w-36 h-36 rounded-lg border-white border-2 p-3 flex justify-center align-center items-center text-center mt-4">No profile picture found!</div>}

      <button className="btn btn-sm w-full bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4" onClick={logOut}>Sign out</button>
        {(user?.email != "test@account.com" && user?.email != null) &&
        <>
          <label htmlFor="del-acc" className="btn btn-sm w-full bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4">Delete Account</label>
          <button className="btn btn-sm w-full bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4" onClick={changePassword}>Change Password</button>
          <label htmlFor="change-email" className="btn btn-sm w-full bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4">Change Email</label>
        </>
        }
    </motion.div>  : 
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="font-article text-white mt-32 flex flex-col text-lg font-bold justify-center align-center items-center rounded-lg bg-dark p-4 shadow-lg shadow-black">
      <span>You need to log in to view the profile! </span>
      <p>{user?.email}</p>
      <Link className="underline" to="/">Log in here</Link>
    </motion.div>
    }
    <AnimatePresence>
      {isNotificationShown && <SuccessNotification notification={ notificationMessage } icon={ notificationIcon }/>}
      {errorHappened && <FailedNotification notification={ notificationMessage }/>}
    </AnimatePresence>
    <DeleteAccountModal userToDelete={user}/>
    <ChangeEmailModal userToChange={user}/>
    </>
  )
}

export default Profile
