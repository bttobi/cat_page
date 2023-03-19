import { router, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../firebase.js';
import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState(true);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  

  const login = async() => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if(user!==null && user!==undefined){ 
        setSuccess(true);
       // router.navigate({ to: '/register'});
      }

    }
    catch(error){
      setUserFound(false);
    }
  };

  useEffect(()=>{
    document.addEventListener('click', ()=>{setUserFound(true); setSuccess(false)});
    return ()=> document.removeEventListener('click', ()=>{setUserFound(true); setSuccess(false);});
  }, []);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40">
      <AnimatePresence>
      {!userFound &&
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute w-64 alert alert-warning shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>User not found!</span>
            </div>
          </motion.div>}
      {success &&
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="absolute w-64 alert alert-success shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Successfully logged in!</span>
            </div>
          </motion.div>}
      </AnimatePresence>
      <div className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max font-bold">
          <label htmlFor="email">Email</label>
          <input className="input-email input w-full max-w-xs" ref={emailRef} type="email" name="email" required placeholder='Email' onChange={()=>{setEmail(emailRef.current.value)}}/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8 font-bold">
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
