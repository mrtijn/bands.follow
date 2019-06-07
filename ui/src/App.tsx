import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeaderComponent from './components/header';
import Index from './views/dashboard';
import Artists from './views/artists';
import Concerts from './views/concerts';
const NoMatch = () => <div>404</div>;
const App: React.FC = () => {
  return (
    <div className="App">
      <HeaderComponent></HeaderComponent>
      <main>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/artists" component={Artists} />
          <Route path="/concerts" component={Concerts} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
