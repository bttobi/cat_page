import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

const addTofav = async (props, auth) => {
      const collectionRef = collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, props.cat.url.replace('https://cdn2.thecatapi.com/images/', ''));
      await setDoc(documentRef, props.cat);
}

export default addTofav;