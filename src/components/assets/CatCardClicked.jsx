import { useRef, useEffect, useState } from 'react';

const CatCardClicked = (props) => {
  const [isClosed, setIsClosed] = useState("flex");
  const closeCard = () => {
    setIsClosed("flex")
  }
  return (
    <div className={" cat-details z-10 relative flex flex-col"}>
      <button className="close-button absolute right-0" onClick={closeCard}>X</button>
      <div className="cat-name-details">{props.cat.name}</div>
      <div className="cat-img-details"><img src={props.cat.url} alt="cat"/></div>
      <div className="cat-weight-details">Weight: {props.cat.breeds[0].weight.metric}</div>
      <div className="cat-origin-details">Origin: {props.cat.breeds[0].origin}</div>
      <div className="cat-lifespan-details">Life Span: {props.cat.breeds[0].life_span}</div>
      <div className="cat-temperament-details">Temperament: {props.cat.breeds[0].temperament}</div>
      <div className="cat-wikipedia-details"><a href={props.cat.breeds[0].wikipedia_url} target="_blank">More details here</a></div>
    </div>
  )
}

export default CatCardClicked
