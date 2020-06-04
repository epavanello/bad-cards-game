import {
  GAME_USER_INFO_LOADED,
  UserType,
  GAME_JOINED,
  GAME_HOSTING,
  GAME_UPDATE_PLAYERS,
  GAME_NEXT_ROUND,
  CardType,
  Role,
  GAME_EXITED,
  LOGOUT,
  GAME_ERROR,
  GAME_CLOSE_ERROR,
  GAME_SEND_SELECTED,
  REDIRECT_AFTER_LOGIN,
  REDIRECT_DONE,
  ErrorType,
  NEW_DISPLAY_NAME,
  Pack,
} from './../actionTypes/gameTypes';
import { GAME_STATE_CHANGED, GameActionTypes } from '../actionTypes/gameTypes';

export interface GameState {
  userInfoLoaded: boolean;
  logged: boolean;
  uid: string;
  displayName: string;

  gameStarted: boolean;
  inRoom: boolean;
  roomID: string;
  isHost: boolean;

  judge: UserType | undefined;
  players: UserType[];
  round: number;
  pack: Pack | undefined;
  cards: CardType[];
  role: Role;
  blackCard: CardType | undefined;
  selectionsSent: boolean;
  returnToGame: boolean;

  error: string;
  titleError: string;
  pathAfterLogin: string;
}

const roomInitialState = {
  gameStarted: false,
  inRoom: false,
  roomID: '',
  isHost: false,
};

const gameInitialState = {
  judge: undefined,
  players: [],
  round: 0,
  pack: undefined,
  cards: [],
  role: Role.PLAYER,
  blackCard: undefined,
  selectionsSent: false,
  returnToGame: false,
};

const errorInitialState = {
  error: '',
  titleError: '',
};

const initialState: GameState = {
  userInfoLoaded: false,
  logged: false,
  uid: '',
  displayName: '',

  ...roomInitialState,
  ...gameInitialState,
  ...errorInitialState,

  pathAfterLogin: '',
};

export function gameReducer(state = initialState, action: GameActionTypes): GameState {
  switch (action.type) {
    case GAME_STATE_CHANGED:
      return { ...state, gameStarted: true, pack: action.payload.pack };
    case GAME_USER_INFO_LOADED:
      const { logged, uid, displayName } = action.payload;
      return { ...state, userInfoLoaded: true, logged, uid, displayName: displayName || state.displayName };
    case NEW_DISPLAY_NAME:
      return { ...state, displayName: action.payload.displayName };
    case LOGOUT:
      return { ...state, logged: false };
    case GAME_JOINED:
      return { ...state, inRoom: true, roomID: action.payload.roomID, returnToGame: false, ...errorInitialState };
    case GAME_HOSTING:
      return { ...state, isHost: true };
    case GAME_EXITED:
      return { ...state, ...roomInitialState, ...gameInitialState };
    case GAME_UPDATE_PLAYERS:
      return { ...state, players: [...action.payload.players] };
    case GAME_NEXT_ROUND:
      const { round, cards, role, blackCard, judgeID } = action.payload;
      return {
        ...state,
        judge: state.players.find((player) => player.uid === judgeID),
        round,
        cards,
        role,
        blackCard,
        selectionsSent: false,
      };
    case GAME_ERROR:
      const { error, titleError } = action.payload;
      let extra = {};
      if (action.payload.errorType === ErrorType.JOIN) {
        extra = { returnToGame: true };
      }
      return { ...state, error, titleError, ...extra };
    case GAME_CLOSE_ERROR:
      return { ...state, error: '', titleError: '' };
    case GAME_SEND_SELECTED:
      return { ...state, selectionsSent: true };
    case REDIRECT_AFTER_LOGIN:
      return { ...state, pathAfterLogin: action.payload.pathAfterLogin };
    case REDIRECT_DONE:
      return { ...state, pathAfterLogin: '' };
  }
  return state;
}
