import { collection, doc, deleteDoc } from 'firebase/firestore';
import db from '../../firebase';

const removeFromFav = async (props, auth) => {
    const toDelete = props.cat.url.replace('https://cdn2.thecatapi.com/images/', '');
    const collectionRef = collection(db, auth.currentUser.email);
    const documentRef = doc(collectionRef, toDelete);
    await deleteDoc(documentRef, toDelete);
}

export default removeFromFav