import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router'
import { useRef, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';

const Register = () => {
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, password);
    }
    catch(error){
      //console.log(error); 
    }
  };

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const passConfRef = useRef(null);
  const [registerEmail, setRegisterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(()=>{
    console.log(registerEmail, password, confirmPassword);
  },[registerEmail, password, confirmPassword])

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40">
      <div className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" name="email" placeholder="Email" required onChange={()=>{setRegisterEmail(emailRef.current.value)}}/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="password">Password</label>
          <input ref={passRef} type="password" name="password" placeholder="Password" required onChange={()=>{setPassword(passRef.current.value)}}/>
        </div>
        <div className="confirm-password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input ref={passConfRef} type="password" name="confirm-password" placeholder="Confirm Password" required onChange={()=>{setConfirmPassword(passConfRef.current.value)}}/>
        </div>
        <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-sm border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-bg-primary mt-4" onClick={register}>Register</button>
      </div>
      <div className="login-redirect text-center mt-10">Already have an account? Create one <button className="login-redirect-button underline text-center"><Link to="/login">here</Link></button></div>
    </motion.div>
  )
}

export default Register;