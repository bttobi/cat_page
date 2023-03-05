import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';

const Random = () => {
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const fetchData = async () => {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(URL);
      return response.json();
  }

  const query = useQuery('cats', fetchData, 
  { 
    manual: true, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchOnReconnect: false,
  });

  useEffect(()=>{
    const onScroll = async (e)=>{
      const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
      if(!query.isFetching && scrollHeight - scrollTop <= clientHeight * 1.5){
        let newCat = await query.refetch();
        console.log(newCat.data)
        setDataToDisplay([...dataToDisplay, newCat.data[0], newCat.data[1]]);
      }
    }
    document.addEventListener('scroll', onScroll);

    return ()=>{
      document.removeEventListener('scroll', onScroll);
    }
  },);

  useEffect(()=>{
    window.scrollTo(0, 0); //setting scroll to Top
    const onMount = async (e)=>{
      let onMountCat = await query.refetch();
      setDataToDisplay([...onMountCat.data]);//adding data to existing data via fetching
    }
    onMount();
  },[])

  
  if(query.isError) console.error(query.error.message);

  return (
    <div id="home" className="home-page w-full h-full m-none mt-16  flex flex-col justify-start items-center font-article text-white">
      <p className="scroll-desc mt-16"> SCROLL DOWN TO LOAD CATS!</p>
      <div className="cat-cards-wrapper w-full h-full flex flex-row flex-wrap items-center justify-center">
        {dataToDisplay.map(el => {return <CatCard cat={el} key={el.id}/>})}
        {(query.isFetching) &&
        <div className="loading-wrapper m-16 flex flex-col items-center justify-center">
          <LoadingIcons.Hearts width="16rem" speed="3"/>
          <span className="loading-text font-article text-white">Loading...</span>
        </div>
      }
      </div>
    </div>
  )
}

export default Random
