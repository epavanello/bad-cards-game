import axios from 'axios';
import { Firebase } from './../../FirebaseContext';
import {
  GAME_USER_INFO_LOADED,
  GameUserInfoLoadedAction,
  GameUpdatePlayersAction,
  UserType,
  GAME_UPDATE_PLAYERS,
  GameJoindedAction,
  GAME_JOINED,
  GAME_HOSTED,
  GAME_EXITED,
  GameExitedAction,
  LOGOUT,
  LogoutAction,
  LoginAction,
  LOGIN,
} from './../actionTypes/gameTypes';
import { GAME_STATE_CHANGED, GameStateChangedAction, CardType, Role, GameNextRoundAction, GAME_NEXT_ROUND } from '../actionTypes/gameTypes';

export const gameStarted = (state: boolean): GameStateChangedAction => ({
  type: GAME_STATE_CHANGED,
  payload: { gameStarted: state },
});

export const newRound = (round: number, cards: CardType[], role: Role, blackCard: CardType, judgeID: string): GameNextRoundAction => ({
  type: GAME_NEXT_ROUND,
  payload: {
    round,
    cards,
    role,
    blackCard,
    judgeID,
  },
});

export const userLoaded = (logged: boolean, uid: string, username: string): GameUserInfoLoadedAction => ({
  type: GAME_USER_INFO_LOADED,
  payload: { username, logged, uid },
});

export const updatePlayers = (players: UserType[]): GameUpdatePlayersAction => ({ type: GAME_UPDATE_PLAYERS, payload: { players } });

export const joinGame = async (roomID: string, firebase: Firebase): Promise<GameJoindedAction> => {
  await firebase.enterRoom(roomID);
  return { type: GAME_JOINED, payload: { roomID } };
};

export const hostGame = async (firebase: Firebase) => {
  const response = await axios.get<{ roomID: string }>('/game/createRoom');
  firebase?.enterRoom(response.data.roomID);
  return { type: GAME_HOSTED, payload: { roomID: response.data.roomID } };
};

export const exitGame = (firebase: Firebase): GameExitedAction => {
  firebase.exitRoom();
  return { type: GAME_EXITED };
};

export const logout = async (firebase: Firebase): Promise<LogoutAction> => {
  await firebase.doSignOut();
  return { type: LOGOUT };
};

export const login = async (firebase: Firebase, email: string, password: string): Promise<LoginAction> => {
  await firebase?.doSignInWithEmailAndPassword(email, password);
  return { type: LOGIN };
};
