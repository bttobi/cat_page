import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

const Search = (props) => {
  const inputNumber = useRef(1);
  const inputBreed = useRef("");

  const [searchDetails, setSearchDetails] = useState(
  {
    number: 1,
    breed: "",
    weight: 0
  });

  const updateSearchDetails = (number, catBreed) => {
    if(number > 10){
      number = 10;
    }

    else if(number < 1){
      number = 1;
    }
    const nextSearchDetails = {...searchDetails, number, catBreed}
    setSearchDetails(nextSearchDetails);
  }

  useEffect(()=>{
    props.getData(searchDetails);
  }, [searchDetails])

  const fetchBreeds = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/breeds');
    return response.json();
  }

  const breeds = useQuery('catBreeds', fetchBreeds, {manual: true, refetchOnWindowFocus: false, refetchOnMount: false, refetchOnReconnect: false});
  console.log(breeds.data)
  
  return (
    <div className="search-wrapper w-1/2 flex flex-col flex-nowrap">
      <div className="search-settings flex flex-row flex-wrap justify-center items-center">
        <label className="mt-20 mb-4 font-article" htmlFor="number-cats">How many cats do you want to generate? (1-10)</label>
      </div>
      <input className="bg-bg-primary border-2 border-secondary-white rounded-lg text-center" onChange={() => {updateSearchDetails(inputNumber.current.value, inputBreed.current.value)}} ref={inputNumber} value={searchDetails.number} type="number" min="1" max="10" name="number-cats"/>
      <div className="search-settings flex flex-row flex-wrap justify-center items-center">
        <label className="mt-20 mb-4 font-article" htmlFor="cat-breed">What cat breed do you want to see?</label>
      </div>
      <select className="bg-bg-primary border-2 border-secondary-white rounded-lg text-center" onChange={() => {updateSearchDetails(inputNumber.current.value, inputBreed.current.value)}} ref={inputBreed} value={searchDetails.breed} name="cat-breed">
      {breeds.isFetching ?  <option value={"Select"}>{"Select"}</option>: 
        breeds.data.map((el, i) => {<option key={i} className="w-6 h-6">{el.name}</option>})}
      </select>
      <button className="p-2 mt-12 mb-4 bg-secondary rounded random-cat" onClick={()=>{props.searchQuery.refetch();}}>Generate!</button>
    </div>
  )
}

export default Search
