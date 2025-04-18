import { useState, useEffect, useCallback } from 'react'
import { getGames } from '../services/api'
import GameCard from '../components/GameCard.jsx'
import GameFilters from '../components/GameFilters';

export default function Search() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState({
    search: '',
    page: 1,
    ordering: '-added',
    platforms: [],
    genres: [],
    search_precise: true,
  });

  const handleFilterChange = (newQuery) => {
    setQuery({ ...newQuery, page: 1 });
    // console.log(newQuery)
  };

  const handlePageChange = (newPage) => {
    setQuery((prevQuery) => ({ ...prevQuery, page: newPage }));
  };

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const games = await getGames(6, query);
      setGames(games);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('search');

    return () => {
      body.classList.remove('search');
    };
  }, []);

  return (
    <>
      <GameFilters onFilterChange={handleFilterChange} initialQuery={query} />
      <div className="section-wrapper">
        <section id="intro" className="">
          <h1>Search what you love</h1>
        </section>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(query.page - 1)}
            disabled={query.page <= 1}
          >
            Previous
          </button>
          <input type="number" id="page" name="page" min="1" value={query.page}
            onChange={(event) => {
              const newValue = parseInt(event.target.value, 10);
              if (newValue === '' || isNaN(newValue) || newValue < 1) return;
              handlePageChange(newValue);
            }}
          />
          <button onClick={() => handlePageChange(query.page + 1)}>Next</button>
        </div>
        <section id="result" className="">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : games && games.length > 0 ? (
            <ol id="gameList">
              {games.map((game) => (
                <GameCard game={game} key={game.id} />
              ))}
            </ol>
          ) : (
            <p>No results found.</p>
          )}
        </section>
      </div>
    </>
  )
}
