import { useEffect } from 'react';
import { useQuery } from 'react-query';

const useBreeds = (catBreedId) => {
  const fetchData = async () => {
    const URL = `https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1&breed_id=${catBreedId}&api_key=${process.env.REACT_APP_API_KEY}`;
      const response = await fetch(URL);
      return response.json();
  }

  const query = useQuery('cat-breed', fetchData, 
  {
    manual: true, 
    refetchOnWindowFocus: false, 
    refetchOnMount: false, 
    refetchOnReconnect: false,
  });

  useEffect(()=>{
    query.refetch();
  },[catBreedId])

  if(query.isError) console.error(query.error.message);

  return [query.data, query.isFetching]
}

export default useBreeds