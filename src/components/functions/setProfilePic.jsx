import { collection, doc, setDoc } from "firebase/firestore";
import db from "../../firebase";

const setProfilePic = async (auth, url) => {
  const collectionRef = collection(db, auth.currentUser.email);
  const documentRef = doc(collectionRef, "profile-picture");
  await setDoc(documentRef, { url: `${url}` });
};

export default setProfilePic;
