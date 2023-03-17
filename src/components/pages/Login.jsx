import loggedIn from '../navigation/Navbar';
import { Link } from '@tanstack/react-router';
import { Register } from './Register';
import { motion } from 'framer-motion';
import { auth } from '../../firebase.js';
import { useState, useRef } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const login = async() => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    }
    catch(error){
      //console.log(error);
    }
  };

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40">
      <div className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max">
          <label htmlFor="email">Email</label>
          <input className="input-email input w-full max-w-xs" ref={emailRef} type="email" name="email" required placeholder='Email' onChange={()=>{setEmail(emailRef.current.value)}}/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="password">Password</label>
          <input className="input-email input w-full max-w-xs" ref={passwordRef} type="password" name="password" required placeholder='Password' onChange={()=>{setPassword(passwordRef.current.value)}}/>
        </div>
        <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-sm border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-bg-primary mt-4" onClick={login}>Log in</button>
      </div>
      <div className="register-redirect text-center mt-10">Do not have an account? <br/> Register <button className="login-redirect-button underline text-center"><Link to="/register">here</Link></button></div>
    </motion.div>
  )
}

export default Login;
