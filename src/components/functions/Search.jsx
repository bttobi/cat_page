import React from 'react';
import { useState, useRef, useEffect } from 'react';

const Search = (props) => {
  const inputNumber = useRef(1);

  const [searchDetails, setSearchDetails] = useState(
  {
    number: 1,
    breed: "",
    weight: 0
  });

  const updateNumber = (number) => {
    const nextSearchDetails = {... searchDetails, number}
    setSearchDetails(nextSearchDetails);
  }

  useEffect(()=>{
    props.getData(searchDetails);
  }, [searchDetails])

  return (
    <div className="search-wrapper w-1/2 flex flex-col flex-nowrap">
      <div className="search-settings flex flex-row flex-wrap justify-center items-center">
        <label className="mt-20 mb-4">How many cats do you want to generate? (1-10)</label>
      </div>
      <input className="bg-bg-primary border-2 border-secondary-white rounded-lg text-center" onChange={() => {updateNumber(inputNumber.current.value)}} ref={inputNumber} value={searchDetails.number} type="number" min="1" max="10" name="numberOfCats"/>
      <button className="p-2 mt-12 mb-4 bg-secondary rounded random-cat" onClick={(e)=>{e.preventDefault(); props.fetch();}}>Generate!</button>
    </div>
  )
}

export default Search
