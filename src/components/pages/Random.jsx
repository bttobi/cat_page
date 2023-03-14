import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'react-query';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';

const Random = () => {
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [showClicked, setShowClicked] = useState(false);

  const fetchData = async () => {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=14&api_key=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(URL);
      return response.json();
  }

  const query = useQuery('cat-random', fetchData, 
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
    const onScroll = async (e)=>{
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if(!query.isFetching && scrollHeight - scrollTop <= clientHeight *1.25){
        let newCat = await query.refetch();
        setDataToDisplay([...dataToDisplay, newCat.data[0], newCat.data[1], newCat.data[2], newCat.data[3]]);
      }
    }
    document.addEventListener('scroll', onScroll);

    return ()=>{
      document.removeEventListener('scroll', onScroll);
    }
  },);

  useEffect(()=>{
    window.scrollTo(0, 0); //setting scroll to Top
    const onMount = async (e)=>{
      setDataToDisplay([]);
      let onMountCat = await query.refetch();
      setDataToDisplay([...onMountCat.data]);//adding data to existing data via fetching
    }
    onMount();
  },[])

  
  if(query.isError) console.error(query.error.message);

  return (
    <motion.div id="home" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="home-page w-full h-full m-none mt-16 flex flex-col justify-center items-center font-article text-white">
      <AnimatePresence>
        {showClicked && <motion.div initial={{ opacity: 0 }} animate={{opacity: 0.7}} exit={{opacity: 0}} className="backdrop w-full h-full fixed flex flex-col bg-black z-10 align-center justify-center items-center"></motion.div>}
      </AnimatePresence>
      <p className="scroll-desc mt-16"> SCROLL DOWN TO LOAD CATS!</p>
      <div className="cat-cards-wrapper w-full h-full flex flex-row flex-wrap items-center align-center justify-center">
        {dataToDisplay.map(el => {return <CatCard showClicked={getShowClicked} cat={el} key={el.id}/>})}
      </div>
      {(query.isFetching) &&
        <div className="fixed rounded-lg loading-wrapper m-16 flex flex-col self-center items-center justify-center">
          <LoadingIcons.Hearts width="16rem" speed="3"/>
          <span className="loading-text font-bold font-article text-white">Loading...</span>
        </div>
      }
    </motion.div>
  )
}

export default Random
