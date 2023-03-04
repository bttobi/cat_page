import { useRef, useEffect, useState } from 'react';

const CatCardClicked = (props) => {
  const [isClosed, setIsClosed] = useState(true);
  const closeCard = () => {
    setIsClosed("hidden");
  }

  return (
    <div className={isClosed + " cat-details w-min h-min fixed flex self-start justify-self-start flex-col border-8 border-secondary-white rounded-lg transition-all duration-300 opacity-100"}>
      <button className="close-button absolute right-0 m-1 transition-all duration-150 hover:scale-110" onClick={(e) => {props.func(e);}}><img src="/img/close.png" height="32px" width="32px" alt="Home"/></button>
      <div className="cat-description-wrapper bg-black">
        <div className="cat-name-details font-article text-center pt-8 pb-8 bg-primary text-4xl font-bold">{props.cat.breeds[0].name}</div>
        <div className="cat-description flex flex-col p-2 bg-primary">
        <div className="cat-img-details w-96 h-72 p-8 pt-0"><div className="cat-image w-80 h-64 rounded-lg" style={{backgroundImage: `url(${props.cat.url})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroudnPosition: 'center'}}></div></div>
        <div className="cat-weight-details p-2 pl-8 font-bold">Weight: <span className="font-normal">{props.cat.breeds[0].weight.metric}</span></div>
        <div className="cat-origin-details p-2 pl-8 font-bold">Origin: <span>{props.cat.breeds[0].origin}</span></div>
        <div className="cat-lifespan-details p-2 pl-8 font-bold">Life Span:  <span>{props.cat.breeds[0].life_span}</span></div>
        <div className="cat-temperament-details p-2 pl-8 font-bold">Temperament: <span>{props.cat.breeds[0].temperament}</span></div>
        <div className="cat-wikipedia-details p-2 pt-8 font-bold text-center"><a href={props.cat.breeds[0].wikipedia_url} target="_blank" rel="noreferrer">More details here</a></div>
      </div>
      </div>
    </div>
  )
}

export default CatCardClicked
