import {motion} from 'framer-motion;'

const Register = () => {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-32 mt-40">
      <form className="flex flex-col align-center items-center justify-center text-center" action="" method="post">
        <div className="username flex flex-col align-center justify-center w-max">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div>
        <div className="confirm-password flex flex-col align-center justify-center w-max mt-8">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" />
        </div>
        <button className="login-button border-8 border-secondary-white rounded-lg mt-4" type="submit">Register</button>
      </form>
    </motion.div>
  )
}

export default Register;