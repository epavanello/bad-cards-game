import { Firebase } from './../../FirebaseContext';
import {
  GAME_USER_INFO_LOADED,
  GameUserInfoLoadedAction,
  GameUpdatePlayersAction,
  UserType,
  GAME_UPDATE_PLAYERS,
  GameJoindedAction,
  GAME_JOINED,
  GAME_HOSTING,
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
  SignupAction,
  SIGNUP,
  NEW_DISPLAY_NAME,
  NewDisplayNameAction,
  DeleteUserAction,
  DELETE_USER,
  GameHostedAction,
  GameJoiningExistingAction,
  GAME_JOINING_EXISTING,
  Pack,
} from './../actionTypes/gameTypes';
import { GAME_STATE_CHANGED, GameStateChangedAction, CardType, Role, GameNextRoundAction, GAME_NEXT_ROUND } from '../actionTypes/gameTypes';

export const gameStarted = (pack: Pack): GameStateChangedAction => ({
  type: GAME_STATE_CHANGED,
  payload: { pack },
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

export const userLoaded = (logged: boolean, uid: string, displayName: string): GameUserInfoLoadedAction => ({
  type: GAME_USER_INFO_LOADED,
  payload: { displayName, logged, uid },
});

export const updatePlayers = (players: UserType[]): GameUpdatePlayersAction => ({ type: GAME_UPDATE_PLAYERS, payload: { players } });

export const joinGame = (roomID: string): GameJoindedAction => {
  return { type: GAME_JOINED, payload: { roomID } };
};

export const JoiningExisting = (): GameJoiningExistingAction => {
  return { type: GAME_JOINING_EXISTING };
};

export const hostGame = (lang: string): GameHostedAction => {
  return { type: GAME_HOSTING, payload: { lang } };
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

export const login = (email: string, password: string): LoginAction => {
  return { type: LOGIN, payload: { email, password } };
};

export const signup = (email: string, password: string, displayName: string): SignupAction => {
  return { type: SIGNUP, payload: { email, password, displayName } };
};

export const newDisplayName = (displayName: string): NewDisplayNameAction => {
  return { type: NEW_DISPLAY_NAME, payload: { displayName } };
};

export const deleteUser = (): DeleteUserAction => {
  return { type: DELETE_USER };
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
