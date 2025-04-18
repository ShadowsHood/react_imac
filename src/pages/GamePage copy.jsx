import { useState, useEffect, useCallback } from "react";
import { getGameDetails, getGameScreenshots } from '../services/api'

function pixelateImage(imageSrc, pixelationFactor, setImageSrc) {
  const image = new Image();
  image.crossOrigin = "anonymous"; // Prevent CORS issues
  image.src = imageSrc;

  image.onload = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const width = image.naturalWidth;
    const height = image.naturalHeight;

    if (width === 0 || height === 0) {
      console.warn("Image not loaded yet.");
      return;
    }

    canvas.width = width;
    canvas.height = height;

    // 1. Scale down
    const tempCanvas = document.createElement("canvas");
    const tempContext = tempCanvas.getContext("2d");

    tempCanvas.width = Math.max(1, Math.floor(width / pixelationFactor));
    tempCanvas.height = Math.max(1, Math.floor(height / pixelationFactor));

    tempContext.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);

    // 2. Scale back up
    context.imageSmoothingEnabled = false; // Keep pixelated effect
    context.drawImage(tempCanvas, 0, 0, width, height);

    setImageSrc(canvas.toDataURL()); // Update the displayed image
  };
}

export default function Game() {
  const [pixelation, setPixelation] = useState(1);
  const [imageSrc, setImageSrc] = useState("/src/img/demo.png");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    const stock = localStorage.getItem('favorites');
    let favorites = stock ? JSON.parse(stock) : [];
    try {
      const favoriteGames = await Promise.all(
        favorites.map(gameId => getGameDetails(gameId))
      );
      const gamesWithScreenshots = await Promise.all(
        favoriteGames.map(async (game) => {
          try {
            const screenshotsData = await getGameScreenshots(game.id);
            return { ...game, screenshots: screenshotsData.results };
          } catch (screenshotError) {
            console.error(`Erreur lors de la récupération des captures d'écran pour le jeu ${game.id}:`, screenshotError);
            return { ...game, screenshots: [] };
          }
        })
      );
      setGames(gamesWithScreenshots);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    pixelateImage("/src/img/demo.png", pixelation, setImageSrc);
  }, [pixelation]);

  useEffect(() => {
    fetchFavorites();
  }
    , []);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('game');

    return () => {
      body.classList.remove('game');
    };
  }, []);

  return (
    <>
      <div>
        <img
          src={imageSrc}
          crossOrigin="anonymous"
          style={{ marginTop: "5px", imageRendering: "pixelated" }} // Keeps sharp pixels
          alt="Pixelated"
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <span>Pixelation: </span>
        <input
          type="range"
          min="1"
          max="20"
          defaultValue={1}
          onChange={(e) => setPixelation(parseInt(e.target.value))}
        />
      </div>
    </>
  );
}
