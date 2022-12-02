import { useRef, useEffect, useState } from 'react';

const CatCardClicked = (props) => {
  const [isClosed, setIsClosed] = useState("flex");
  const closeCard = () => {
    setIsClosed("hidden")
  }
  return (
    <div className={isClosed + " cat-details w-96 h-min fixed flex flex-col bg-black border-8 border-secondary-white rounded-lg transition-all duration-300 opacity-100"}>
      <button className="close-button absolute right-0" onClick={closeCard}>X</button>
      <div className="cat-description-wrapper">
        <div className="cat-name-details fon">{props.cat.breeds[0].name}</div>
        <div className="cat-img-details"><img src={props.cat.url} alt="cat"/></div>
        <div className="cat-weight-details">Weight: {props.cat.breeds[0].weight.metric}</div>
        <div className="cat-origin-details">Origin: {props.cat.breeds[0].origin}</div>
        <div className="cat-lifespan-details">Life Span: {props.cat.breeds[0].life_span}</div>
        <div className="cat-temperament-details">Temperament: {props.cat.breeds[0].temperament}</div>
        <div className="cat-wikipedia-details"><a href={props.cat.breeds[0].wikipedia_url} target="_blank">More details here</a></div>
      </div>
    </div>
  )
}

export default CatCardClicked
