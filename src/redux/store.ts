import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';

const rootReducer = combineReducers({
  gameReducer,
});

export const store = createStore(rootReducer);

type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
