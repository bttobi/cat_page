import { useState } from "react";
import Notification from "./Notification";
import { AnimatePresence } from "framer-motion";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import { useNavigate } from "react-router-dom";
import { collection, doc, deleteDoc } from "firebase/firestore";
import db from "../../firebase";

const DeleteAccountModal = ({ userToDelete }) => {
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  const [errorHappened, setErrorHappened] = useState(false);
  const [notificationIcon, setNotificationIcon] = useState(null);
  const navigate = useNavigate();

  const deleteAccount = async () => {
    await userToDelete
      ?.delete()
      .then(async () => {
        const collectionRef = collection(db, userToDelete?.email);
        const documentRefs = [
          doc(collectionRef, "favourites"),
          doc(collectionRef, "profile-picture"),
        ];
        documentRefs.forEach(async (document) => {
          await deleteDoc(document);
        });

        setNotificationMessage("Deleted user successfully!");
        setErrorHappened(false);
        setNotificationIcon(<TailSpin stroke={"#000"} />);
        setIsNotificationShown(true);
        setTimeout(() => {
          setIsNotificationShown(false);
          navigate("/login");
        }, 2000);
      })

      .catch((error) => {
        if (error.code == "auth/requires-recent-login") {
          setErrorIcon(<TailSpin stroke={"#000"} />);
          setErrorHappened(true);
          setNotificationMessage("You need to relogin to change email!");
          setIsNotificationShown(true);
          setTimeout(() => {
            setIsNotificationShown(false);
            navigate("/login");
          }, 2000);
          return;
        }
        setIsNotificationShown(true);
        setNotificationMessage("Some errors happened!");
        setErrorHappened(true);
        setTimeout(() => {
          setIsNotificationShown(false);
        }, 2000);
      });
  };

  return (
    <>
      <input type="checkbox" id="del-acc" className="modal-toggle" />
      <label
        htmlFor="del-acc"
        className="modal cursor-pointer font-article text-white"
      >
        <label
          className="modal-box relative bg-dark flex flex-col justify-center align-center shadow-md shadow-black"
          htmlFor=""
        >
          <label
            htmlFor="del-acc"
            className="close-button btn btn-sm btn-error btn-square bg-primary right-0 top-0 mt-2 mr-2 btn-outline fixed transition-all duration-150 hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
          <div className="wrapper flex flex-col justify-center align-center items-center">
            <p className="text-3xl font-bold mt-8 text-center">
              Are you sure to delete your account?
            </p>
            <button
              className="btn text-center mt-8 text-white bg-red-500 hover:bg-red-700 border-0"
              onClick={deleteAccount}
            >
              DELETE ACCOUNT
            </button>
          </div>
        </label>
        <AnimatePresence>
          {isNotificationShown && (
            <Notification
              notification={notificationMessage}
              errorHappened={errorHappened}
              icon={notificationIcon}
            />
          )}
        </AnimatePresence>
      </label>
    </>
  );
};

export default DeleteAccountModal;
