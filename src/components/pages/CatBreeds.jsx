import { useState, useEffect, React } from 'react';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';
import Search from '../functions/Search';

const CatBreeds = () => {
  const [numberOfCats, setNumberOfCats] = useState(1);
  const [catBreedId, setCatBreedId] = useState("abys");
  const [breedDescription, setBreedDescription] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [showClicked, setShowClicked] = useState(false);

  const getSearchDetailsOfCats = (searchDetails) => {
    setCatBreedId(searchDetails.breed);
    setNumberOfCats(searchDetails.number);
  }

  const fetchData = async () => {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=${numberOfCats}&has_breeds=1&breed_id=${catBreedId}&api_key=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(URL);
      return response.json();
  }

  const setFetchedDesc = async (q) => {
    const desc = await q.refetch();
    return desc.data[0].breeds[0];
  }

  const query = useQuery('cats', fetchData, 
  {
    manual: true, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchOnReconnect: false,
  });

  const getShowClicked = (isClicked)=>{
    setShowClicked(isClicked);
  }

  useEffect(()=>{
    const onBreedChange = async () =>{
      setBreedDescription(await setFetchedDesc(query));
    }
    onBreedChange();
  }, [catBreedId, numberOfCats]);

  useEffect(()=>{
    const onMount = async () => {
      setBreedDescription(await setFetchedDesc(query));
    }
    onMount();
  }, []);
  


  if(query.isError) console.error(query.error.message);

  

  return (
      <div id="cat-breeds" className="home-page w-full h-full m-none mt-16  flex flex-col justify-start items-center font-article text-white">
        <AnimatePresence>
          {(showDetails || showClicked) && <motion.div initial={{opacity: 0}} animate={{opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full absolute flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>}
        </AnimatePresence>
        <Search getData={getSearchDetailsOfCats} searchQuery={query}/>
        <button onClick={()=>{setShowDetails(!showDetails)}}>{showDetails ? "hide details" : "show details"}</button>
        <AnimatePresence>
          {(showDetails && !query.isFetching && breedDescription!==undefined && breedDescription!==null) && 
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="breed-desc-wrapper mt-10 z-20 rounded-lg border-4 absolute bg-primary text-center">
              <div className="cat-weight-details p-2 font-bold">Weight: <span className="font-normal">{breedDescription.weight.metric + " kg"}</span></div>
              <div className="cat-origin-details p-2 font-bold">Origin: <span>{breedDescription.origin}</span></div>
              <div className="cat-lifespan-details p-2 font-bold">Life Span:  <span>{breedDescription.life_span}</span></div>
              <div className="cat-temperament-details p-2 font-bold">Temperament: <span>{breedDescription.temperament}</span></div>
              <div className="cat-wikipedia-details p-2 font-bold text-center"><a href={breedDescription.wikipedia_url} target="_blank" rel="noreferrer">More details here</a></div>
              <button onClick={()=>{setShowDetails(false)}}>hide details</button>
            </motion.div>}
        </AnimatePresence>
        <div className="cat-cards-wrapper relative w-full h-full flex flex-row flex-wrap items-center justify-center">
          {(!query.isFetching) && query.data.map(el => {return <CatCard showClicked={getShowClicked} cat={el} key={el.id}/>})}
          {(query.isFetching) &&
            <div className="loading-wrapper z-10 m-16 flex flex-col items-center justify-center">
              <LoadingIcons.Hearts width="16rem" speed="3"/>
              <span className="loading-text font-article text-white">Loading...</span>
            </div>}
        </div>
      </div>
  )
}

export default CatBreeds
