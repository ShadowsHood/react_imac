import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getGameDetails, getGameScreenshots } from '../services/api';

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

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function Game() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [gameStatus, setGameStatus] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentGame, setCurrentGame] = useState(null);
  const [pixelatedImageSrc, setPixelatedImageSrc] = useState(null);
  const [pixelatedImage, setPixelatedImage] = useState(null);

  const [pixelation, setPixelation] = useState(50);
  const [timer, setTimer] = useState(30);
  const timerInterval = useRef(null);

  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

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

  const startGame = () => {
    console.log(games.length)
    if (games.length > 0) {
      const randomGame = getRandomElement(games);
      setCurrentGame(randomGame);
      const randomScreenshot = getRandomElement(randomGame.screenshots);

      if (randomScreenshot && randomScreenshot.image) {
        setIsPlaying(true);
        setTimer(30);
        setPixelation(50);
        setGameStatus('playing');
        console.log("Image source:", randomScreenshot.image);
        setPixelatedImageSrc(randomScreenshot.image);
        pixelateImage(pixelatedImageSrc, pixelation, setPixelatedImage);

        timerInterval.current = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              clearInterval(timerInterval.current);
              setGameStatus('lost');
              setMessage(`Game Over ! The game was : ${randomGame.name}`);
              return 0;
            }
          });
          setPixelation((prevSize) => Math.max(1, prevSize - Math.ceil(50 / 30)));
        }, 1000);
      } else {
        setMessage("Erreur: Aucune capture d'écran disponible pour ce jeu, relancez le jeu.");
      }
    } else {
      setMessage("Erreur: Aucune donnée de jeu disponible. Veuillez réessayer plus tard.");
    }
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const checkGuess = useCallback(() => {
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedGameName = currentGame.name.trim().toLowerCase();

    if (normalizedGameName.includes(normalizedGuess) || normalizedGuess.includes(normalizedGameName)) {
      clearInterval(timerInterval.current);
      setPixelation(1);
      setGameStatus('won');
      setMessage(`Well played ! The game was : ${currentGame.name}`);
    } else {
      setMessage("Nope, you suck...");
    }
  }, [guess]);

  const resetGame = useCallback(() => {
    setCurrentGame(null);
    setPixelatedImageSrc(null);
    setPixelatedImage(null);
    setPixelation(20);
    setGuess('');
    setMessage('');
    setIsPlaying(false);
    setTimer(30);
    setGameStatus('waiting');
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    console.log("État games mis à jour :", games.length);
  }, [games]);

  useEffect(() => {
    if (isPlaying) {
      pixelateImage(pixelatedImageSrc, pixelation, setPixelatedImage);
    }
  }, [pixelation]);

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('game-page');

    return () => {
      body.classList.remove('game-page');
      clearInterval(timerInterval.current); // Clear interval on unmount
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) return <div>Changing screenshots...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h2>PicksHell Game !</h2>
      <p>This game is based on your favorite games</p>

      {!loading && gameStatus === 'waiting' && (
        <button className="btn" onClick={startGame}>Letz a go !</button>
      )}

      {isPlaying && pixelatedImage && (
        <div>
          <img
            src={pixelatedImage}
            crossOrigin="anonymous"
            alt="Capture d'écran pixellisée"
            style={{ imageRendering: 'pixelated', maxWidth: '400px', height: 'auto' }}
          />
          <p>Timer: {timer} s</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={guess}
              onChange={handleGuessChange}
              placeholder="Your guess..."
            />
            <button className="btn" onClick={checkGuess}>Guess</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}

      {(gameStatus === 'won' || gameStatus === 'lost') && (
        <div>
          <p>{message}</p>
          <button className="btn" onClick={resetGame}>Replay</button>
        </div>
      )}
    </div>
  );
}