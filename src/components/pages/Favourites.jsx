import { motion } from 'framer-motion';
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../App';
import CatCard from '../assets/CatCard';
import { v4 as uuidv4 } from 'uuid';

const Favourites = () => {
  const auth = useContext(UserContext);
  const [cats, setCats] = useState([]); 
  const [showClicked, setShowClicked] = useState(false);

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  };

  const getFavs = async () =>{
    if(auth.currentUser?.email===null || auth.currentUser?.email===undefined){
      return;
    }
    
    try{

    const collectionRef =  collection(db, auth.currentUser.email);
    const listOfCats = await getDocs(collectionRef);

    const toAdd = [];
    listOfCats.forEach(favCat => toAdd.push(favCat.data()));
    setCats(toAdd);
    }

    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getFavs();
  },[]);

  console.log(cats)

  return (
    <motion.div onClick={getFavs}initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="font-article flex flex-row text-white w-full h-full mt-16">
      {auth?.currentUser?.email && 
        cats.map(el => 
          <CatCard showClicked={getShowClicked} cat={el} key={uuidv4()}/>
        )
      }
    </motion.div>
  )
}

export default Favourites;
