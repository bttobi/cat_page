import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Notification from '../alerts/Notification';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';
import { ResetPasswordModal } from '../alerts/ResetPasswordModal';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationIcon, setNotificationIcon] = useState(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  

  const login = async() => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if(user!==null && user!==undefined){ 
        setShowNotification(true);
        setNotificationMessage("Logged in successfully!");
        setErrorHappened(false);
        setNotificationIcon(<TailSpin stroke={"#000"}/>)
        setTimeout(()=>{navigate('/');}, 1000);
      }
    }
    
    catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setNotificationMessage("Please provide a valid email!");
          break;
        
        case "auth/wrong-password":
          setNotificationMessage("Wrong password!");
          break;
        
        case "auth/user-not-found":
          setNotificationMessage("User not found!");
          break;

        default: 
          setNotificationMessage("Some errors happened!");
          break;
      }

      setShowNotification(true);
      setErrorHappened(true);
      emailRef.current.value = "";
      passRef.current.value = "";
      setTimeout(()=>{setShowNotification(false)}, 2000);
    }
  };

  const loginTest = async() => {
    try {
      const user = await signInWithEmailAndPassword(auth, "test@account.com", "test123");
      if(user!==null && user!==undefined){ 
        setShowNotification(true);
        setNotificationMessage("Logged in successfully!");
        setNotificationIcon(<TailSpin stroke="#000" />);
        setTimeout(()=>{navigate('/random');}, 2000);
      }
    }
    
    catch (error) { 
      setErrorHappened(true);
      setNotificationMessage("Some errors happened");
      setShowNotification(true);
      setTimeout(()=>{setShowNotification(false)}, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mb-0 mt-40">
      <div className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max font-bold">
          <input className="input-email input w-full max-w-xs" ref={emailRef} type="email" name="email" required placeholder='Email' onChange={()=>{setEmail(emailRef.current.value)}}/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8 font-bold">
          <input className="input-email input w-full max-w-xs" ref={passRef} type="password" name="password" required placeholder='Password' onChange={()=>{setPassword(passRef.current.value)}}/>
        </div>
        <button className="login-button btn bg-primary text-article text-secondary-white text-2xl w-full border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4" onClick={login}>Log in</button>
        <button className="login-button btn btn-sm h-min bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4" onClick={loginTest}>TEST ACCOUNT</button>
      </div>
      <div className="register-redirect text-center mt-10">Do not have an account?<Link to="/register"><p className="underline">Register here</p></Link></div>
      <div className="register-redirect text-center mt-10">Forgot password?<label htmlFor="reset-pass"><p className="underline cursor-pointer">Send reset email here</p></label></div>
      <AnimatePresence>
        {showNotification && <Notification notification={notificationMessage} icon={notificationIcon} errorHappened={errorHappened}/>}
      </AnimatePresence>
      <ResetPasswordModal />
    </motion.div>
  )
}

export default Login;
