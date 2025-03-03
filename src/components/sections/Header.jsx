//create a  header component
import React from 'react';
import { Link } from 'react-router-dom'
// import './header.css';

const Header = () => {
    return (
        <header>
            {/* <h1>Waouw</h1> */}
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/list">My list</Link></li>
                    <li><Link to="/game">Game</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
