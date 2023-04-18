import { useState, useEffect, React } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';
import Search from '../interactive-elements/Search';
import useBreeds from '../hooks/useBreeds';

const CatBreeds = () => {
  const [catBreedId, setCatBreedId] = useState("beng");
  const [showClicked, setShowClicked] = useState(false);
  const [cats, isFetching] = useBreeds(catBreedId);

  const getSearchDetailsOfCats = (searchDetails) => {
    setCatBreedId(searchDetails.breed);
  }

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, []);

  return (
      <motion.div id="cat-breeds" initial={{scaleY: 0}} animate={{scaleY: 1}} exit={{scaleY: 0}} className="home-page w-full m-none my-16 flex flex-col justify-start items-center font-article text-white">
        <AnimatePresence>
          {showClicked && <motion.div initial={{opacity: 0}} animate={{opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>}
        </AnimatePresence>
        <Search getData={getSearchDetailsOfCats} searchQuery={cats}/>
        <div className="cat-cards-wrapper w-full h-full flex flex-row flex-wrap items-start content-start justify-center">
          {(isFetching) ?
            <div className="fixed top-0 bottom-0 loading-wrapper z-10 m-16 flex flex-col items-center justify-center">
              <LoadingIcons.Hearts width="16rem" speed="3"/>
              <span className="loading-text text-base font-bold font-article text-white">Loading...</span>
            </div>: 
            cats.map(el =>  <CatCard showClicked={getShowClicked} isFavourite={ false } cat={el} key={el.url}/>)}
        </div>
      </motion.div>
  )
}

export default CatBreeds
