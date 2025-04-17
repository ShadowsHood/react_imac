import React, { useState, useEffect } from 'react';

const platformsOptions = [
  { id: 4, name: 'PC' },
  { id: 187, name: 'PlayStation 5' },
  { id: 18, name: 'PlayStation 4' },
  { id: 1, name: 'Xbox One' },
  { id: 186, name: 'Xbox Series S/X' },
  { id: 7, name: 'Nintendo Switch' },
  // Ajoutez d'autres options de plateformes
];

const genresOptions = [
  { id: 4, name: 'Action' },
  { id: 3, name: 'Adventure' },
  { id: 51, name: 'Indie' },
  { id: 10, name: 'Strategy' },
  { id: 2, name: 'Shooter' },
  { id: 40, name: 'Casual' },
  { id: 14, name: 'Simulation' },
  { id: 59, name: 'MMO' },
  { id: 1, name: 'Racing' },
  { id: 6, name: 'Fighting' },
  { id: 15, name: 'Sports' },
  { id: 19, name: 'RPG' },
  { id: 83, name: 'Platformer' },
  { id: 7, name: 'Puzzle' },
  { id: 11, name: 'Arcade' },
  { id: 80, name: 'Visual Novel' },
  { id: 17, name: 'Pinball' },
  { id: 12, name: 'Role-playing (RPG)' },
  { id: 16, name: 'Turn-based' },
  { id: 34, name: 'Educational' },
  { id: 28, name: 'Board Games' },
  { id: 32, name: 'Card' },
  // Ajoutez d'autres options de genres
];

const storesOptions = [
  { id: 1, name: 'Steam' },
  { id: 2, name: 'GOG' },
  { id: 3, name: 'PlayStation Store' },
  { id: 4, name: 'Xbox Store' },
  { id: 5, name: 'App Store' },
  { id: 6, name: 'Google Play' },
  { id: 7, name: 'Nintendo Store' },
  { id: 8, name: 'itch.io' },
  { id: 9, name: 'Epic Games Store' },
  // Ajoutez d'autres options de stores
];

export default function GameFilters({ onFilterChange, initialQuery }) {
  const [query, setQuery] = useState(initialQuery || {
    search: '',
    ordering: '-added',
    platforms: [],
    genres: [],
    stores: [],
  });

  useEffect(() => {
    onFilterChange(query);
  }, [query]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setQuery(prevQuery => {
      if (type === 'checkbox') {
        if (prevQuery[name] && Array.isArray(prevQuery[name])) {
          return {
            ...prevQuery,
            [name]: checked
              ? [...prevQuery[name], value]
              : prevQuery[name].filter(item => item !== value),
          };
        } else {
          return { ...prevQuery, [name]: checked };
        }
      } else {
        return { ...prevQuery, [name]: value };
      }
    });
  };

  const handleOrderingChange = (event) => {
    setQuery(prevQuery => ({ ...prevQuery, ordering: event.target.value }));
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
      stores: [],
    };
    setQuery(defaultQuery);
  };

  return (
    <aside id="filters" className="">
      <h2>Filter Games</h2>
      <form onSubmit={handleSubmit}>
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
        </div>

        <div className="filter-group">
          <label htmlFor="ordering">Order By</label>
          <select
            id="ordering"
            name="ordering"
            value={query.ordering}
            onChange={handleOrderingChange}
          >
            <option value="name">Alphabetical (A-Z)</option>
            <option value="-name">Alphabetical (Z-A)</option>
            <option value="-metacritic">Metacritic (Highest First)</option>
            <option value="metacritic">Metacritic (Lowest First)</option>
            <option value="-released">Release Date (Newest First)</option>
            <option value="released">Release Date (Oldest First)</option>
            <option value="-added">Date Added (Most Recent First)</option>
            <option value="added">Date Added (Least Recent First)</option>
            <option value="-created">Creation Date (Newest First)</option>
            <option value="created">Creation Date (Oldest First)</option>
            <option value="-updated">Update Date (Newest First)</option>
            <option value="updated">Update Date (Oldest First)</option>
            <option value="-rating">Rating (Highest First)</option>
            <option value="rating">Rating (Lowest First)</option>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
                <span>{genre.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Stores</label>
          <div className="checkbox-group">
            {storesOptions.map(store => (
              <label key={store.id} className="checkbox-label">
                <input
                  type="checkbox"
                  name="stores"
                  value={store.id.toString()}
                  checked={query.stores.includes(store.id.toString())}
                  onChange={handleChange}
                />
                <span>{store.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-actions">
          <button type="button" onClick={handleReset}>Reset Filters</button>
        </div>
      </form>
    </aside>
  );
}