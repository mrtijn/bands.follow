import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeaderComponent from './components/header';
import Index from './views/dashboard';
import Artists from './views/artists';
import ArtistDetail from './views/artists/detail';
import Concerts from './views/concerts';
import ConcertDetail from './views/concerts/detail';
import ConcertCreate from './views/concerts/create';
const NoMatch = () => <div>404</div>;
const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <main className="container main-container">
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/artists" component={Artists} />
          <Route path="/artist/:id" component={ArtistDetail} />
          <Route path="/concerts" component={Concerts} />
          <Route path="/concert/create" component={ConcertCreate} />
          <Route path="/concert/:id" component={ConcertDetail} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
