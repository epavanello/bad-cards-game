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
  GameErrorAction,
  GAME_ERROR,
  GameCloseErrorAction,
  GAME_CLOSE_ERROR,
  GAME_START,
  GameStartAction,
  GameSendSelectedAction,
  GAME_SEND_SELECTED,
  GameSendWinnerAction,
  GAME_SEND_WINNER,
  RedirectAfterLoginAction,
  REDIRECT_AFTER_LOGIN,
  RedirectDoneAction,
  REDIRECT_DONE,
  ErrorType,
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

export const joinGame = (roomID: string): GameJoindedAction => {
  return { type: GAME_JOINED, payload: { roomID } };
};

export const hostGame = async () => {
  const response = await axios.get<{ roomID: string }>('/game/createRoom');
  return { type: GAME_HOSTED, payload: { roomID: response.data.roomID } };
};

export const startGame = (): GameStartAction => {
  return { type: GAME_START };
};

export const exitGame = (): GameExitedAction => {
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

export const error = (error: string, titleError: string, errorType: ErrorType): GameErrorAction => {
  return { type: GAME_ERROR, payload: { error, titleError, errorType } };
};

export const closeError = (): GameCloseErrorAction => {
  return { type: GAME_CLOSE_ERROR };
};

export const sendSelected = (cards: CardType[]): GameSendSelectedAction => {
  return { type: GAME_SEND_SELECTED, payload: { cards } };
};

export const sendWinner = (player: UserType): GameSendWinnerAction => {
  return { type: GAME_SEND_WINNER, payload: { player } };
};

export const redirectAfterLogin = (pathAfterLogin: string): RedirectAfterLoginAction => {
  return { type: REDIRECT_AFTER_LOGIN, payload: { pathAfterLogin } };
};

export const redirectDone = (): RedirectDoneAction => {
  return { type: REDIRECT_DONE };
};
