import { useState, useRef, useEffect } from 'react'
import CatCardClicked from './CatCardClicked';
import { motion, AnimatePresence } from 'framer-motion';

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
      props.showClicked(false);
    }
  }

  const addToFavourites = () => {
    
  }

  const showDetails = () => {
    setIsShown(true);
    props.showClicked(true);
  }

  return (
    <>
      <AnimatePresence>
      {isShown &&
        <motion.div initial={{y: '-10rem', opacity: 0}} animate={{y: '0', opacity: 1}} exit={{opacity: 0}} className={"fixed top-28 flex w-min h-full flex-col justify-center align-start items-start z-10 fixed filter-blur-0"}>
          <div className="cat-clicked-card-wrapper fixed flex justify-center align-start items-start w-full h-full" ref={catDetails}>
            <CatCardClicked cat={props.cat} func={hideDetails}/>
          </div>
        </motion.div>}
      </AnimatePresence>
      <div className="cat-wrapper w-min h-min m-4 flex flex-col bg-primary border-4 border-secondary-white rounded-lg transition-all duration-200 hover:scale-110">
      <div className="favourite py-6 pl-6 pr-2 w-full h-8 flex flex-row justify-end items-center">
        {(props.cat.breeds[0]!=null || props.cat.breeds[0]!=undefined) ?
          <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
            <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-xl">{props.cat.breeds[0].name}</p>
          </div>
          :
          <div className="description-wrapper w-full h-20 flex justify-center border-secondary-white rounded-lg">
            <p className="description w-full h-full flex flex-wrap justify-center items-center font-article font-bold text-center text-xl">{"Cute Cat"}</p>
          </div>
        }
          <button className="align-end w-min h-min transition-all duration-200 hover:scale-125" onClick={() => {addToFavourites()}}>❤️</button>
        </div>
          <div className="px-2 pb-2 flex flex-col justify-center items-center cursor-pointer" onClick={showDetails}>
            <div className="w-min h-min m-0 rounded-lg" style= {{width: '12rem', height: '10rem', backgroundImage: `url(${props.cat.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} alt="cat"></div>           
          </div>
      </div>
    </>
  )
}

export default CatCard
