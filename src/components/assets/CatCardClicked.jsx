import {  useState, useEffect } from 'react';

const CatCardClicked = (props) => {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className={isClosed + "cat-details z-11 static top-20 left-auto m-0 w-min h-min fixed flex self-start justify-self-start flex-col border-8 border-secondary-white rounded-lg transition-all duration-300 opacity-100"}>
      <button className="close-button absolute right-0 m-1 transition-all duration-150 hover:scale-110" onClick={(e, isClosed) => {props.func(e, true);}}><img src="/img/close.png" height="32px" width="32px" alt="Home"/></button>
      <div className="cat-description-wrapper bg-black">
        {(props.cat.breeds[0]!=undefined || props.cat.breeds[0]!=null) ?
        <div className="cat-name-details font-article text-center pt-8 pb-8 bg-primary text-4xl font-bold">{props.cat.breeds[0].name}</div>
        : <div className="cat-name-details font-article text-center pt-8 pb-8 bg-primary text-4xl font-bold">{"Cute Cat"}</div>
        }
        <div className="cat-description flex flex-col p-2 bg-primary">
        <div className="cat-img-details w-96 h-72 pt-0"><div className="cat-image w-96 h-72 rounded-lg" style={{backgroundImage: `url(${props.cat.url})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div></div>
      </div>
      </div>
    </div>
  )
}

export default CatCardClicked
