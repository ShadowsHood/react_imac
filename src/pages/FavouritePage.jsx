import { useState, useEffect, useCallback, useMemo } from 'react'
import { getGameDetails } from '../services/api'
import GameCard from '../components/GameCard.jsx'
import GameFilters from '../components/GameFilters';

export default function Favourite() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    search: '',
    ordering: '-added',
    platforms: [],
    genres: [],
  });

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    console.log(newFilter);
  });

  const filteredGames = useMemo(() => {
    if (!games) return [];
    let gamesFiltered = [...games];

    if (filter.search != '') {
      gamesFiltered = gamesFiltered.filter(game =>
        game.name.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    if (filter.platforms.length > 0) {
      gamesFiltered = gamesFiltered.filter(game =>
        game.platforms.some(platform => filter.platforms.includes(platform.platform.id.toString()))
      );
    }

    if (filter.genres.length > 0) {
      gamesFiltered = gamesFiltered.filter(game =>
        game.genres.some(genre => filter.genres.includes(genre.id.toString()))
      );
    }

    if (filter.ordering) {
      gamesFiltered = [...gamesFiltered].sort((a, b) => {
        switch (filter.ordering) {
          case 'name':
            return a.name.localeCompare(b.name);
          case '-name':
            return b.name.localeCompare(a.name);
          case 'released':
            return new Date(a.released) - new Date(b.released);
          case '-released':
            return new Date(b.released) - new Date(a.released);
          case '-metacritic':
            return b.metacritic - a.metacritic;
          case '-rating':
            return b.rating - a.rating;
          case '-added':
            return b.added - a.added;
          default:
            return 0;
        }
      });
    }

    return gamesFiltered;
  }, [games, filter.search, filter.ordering, filter.platforms, filter.genres]);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    const stock = localStorage.getItem('favorites');
    let favorites = stock ? JSON.parse(stock) : [];
    try {
      const favoriteGames = await Promise.all(
        favorites.map(gameId => getGameDetails(gameId))
      );
      setGames(favoriteGames);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('favorite-page');

    return () => {
      body.classList.remove('favorite-page');
    };
  }, []);

  return (
    <>
      <GameFilters onFilterChange={handleFilterChange} initialQuery={filter} />
      <div className="section-wrapper">
        <section id="intro" className="no-space">
          <h1>Manage your games</h1>
        </section>
        <section id="result" className="no-space">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : filteredGames && filteredGames.length > 0 ? (
            <ol id="gameList">
              {filteredGames.map((game) => (
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
