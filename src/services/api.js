const apiKey = '4508304816e1424497ede6e7cbacca6e';

const storesOptions = [
  { id: 1, name: 'Steam' },
  { id: 3, name: 'PlayStation Store' },
  { id: 2, name: 'Xbox Store' },
  { id: 7, name: 'Xbox 360 Store' },
  { id: 6, name: 'Nintendo Store' },
  { id: 11, name: 'Epic Games' },
];

function queryToString(query) {
  query.stores = storesOptions.map(store => store.id);
  return Object.entries(query)
    .filter(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      } else {
        return value !== '' && value !== null && value !== undefined && value !== 0;
      }
    })
    .map(([key, value]) => `${key}=${Array.isArray(value) ? value.join(',') : value}`)
    .join('&');
}

export async function getGames(limit = 10, query = {}) {
  // console.log('Query:', queryToString(query));
  const url = `https://api.rawg.io/api/games?page_size=${limit}&key=${apiKey}&${queryToString(query)}`;
  // const url = `https://api.rawg.io/api/genres?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result.results;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

export async function getGameDetails(id) {
  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}

export async function getGameScreenshots(id) {
  const url = `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
}
