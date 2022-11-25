import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { getEnvironmentData } from 'worker_threads';

const Search = (props) => {
  const inputNumber = useRef(null);

  const [howManyCats, setHowManyCats] = useState(1);

  return (
    <div className="search-wrapper w-1/2 flex flex-col flex-nowrap">
      <div className="search-settings flex flex-row flex-wrap justify-center items-center">
        <label className="mt-20 mb-4">How many cats do you want to generate? (1-10)</label>
      </div>
      <input className="bg-bg-primary border-2 border-secondary-white rounded-lg text-center" onChange={()=>{setHowManyCats(inputNumber.current.value); props.getData(inputNumber.current.value)}} ref={inputNumber} value={howManyCats} type="number" min="1" max="10" name="numberOfCats"/>
      <button className="p-2 mt-12 mb-4 bg-secondary rounded random-cat" onClick={()=>{props.fetch()}}>Generate!</button>
    </div>
  )
}

export default Search
