import { GAME_STARTED, GameActionTypes } from '../../actionTypes/gameTypes';

const initialState = {
  gameStarted: false,
};

export default function gameReducer(state = initialState, action: GameActionTypes) {
  switch (action.type) {
    case GAME_STARTED:
      return { ...state, gameStarted: true };
  }
  return state;
}
