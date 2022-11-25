import { useState } from 'react';
import CatCard from '../assets/CatCard';
import LoadingIcons from 'react-loading-icons';
import Search from '../functions/Search';

const Home = () => {
  const [loading, setLoading] = useState(null);
  const [Cats, setCats] = useState([]);

  const getNumberOfCats = (howMany) => {
    alert (howMany);
  }

  async function fetchData() {
   // const howManyCats = getNumberOfCats();
    console.log(howManyCats);
    setLoading(true);

    const URL = `https://api.thecatapi.com/v1/images/search?limit=${howManyCats}&has_breeds=1&api_key=live_fQWtdJC0pMGfAQHsJ8n4uI2yta341h2MTFvktobRWucrqIUz47V0zTjZkCJ2elNF`;

    const request = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.log(err));

    console.log(request);

    await setCats(request);
    await setLoading(false);
  }

  return (
    <div className="w-full h-full m-none mt-16  flex flex-col justify-start items-center font-article text-white">
      <Search getData={getNumberOfCats} fetch={fetchData}/>
      <div className="cat-cards-wrapper flex flex-row flex-wrap items-center justify-center">
        {loading ? 
        <div className="loading-wrapper m-16 flex flex-col items-center justify-center">
          <LoadingIcons.Hearts width="16rem" speed="3"/>
          <span className="loading-text font-article text-white">Loading...</span>
        </div>
        : Cats.map((el) => <CatCard img={el.url} name={el.breeds[0].name} key={el.id}/>)}
      </div>
    </div>
  )
}

export default Home
