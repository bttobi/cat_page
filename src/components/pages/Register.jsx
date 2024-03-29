import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../../App";
import Notification from "../alerts/Notification";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import { ProfilePictureContext } from "../../App";
import getProfilePic from "../functions/getProfilePic.jsx";

const Register = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const passConfRef = useRef(null);
  const [registerEmail, setRegisterEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationIcon, setNotificationIcon] = useState(null);
  const [errorHappened, setErrorHappened] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, setUserPicture] = useContext(ProfilePictureContext);
  const [url, isFetched] = getProfilePic();
  const auth = useContext(UserContext);
  const navigate = useNavigate();

  const register = async () => {
    if (confirmPassword != password) {
      setNotificationMessage("Passwords do not match!");
      setErrorHappened(true);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, registerEmail, password);
      setErrorHappened(false);
      setShowNotification(true);
      setNotificationIcon(<TailSpin stroke="#000" />);
      setNotificationMessage("User registered successfully!");
      setUserPicture(url);
      setTimeout(() => {
        setShowNotification(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setNotificationMessage("Please provide a valid email!");
          break;

        case "auth/email-already-in-use":
          setNotificationMessage("Email already in use!");
          break;

        case "auth/weak-password":
          setNotificationMessage(
            "Password should be at least 6 characters in length!"
          );
          break;

        default:
          setNotificationMessage("Some errors happened!");
          break;
      }

      setShowNotification(true);
      setErrorHappened(true);
      emailRef.current.value = "";
      passRef.current.value = "";
      passConfRef.current.value = "";
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      className="flex flex-col justify-center align-center items-center font-article text-white w-32 h-min mt-40"
    >
      <AnimatePresence>
        {showNotification && (
          <Notification
            notification={notificationMessage}
            errorHappened={errorHappened}
            icon={notificationIcon}
          />
        )}
      </AnimatePresence>
      <div
        className="flex flex-col align-center items-center justify-center text-center"
        action=""
        method="post"
      >
        <div className="username flex flex-col align-center justify-center w-max">
          <input
            className="input-email input w-full max-w-xs"
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={() => {
              setRegisterEmail(emailRef.current.value);
            }}
          />
        </div>
        <div className="password flex flex-col align-center justify-center w-max mt-8">
          <input
            className="input-password input w-full max-w-xs"
            ref={passRef}
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={() => {
              setPassword(passRef.current.value);
            }}
          />
        </div>
        <div className="confirm-password flex flex-col align-center justify-center w-max mt-8">
          <input
            className="input-password-confirm input w-full max-w-xs"
            ref={passConfRef}
            type="password"
            name="confirm-password"
            placeholder="Confirm Password"
            required
            onChange={() => {
              setConfirmPassword(passConfRef.current.value);
            }}
          />
        </div>
        <button
          className="register-button btn w-full bg-primary text-article text-secondary-white text-2xl border-2 border-secondary-white rounded-md transition-all duration-150 hover:border-secondary-white hover:bg-gray-active mt-4"
          onClick={register}
        >
          Register
        </button>
      </div>
      <div className="login-redirect text-center mt-10">
        Already have an account?
        <button className="login-redirect-button underline text-center">
          <Link to="/login">Log in here</Link>
        </button>
      </div>
    </motion.div>
  );
};

export default Register;
