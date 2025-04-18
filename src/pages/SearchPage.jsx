import { useState, useEffect, useCallback } from 'react'
import { getGames } from '../services/api'
import GameCard from '../components/GameCard.jsx'
import GameFilters from '../components/GameFilters';
import Pagination from '../components/Pagination';

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

  const handleFilterChange = useCallback((newQuery) => {
    setQuery({ ...newQuery, page: 1 });
    // console.log(newQuery)
  });

  const handlePageChange = useCallback((newPage) => {
    setQuery((prevQuery) => ({ ...prevQuery, page: newPage }));
  });

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const games = await getGames(24, query);
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
        <section id="intro" className="no-space">
          <h1>Search your beloved ones</h1>
        </section>
        <Pagination page={query.page} onPageChange={handlePageChange} />
        <section id="result" className="no-space">
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
        {loading ? null : <Pagination page={query.page} onPageChange={handlePageChange} />}
      </div>
    </>
  )
}
