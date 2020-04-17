import React from 'react';

import Header from './components/Header';
import Game from './containers/Game';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import { useSelector } from './redux/store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Room from './containers/Room';
import NotFound from './containers/NotFound';

function App() {
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);

  return (
    <Router>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="container mx-auto p-4 sm:py-16 flex-1">
          {!userInfoLoaded ? (
            <p>Loading ...</p>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/game" component={Game} />
              <Route path="/room/:roomID" component={Room} />
              <Route path="/home" component={Home} />
              <Route path="/" exact component={Home} />
              <Route path="*" exact={true} component={NotFound} />
            </Switch>
          )}
        </div>

        <footer className="text-center text-gray-500 text-xs py-4">&copy;2020 Pavanello Emanuele. All rights reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
