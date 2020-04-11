import { createStore, applyMiddleware } from 'redux';
import { GameState, gameReducer } from './reducers/gameReducer';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action as ReduxAction } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk)));

export const useSelector: TypedUseSelectorHook<GameState> = useReduxSelector;

export type Action<T> = ThunkAction<void, GameState, unknown, ReduxAction<T>>;
