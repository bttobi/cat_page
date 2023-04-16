const CatCardClicked = (props) => {
  return (
    <div className="cat-details z-20 m-0 fixed top-0 flex flex-col rounded-lg transition-all duration-300 opacity-100" style={{minWidth:"90vw", maxWidth: "90vw"}}>
      <div className="flex flex-col flex-grow cat-description-wrapper p-2 bg-primary rounded-lg shadow-lg shadow-black justify-center align-center items-center"  style={{minHeight: "80vh", background: "rgba(0, 0, 0, .65) " + `url(${props.cat.url})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundBlendMode: "darken"}}>
        <button className="close-button btn btn-sm btn-error btn-square bg-primary right-0 top-0 mt-1 mr-1 btn-outline absolute transition-all duration-150 hover:scale-110" onClick={(e, isShown) => {props.func(e, true);}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="cat-name-details font-article text-center pt-6 pb-8 border-secondary-white text-4xl font-bold" style={{fontSize: "clamp(2rem, 2.5vw, 4rem)"}}>{props.cat?.breeds[0]?.name || "Cute Cat"}</div>
        <div className="cat-description-wrapper">
        {(props.cat.breeds[0] != null || props.cat.breeds[0] != undefined) && 
        <>
          <div className="font-bold text-lg" style={{fontSize: "clamp(1rem, 2vw, 2rem)"}}>{"Origin: " + (props.cat?.breeds[0]?.origin || "no origin information")}</div>
          <div className="font-bold text-lg pt-4" style={{fontSize: "clamp(1rem, 2vw, 2rem)"}}>{"Weight (kg): " + ((props.cat?.breeds[0]?.weight.metric) || "No weight information")}</div>
        </>}
          <div className="text-justify font-bold mt-4 text-lg" style={{fontSize: "clamp(1rem, 1.5vw, 2rem)"}}>{props.cat?.breeds[0]?.description || "Either a friendly cat or a total demon."}</div>
          <div className="button self-end wrapper flex flex-col justify-center align-center items-center">
            <button className="btn align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" style={{fontSize: "clamp(1rem, 1.5vw, 3rem)"}} onClick={props.addToFavFunc}>❤️ ADD TO FAVOURITES</button>
            <a className="btn align-end p-2 h-full transition-all duration-200 hover:scale-110 bg-dark border-none rounded-lg mt-4" href={props.cat.url} target="_blank" style={{fontSize: "clamp(1rem, 1.5vw, 3rem)"}}>See picture in full screen</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatCardClicked
