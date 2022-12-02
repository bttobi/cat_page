import { useState, useRef, useEffect } from 'react'
import CatCardClicked from './CatCardClicked';

const CatCard = (props) => {
  const catDetails = useRef();
  const [isShown, setIsShown] = useState("hidden");

  useEffect(() => {
    document.addEventListener("click", hideDetails, true);
    return () => {
      document.removeEventListener("click", hideDetails, true);
    }
  }, []);

  const hideDetails = (e) => {
    if(!catDetails.current.contains(e.target)){
      setIsShown("hidden");
    }
  }

  const addToFavourites = () => {
    
  }

  const showDetails = () => {
    if(isShown == "hidden"){
      setIsShown("flex");
    } 
  }

  return (
    <>
    <div className={isShown + " bg-black absolute w-96 h-min"} ref={catDetails}>
      <CatCardClicked cat={props.cat}/>
    </div>
    <div className="cat-wrapper w-min h-min m-4 flex flex-col bg-primary border-8 border-secondary-white rounded-lg cursor-pointer transition-all duration-300 hover:scale-110" onClick={showDetails}>
        <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
          <button className="align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={(e) => {e.preventDefault(); addToFavourites()}}>❤️</button>
        </div>
        <div className="px-6 pb-6 flex flex-col justify-center items-center">
          <div className="cat-img-wrapper w-64 flex flex-col items-center justify-center border-8 border-secondary-white rounded-lg">
            <img src={props.cat.url} style= {{width: '256px', height: '172px'}} className=" w-min h-min m-0 border-b-8 border-secondary-white" alt="cat"/>
            <div className="description-wrapper w-full h-20 flex justify-center bg-black border-secondary-white rounded-lg">
              <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-4xl">{props.cat.breeds[0].name}</p>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default CatCard
