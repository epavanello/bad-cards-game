import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseContext, Firebase } from './FirebaseContext';
import { store } from './redux/store';

import './styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faDotCircle, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

library.add(faDotCircle, faCircle, faBars, faTimes);

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase(store.dispatch)}>
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
