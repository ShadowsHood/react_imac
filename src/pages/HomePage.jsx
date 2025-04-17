import { useState, useEffect, useCallback } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { RouterProvider, Link } from 'react-router-dom'
import { getGames } from '../services/api'
import GameCard from '../components/GameCard.jsx'

export default function Home() {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGames = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const games = await getGames(3);
      setGames(games);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [getGames]);

  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.add('home')
    fetchGames();
    return () => {
      body.classList.remove('search');
    };
  }, [fetchGames]);

  return (
    <>
      <section id="intro" className="container">
        <div className='description'>
          <h1>Find your games... or die !</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <div className="links">
            <Link to="/search" className="btn btn-primary">Search</Link>
            <Link to="/favorite" className="btn">My lists</Link>
          </div>
        </div>
        <div className="img"></div>
      </section>

      <div id="prompter">
        <ul className='special-font'>
          <li>Discover</li>
          <li>Find</li>
          <li>Select</li>
          <li>Choose</li>
          <li>Setup</li>
          <li>Play</li>
          <li>Doubt</li>
          <li>Try</li>
          <li>Loose</li>
          <li>Repeat</li>
          <li>Win</li>
          <li>Die</li>
        </ul>
        <ul className='special-font' aria-hidden='true'>
          <li>Discover</li>
          <li>Find</li>
          <li>Select</li>
          <li>Choose</li>
          <li>Setup</li>
          <li>Play</li>
          <li>Doubt</li>
          <li>Try</li>
          <li>Loose</li>
          <li>Repeat</li>
          <li>Win</li>
          <li>Die</li>
        </ul>
      </div>

      <section id="browse" className='container'>
        <h2>Popular games</h2>
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
    </>
  )
}
