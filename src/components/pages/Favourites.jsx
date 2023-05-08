import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../../App';
import CatCard from '../assets/CatCard';
import useFavourites from '../hooks/useFavourites';
import LoadingIcons from 'react-loading-icons';
import { onAuthStateChanged } from 'firebase/auth';
import Notification from '../alerts/Notification';

const Favourites = () => {
  const auth = useContext(UserContext);
  const [filteredCats, setFilteredCats] = useState([]);
  const [cats, isFetched, error] = useFavourites();
  const [onMount, setOnMount] = useState(true);
  const searchRef = useRef();
  const [showClicked, setShowClicked] = useState(false);
  const [user, setUser] = useState({});
  const [errorHappened, setErrorHappened] = useState(false);
  
  if(!isFetched){ //if not yet fetched check if user is logged in
      onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
      });
  }

  const filterCats = () => {
    setFilteredCats(cats.filter((cat)=>{
      const breedName = cat?.breeds[0]?.name.toLowerCase();
      const customName = cat?.customName?.toLowerCase();
      return( 
      (customName ?? breedName ?? "cute cat")
      .includes(searchRef.current.value.toLowerCase())
      || (breedName ?? "cute cat")
      .includes(searchRef.current.value.toLowerCase()));
    }));
  };

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  useEffect(()=> { 
    if(isFetched && filteredCats.length == 0 && onMount){
      setFilteredCats(cats);
      setOnMount(false);
    }
    //check for errors while fetching
    if(error){
      setErrorHappened(true);
      setTimeout(()=>{
        setErrorHappened(false);
      }, 2000);
    } 
  },[cats])

  return (<>
    <motion.div initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="favourites-wrapper w-full h-full m-none my-32 flex flex-col justify-center items-center font-article text-white">
      {(user?.email!=null || user?.email!=undefined) ? 
      <>
      <AnimatePresence>
        {showClicked && <motion.div initial={{ top:10, opacity: 0 }} animate={{top: 0, opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>}
      </AnimatePresence>
      {filteredCats != [] && 
        <input className="input" ref={searchRef} type="text" placeholder="Search for cats" onChange={filterCats}/>}
      <div className="cat-cards-wrapper w-full h-full flex flex-wrap items-start align-start content-start justify-center">
      {(!isFetched) && filteredCats.length != [] ?
            <div className="loading-wrapper z-10 m-16 flex flex-col items-center justify-center">
              <LoadingIcons.Hearts width="16rem" speed="3"/>
              <span className="loading-text text-base font-bold font-article text-white">Loading...</span>
            </div> : 
              filteredCats.length != 0 ? 
              filteredCats.map(el => <CatCard showClicked={getShowClicked} isFavourite={ true } cat={el} key={el.url}/>)
              : <div className="not-loggedin-notification font-bold text-xl underline mt-4"><Link to="/random">No favourite cats found... Add some to favourites!</Link></div>} 
        </div>
        </>
    :<div className="not-loggedin-notification font-bold text-xl flex flex-col justify-center align-center items-center rounded-lg bg-dark p-4 shadow-lg shadow-black text-center mx-4">
      <p>You need to log in to see the favourite cats!</p>
      <Link className="underline" to="/login">Log in here</Link>
    </div>}
    {errorHappened && <Notification notification={"Error has happened while fetching! Will try again in 5 seconds..."} errorHappened={errorHappened}/>}
    </motion.div>
    </>
  )
}

export default Favourites;
