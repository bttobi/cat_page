import { collection, doc, getDoc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import db from '../../firebase';

const setDefaultName = async (props, auth) => {
      const collectionRef = collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, "favourites");
      const documentSnap = await getDoc(documentRef);
      
      const catToEdit = documentSnap.data().favourites
        .find((cat)=>cat.url == props.cat.url);

      await updateDoc(documentRef, {favourites: arrayRemove(catToEdit)})
    
      delete catToEdit.customName;

      await updateDoc(documentRef, {favourites: arrayUnion(catToEdit)});
}

export default setDefaultName;