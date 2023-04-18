import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FailedNotification from '../alerts/FailedNotification';
import SuccessNotification from '../alerts/SuccessNotification';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [dispError, setDispError] = useState(false);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  

  const login = async() => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if(user!==null && user!==undefined){ 
        setSuccess(true);
        setTimeout(()=>{navigate('/');}, 1000);
      }
    }
    
    catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setErr("Please provide a valid email!");
          break;
        
        case "auth/wrong-password":
          setErr("Wrong password!");
          break;
        
        case "auth/user-not-found":
          setErr("User not found!");
          break;

        default: 
          setErr("Some errors happened");
          break;
      }

      setDispError(true);
      emailRef.current.value = "";
      passRef.current.value = "";
      setTimeout(()=>{setDispError(false)}, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40">
      <AnimatePresence>
      {dispError && <FailedNotification notification={err}/>}
      {success && <SuccessNotification notification={ "Successfully logged in!" } />}
      </AnimatePresence>
      <div className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max font-bold">
          <label htmlFor="email">Email</label>
          <input className="input-email input w-full max-w-xs" ref={emailRef} type="email" name="email" required placeholder='Email' onChange={()=>{setEmail(emailRef.current.value)}}/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8 font-bold">
          <label htmlFor="password">Password</label>
          <input className="input-email input w-full max-w-xs" ref={passRef} type="password" name="password" required placeholder='Password' onChange={()=>{setPassword(passRef.current.value)}}/>
        </div>
        <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-xl border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-dark mt-4" onClick={login}>Log in</button>
      </div>
      <div className="register-redirect text-center mt-10">Do not have an account? <br/> Register <button className="login-redirect-button underline text-center"><Link to="/register">here</Link></button></div>
    </motion.div>
  )
}

export default Login;
