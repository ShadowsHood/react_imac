import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function pixelateImage(originalImage, pixelationFactor) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;

  const canvasWidth = originalWidth;
  const canvasHeight = originalHeight;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);

  const originalImageData = context.getImageData(
    0,
    0,
    originalWidth,
    originalHeight
  ).data;

  if (pixelationFactor !== 0) {
    for (let y = 0; y < originalHeight; y += pixelationFactor) {
      for (let x = 0; x < originalWidth; x += pixelationFactor) {
        // extracting the position of the sample pixel
        const pixelIndexPosition = (x + y * originalWidth) * 4;

        // drawing a square replacing the current pixels
        context.fillStyle = `rgba(
            ${originalImageData[pixelIndexPosition]},
            ${originalImageData[pixelIndexPosition + 1]},
            ${originalImageData[pixelIndexPosition + 2]},
            ${originalImageData[pixelIndexPosition + 3]}
          )`;
        context.fillRect(x, y, pixelationFactor, pixelationFactor);
      }
    }
  }
  pixelatedImage.src = canvas.toDataURL();
}


export default function Game() {
  const [count, setCount] = useState(0)

  useEffect(async () => {
    const pixelatedImage = document.querySelector("#pixelatedImage");
    // storying a copy of the original image
    const originalImage = pixelatedImage.cloneNode(true);

    const pixelationElement = document.querySelector("#pixelationRange");


    pixelationElement.oninput = (e) => {
      pixelateImage(originalImage, parseInt(e.target.value));
    };
    console.log("b");

    pixelateImage(originalImage, pixelationFactor);
  }, []);

  return (
    <main>
      <div>
        <img style="margin-top: 5px;" id="pixelatedImage" src="/demo.png" crossOrigin="anonymous" />
      </div>
      <div style="margin-top: 5px;">
        <span>Pixelation: </span>
        <input type="range" min="0" max="20" value="0" id="pixelationRange" />
      </div>
    </main>
  )
}
