import { useState, useEffect } from "react";

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
  const [count, setCount] = useState(0)

  useEffect(() => {
    pixelateImage("/src/img/demo.png", pixelation, setImageSrc);
  }, [pixelation]);

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
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}
