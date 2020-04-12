import React from 'react';

import Home from './containers/Home';
import Login from './containers/Login';
import { useSelector } from './redux/store';

import './styles/App.scss';

function App() {
  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const logged = useSelector((state) => state.logged);

  return <>{!userInfoLoaded ? <p>Loading ...</p> : logged ? <Home /> : <Login />}</>;
}

export default App;
