import React from 'react';

import Header from './components/Header';
import Home from './containers/Home';
import Intro from './containers/Intro';
import Login from './containers/Login';
import Signup from './containers/Signup';
import { useSelector } from './redux/store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './styles/App.scss';

function App() {
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);

  return (
    <Router>
      <Header />
      <div className="content">
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
            <Route path="/">
              <Intro />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
