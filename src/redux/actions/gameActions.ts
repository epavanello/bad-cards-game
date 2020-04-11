import { GAME_STATE_CHANGED, GameStateChangedAction } from '../actionTypes/gameTypes';

export const gameStarted = (state: boolean): GameStateChangedAction => ({
  type: GAME_STATE_CHANGED,
  payload: state,
});
