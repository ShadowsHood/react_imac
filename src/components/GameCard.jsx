import { React, useState } from 'react';

const platformsInfos = [
    { id: 4, name: 'PC', icon: 'fa-solid fa-desktop', color: '#cfcfcf' },
    { id: 187, name: 'PlayStation 5', icon: 'fa-brands fa-playstation', color: '#0202d4' },
    { id: 18, name: 'PlayStation 4', icon: 'fa-brands fa-playstation', color: '#024ee6' },
    { id: 16, name: 'PlayStation 3', icon: 'fa-brands fa-playstation', color: '#002d87' },
    { id: 15, name: 'PlayStation 2', icon: 'fa-brands fa-playstation', color: '#0091f2' },
    { id: 17, name: 'PSP', icon: 'fa-brands fa-playstation', color: '#2a3878' },
    { id: 1, name: 'Xbox One', icon: 'fa-brands fa-xbox', color: '#117D10' },
    { id: 186, name: 'Xbox Series S/X', icon: 'fa-brands fa-xbox', color: '#9DF017' },
    { id: 14, name: 'Xbox 360', icon: 'fa-brands fa-xbox', color: '#A1CF40' },
    { id: 7, name: 'Nintendo Switch', icon: 'fa-solid fa-gamepad', color: '#E8081B' },
    { id: 11, name: 'WII', icon: 'fa-solid fa-gamepad', color: '#f0c7ca' },
    { id: 8, name: 'Nintendo 3DS', icon: 'fa-solid fa-gamepad', color: '#ff405c' },
    { id: 13, name: 'Nintendo DSi', icon: 'fa-solid fa-gamepad', color: '#ff5c6c' },
    { id: 9, name: 'Nintendo DS', icon: 'fa-solid fa-gamepad', color: '#ff8591' },
    { id: 105, name: 'GameCube', icon: 'fa-solid fa-cube', color: '#6A5BAF' },
];

const GameCard = ({ game }) => {
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = localStorage.getItem('favorites');
        return favorites ? JSON.parse(favorites).includes(game.id) : false;
    });

    const toggleFavorite = () => {
        const stock = localStorage.getItem('favorites');
        let favorites = stock ? JSON.parse(stock) : [];

        if (isFavorite) {
            favorites = favorites.filter((id) => id !== game.id);
        } else {
            favorites.push(game.id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);

        // if (favoriteAction) {
        //     favoriteAction();
        // }
    };

    return (
        <li className="gameCard">
            <div className="gameimg">
                <img src={game.background_image} alt={game.name} />
            </div>
            <div className="gameinfo">
                <p className='name'>{game.name}</p>
                <p className='date'>{game.released}</p>
                <div className='genres'>
                    {game.genres.slice(0, 3).map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                    ))}
                    {game.genres.length > 3 && <span>...</span>}
                </div>
                <div className="platforms">
                    {game.platforms.slice(0, 6).map((platform) => {
                        const platformInfo = platformsInfos.find(
                            (p) => p.id === platform.platform.id
                        );
                        return (platformInfo && (
                            <span key={platform.platform.id} title={platform.platform.name}>
                                <i className={platformInfo.icon} style={{ color: platformInfo.color }}></i>
                            </span>
                        ));
                    })}
                    {game.platforms.length > 6 && <span>...</span>}
                </div>
            </div>
            <div className="favorite">
                <button onClick={toggleFavorite} className={isFavorite ? 'favorite-btn' : ''}>
                    <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
                </button>
            </div>
        </li>
    );
};

export default GameCard;