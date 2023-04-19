import { useState, useEffect, useContext } from 'react';
import db from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../App';

const useFavourites = () => {
  const auth = useContext(UserContext);
  const [isFetched, setIsFetched] = useState(false);
  const [cats, setCats] = useState([]);

  const getFavCats = async () => {
    if(auth.currentUser?.email==null || auth.currentUser?.email==undefined){
      return;
    }
    
    try{
      const collectionRef =  collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, "favourites");
      const listOfCats = await getDoc(documentRef);

      const toAdd = [];
      listOfCats.data().favourites.forEach(favCat => toAdd.push(favCat));
      setCats(toAdd);
      setIsFetched(true);
    }

    catch(error){
      console.log(error)
    }
  }

  if(!isFetched){ //fetch until loaded
    getFavCats();
  }

  useEffect(()=>{
    getFavCats();
  }, []);

  return [cats, isFetched];
}

export default useFavourites;