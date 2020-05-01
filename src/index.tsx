import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseContext, Firebase } from './FirebaseContext';
import { createCustomStore } from './redux/store';

import './styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faInfoCircle, faTrophy, faShareSquare, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import firebaseMiddleware from './redux/middlewares/firebaseMiddleware';
import Axios from 'axios';

import './analytics';
import './i18n/i18n.config';
import './styles/common.scss';

library.add(faDotCircle, faCircle, faBars, faTimes, faInfoCircle, faTrophy, faShareSquare, faHeart, faInstagram);

const firebase = new Firebase();
const store = createCustomStore([firebaseMiddleware(firebase)]);

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={firebase}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
