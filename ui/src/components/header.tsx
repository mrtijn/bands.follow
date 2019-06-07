import React from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api.service';
import './header.scss';
const Header : React.FC = () => {
    return (
        <header className="c-header">
            <div className="c-header__logo">
                <Link to="/">bands.follow</Link>
            </div>
            <nav className="c-header__nav">
                <Link to="/">Home</Link>
                <Link to="/artists">Artists</Link>
                <button onClick={getToken}>Get / Refresh token</button>
            </nav>
        </header>
    );
};

async function getToken(){
    try {
        const { token } = await api.userLogin();
        window.localStorage.setItem('token', token);
        console.log('Set token succesfully');
    } catch (error) {
        console.error(error);
        alert('Failed retrieving token');
    }
}

export default Header;