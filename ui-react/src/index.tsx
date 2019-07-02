import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from "react-router-dom";
import App from './App';
import './styles/base.scss';
import localforage from 'localforage';
import * as serviceworker from './serviceWorker.default';

serviceworker.register();

localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'bandfollowapp',
    version     : 1.0,
    size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'bandfollow', // Should be alphanumeric, with underscores.
    description : 'the app which follows your band'
});



ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root')
);

