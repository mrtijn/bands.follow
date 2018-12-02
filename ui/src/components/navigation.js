import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <ul className="c-navigation">
            <li>
                <Link to="/">Home </Link>
            </li>
            <li>
                <Link to="/concerts">Concerts </Link>
            </li>
        </ul>
    )
}