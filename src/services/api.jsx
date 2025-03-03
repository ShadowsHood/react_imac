import React, { useEffect, useState } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // tanstack
  // const {data, error, loading} = useFetch(fetchdata)

  useEffect(async () => {
    isLoading = true
    const fetchData = async () => {
      const apiKey = '4508304816e1424497ede6e7cbacca6e';
      const url = `https://api.rawg.io/api/games?page_size=10&key=${apiKey}`;
      // const url = `https://api.rawg.io/api/games?page_size=10&ordering=name&platforms=17&stores=11&key=${apiKey}`;
      // const url = `https://api.rawg.io/api/platforms?page_size=100&order=name&key=${apiKey}`;
      //   const url = `https://pokeapi.co/api/v2/pokemon/ditto`; // test with a working API

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        // console.log(result.results[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    await fetchData();
    isLoading = false
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <div>
          {data.results.map((result, index) => (
            <div key={index}>
              <img src={result.background_image} alt="" class="elem" />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApiComponent;
