import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// PAGES
import Index from './pages/index';
import Profile from './pages/profile';
import Concerts from './pages/concerts';
//

// COMPONENTS
import Navigation from './components/navigation';
import createArtist from './components/createArtist';
import createConcert from './components/createConcert';
// STYLES
import './styles/main.scss';




class App extends Component {
    render() {
        return (
            <Router>
                <div className="view">
                    <Navigation />
                    <Route exact path="/" component={Index} />
                    <Route exact path="/artist/create" component={createArtist} />
                    <Route exact path="/concerts" component={Concerts} />
                    <Route exact path="/concert/create" component={createConcert} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/profile/:accessToken/:refreshToken" component={Profile} />
                </div>
            </Router>
        );
    }
}





export default App;
