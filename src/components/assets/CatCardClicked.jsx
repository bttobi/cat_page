const CatCardClicked = (props) => {
  return (
    <div className="cat-details z-20 left-auto m-0 w-min h-min fixed flex flex-grow flex-col border-4 border-secondary-white rounded-lg transition-all duration-300 opacity-100">
      <div className="cat-description-wrapper w-full h-full p-2 bg-primary">
        <button className="close-button btn btn-sm btn-error btn-square bg-primary right-0 mr-2 btn-outline absolute m-1 transition-all duration-150 hover:scale-110" onClick={(e, isShown) => {props.func(e, true);}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="cat-name-details font-article text-center pt-6 pb-8 bg-primary border-secondary-white text-4xl font-bold">{props.cat?.breeds[0]?.name || "Cute Cat"}</div>
        <div className="cat-image rounded-lg" style={{width: '24rem', height: '20rem', backgroundImage: `url(${props.cat.url})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
        <div className="cat-description-wrapper">
        {(props.cat.breeds[0] != null || props.cat.breeds[0] != undefined) && 
        <>
          <div className="font-bold text-lg">{"Origin: " + (props.cat?.breeds[0]?.origin || "no origin information")}</div>
          <div className="font-bold text-lg">{"Weight (kg): " + ((props.cat?.breeds[0]?.weight.metric) || "No weight information")}</div>
        </>}
          <div className="text-justify font-bold mt-4 text-lg">{props.cat?.breeds[0]?.description || "Either a friendly cat or a total demon."}</div>
        </div>
      </div>
    </div>
  )
}

export default CatCardClicked
