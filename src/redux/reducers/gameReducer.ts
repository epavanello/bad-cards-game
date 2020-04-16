import {
  GAME_USER_INFO_LOADED,
  UserType,
  GAME_JOINED,
  GAME_HOSTED,
  GAME_UPDATE_PLAYERS,
  GAME_NEXT_ROUND,
  CardType,
  Role,
  GAME_EXITED,
  LOGOUT,
} from './../actionTypes/gameTypes';
import { GAME_STATE_CHANGED, GameActionTypes } from '../actionTypes/gameTypes';

export interface GameState {
  userInfoLoaded: boolean;
  gameStarted: boolean;
  logged: boolean;
  uid: string;
  username: string;
  inRoom: boolean;
  roomID: string;
  isHost: boolean;
  judge: UserType | undefined;
  players: UserType[];
  round: number;
  cards: CardType[];
  role: Role;
  blackCard: CardType | undefined;
}

const initialState: GameState = {
  userInfoLoaded: false,
  logged: false,
  uid: '',
  username: '',
  gameStarted: false,
  inRoom: false,
  roomID: '',
  isHost: false,
  judge: undefined,
  players: [],
  round: 0,
  cards: [],
  role: Role.PLAYER,
  blackCard: undefined,
};

export function gameReducer(state = initialState, action: GameActionTypes) {
  switch (action.type) {
    case GAME_STATE_CHANGED:
      return { ...state, gameStarted: action.payload.gameStarted };
    case GAME_USER_INFO_LOADED:
      const { logged, uid, username } = action.payload;
      return { ...state, userInfoLoaded: true, logged, uid, username };
    case LOGOUT:
      return { ...state, logged: false };
    case GAME_JOINED:
      return { ...state, inRoom: true, joinFailed: false, joinError: '', roomID: action.payload.roomID };
    case GAME_HOSTED:
      return { ...state, inRoom: true, joinFailed: false, joinError: '', roomID: action.payload.roomID, isHost: true };
    case GAME_EXITED:
      return { ...state, inRoom: false };
    case GAME_UPDATE_PLAYERS:
      return { ...state, players: [...action.payload.players] };
    case GAME_NEXT_ROUND:
      const { round, cards, role, blackCard, judgeID } = action.payload;
      return { ...state, judge: state.players.find((player) => player.uid === judgeID), round, cards, role, blackCard };
  }
  return state;
}
