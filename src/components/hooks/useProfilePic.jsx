import { useState, useEffect, useContext } from 'react';
import db from '../../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../App';

const useProfilePic = () => {
  const auth = useContext(UserContext);
  const [isFetched, setIsFetched] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  const getProfilePicture = async () => {
    if(auth.currentUser?.email==null || auth.currentUser?.email==undefined)
    return;

    
    try{
      const collectionRef =  collection(db, auth.currentUser.email);
      const documentRef = doc(collectionRef, "profile-picture");
      const profilePictureDoc = await getDoc(documentRef);
      if(profilePictureDoc.data().url == undefined || profilePictureDoc.data().url == null){
        setProfilePic("NOT FOUND");
        setIsFetched(true);
        return;
      }
      setProfilePic(profilePictureDoc.data().url);
      setIsFetched(true);
    }

    catch(error){
      setProfilePic("NOT FOUND");
      setIsFetched(true);
    }
  }

  if(!isFetched){ //fetch until loaded
    getProfilePicture();
  }

  useEffect(()=>{
    getProfilePicture();
  }, []);

  return [profilePic, isFetched, isError];
}

export default useProfilePic