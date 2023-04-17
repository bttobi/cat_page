import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState, useContext, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../../App';
import FailedNotification from '../alerts/FailedNotification';
import SuccessNotification from '../alerts/SuccessNotification';

const Register = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const passConfRef = useRef(null);
  const [registerEmail, setRegisterEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dispError, setDispError] = useState(false);
  const [err, setErr] = useState("");
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const register = async () => {
    if(confirmPassword!==password){
      setErr("Passwords do not match!");

      setDispError(true);
      setTimeout(()=>{setDispError(false)}, 2000);
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, password);
      
      setSuccess(true);
      setTimeout(()=>{navigate('/');}, 1000);
    }
    catch(error){
      if(error.code === "auth/invalid-email") setErr("Please provide a valid email!"); 
      else if(error.code === "auth/email-already-in-use") setErr("Email already in use!");
      
      setDispError(true);
      setTimeout(()=>{setDispError(false)}, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40">
      <AnimatePresence>
        {dispError && <FailedNotification notification={ err }/>}
        {success && <SuccessNotification notification={ "Successfully registered!" } />}
      </AnimatePresence>
      <div className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max">
          <label className="font-bold" htmlFor="email">Email</label>
          <input className="input-email input w-full max-w-xs" ref={emailRef} type="email" name="email" placeholder="Email" required onChange={()=>{setRegisterEmail(emailRef.current.value)}}/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8">
          <label className="font-bold" htmlFor="password">Password</label>
          <input className="input-password input w-full max-w-xs" ref={passRef} type="password" name="password" placeholder="Password" required onChange={()=>{setPassword(passRef.current.value)}}/>
        </div>
        <div className="confirm-password flex flex-col align-center justify-center w-max mt-8">
          <label className="font-bold" htmlFor="confirm-password">Confirm Password</label>
          <input className="input-password-confirm input w-full max-w-xs" ref={passConfRef} type="password" name="confirm-password" placeholder="Confirm Password" required onChange={()=>{setConfirmPassword(passConfRef.current.value)}}/>
        </div>
        <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-sm border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-bg-primary mt-4" onClick={register}>Register</button>
      </div>
      <div className="login-redirect text-center mt-10">Already have an account? <br/> Log in <button className="login-redirect-button underline text-center"><Link to="/cat_page/login">here</Link></button></div>
    </motion.div>
  )
}

export default Register;