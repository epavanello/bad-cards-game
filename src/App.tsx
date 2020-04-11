import React from 'react';

import Home from './containers/Home';
import Login from './containers/Login';
import { useSelector } from './redux/store';

import './styles/App.css';

function App() {
  const logged = useSelector((state) => state.logged);

  return (
    <>
      {!logged && <Login />}
      {logged && (
        <>
          <Home />
        </>
      )}
    </>
  );
}

export default App;
