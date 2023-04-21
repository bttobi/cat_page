import { useState, useContext, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UserContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useProfilePic from '../hooks/useProfilePic';
import SuccessNotification from '../alerts/SuccessNotification';
import FailedNotification from '../alerts/FailedNotification';
import { onAuthStateChanged } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState({});
  const [profilePicUrl, isFetched] = useProfilePic();
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const newPasswordRef = useRef();

  const logOut = () => {
    signOut(auth)
    .then(()=> {
      setNotificationMessage("Signed out successfully!");
      setIsNotificationShown(true);
      setTimeout(()=>{
        setIsNotificationShown(false);
        navigate("/");
      }, 2000)
    })
    .catch(error => {
      setNotificationMessage("Some errors happened!");
      setErrorHappened(true);
      setTimeout(()=>{
        setErrorHappened(false);
        navigate("/");
      }, 2000)
    })
  };

  const deleteAccount = () => {
  // TO DO - delete all favs and profile picture too
  };

  const changePassword = () => {
  };

  const changeEmail = async () => {
    // TO DO
  }
  
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
      <button className="btn btn-sm bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-dark mt-4" onClick={logOut}>Sign out</button>
      {user?.email != "test@account.com" && !isNotificationShown && !errorHappened &&
      <>
        <button className="btn btn-sm bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-dark mt-4" onClick={deleteAccount}>Delete Account</button>
        <div className="btn btn-sm bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-dark mt-4" onClick={()=>{}}>Change Password</div>
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
      {isNotificationShown && <SuccessNotification notification={ notificationMessage }/>}
      {errorHappened && <FailedNotification notification={ notificationMessage }/>}
    </AnimatePresence>
    </>
  )
}

export default Profile
