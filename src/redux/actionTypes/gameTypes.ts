export const GAME_USER_LOADED = 'GAME_USER_LOADED';
export const GAME_STATE_CHANGED = 'GAME_STATE_CHANGED';
export const GAME_NEXT_ROUND = 'GAME_NEXT_ROUND';
export const GAME_UPDATE_PLAYERS = 'GAME_UPDATE_PLAYERS';
export const GAME_JOINED = 'GAME_JOINED';
export const GAME_EXITED = 'GAME_EXITED';
export const GAME_HOSTED = 'GAME_HOSTED';

export enum Role {
  JUDGE,
  PLAYER,
}

export interface Card {
  message: string;
  id: number;
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
    cards: Card[];
    role: Role;
    blackCard: Card;
  };
}

export interface GameUserLoadedAction {
  type: typeof GAME_USER_LOADED;
  payload: {
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

export type GameActionTypes =
  | GameStateChangedAction
  | GameNextRoundAction
  | GameUserLoadedAction
  | GameUpdatePlayersAction
  | GameJoindedAction
  | GameHostedAction
  | GameExitedAction;
