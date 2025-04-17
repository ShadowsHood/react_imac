const apiKey = '4508304816e1424497ede6e7cbacca6e';

function queryToString(query) {
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
  console.log('Query:', queryToString(query));
  const url = `https://api.rawg.io/api/games?page_size=${limit}&key=${apiKey}&${queryToString(query)}`;

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
