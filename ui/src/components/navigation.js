import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <ul>
            <li>
                <Link to="/artist/create"> Create artist </Link>
            </li>
            <li>
                <Link to="/concert/create"> Create concert </Link>
            </li>
        </ul>
    )
}