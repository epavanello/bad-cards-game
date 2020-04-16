import { createStore,  } from 'redux';
import { GameState, gameReducer } from './reducers/gameReducer';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(gameReducer, composeWithDevTools());

export const useSelector: TypedUseSelectorHook<GameState> = useReduxSelector;

