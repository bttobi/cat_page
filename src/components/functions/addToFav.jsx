import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase';

const addTofav = async (props, auth) => {
      const hasBreed = (props.cat.breeds[0]!==undefined ||  props.cat.breeds[0]!==null) ? false : true;
      const newCat = 
      {
        breed_name: hasBreed ? props.cat.breeds[0].name : "Cute Cat",
        url: props.cat.url,
        origin: hasBreed ? props.cat.breeds[0].origin : "",
        temperament: hasBreed ? props.cat.breeds[0].temperament : "",
        weight: hasBreed ? props.cat.breeds[0].weight.metric : "",
        life_span: hasBreed ? props.cat.breeds[0].life_span : "",
        wikipedia_url: hasBreed ? props.cat.breeds[0].wikipedia_url : ""
      };

      const collectionRef = collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, newCat.url.replace('https://cdn2.thecatapi.com/images/', ''));
      await setDoc(documentRef, newCat);
}

export default addTofav