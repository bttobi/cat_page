import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';
import Search from '../functions/Search';

const Home = () => {
  const [howManyCats, setHowManyCats] = useState(1);
  const [catBreedId, setCatBreedId] = useState("abys");
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const getSearchDetailsOfCats = (searchDetails) => {
    setHowManyCats(searchDetails.number);
    setCatBreedId(searchDetails.breed);
  }

  const fetchData = async () => {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=2&has_breeds=1&breed_id=${catBreedId}&api_key=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(URL);
      return response.json();
  }

  useEffect(()=>{
    const firstDataToShow = async ()=>{
      await setDataToDisplay(query.refetch().data);
    }
    firstDataToShow();
  },[])

  const query = useQuery('cats', fetchData, 
  {manual: true, 
  refetchOnWindowFocus: false, 
  refetchOnMount: false, 
  refetchOnReconnect: false,
  });


  useEffect(()=>{
    const onScroll = async (e)=>{
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if(!query.isFetching && scrollHeight - scrollTop <= clientHeight * 1.05){
        const newCat = await query.refetch();
        console.log(newCat.data[0], "w")
        setDataToDisplay([...dataToDisplay, newCat.data[0]]);
        console.log(dataToDisplay);
      }
    }
    document.addEventListener('scroll', onScroll);
  }, [query])
  
  if(query.isError) console.error(query.error.message);

  return (
    <div id="home" className="home-page w-full h-full m-none mt-16  flex flex-col justify-start items-center font-article text-white">
      <Search getData={getSearchDetailsOfCats} searchQuery={query}/>
      <div className="cat-cards-wrapper w-full h-full flex flex-row flex-wrap items-center justify-center">
        {(query.isFetching && dataToDisplay != undefined) ? 
        <div className="loading-wrapper m-16 flex flex-col items-center justify-center">
          <LoadingIcons.Hearts width="16rem" speed="3"/>
          <span className="loading-text font-article text-white">Loading...</span>
        </div>
        : dataToDisplay.data.map((el) => { return( <CatCard cat={el} key={el.id}/>)})}
      </div>
    </div>
  )
}

export default Home
