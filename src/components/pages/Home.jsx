import { useState } from 'react';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';
import Search from '../functions/Search';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [Cats, setCats] = useState([]);
  const [howManyCats, setHowManyCats] = useState(1);

  const getSearchDetailsOfCats = (searchDetails) => {
    setHowManyCats(searchDetails.number);
  }

  async function fetchData() {
    //console.log(howManyCats);
    setLoading(true);

    const URL = `https://api.thecatapi.com/v1/images/search?limit=${howManyCats}&has_breeds=1&api_key=${process.env.REACT_APP_API_KEY}`;

    const request = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));


    await setCats(request);
    await setLoading(false);
  }

  return (
    <div className="home-page w-full h-full m-none mt-16  flex flex-col justify-start items-center font-article text-white">
      <Search getData={getSearchDetailsOfCats} fetch={fetchData}/>
      <div className="cat-cards-wrapper flex flex-row flex-wrap items-center justify-center">
        {loading ? 
        <div className="loading-wrapper m-16 flex flex-col items-center justify-center">
          <LoadingIcons.Hearts width="16rem" speed="3"/>
          <span className="loading-text font-article text-white">Loading...</span>
        </div>
        : Cats.map((el) => <CatCard cat={el} key={el.id}/>)}
      </div>
    </div>
  )
}

export default Home
