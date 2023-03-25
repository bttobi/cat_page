import { useState, useEffect, useContext } from 'react';
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
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
      const listOfCats = await getDocs(collectionRef);

      const toAdd = [];
      listOfCats.forEach(favCat => toAdd.push(favCat.data()));
      setCats(toAdd);
      setIsFetched(true);
    }

    catch(error){
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getFavCats();
  }, []);

  return [cats, isFetched];
}

export default useFavourites;