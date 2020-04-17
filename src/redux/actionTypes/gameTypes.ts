export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const GAME_USER_INFO_LOADED = 'GAME_USER_INFO_LOADED';
export const GAME_STATE_CHANGED = 'GAME_STATE_CHANGED';
export const GAME_NEXT_ROUND = 'GAME_NEXT_ROUND';
export const GAME_UPDATE_PLAYERS = 'GAME_UPDATE_PLAYERS';
export const GAME_JOINED = 'GAME_JOINED';
export const GAME_EXITED = 'GAME_EXITED';
export const GAME_HOSTED = 'GAME_HOSTED';
export const GAME_ERROR = 'GAME_ERROR';
export const GAME_CLOSE_ERROR = 'GAME_CLOSE_ERROR';

export enum Role {
  JUDGE,
  PLAYER,
}

export interface CardType {
  message: string;
  id: number;
}
export enum CardColor {
  White,
  Black,
}

export interface UserType {
  username: string;
  uid: string;
  points: number;
}

export interface GameStateChangedAction {
  type: typeof GAME_STATE_CHANGED;
  payload: { gameStarted: boolean };
}

export interface GameNextRoundAction {
  type: typeof GAME_NEXT_ROUND;
  payload: {
    round: number;
    cards: CardType[];
    role: Role;
    blackCard: CardType;
    judgeID: string;
  };
}

export interface GameUserInfoLoadedAction {
  type: typeof GAME_USER_INFO_LOADED;
  payload: {
    logged: boolean;
    uid: string;
    username: string;
  };
}

export interface GameUpdatePlayersAction {
  type: typeof GAME_UPDATE_PLAYERS;
  payload: {
    players: UserType[];
  };
}

export interface GameJoindedAction {
  type: typeof GAME_JOINED;
  payload: {
    roomID: string;
  };
}

export interface GameExitedAction {
  type: typeof GAME_EXITED;
}

export interface GameHostedAction {
  type: typeof GAME_HOSTED;
  payload: {
    roomID: string;
  };
}
export interface GameErrorAction {
  type: typeof GAME_ERROR;
  payload: {
    error: string;
    titleError: string;
  };
}
export interface GameCloseErrorAction {
  type: typeof GAME_CLOSE_ERROR;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}
export interface LoginAction {
  type: typeof LOGIN;
}

export type GameActionTypes =
  | GameStateChangedAction
  | GameNextRoundAction
  | GameUserInfoLoadedAction
  | GameUpdatePlayersAction
  | GameJoindedAction
  | GameHostedAction
  | GameExitedAction
  | LogoutAction
  | LoginAction
  | GameErrorAction
  | GameCloseErrorAction;
