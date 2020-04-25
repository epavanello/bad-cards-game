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
import Alert from './components/Alert';
import { useDispatch } from 'react-redux';
import { closeError } from './redux/actions/gameActions';
import Profile from './containers/Profile';
import { useEnforcedTranslation, TKey } from './i18n';

function App() {
  const t = useEnforcedTranslation();

  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const error = useSelector((state) => state.error);
  const titleError = useSelector((state) => state.titleError);

  const dispatch = useDispatch();

  const onCloseError = () => {
    dispatch(closeError());
  };

  return (
    <Router>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="container mx-auto p-4 sm:py-8 flex-1">
          {error && <Alert className="mb-8 max-w-md mx-auto" title={titleError} message={error} onClose={onCloseError} />}
          {!userInfoLoaded ? (
            <p>Loading ...</p>
          ) : (
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/game" component={Game} />
              <Route path="/room/:roomID" component={Room} />
              <Route path="/home" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/" exact component={Home} />
              <Route path="*" exact={true} component={NotFound} />
            </Switch>
          )}
        </div>

        <footer className="text-center text-gray-500 text-xs py-4">&copy;2020 Pavanello Emanuele. {t(TKey.Footer, TKey.Rights)}</footer>
      </div>
    </Router>
  );
}

export default App;
