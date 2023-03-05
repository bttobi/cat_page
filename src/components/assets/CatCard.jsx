import { useState, useRef, useEffect } from 'react'
import CatCardClicked from './CatCardClicked';

const CatCard = (props) => {
  const catDetails = useRef();
  const [isShown, setIsShown] = useState(false);

useEffect(() => {
  document.addEventListener("click", hideDetails, true);
  return () => {
    document.removeEventListener("click", hideDetails, true);
  }
  }, []);

  const hideDetails = (e, clicked) => {
    if(catDetails.current != null && (!catDetails.current.contains(e.target) || clicked)){
      setIsShown(false);
    }
  }
  

  const addToFavourites = () => {
    
  }

  const showDetails = () => {
      setIsShown(true);
  }

  return (
    <>
    {isShown && 
    <div className={"flex w-min h-min flex-col justify-center align-center items-center z-10 fixed filter-blur-0"}>
      <div className="cat-clicked-card-wrapper absolute flex justify-center w-full h-full" ref={catDetails}>
        <CatCardClicked cat={props.cat} func={hideDetails}/>
      </div>
    </div>
    }
    <div className="cat-wrapper w-min h-min m-4 flex flex-col bg-primary border-8 border-secondary-white rounded-lg transition-all duration-300 hover:scale-110">
        <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
          <button className="align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={() => {addToFavourites()}}>❤️</button>
        </div>
        <div className="px-6 pb-6 flex flex-col justify-center items-center cursor-pointer" onClick={showDetails}>
          <div className="cat-img-wrapper w-64 flex flex-col items-center justify-center border-8 border-secondary-white rounded-lg">
          <div className="w-min h-min m-0 border-8 border-t-0 border-secondary-white" style= {{width: '256px', height: '172px', backgroundImage: `url(${props.cat.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroudnPosition: 'center'}} alt="cat"></div>
          {(props.cat.breeds[0]!=null || props.cat.breeds[0]!=undefined) ?
          <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
            <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-4xl">{props.cat.breeds[0].name}</p>
          </div>
          :
          <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
            <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-4xl">{"Cute Cat"}</p>
          </div>
          }
          </div>
        </div>
    </div>
    </>
  )
}

export default CatCard
