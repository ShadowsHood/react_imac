import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/favorite">My list</Link></li>
                    <li><Link to="/game" className="btn">Game</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
