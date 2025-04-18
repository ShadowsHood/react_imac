import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" id="home-link" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search" id="search-link" className={({ isActive }) => (isActive ? 'active' : '')}>Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/favorite" id="favorite-link" className={({ isActive }) => (isActive ? 'active' : '')}>My list</NavLink>
                    </li>
                    <li>
                        <NavLink to="/game" id="game-link" className={({ isActive }) => (isActive ? 'active btn' : 'btn')}>Game</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;