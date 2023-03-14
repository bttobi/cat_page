import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router'
import { useRef } from 'react';

const Register = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const passConfRef = useRef(null);

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40">
      <form className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" name="email" required/>
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="password">Password</label>
          <input ref={passRef} type="password" name="password" required/>
        </div>
        <div className="confirm-password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input ref={passConfRef} type="password" name="confirm-password" required/>
        </div>
        <button className="login-button btn btn-sm bg-primary text-article text-secondary-white text-sm border-2 border-secondary-white rounded-md transition-all duration-300 hover:border-secondary-white hover:bg-bg-primary mt-4" type="submit">Register</button>
      </form>
      <div className="login-redirect text-center mt-10">Already have an account? Create one <button className="login-redirect-button underline text-center"><Link to="/login">here</Link></button></div>
    </motion.div>
  )
}

export default Register;