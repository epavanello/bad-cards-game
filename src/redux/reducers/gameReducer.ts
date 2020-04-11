import { GAME_STATE_CHANGED, GameActionTypes } from '../actionTypes/gameTypes';

const initialState = {
  gameStarted: false,
};

export default function gameReducer(state = initialState, action: GameActionTypes) {
  switch (action.type) {
    case GAME_STATE_CHANGED:
      return { ...state, gameStarted: action.payload };
  }
  return state;
}
