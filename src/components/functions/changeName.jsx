import {
  collection,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase";

const changeName = async (props, auth, customName) => {
  const collectionRef = collection(db, auth.currentUser.email);
  const documentRef = doc(collectionRef, "favourites");
  const documentSnap = await getDoc(documentRef);

  const catToEdit = documentSnap
    .data()
    .favourites.find((cat) => cat.url == props.cat.url);

  await updateDoc(documentRef, { favourites: arrayRemove(catToEdit) });

  catToEdit.customName = customName;

  await updateDoc(documentRef, { favourites: arrayUnion(catToEdit) });
};

export default changeName;
