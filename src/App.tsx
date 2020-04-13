import React from 'react';

import Header from './components/Header';
import Home from './containers/Home';
import Intro from './containers/Intro';
import Login from './containers/Login';
import Signup from './containers/Signup';
import { useSelector } from './redux/store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Room from './containers/Room';

function App() {
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);

  return (
    <Router>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="container mx-auto py-16 flex-1">
          {!userInfoLoaded ? (
            <p>Loading ...</p>
          ) : (
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/room/:roomID">
                <Room />
              </Route>
              <Route path="/">
                <Intro />
              </Route>
            </Switch>
          )}
        </div>

        <footer className="text-center text-gray-500 text-xs py-4">&copy;2020 Pavanello Emanuele. All rights reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
