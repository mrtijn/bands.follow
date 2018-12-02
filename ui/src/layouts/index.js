import React from 'react';
import { Link } from 'react-router-dom';
import ListConcerts from '../components/listConcerts';
export default () => {
    return(
        <div class="l-index">
            <div class="l-index__soon">
                <h2>Upcoming concerts</h2>
                <ListConcerts />
            </div>

        </div>
    )
}

