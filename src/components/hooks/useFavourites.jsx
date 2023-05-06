import { useState, useEffect, useContext } from 'react';
import db from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../App';

const useFavourites = () => {
  const auth = useContext(UserContext);
  const [isFetched, setIsFetched] = useState(false);
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(false);

  const getFavCats = async () => {
    if(auth.currentUser?.email==null || auth.currentUser?.email==undefined){
      return;
    }
    
    try{
      const collectionRef =  collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, "favourites");
      const listOfCats = await getDoc(documentRef);
      
      if(!listOfCats.exists() || listOfCats.data().favourites == []){
        setCats([]);
        return;
      }

      const toAdd = [];
      listOfCats.data().favourites.forEach(favCat => toAdd.push(favCat));
      setCats(toAdd);
      setIsFetched(true);
    }

    catch(err){
      setError(true);
      return;
    }
  }

  if(!isFetched){ //fetch until loaded
    setTimeout(()=>{
      getFavCats();
    }, 2000)
  }

  useEffect(()=>{
    getFavCats();
  }, []);

  return [cats, isFetched, error];
}

export default useFavourites;