import { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

const Search = (props) => {
  const inputBreed = useRef("beng");

  const [searchDetails, setSearchDetails] = useState(
  {
    breed: "beng"
  });

  const updateSearchDetails = (breed) => {
    const nextSearchDetails = {...searchDetails, breed}
    setSearchDetails(nextSearchDetails);
  }

  useEffect(()=>{
    props.getData(searchDetails);
  }, [searchDetails]);

  const fetchBreeds = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    return response.json();
  }

  const breeds = useQuery('catBreeds', fetchBreeds, {
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: false,
    refetchIntervalInBackground: false,
    refetchInterval: 86400000,
    refetchOnWindowFocus: false,
    staleTime: 86400000,});//24 hours in miliseconds

  return (
    <div className="search-wrapper text-center w-1/2 flex flex-col flex-nowrap items-center">
      <div className="search-settings flex flex-row flex-wrap justify-center items-center">
        <label className="mt-10 mb-4 font-article text-lg" htmlFor="cat-breed">What cat breed do you want to see?</label>
      </div>
      <select className="select w-48 bg-dark border-2 border-secondary-white rounded-lg text-center" onChange={() => {updateSearchDetails(inputBreed.current.value)}} ref={inputBreed} value={searchDetails.breed} name="cat-breed">
      {breeds.isFetching ?  <option value="">{"Select"}</option> : 
        breeds.data.map((el, i) => {
        return <option key={i} value={el.id} className="w-6 h-6 text-left">{el.name}</option>
      })}
      </select>
    </div>
  )
}

export default Search
