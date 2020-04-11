import { GAME_USER_LOADED, UserType, GAME_JOINED, GAME_HOSTED, GAME_UPDATE_PLAYERS } from './../actionTypes/gameTypes';
import { GAME_STATE_CHANGED, GameActionTypes } from '../actionTypes/gameTypes';

export interface GameState {
  gameStarted: boolean;
  logged: boolean;
  username: string;
  inRoom: boolean;
  roomID: string;
  isHost: boolean;
  players: UserType[];
}

const initialState: GameState = {
  gameStarted: false,
  logged: false,
  username: '',
  inRoom: false,
  roomID: '',
  isHost: false,
  players: [],
};

export function gameReducer(state = initialState, action: GameActionTypes) {
  switch (action.type) {
    case GAME_STATE_CHANGED:
      return { ...state, gameStarted: action.payload.gameStarted };
    case GAME_USER_LOADED:
      return { ...state, logged: true, username: action.payload.username };
    case GAME_JOINED:
      return { ...state, inRoom: true, roomID: action.payload.roomID };
    case GAME_HOSTED:
      return { ...state, inRoom: true, roomID: action.payload.roomID, isHost: true };
    case GAME_UPDATE_PLAYERS:
      return { ...state, players: [...action.payload.players] };
  }
  return state;
}
