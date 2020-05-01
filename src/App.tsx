import React from 'react';

import Header from './components/Header';
import Game from './containers/Game';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import { useSelector } from './redux/store';
import { Router, Switch, Route } from 'react-router-dom';
import Room from './containers/Room';
import NotFound from './containers/NotFound';
import Alert from './components/Alert';
import { useDispatch } from 'react-redux';
import { closeError } from './redux/actions/gameActions';
import Profile from './containers/Profile';
import { useTranslation } from 'react-i18next';

import history from './history';
import Title from './components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const { t } = useTranslation();

  const userInfoLoaded = useSelector((state) => state.userInfoLoaded);
  const error = useSelector((state) => state.error);
  const titleError = useSelector((state) => state.titleError);

  const dispatch = useDispatch();

  const onCloseError = () => {
    dispatch(closeError());
  };

  return (
    <Router history={history}>
      <div className="flex flex-col flex-1">
        <Header />
        <div className="container mx-auto p-4 sm:py-8 flex-1">
          {error && <Alert className="mb-8 max-w-md mx-auto" title={titleError} message={error} onClose={onCloseError} />}
          {!userInfoLoaded ? (
            <Title className="text-center">{t('Loading') + '...'}</Title>
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

        <footer className="text-center text-gray-500 text-xs pb-4">
          Made with <FontAwesomeIcon icon={['fas', 'heart']} className="mx-1" /> in{' '}
          <span className="font-bold hover:underline">#QUARANTINE</span> &copy; Pavanello Emanuele
        </footer>
      </div>
    </Router>
  );
}

export default App;
