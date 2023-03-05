import { useState, useEffect, React } from 'react';
import { useQuery } from 'react-query';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';
import Search from '../functions/Search';

const CatBreeds = () => {
  const [numberOfCats, setNumberOfCats] = useState(1);
  const [catBreedId, setCatBreedId] = useState("abys");
  const [breedDescription, setBreedDescription] = useState();

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
    <div id="home" className="home-page w-full h-full m-none mt-16  flex flex-col justify-start items-center font-article text-white">
      <Search getData={getSearchDetailsOfCats} searchQuery={query}/>
      {(!query.isFetching && breedDescription!==undefined && breedDescription!==null) && 
      <div className="breed-desc-wrapper text-center mt-4">
        <div className="cat-weight-details p-2 font-bold">Weight: <span className="font-normal">{breedDescription.weight.metric}</span></div>
        <div className="cat-origin-details p-2 font-bold">Origin: <span>{breedDescription.origin}</span></div>
        <div className="cat-lifespan-details p-2 font-bold">Life Span:  <span>{breedDescription.life_span}</span></div>
        <div className="cat-temperament-details p-2 font-bold">Temperament: <span>{breedDescription.temperament}</span></div>
        <div className="cat-wikipedia-details p-2 pt-8 font-bold text-center"><a href={breedDescription.wikipedia_url} target="_blank" rel="noreferrer">More details here</a></div>
      </div>}
      <div className="cat-cards-wrapper w-full h-full flex flex-row flex-wrap items-center justify-center">
        {(query.isFetching) ?
        <div className="loading-wrapper z-10 m-16 flex flex-col items-center justify-center">
          <LoadingIcons.Hearts width="16rem" speed="3"/>
          <span className="loading-text font-article text-white">Loading...</span>
        </div>
        : query.data.map((el) => {
          return <CatCard cat={el} key={el.id}/>
        })}
      </div>
    </div>
  )
}

export default CatBreeds
