import React from 'react'
import { useState } from 'react';

const CatCard = (props) => {
  const [favourite, setFavourite] = useState(props.favourite);

  const addToFavourites = () => {
    setFavourite(()=>!(favourite));
    console.log(favourite, props.name);
  }

  return (
    <div className="cat-wrapper w-min h-min m-4 flex flex-col border-8 border-secondary-white rounded-lg cursor-pointer transition-all duration-300 hover:scale-110">
        <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
          <button className="align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={addToFavourites}>❤️</button>
        </div>
        <div className="px-6 pb-6 flex flex-col justify-center items-center">
          <div className="cat-img-wrapper w-64 flex flex-row items-center justify-center border-2 border-secondary-white rounded-lg">
            <img src={props.img} style= {{width: '256px', height: '172px'}} className=" w-min h-min m-0" alt="cat"/>
          </div>
          <div className="description-wrapper w-full h-32 pt-6 flex justify-center border-secondary-white rounded-lg">
            <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-4xl">{props.name}</p>
          </div>
        </div>
    </div>
  )
}

export default CatCard
