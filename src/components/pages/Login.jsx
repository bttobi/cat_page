import loggedIn from '../navigation/Navbar';

const Login = () => {
  return (
    loggedIn ? <div className="font-article text-white w-full h-full mt-16">ACCESS DENIED</div> :
    <div className="font-article text-white w-full h-full mt-16">
      LOGIN
    </div>
  )
}

export default Login
