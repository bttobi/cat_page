const CatCardClicked = (props) => {
  return (
    <div className={"cat-details z-20 left-auto m-0 w-min h-min fixed flex flex-grow flex-col border-4 border-secondary-white rounded-lg transition-all duration-300 opacity-100"}>
      <div className="cat-description-wrapper w-full h-full p-2 bg-primary">
        <button className="close-button btn btn-sm btn-error btn-square bg-primary right-0 mr-2 btn-outline absolute m-1 transition-all duration-150 hover:scale-110" onClick={(e, isShown) => {props.func(e, true);}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        {(props.cat.breeds[0]!=undefined || props.cat.breeds[0]!=null) ?
        <div className="cat-name-details font-article text-center pt-6 pb-8 bg-primary border-secondary-white text-4xl font-bold">{props.cat.breeds[0].name}</div>
        : <div className="cat-name-details font-article text-center pt-6 pb-8 bg-primary border-secondary-white text-4xl font-bold">{"Cute Cat"}</div>
        }
        <div className="cat-image rounded-lg" style={{width: '24rem', height: '20rem', backgroundImage: `url(${props.cat.url})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
      </div>
    </div>
  )
}

export default CatCardClicked
