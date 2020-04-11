import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';

const rootReducer = combineReducers({
  gameReducer,
});

const store = createStore(rootReducer);

export default store;
