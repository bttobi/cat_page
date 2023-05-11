import {
  collection,
  arrayRemove,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";

const removeFromFav = async (props, auth) => {
  const collectionRef = collection(db, auth.currentUser.email);
  const documentRef = doc(collectionRef, "favourites");
  const documentSnap = await getDoc(documentRef);
  if (documentSnap.exists()) {
    const toDelete = documentSnap
      .data()
      .favourites.find((cat) => cat.id == props.cat.id);
    await updateDoc(documentRef, { favourites: arrayRemove(toDelete) });
  }
};

export default removeFromFav;
