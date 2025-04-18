import React, { useState, useEffect } from 'react';

const platformsOptions = [
  { id: 4, name: 'PC' },
  { id: 187, name: 'PlayStation 5' },
  { id: 18, name: 'PlayStation 4' },
  { id: 16, name: 'PlayStation 3' },
  { id: 15, name: 'PlayStation 2' },
  { id: 17, name: 'PSP' },
  { id: 1, name: 'Xbox One' },
  { id: 186, name: 'Xbox Series S/X' },
  { id: 14, name: 'Xbox 360' },
  { id: 7, name: 'Nintendo Switch' },
  { id: 11, name: 'WII' },
  { id: 8, name: 'Nintendo 3DS' },
  { id: 13, name: 'Nintendo DSi' },
  { id: 9, name: 'Nintendo DS' },
  { id: 105, name: 'GameCube' },
];

const genresOptions = [
  { id: 4, name: 'Action' },
  { id: 51, name: 'Indie' },
  { id: 3, name: 'Adventure' },
  { id: 5, name: 'RPG' },
  { id: 10, name: 'Strategy' },
  { id: 2, name: 'Shooter' },
  { id: 40, name: 'Casual' },
  { id: 14, name: 'Simulation' },
  { id: 7, name: 'Puzzle' },
  { id: 11, name: 'Arcade' },
  { id: 83, name: 'Platformer' },
  { id: 59, name: 'Massively Multiplayer' },
  { id: 1, name: 'Racing' },
  { id: 15, name: 'Sports' },
  { id: 6, name: 'Fighting' },
  { id: 19, name: 'Family' },
  { id: 28, name: 'Board Games' },
  { id: 17, name: 'Card' },
  { id: 34, name: 'Educational' },
];

export default function GameFilters({ onFilterChange, initialQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(initialQuery || {
    search: '',
    ordering: '-added',
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    onFilterChange(query);
  }, [query]);

  const handleCheckboxChange = (event) => {
    const { name, value, type, checked } = event.target;

    // setQuery(prevQuery => ({ ...prevQuery, [name]: checked ? [...prevQuery[name], value] : prevQuery[name].filter(id => id != value) }));
    // Plus sécurisé et vérification des types de data (si jamais la checkbox initialisée ne correspond pas a un tableau)
    setQuery(prevQuery => {
      if (prevQuery[name] && Array.isArray(prevQuery[name])) {
        return { ...prevQuery, [name]: checked ? [...prevQuery[name], value] : prevQuery[name].filter(item => item !== value) };
      } else {
        return { ...prevQuery, [name]: checked };
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuery(prevQuery => ({ ...prevQuery, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    const defaultQuery = {
      search: '',
      ordering: '-added',
      platforms: [],
      genres: [],
    };
    setQuery(defaultQuery);
  };

  const openPannel = () => {
    const filters = document.querySelector('#filters');
    filters.classList.toggle('open');
    setIsOpen(!isOpen);
  };

  return (
    <aside id="filters" className="">
      <button className="open-button" onClick={openPannel}></button>
      <form onSubmit={handleSubmit}>
        <h2>Filter Games</h2>
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            value={query.search}
            onChange={handleChange}
            placeholder="Enter game title"
          />
          <div className="filter-actions">
            <button type="button" onClick={handleReset} className='btn btn-white'>Reset Filters</button>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="ordering">Order By</label>
          <select
            id="ordering"
            name="ordering"
            value={query.ordering}
            onChange={handleChange}
          >
            <option value="-added">Trending</option>
            <option value="name">A-Z</option>
            <option value="-name">Z-A</option>
            <option value="-metacritic">Metacritic</option>
            <option value="-rating">Rating</option>
            <option value="-released">Release Date (Newest)</option>
            <option value="released">Release Date (Oldest)</option>
            {/* <option value="-created">Creation Date (Newest First)</option>
            <option value="created">Creation Date (Oldest First)</option> */}
            {/* <option value="added">Date Added (Least Recent First)</option> */}
            {/* <option value="metacritic">Metacritic (Lowest First)</option> */}
            {/* <option value="-updated">Update Date (Newest First)</option>
            <option value="updated">Update Date (Oldest First)</option> */}
            {/* <option value="rating">Rating (Lowest First)</option> */}
          </select>
        </div>

        <div className="filter-group">
          <label>Platforms</label>
          <div className="checkbox-group">
            {platformsOptions.map(platform => (
              <label key={platform.id} className="checkbox-label">
                <input
                  type="checkbox"
                  name="platforms"
                  value={platform.id.toString()}
                  checked={query.platforms.includes(platform.id.toString())}
                  onChange={handleCheckboxChange}
                />
                <span>{platform.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Genres</label>
          <div className="checkbox-group">
            {genresOptions.map(genre => (
              <label key={genre.id} className="checkbox-label">
                <input
                  type="checkbox"
                  name="genres"
                  value={genre.id.toString()}
                  checked={query.genres.includes(genre.id.toString())}
                  onChange={handleCheckboxChange}
                />
                <span>{genre.name}</span>
              </label>
            ))}
          </div>
        </div>
      </form>
    </aside>
  );
}