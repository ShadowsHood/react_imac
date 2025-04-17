import React from 'react';

const GameCard = ({ game }) => {
    return (
        <li className="gameCard">
            <div className="gameimg">
                <img src={game.background_image} alt={game.name} />
            </div>
            <div className="gameinfo">
                <p>{game.platforms.map((platform) => (
                    <span key={platform.platform.id}>{platform.platform.name}</span>
                ))}</p>
                <p>{game.name}</p>
                <p>{game.released}</p>
                <p>{game.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                ))}</p>
            </div>
        </li>
    );
};

export default GameCard;