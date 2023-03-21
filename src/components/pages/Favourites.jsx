import { motion } from 'framer-motion';
import db from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../App';
import CatCard from '../assets/CatCard';
import { v4 as uuidv4 } from 'uuid';

const Favourites = () => {
  const auth = useContext(UserContext);
  const [cat, setCat] = useState({breeds: [{name: "Abyssian"}], 
  id: 'Kq8__jmkT', 
  url: 'https://cdn2.thecatapi.com/images/Kq8__jmkT.jpg', 
  width: 1527, 
  height: 1286});
  const [showClicked, setShowClicked] = useState(false);

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  };

  const getFavs = async () =>{
    if(auth.currentUser.email===null || auth.currentUser.email===undefined){
      return;
    }
    try{

    const collectionRef = doc(db, 'favourites', auth.currentUser.email);
    const docSnap = await getDoc(collectionRef);
    console.log("Document data:", docSnap.data());
    setCat({
        breeds: [{name: "Abyssian"}], 
        id: 'Kq8__jmkT', 
        url: 'https://cdn2.thecatapi.com/images/Kq8__jmkT.jpg', 
        width: 1527, 
        height: 1286
      });
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getFavs();
  },[]);


  return (
    <motion.div onClick={getFavs}initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="font-article text-white w-full h-full mt-16">
      {auth?.currentUser?.email && <CatCard showClicked={getShowClicked} cat={cat} key={uuidv4()}/>}
    </motion.div>
  )
}

export default Favourites
