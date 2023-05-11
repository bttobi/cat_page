import {
  collection,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";

const addTofav = async (props, auth) => {
  const collectionRef = collection(db, auth.currentUser.email);
  const documentRef = doc(collectionRef, "favourites");
  const documentSnap = await getDoc(documentRef);

  if (!documentSnap.exists()) {
    await setDoc(documentRef, { favourites: arrayUnion(props.cat) });
    return;
  }

  const duplicateCat = documentSnap
    .data()
    .favourites.find((cat) => cat.url == props.cat.url);

  if (duplicateCat == null)
    await updateDoc(documentRef, { favourites: arrayUnion(props.cat) });
};

export default addTofav;
