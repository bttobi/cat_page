import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

const Search = (props) => {
  const inputBreed = useRef("abys");
  const inputNumber = useRef(1);

  const [searchDetails, setSearchDetails] = useState(
  {
    number: 1,
    breed: "abys"
  });

  const updateSearchDetails = (number, breed) => {
    const nextSearchDetails = {...searchDetails, number, breed}
    setSearchDetails(nextSearchDetails);
  }

  useEffect(()=>{
    props.getData(searchDetails);
  }, [searchDetails]);

  const fetchBreeds = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    return response.json();
  }

  const breeds = useQuery('catBreeds', fetchBreeds, {refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    retry: false,
    refetchIntervalInBackground: false,
    refetchInterval: 86400000,
    refetchOnWindowFocus: false,
    staleTime: 86400000,});//24 hours in miliseconds
    console.log(props.searchQuery);
  return (
    <div className="search-wrapper w-1/2 flex flex-col flex-nowrap items-center">
      <label className="mt-20 mb-4 font-article" htmlFor="cat-breed">How many cats do you want to generate?</label>
      <input className="w-48 bg-bg-primary border-2 border-secondary-white rounded-lg text-center" type="number" min="1" max="10" onChange={() => {updateSearchDetails(inputNumber.current.value, inputBreed.current.value)}} ref={inputNumber} value={searchDetails.number} name="cat-number"/>
      <div className="search-settings flex flex-row flex-wrap justify-center items-center">
        <label className="mt-20 mb-4 font-article" htmlFor="cat-breed">What cat breed do you want to see?</label>
      </div>
      <select className=" w-48 bg-bg-primary border-2 border-secondary-white rounded-lg text-center" onChange={() => {updateSearchDetails(inputNumber.current.value, inputBreed.current.value)}} ref={inputBreed} value={searchDetails.breed} name="cat-breed">
      {breeds.isFetching ?  <option value="">{"Select"}</option> : 
        breeds.data.map((el, i) => {
        return <option key={i} value={el.id} className="w-6 h-6">{el.name}</option>
      })}
      </select>
      <button className="" onClick={()=>{props.searchQuery.refetch()}}>GENERATE</button>
    </div>
  )
}

export default Search
