import { useState, useEffect, useContext } from "react";
import db from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { UserContext } from "../../App";
import { ProfilePictureContext } from "../../App";

const getProfilePic = () => {
  const auth = useContext(UserContext);
  const [userPicture, setUserPicture] = useContext(ProfilePictureContext);
  const [isFetched, setIsFetched] = useState(false);

  const getProfilePicture = async () => {
    if (
      auth?.currentUser?.email == null ||
      auth?.currentUser?.email == undefined
    )
      return;

    try {
      const collectionRef = collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, "profile-picture");
      const profilePictureDoc = await getDoc(documentRef);
      if (
        profilePictureDoc.data().url == undefined ||
        profilePictureDoc.data().url == null
      ) {
        setUserPicture("NOT FOUND");
        setIsFetched(true);
        return;
      }
      setUserPicture(profilePictureDoc.data().url);
      setIsFetched(true);
    } catch (error) {
      setUserPicture("NOT FOUND");
      setIsFetched(true);
    }
  };

  if (!isFetched) {
    //fetch until loaded
    setTimeout(() => {
      getProfilePicture();
    }, 100);
  }

  return [userPicture, isFetched];
};

export default getProfilePic;
